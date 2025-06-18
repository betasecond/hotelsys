import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import { db, customers } from '~/server/db';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { contact, password } = body;

  if (!contact || !password) {
    setResponseStatus(event, 400);
    return { message: '请填写手机号和密码' };
  }

  try {
    const user = await db.query.customers.findFirst({
      where: eq(customers.contact, contact),
    });

    if (!user) {
      setResponseStatus(event, 401);
      return { message: '手机号或密码错误' };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      setResponseStatus(event, 401);
      return { message: '手机号或密码错误' };
    }

    return {
      message: '登录成功！',
      customerId: user.id,
    };

  } catch (error) {
    console.error('Login error:', error);
    setResponseStatus(event, 500);
    return { message: '登录失败，请稍后重试' };
  }
}); 