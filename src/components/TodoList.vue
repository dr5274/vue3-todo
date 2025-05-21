<script setup>
import { toRefs } from 'vue'
import TodoItem from '@/components/TodoItem'
const props = defineProps(['todos', 'canToggle', 'allCompleted'])
const { todos, canToggle, allCompleted } = toRefs(props)
const emit = defineEmits([
  'onToggleCompleted',
  'onToggleAll',
  'onStartEdit',
  'onEndEdit',
  'onRemoveTodo',
])

function onToggleCompleted(todo) {
  emit('onToggleCompleted', todo)
}

function onToggleAll() {
  emit('onToggleAll')
}

function onStartEdit(todo) {
  emit('onStartEdit', todo)
}

function onEndEdit({ todo, title }) {
  emit('onEndEdit', { todo, title })
}

function onRemoveTodo(todo) {
  emit('onRemoveTodo', todo)
}
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
            @onToggleCompleted="onToggleCompleted"
            @onStartEdit="onStartEdit"
            @onEndEdit="onEndEdit"
            @onRemoveTodo="onRemoveTodo"
          />
        </div>
      </ul>
    </div>
  </section>
</template>
