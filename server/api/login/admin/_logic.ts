import { createError } from 'h3';

export async function adminLoginLogic(body: any, adminPassword: string) {
  const { password } = body;

  if (!password) {
    throw createError({
      statusCode: 400,
      statusMessage: '请输入管理员密码'
    });
  }

  try {
    // 简单的管理员密码验证（在实际项目中应该使用更安全的方式）
    if (password !== adminPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: '管理员密码错误'
      });
    }

    return {
      message: '管理员登录成功',
      role: 'admin'
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    console.error('Admin login error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: '登录失败，请稍后重试'
    });
  }
}
