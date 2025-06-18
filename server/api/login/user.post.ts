import { defineEventHandler, readBody, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { contact, password } = body;

  if (!contact || !password) {
    setResponseStatus(event, 400);
    return { message: '请填写手机号和密码' };
  }

  // TODO: Replace with database user lookup and password verification
  if (contact === '1234567890' && password === 'password') {
    return {
      message: '登录成功！',
      customerId: 'dummy-customer-id-123',
    };
  } else {
    setResponseStatus(event, 401);
    return { message: '手机号或密码错误' };
  }
}); 