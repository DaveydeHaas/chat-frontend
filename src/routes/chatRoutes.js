import { defineAsyncComponent } from 'vue';

const ChatroomList = defineAsyncComponent(() => import('../components/chatroom/ListChatRooms.vue'));
const Chatroom = defineAsyncComponent(() => import('../components/chatroom/ChatRoom.vue'));
const CreateChatroom = defineAsyncComponent(() => import('../components/chatroom/CreateChatroom.vue'))

const chatRoutes = [
  {
    path: '/',
    name: 'ListChatrooms',
    component: ChatroomList,
    meta: { requiresAuth: true}
  },
  {
    path: '/chatroom/:id',
    name: 'ChatRoom',
    component: Chatroom,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-chatroom',
    name: 'CreateChatroom',
    component: CreateChatroom,
    props: true,
    meta: { requiresAuth: true },
  },
];

export default chatRoutes;