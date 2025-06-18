import { defineEventHandler, readBody, setResponseStatus } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, gender, contact, idCard, password } = body;

  if (!name || !gender || !contact || !idCard || !password) {
    setResponseStatus(event, 400);
    return {
      message: '请填写完整信息',
    };
  }

  // TODO: Add database logic to save the user
  console.log('Registering new user:', { name, gender, contact, idCard });

  return {
    message: '注册成功！',
  };
}); 