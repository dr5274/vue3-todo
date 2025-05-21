<script setup>
import { ref, toRefs } from 'vue'
const props = defineProps(['todo'])
const { todo } = toRefs(props)
const emit = defineEmits(['onToggleCompleted', 'onStartEdit', 'onEndEdit', 'onRemoveTodo'])
let isEditing = ref(false)

function onToggleCompleted() {
  emit('onToggleCompleted', todo.value)
}

function startEditing() {
  isEditing.value = true
  emit('onStartEdit', todo.value)
}

function onKeyDown(e) {
  if (e.keyCode === 13) {
    e.target.blur()
  } else if (e.keyCode === 27) {
    isEditing.value = false
  }
}

function doneEditing(e) {
  if (!isEditing.value) {
    return
  }
  const title = e.target.value
  if (!title) {
    emit('onRemoveTodo', todo.value)
  } else {
    isEditing.value = false
    emit('onEndEdit', { todo: todo.value, title: title.trim() })
  }
}

function onRemoveTodo(todo) {
  emit('onRemoveTodo', todo)
}
</script>

<template>
  <li :class="[{ completed: todo.completed }, { editing: isEditing }]" data-testid="todo-item">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        v-on:change="onToggleCompleted(todo)"
      />
      <label v-on:dblclick="startEditing" data-testid="todo-item-title">
        {{ todo.title }}
      </label>
      <button class="destroy" v-on:click="onRemoveTodo(todo)"></button>
    </div>

    <input class="edit" :value="todo.title" v-on:blur="doneEditing" v-on:keydown="onKeyDown" />
  </li>
</template>
