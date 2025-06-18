import { defineEventHandler, readBody, setResponseStatus, createError } from 'h3';
import { db, customers } from '~/server/db';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, gender, contact, idCard, password } = body;

  if (!name || !gender || !contact || !idCard || !password) {
    return createError({ statusCode: 400, statusMessage: '请填写完整信息' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.insert(customers).values({
      name,
      gender,
      contact,
      idCard,
      password: hashedPassword,
    });

    return { message: '用户添加成功！' };

  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint failed')) {
      if (error.message.includes('customers.contact')) {
        return createError({ statusCode: 409, statusMessage: '该手机号已被注册' });
      }
      if (error.message.includes('customers.id_card')) {
        return createError({ statusCode: 409, statusMessage: '该身份证号已被注册' });
      }
    }

    console.error('Add user error:', error);
    return createError({ statusCode: 500, statusMessage: '添加用户失败，请稍后重试' });
  }
}); 