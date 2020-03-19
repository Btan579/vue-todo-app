import { mount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';
describe('TodoItem.vue', () => {

    it('Renders properly', () => {
        const wrapper = mount(TodoItem, {
            propsData: {
                todo: {
                    id: 1,
                    title: "Clean the bathroom",
                    completed: false,
                    editing: false
                },
                checkAll: false
            }
        });
        expect(wrapper.contains('.remove-item')).toBe(true);
        expect(wrapper.find('.todo-item-edit').exists()).toBe(false)
        expect(wrapper.find('.todo-item-label completed').exists()).toBe(false);
        expect(wrapper.text()).toContain('Clean the bathroom');
    });

    it('Renders edit input', () => {
        const wrapper = mount(TodoItem, {
            propsData: {
                todo: {
                    id: 1,
                    title: "Clean the bathroom",
                    completed: false,
                    editing: true
                },
                checkAll: false
            }
        });
        expect(wrapper.find('.todo-item-edit').exists()).toBe(true);
    });

    it('Renders style change when item is completed', () => {
        const wrapper = mount(TodoItem, {
            propsData: {
                todo: {
                    id: 1,
                    title: "Clean the bathroom",
                    completed: true,
                    editing: false
                },
                checkAll: false
            }
        });
        expect(wrapper.html()).toContain('<div class="todo-item-label completed">');
    });
});

