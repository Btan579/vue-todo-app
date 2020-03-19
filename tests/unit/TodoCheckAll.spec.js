import { shallowMount } from '@vue/test-utils';
import TodoCheckAll from '@/components/TodoCheckAll.vue';

describe('TodoCheckAll.vue', () => {
    it('Renders properly  with mocked computed', () => {
        const wrapper = shallowMount(TodoCheckAll, {
            computed: {
                anyRemainingTasks() {
                    return true;
                }
            }
        });
        expect(wrapper.text()).toContain('Check All');
    });
});

