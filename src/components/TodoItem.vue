<script setup>
import { ref, toRefs } from 'vue'
const props = defineProps(['todo', 'onToggleCompleted', 'onRemoveTodo', 'onStartEdit', 'onEndEdit'])
const { todo, onToggleCompleted, onRemoveTodo, onStartEdit, onEndEdit } = toRefs(props)
let isEditing = ref(false)

function startEditing() {
  onStartEdit.value(todo)
  isEditing.value = true
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
    onRemoveTodo.value(todo.value.id)
  } else {
    isEditing.value = false
    onEndEdit.value(todo.value.id, title.trim())
  }
}
</script>

<template>
  <li :class="[{ completed: todo.completed }, { editing: isEditing }]" data-testid="todo-item">
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        v-on:change="onToggleCompleted(todo.id)"
      />
      <label v-on:dblclick="startEditing" data-testid="todo-item-title">
        {{ todo.title }}
      </label>
      <button class="destroy" v-on:click="onRemoveTodo(todo.id)"></button>
    </div>

    <input class="edit" :value="todo.title" v-on:blur="doneEditing" v-on:keydown="onKeyDown" />
  </li>
</template>
