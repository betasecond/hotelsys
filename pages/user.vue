<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">用户中心</h1>
      <div class="text-lg">
        <span id="user-id" class="font-mono bg-gray-200 px-2 py-1 rounded">用户ID: {{ customerId }}</span>
      </div>
    </div>
    
    <div id="message" class="text-red-500 text-center mb-4">{{ message }}</div>

    <div class="mb-4 border-b border-gray-200">
      <nav class="-mb-px flex space-x-8" aria-label="Tabs">
        <button @click="currentView = 'rooms'" :class="['whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', currentView === 'rooms' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
          浏览房间
        </button>
        <button @click="currentView = 'reservations'" :class="['whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', currentView === 'reservations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
          我的预订
        </button>
        <button @click="currentView = 'book'" :class="['whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm', currentView === 'book' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300']">
          预订房间
        </button>
      </nav>
    </div>

    <!-- Rooms Section -->
    <div v-if="currentView === 'rooms'">
      <h2 class="text-xl font-semibold mb-4">可用房间列表</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">房间ID</th>
            <th class="py-2 px-4 border-b">类型</th>
            <th class="py-2 px-4 border-b">价格</th>
            <th class="py-2 px-4 border-b">特色</th>
            <th class="py-2 px-4 border-b">余量</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="room in rooms" :key="room.RoomID">
            <td class="py-2 px-4 border-b text-center">{{ room.RoomID }}</td>
            <td class="py-2 px-4 border-b text-center">{{ room.Type }}</td>
            <td class="py-2 px-4 border-b text-center">{{ room.Price }}</td>
            <td class="py-2 px-4 border-b text-center">{{ room.Feature || '-' }}</td>
            <td class="py-2 px-4 border-b text-center">{{ room.AvailableCount }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Reservations Section -->
    <div v-if="currentView === 'reservations'">
      <h2 class="text-xl font-semibold mb-4">我的预订记录</h2>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">预订ID</th>
            <th class="py-2 px-4 border-b">房间ID</th>
            <th class="py-2 px-4 border-b">入住时间</th>
            <th class="py-2 px-4 border-b">入住天数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="res in reservations" :key="res.ReservationID">
            <td class="py-2 px-4 border-b text-center">{{ res.ReservationID }}</td>
            <td class="py-2 px-4 border-b text-center">{{ res.RoomID }}</td>
            <td class="py-2 px-4 border-b text-center">{{ new Date(res.CheckInTime).toLocaleDateString() }}</td>
            <td class="py-2 px-4 border-b text-center">{{ res.StayDays }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Booking Form Section -->
    <div v-if="currentView === 'book'">
      <h2 class="text-xl font-semibold mb-4">预订房间</h2>
      <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <form @submit.prevent="bookRoom">
          <div class="mb-4">
            <label for="book-room-id" class="block text-sm font-medium text-gray-700">房间ID</label>
            <input type="number" id="book-room-id" v-model.number="bookingForm.roomId" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="book-checkin" class="block text-sm font-medium text-gray-700">入住时间</label>
            <input type="date" id="book-checkin" v-model="bookingForm.checkInTime" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div class="mb-4">
            <label for="book-staydays" class="block text-sm font-medium text-gray-700">入住天数</label>
            <input type="number" id="book-staydays" v-model.number="bookingForm.stayDays" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
          </div>
          <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            立即预订
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue';

const customerId = ref<string | null>(null);
const message = ref('');
const currentView = ref('rooms'); // rooms, reservations, book

const rooms = ref([]);
const reservations = ref([]);
const bookingForm = reactive({
  roomId: null,
  checkInTime: '',
  stayDays: null,
});

async function viewRooms() {
  try {
    const data = await $fetch('/api/rooms/all');
    rooms.value = data;
  } catch (error: any) {
    message.value = error.data?.message || '加载房间失败';
  }
}

async function viewReservations() {
  if (!customerId.value) return;
  try {
    const data = await $fetch(`/api/reservations/${customerId.value}`);
    reservations.value = data;
  } catch (error: any) {
    message.value = error.data?.message || '加载预订失败';
  }
}

async function bookRoom() {
  if (!bookingForm.roomId || !bookingForm.checkInTime || !bookingForm.stayDays) {
    message.value = '请填写完整信息';
    return;
  }
  try {
    const response = await $fetch('/api/book', {
      method: 'POST',
      body: { ...bookingForm, customerId: customerId.value }
    });
    message.value = response.message;
    bookingForm.roomId = null;
    bookingForm.checkInTime = '';
    bookingForm.stayDays = null;
    currentView.value = 'reservations'; // Switch to reservations view on success
  } catch (error: any) {
    message.value = error.data?.message || '预订失败';
  }
}

onMounted(() => {
  customerId.value = localStorage.getItem('customerId');
  if (!customerId.value) {
    navigateTo('/'); // Redirect to login if no customerId
  } else {
    viewRooms();
    viewReservations();
  }
});

watch(currentView, (newView) => {
  message.value = '';
  if (newView === 'rooms') {
    viewRooms();
  } else if (newView === 'reservations') {
    viewReservations();
  }
});
</script> 