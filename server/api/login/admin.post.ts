import { defineEventHandler, readBody, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { password } = body;

  if (!password) {
    setResponseStatus(event, 400);
    return { message: '请填写密码' };
  }

  // TODO: Replace with a more secure admin authentication method
  if (password === 'adminpassword') {
    return {
      message: '管理员登录成功！',
    };
  } else {
    setResponseStatus(event, 401);
    return { message: '密码错误' };
  }
}); 