<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div class="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
      <h1 class="text-2xl font-bold text-center mb-6">酒店预订系统</h1>

      <!-- Role Selector -->
      <div class="flex justify-center mb-4">
        <div class="flex rounded-md shadow-sm">
          <label class="px-4 py-2 border border-gray-300 rounded-l-md cursor-pointer" :class="{'bg-blue-500 text-white': role === 'user'}">
            <input type="radio" name="role" value="user" v-model="role" class="sr-only"> 用户
          </label>
          <label class="px-4 py-2 border-t border-b border-r border-gray-300 rounded-r-md cursor-pointer" :class="{'bg-blue-500 text-white': role === 'admin'}">
            <input type="radio" name="role" value="admin" v-model="role" class="sr-only"> 管理员
          </label>
        </div>
      </div>

      <div id="message" class="text-red-500 text-center mb-4">{{ message }}</div>

      <!-- Login Form -->
      <div v-if="isLoginView">
        <form @submit.prevent="handleLogin">
          <div class="mb-4" v-if="role === 'user'">
            <label for="user-contact" class="block text-sm font-medium text-gray-700">手机号</label>
            <input type="text" id="user-contact" v-model="loginForm.contact" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <div class="mb-4">
            <label for="user-password" class="block text-sm font-medium text-gray-700">密码</label>
            <input type="password" id="user-password" v-model="loginForm.password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            登录
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          还没有账户? <a @click.prevent="showRegister" href="#" class="font-medium text-blue-600 hover:text-blue-500">立即注册</a>
        </p>
      </div>

      <!-- Registration Form -->
      <div v-else>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label for="reg-name" class="block text-sm font-medium text-gray-700">姓名</label>
            <input type="text" id="reg-name" v-model="registerForm.name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <div class="mb-4">
             <label class="block text-sm font-medium text-gray-700">性别</label>
            <div class="mt-1 flex">
              <label class="inline-flex items-center mr-4">
                <input type="radio" name="gender" value="male" v-model="registerForm.gender" class="form-radio">
                <span class="ml-2">男</span>
              </label>
              <label class="inline-flex items-center">
                <input type="radio" name="gender" value="female" v-model="registerForm.gender" class="form-radio">
                <span class="ml-2">女</span>
              </label>
            </div>
          </div>
          <div class="mb-4">
            <label for="reg-contact" class="block text-sm font-medium text-gray-700">手机号</label>
            <input type="text" id="reg-contact" v-model="registerForm.contact" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <div class="mb-4">
            <label for="reg-idcard" class="block text-sm font-medium text-gray-700">身份证号</label>
            <input type="text" id="reg-idcard" v-model="registerForm.idCard" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <div class="mb-4">
            <label for="reg-password" class="block text-sm font-medium text-gray-700">密码</label>
            <input type="password" id="reg-password" v-model="registerForm.password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            注册
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          已有账户? <a @click.prevent="showLogin" href="#" class="font-medium text-blue-600 hover:text-blue-500">立即登录</a>
        </p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const role = ref('user'); // 'user' or 'admin'
const isLoginView = ref(true);
const message = ref('');

const loginForm = reactive({
  contact: '',
  password: ''
});

const registerForm = reactive({
  name: '',
  gender: 'male',
  contact: '',
  idCard: '',
  password: ''
});

function showRegister() {
  isLoginView.value = false;
  message.value = '';
}

function showLogin() {
  isLoginView.value = true;
  message.value = '';
}

async function handleLogin() {
  // TODO: Implement login logic
  console.log('Logging in with role:', role.value, 'and credentials:', loginForm);
}

async function handleRegister() {
  // TODO: Implement register logic
  console.log('Registering with data:', registerForm);
}
</script> 