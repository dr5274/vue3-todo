import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoList from '../TodoList.vue';

describe('TodoList', () => {
  it('renders properly', () => {
    const todos = [
      { id: 1, title: 'test1', completed: false },
      { id: 2, title: 'test2', completed: false },
      { id: 3, title: 'test3', completed: false },
    ];
    const wrapper = mount(TodoList, { props: { todos } });
    expect(wrapper.findAll('[data-testid=todo-list-item]').length).toEqual(3);
    expect(wrapper.findAll('[data-testid=todo-item]').length).toEqual(3);

    const todoItemTitles = wrapper.findAll('[data-testid=todo-item-title]');
    expect(todoItemTitles[0].text()).toEqual('test1');
    expect(todoItemTitles[1].text()).toEqual('test2');
    expect(todoItemTitles[2].text()).toEqual('test3');
  });
});
