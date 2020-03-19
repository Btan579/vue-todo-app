import { shallowMount } from '@vue/test-utils';
import TodoClearCompleted from '@/components/TodoClearCompleted.vue';

describe('TodoClearCompleted.vue', () => {
    it('Renders properly  with mocked computed button shown', () => {
        const wrapper = shallowMount(TodoClearCompleted, {
            computed: {
                showClearCompletedButton() {
                    return 'true';
                }
            }
        });
        expect(wrapper.find("div").isVisible()).toBe(true);
    });
});

