import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { db, customers } from '~/server/db';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, gender, contact, idCard, password } = body;

  if (!name || !gender || !contact || !idCard || !password) {
    setResponseStatus(event, 400);
    return { message: '请填写完整信息' };
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

    return { message: '注册成功！' };

  } catch (error: any) {
    // Check for unique constraint violation
    if (error.message?.includes('UNIQUE constraint failed')) {
      setResponseStatus(event, 409); // Conflict
      if (error.message.includes('customers.contact')) {
        return { message: '该手机号已被注册' };
      }
      if (error.message.includes('customers.id_card')) {
        return { message: '该身份证号已被注册' };
      }
    }

    console.error('Registration error:', error);
    setResponseStatus(event, 500);
    return { message: '注册失败，请稍后重试' };
  }
}); 