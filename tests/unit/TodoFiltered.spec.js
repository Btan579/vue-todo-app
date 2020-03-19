import { shallowMount } from '@vue/test-utils';
import TodoFiltered from '@/components/TodoFiltered.vue';

describe('TodoFiltered.vue', () => {
    it('Renders properly  with mocked computed filter', () => {
        const wrapper = shallowMount(TodoFiltered, {
            computed: {
                filter() {
                    return 'all';
                }
            }
        });
        expect(wrapper.find("div:first-child > button").classes()).toStrictEqual(['active']);
    });

});

