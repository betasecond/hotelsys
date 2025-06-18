import { db, roomTypes, rooms } from './index';

async function initializeDatabase() {
  try {
    console.log('开始初始化数据库...');

    // 检查是否已有数据
    const existingTypes = await db.select().from(roomTypes).limit(1);
    if (existingTypes.length > 0) {
      console.log('数据库已有数据，跳过初始化');
      return;
    }

    // 插入房间类型
    const insertedTypes = await db.insert(roomTypes).values([
      { typeName: '标准单人间', starRating: 3 },
      { typeName: '标准双人间', starRating: 3 },
      { typeName: '豪华单人间', starRating: 4 },
      { typeName: '豪华双人间', starRating: 4 },
      { typeName: '总统套房', starRating: 5 },
    ]).returning();

    console.log('房间类型插入完成');

    // 插入房间
    await db.insert(rooms).values([
      { typeId: 1, price: 200, feature: '免费WiFi，独立卫浴', availableCount: 10 },
      { typeId: 1, price: 220, feature: '免费WiFi，独立卫浴，市景', availableCount: 8 },
      { typeId: 2, price: 300, feature: '免费WiFi，独立卫浴，双床', availableCount: 15 },
      { typeId: 2, price: 320, feature: '免费WiFi，独立卫浴，双床，市景', availableCount: 12 },
      { typeId: 3, price: 400, feature: '免费WiFi，独立卫浴，豪华装修', availableCount: 6 },
      { typeId: 3, price: 450, feature: '免费WiFi，独立卫浴，豪华装修，海景', availableCount: 4 },
      { typeId: 4, price: 600, feature: '免费WiFi，独立卫浴，豪华装修，双床', availableCount: 8 },
      { typeId: 4, price: 680, feature: '免费WiFi，独立卫浴，豪华装修，双床，海景', availableCount: 5 },
      { typeId: 5, price: 1200, feature: '免费WiFi，豪华套房，客厅卧室分离，全景海景', availableCount: 2 },
      { typeId: 5, price: 1500, feature: '免费WiFi，总统套房，私人泳池，全景海景', availableCount: 1 },
    ]);

    console.log('房间数据插入完成');
    console.log('数据库初始化完成！');

  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
}

// 如果直接运行此文件，则执行初始化
if (import.meta.url === new URL(import.meta.url).href) {
  initializeDatabase();
}

export { initializeDatabase };
