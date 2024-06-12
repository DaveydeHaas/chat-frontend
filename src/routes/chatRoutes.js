import { defineAsyncComponent } from 'vue';

const Chatroom = defineAsyncComponent(() => import('../components/chatroom/ChatRoom.vue'));

const chatRoutes = [
  {
    path: '/chatroom/:id',
    name: 'ChatRoom',
    component: Chatroom,
    props: true,
    meta: { requiresAuth: true },
  },
];

export default chatRoutes;