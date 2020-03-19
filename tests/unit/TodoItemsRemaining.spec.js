import { shallowMount } from '@vue/test-utils';
import TodoItemsRemaining from '@/components/TodoItemsRemaining.vue';

describe('TodoItemsRemaining.vue', () => {
    it('Renders properly  with mocked computed', () => {
        const wrapper = shallowMount(TodoItemsRemaining, {
            computed: {
                remainingTodo() {
                    return 7;
                }
            }
        });
        expect(wrapper.text()).toContain('7 tasks left');
    });

});

