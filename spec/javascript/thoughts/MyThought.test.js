import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import MyThought from 'thoughts/my_thought.vue'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { ModalPlugin } from 'bootstrap-vue'
import axios from 'axios'

jest.mock('axios')
const thought = { title: 'title', text: 'text' }
const response = { data: thought }
axios.post.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)

describe('MyThought', () => {
  let wrapper
  const routerPushMock = jest.fn()
  const factory = (mq) => {
    const $mq = mq

    return shallowMount(MyThought, {
      localVue,
      mocks: {
        $mq,
        $router: { push: routerPushMock }
      }
    })
  }

  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
      wrapper.setData({ thought: { title: '', text: '' } })
    })

    it('display thought form', () => {
      expect(wrapper.find('div#my_thought').exists()).toBe(true)
    })

    describe('input form', () => {
      it('gets thought.title', () => {
        const title = wrapper.find('input[name="title"]')
        title.setValue('input title')
        expect(wrapper.vm.thought.title).toBe('input title')
      })

      it('gets thought.text', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.setValue('input text')
        expect(wrapper.vm.thought.text).toBe('input text')
      })

      it('gets thought.text', () => {
        const submit = wrapper.find('input[type="submit"]')
        submit.trigger('submit.prevent')
        expect(axios.post).toHaveBeenCalled()
      })

      it('resize textarea height at keydown', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.trigger('keydown.enter')
        expect(text.element.style.height).toBe('200px')
      })
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
      wrapper.setData({ thought: { title: '', text: '' } })
    })

    it('open myThoughtModal', () => {
    expect(wrapper.find('#my_thought_modal').exists()).toBe(true)
    })

    describe('input form', () => {
      it('gets thought.title', () => {
        const title = wrapper.find('input[name="title"]')
        title.setValue('input title')
        expect(wrapper.vm.thought.title).toBe('input title')
      })

      it('gets thought.text', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.setValue('input text')
        expect(wrapper.vm.thought.text).toBe('input text')
      })

      it('gets thought.text', () => {
        const submit = wrapper.find('input[type="submit"]')
        submit.trigger('submit.prevent')
        expect(axios.post).toHaveBeenCalled()
      })

      it('resize textarea height at keydown', () => {
        const text = wrapper.find('textarea[name="text"]')
        text.trigger('keydown.enter')
        expect(text.element.style.height).toBe('200px')
      })
    })
  })
})
