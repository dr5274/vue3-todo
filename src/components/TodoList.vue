<script setup>
import { toRefs } from 'vue'
import TodoItem from '@/components/TodoItem'
const props = defineProps([
  'todos',
  'canToggle',
  'allCompleted',
  'onToggleAll',
  'onToggleCompleted',
  'onRemoveTodo',
  'onStartEdit',
  'onEndEdit',
])
const {
  todos,
  canToggle,
  allCompleted,
  onToggleAll,
  onToggleCompleted,
  onRemoveTodo,
  onStartEdit,
  onEndEdit,
} = toRefs(props)
</script>

<template>
  <section class="main">
    <div v-if="todos.length">
      <div v-if="canToggle">
        <input
          id="toggle-all"
          class="toggle-all"
          type="checkbox"
          :checked="allCompleted"
          v-on:change="onToggleAll"
        />
        <label for="toggle-all"> Mark all as complete </label>
      </div>

      <ul class="todo-list">
        <div v-for="todo in todos" :key="todo.id" data-testid="todo-list-item">
          <TodoItem
            :todo="todo"
            :onToggleCompleted="onToggleCompleted"
            :onRemoveTodo="onRemoveTodo"
            :onStartEdit="onStartEdit"
            :onEndEdit="onEndEdit"
          />
        </div>
      </ul>
    </div>
  </section>
</template>
