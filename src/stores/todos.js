import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTodoStore = defineStore('todos', () => {
  const todos = ref([]);
  let id = 0;

  function createTodo(todo) {
    const _todo = {
      id: ++id,
      title: todo.title,
      completed: todo.completed,
    };
    todos.value.push(_todo);
  }

  function removeTodo(id) {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
    }
  }

  return {
    todos,
    createTodo,
    removeTodo,
  };
});
