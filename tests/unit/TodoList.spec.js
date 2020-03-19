import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
describe('TodoList.vue', () => {
    it('Renders properly', () => {
        const wrapper = shallowMount(TodoList, {
            stubs: ['todo-item'],
            computed: {
                anyRemainingTasks() {
                    return false;
                },
                todosArrFiltered() {
                    return 'all';
                }
            }
        });
        expect(wrapper.contains('todo-item-stub')).toBe(true);
        expect(wrapper.contains('transition-group-stub')).toBe(true);
        expect(wrapper.contains('todo-check-all-stub')).toBe(true);
        expect(wrapper.contains('todo-items-remaining-stub')).toBe(true);
        expect(wrapper.contains('todo-filtered-stub')).toBe(true);
        expect(wrapper.contains('todo-clear-completed-stub')).toBe(true);
    });
});

