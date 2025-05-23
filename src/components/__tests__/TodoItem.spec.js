import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoItem from '../TodoItem.vue';

describe('TodoItem', () => {
  it('renders properly', () => {
    const todo = { id: 1, title: 'test', completed: false };
    const wrapper = mount(TodoItem, { props: { todo } });
    expect(wrapper.find('[data-testid=todo-item]').classes()).toEqual([]);
    expect(wrapper.find('[data-testid=todo-item-title]').text()).toEqual('test');
  });

  it('renders when complete', () => {
    const todo = { id: 0, title: 'test', completed: true };
    const wrapper = mount(TodoItem, { props: { todo } });
    expect(wrapper.find('[data-testid=todo-item]').classes()).toEqual(['completed']);
  });
});
