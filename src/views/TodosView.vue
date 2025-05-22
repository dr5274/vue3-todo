<script setup>
import { useRoute } from 'vue-router'
import { useTodoStore } from '@/stores/todos'
import { ref, computed } from 'vue'
import TodoList from '@/components/TodoList'

const route = useRoute()
const { todos, createTodo, removeTodo } = useTodoStore()
let canToggle = ref(true)

const allTodos = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  return todos.sort((a, b) => a.id - b.id)
})

const activeTodos = computed(() => {
  return todos.filter((todo) => !todo.completed)
})

const completedTodos = computed(() => {
  return todos.filter((todo) => todo.completed)
})

const filteredTodos = computed(() => {
  switch (route.path) {
    case '/':
    default:
      return allTodos

    case '/active':
      return activeTodos

    case '/completed':
      return completedTodos
  }
})

const allCompleted = computed(() => {
  return activeTodos.value.length === 0
})

function onKeyDown(e) {
  if (e.keyCode === 13 && !!e.target.value) {
    createTodo({
      title: e.target.value.trim(),
      completed: false,
    })
    e.target.value = ''
  }
}

function onToggleCompleted(todo) {
  todo.completed = !todo.completed
}

function onToggleAll() {
  todos.forEach((todo) => {
    todo.completed = !todo.completed
  })
}
function onClearCompleted() {
  todos.forEach((todo) => {
    if (todo.completed) {
      removeTodo(todo.id)
    }
  })
  todos.value = todos
}

function onStartEdit(/* todo */) {
  canToggle.value = false
}

function onEndEdit({ todo, title }) {
  todo.title = title
  canToggle.value = true
}

function onRemoveTodo(todo) {
  removeTodo(todo.id)
}
</script>

<template>
  <section class="todoapp">
    <header class="header">
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" v-on:keydown="onKeyDown" />
    </header>

    <TodoList
      :todos="filteredTodos"
      :canToggle="canToggle"
      :allCompleted="allCompleted"
      @onToggleCompleted="onToggleCompleted"
      @onToggleAll="onToggleAll"
      @onStartEdit="onStartEdit"
      @onEndEdit="onEndEdit"
      @onRemoveTodo="onRemoveTodo"
    />

    <footer v-if="allTodos.length" class="footer">
      <span class="todo-count">
        <strong>
          {{ activeTodos.length }}
        </strong>
        left
      </span>

      <ul class="filters">
        <li>
          <router-link to="/" exact-active-class="selected"> All </router-link>
        </li>
        <li>
          <router-link to="/active" active-class="selected"> Active </router-link>
        </li>
        <li>
          <router-link to="/completed" active-class="selected"> Completed </router-link>
        </li>
      </ul>

      <button v-if="completedTodos.length" class="clear-completed" v-on:click="onClearCompleted">
        Clear completed
      </button>
    </footer>
  </section>

  <footer class="info">
    <p>Double-click to edit a todo</p>
  </footer>
</template>
