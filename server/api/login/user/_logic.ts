import bcrypt from 'bcryptjs';
import { createError } from 'h3';
import { db, customers } from '~/server/db';
import { eq } from 'drizzle-orm';

export async function userLoginLogic(body: any) {
  const { contact, password } = body;

  if (!contact || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: '请输入手机号和密码'
    });
  }

  try {
    // 查找用户
    const user = await db.select()
      .from(customers)
      .where(eq(customers.contact, contact))
      .limit(1);

    if (user.length === 0) {
      throw createError({
        statusCode: 401,
        statusMessage: '用户不存在'
      });
    }

    // 验证密码
    const isPasswordValid = bcrypt.compareSync(password, user[0].password);
    if (!isPasswordValid) {
      throw createError({
        statusCode: 401,
        statusMessage: '密码错误'
      });
    }

    // 返回用户ID（不返回敏感信息）
    return {
      message: '登录成功',
      customerId: user[0].id,
      customerName: user[0].name
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    console.error('User login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '登录失败，请稍后重试'
    });
  }
}
