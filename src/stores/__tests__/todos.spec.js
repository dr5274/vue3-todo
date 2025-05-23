import { describe, beforeEach, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTodoStore } from '../todos';

describe('todoStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('initializes the store properly', () => {
    const { todos } = useTodoStore();
    expect(todos.length).toBe(0);
  });
});
