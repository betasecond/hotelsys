import { createError } from 'h3';
import { db, reservations, rooms } from '~/server/db';
import { eq } from 'drizzle-orm';

export async function bookRoomLogic(body: any) {
  const { customerId, roomId, checkInTime, stayDays } = body;

  if (!customerId || !roomId || !checkInTime || !stayDays) {
    throw createError({
      statusCode: 400,
      statusMessage: '请填写完整的预订信息'
    });
  }

  if (stayDays <= 0) {
    throw createError({
      statusCode: 400,
      statusMessage: '入住天数必须大于0'
    });
  }

  try {
    // 检查房间是否存在且有库存
    const room = await db.select()
      .from(rooms)
      .where(eq(rooms.id, roomId))
      .limit(1);

    if (room.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: '房间不存在'
      });
    }

    if (room[0].availableCount <= 0) {
      throw createError({
        statusCode: 409,
        statusMessage: '该房间已无库存'
      });
    }

    // 转换入住时间为时间戳
    const checkInDate = new Date(checkInTime);
    if (checkInDate < new Date()) {
      throw createError({
        statusCode: 400,
        statusMessage: '入住时间不能早于今天'
      });
    }

    // 开始数据库事务
    await db.transaction(async (tx) => {
      // 创建预订记录
      await tx.insert(reservations).values({
        customerId: parseInt(customerId),
        roomId: parseInt(roomId),
        checkInTime: checkInDate,
        stayDays: parseInt(stayDays)
      });

      // 减少房间库存
      await tx.update(rooms)
        .set({ 
          availableCount: room[0].availableCount - 1 
        })
        .where(eq(rooms.id, roomId));
    });

    return {
      message: '预订成功！',
      reservationDetails: {
        roomId,
        checkInTime: checkInDate.toISOString(),
        stayDays,
        totalPrice: room[0].price * stayDays
      }
    };

  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    console.error('Booking error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '预订失败，请稍后重试'
    });
  }
}
