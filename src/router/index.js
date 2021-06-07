import { createRouter, createWebHistory } from "vue-router";
/*import Component*/
import Home from "../views/Home.vue";
import RoomCreate from '@/views/RoomCreate.vue'
//import RoomList from './views/RoomList.vue'
import RoomShow from '@/views/RoomShow.vue'
import LoginPage from '@/views/Login.vue'
import UserPage from '@/views/UserPage.vue'
import MailRedirect from '@/views/MailRedirect.vue'
import UserPage2 from '@/views/UserPage2.vue'
import UserPageRoomList from '@/views/UserPageRoomList.vue'
import Test from '@/views/Test.vue'
import Test2 from '@/views/Test2.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/room/create',
    name: 'room-create',
    component: RoomCreate,
  },
  {
    path: '/room/:id',
    name: 'room-show',
    component: RoomShow,
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    // lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/forgotpwd/:mailToken',
    name: 'mail-verify',
    component: MailRedirect,
    props: true,
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserPage,
  },
  {
    path: '/userpage2',
    name: 'userpage2',
    component: UserPage2,
  },
  {
    path: '/userpage_roomlist',
    name: 'userpage_roomlist',
    component: UserPageRoomList,
  },
  {
    path: '/notification',
    name: 'notification',
    component: Notification,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2,
  },
]

const router = createRouter({
  /* mode: 'history', */
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
