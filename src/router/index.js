import { createRouter, createWebHistory } from 'vue-router';
import TodosView from '../views/TodosView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodosView,
    },
    {
      path: '/active',
      name: 'active',
      component: TodosView,
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodosView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : 'vue3-todo';
  next();
});

export default router;
