import { defineEventHandler, readBody, setResponseStatus, useRuntimeConfig } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { password } = body;
  const config = useRuntimeConfig(event);

  if (!password) {
    setResponseStatus(event, 400);
    return { message: '请填写密码' };
  }

  const adminPassword = config.adminPassword;

  if (!adminPassword || password !== adminPassword) {
    setResponseStatus(event, 401);
    return { message: '密码错误' };
  }

  return {
    message: '管理员登录成功！',
  };
}); 