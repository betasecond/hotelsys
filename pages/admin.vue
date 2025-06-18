<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6">后台管理</h1>
    
    <div id="message" class="text-red-500 text-center mb-4">{{ message }}</div>

    <div class="mb-4 border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button v-for="tab in tabs" :key="tab.key" @click="currentView = tab.key" :class="['whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', currentView === tab.key ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Customers -->
    <div v-if="currentView === 'customers'">
      <h2 class="text-xl font-semibold mb-4">客户列表</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>联系方式</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in customers" :key="c.CustomerID">
            <td class="border px-4 py-2 text-center">{{ c.CustomerID }}</td>
            <td class="border px-4 py-2 text-center">{{ c.Name }}</td>
            <td class="border px-4 py-2 text-center">{{ c.Contact }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="showAddUser = !showAddUser" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {{ showAddUser ? '取消添加' : '添加用户' }}
      </button>
      <!-- Add User Form -->
      <div v-if="showAddUser" class="mt-4 max-w-md bg-gray-50 p-6 rounded-lg shadow">
        <form @submit.prevent="addUser">
          <!-- Form fields from registration page, simplified -->
          <div class="mb-2"><input v-model="addUserForm.name" placeholder="姓名" class="w-full p-2 border rounded"></div>
          <div class="mb-2"><input v-model="addUserForm.contact" placeholder="手机号" class="w-full p-2 border rounded"></div>
          <div class="mb-2"><input v-model="addUserForm.idCard" placeholder="身份证号" class="w-full p-2 border rounded"></div>
          <div class="mb-2"><input type="password" v-model="addUserForm.password" placeholder="密码" class="w-full p-2 border rounded"></div>
          <div class="mb-2">
            <label><input type="radio" v-model="addUserForm.gender" value="male"> 男</label>
            <label><input type="radio" v-model="addUserForm.gender" value="female"> 女</label>
          </div>
          <button type="submit" class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">确认添加</button>
        </form>
      </div>
    </div>

    <!-- Rooms -->
    <div v-if="currentView === 'rooms'">
      <h2 class="text-xl font-semibold mb-4">房间信息</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>类型</th>
            <th>价格</th>
            <th>特色</th>
            <th>余量</th>
            <th>类型ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rooms" :key="r.RoomID">
            <td class="border px-4 py-2 text-center">{{ r.RoomID }}</td>
            <td class="border px-4 py-2 text-center">{{ r.Type }}</td>
            <td class="border px-4 py-2 text-center">{{ r.Price }}</td>
            <td class="border px-4 py-2 text-center">{{ r.Feature || '-' }}</td>
            <td class="border px-4 py-2 text-center">{{ r.AvailableCount }}</td>
            <td class="border px-4 py-2 text-center">{{ r.TypeID }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Hotel Types -->
    <div v-if="currentView === 'hoteltypes'">
      <h2 class="text-xl font-semibold mb-4">酒店类型</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th>类型ID</th>
            <th>类型名称</th>
            <th>星级</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in hotelTypes" :key="t.TypeID">
            <td class="border px-4 py-2 text-center">{{ t.TypeID }}</td>
            <td class="border px-4 py-2 text-center">{{ t.TypeName }}</td>
            <td class="border px-4 py-2 text-center">{{ t.StarRating }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Reservations -->
    <div v-if="currentView === 'reservations'">
      <h2 class="text-xl font-semibold mb-4">预订信息</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th>预订ID</th>
            <th>客户姓名</th>
            <th>房间ID</th>
            <th>入住时间</th>
            <th>入住天数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in reservations" :key="res.ReservationID">
            <td class="border px-4 py-2 text-center">{{ res.ReservationID }}</td>
            <td class="border px-4 py-2 text-center">{{ res.Name }}</td>
            <td class="border px-4 py-2 text-center">{{ res.RoomID }}</td>
            <td class="border px-4 py-2 text-center">{{ new Date(res.CheckInTime).toLocaleDateString() }}</td>
            <td class="border px-4 py-2 text-center">{{ res.StayDays }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

const message = ref('');
const currentView = ref('customers');
const showAddUser = ref(false);

const tabs = [
  { key: 'customers', name: '客户管理' },
  { key: 'rooms', name: '房间管理' },
  { key: 'hoteltypes', name: '酒店类型' },
  { key: 'reservations', name: '预订管理' },
];

const customers = ref([]);
const rooms = ref([]);
const hotelTypes = ref([]);
const reservations = ref([]);

const addUserForm = reactive({
  name: '',
  gender: 'male',
  contact: '',
  idCard: '',
  password: '',
});

async function loadAllData() {
  try {
    [customers.value, rooms.value, hotelTypes.value, reservations.value] = await Promise.all([
      $fetch('/api/customers'),
      $fetch('/api/rooms/all'),
      $fetch('/api/hoteltypes'),
      $fetch('/api/reservations'),
    ]);
  } catch (error: any) {
    message.value = '加载数据失败: ' + (error.data?.message || error.message);
  }
}

async function addUser() {
  if (!addUserForm.name || !addUserForm.contact || !addUserForm.idCard || !addUserForm.password) {
    message.value = '请填写完整信息';
    return;
  }
  try {
    const response = await $fetch('/api/customers', {
      method: 'POST',
      body: addUserForm
    });
    message.value = response.message;
    showAddUser.value = false;
    Object.assign(addUserForm, { name: '', gender: 'male', contact: '', idCard: '', password: '' }); // Reset form
    loadAllData(); // Refresh data
  } catch (error: any) {
    message.value = '添加失败: ' + (error.data?.message || error.message);
  }
}

onMounted(() => {
  loadAllData();
});
</script> 