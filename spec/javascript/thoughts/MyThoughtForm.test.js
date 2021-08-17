import 'jsdom-global/register'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import MyThoughtForm from 'thoughts/my_thought_form.vue'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.mock('axios')
const thought = { title: 'title', text: 'text' }
const response = { data: thought }
axios.post.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.mixin(handler)

describe('MyThoughtForm', () => {
  let wrapper
  let route
  let actions
  let mutations
  let store
  const factory = (route) => {
    const $route = route
    return shallowMount(MyThoughtForm, {
      localVue,
      store,
      mocks: { $route }
    })
  }
  beforeEach(() => {
    handler.methods.handle = jest.fn(response => ([response, undefined]))
    actions = { fetchThoughts: jest.fn() }
    mutations = { setErrors: jest.fn() }
    store = new Vuex.Store({
      state: {},
      actions,
      mutations
    })
    route = { params: { userId: 'testUser' } }
    wrapper = factory(route)
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

    it('calls axios.post', () => {
      const submit = wrapper.find('input[type="submit"]')
      submit.trigger('submit.prevent')
      expect(axios.post).toHaveBeenCalled()
    })

    it('calls setErrors when axios response receive errors', async () => {
      const errors = { message: 'error' }
      handler.methods.handle = jest.fn(() => ([undefined, errors]))
      wrapper = factory('pc', route)
      wrapper.setData({ thought: { title: '', text: '' } })
      wrapper.setProps({ myThoughtActive: true })
      await wrapper.vm.$nextTick()
      wrapper.find('input[type="submit"]').trigger('submit.prevent')
      await wrapper.vm.$nextTick()
      expect(mutations.setErrors).toHaveBeenCalled()
    })

    it('resize textarea height at keydown', async () => {
      const text = wrapper.find('textarea[name="text"]')
      text.trigger('keydown.enter')
      await wrapper.vm.$nextTick()
      expect(text.element.style.height).toBe('0px')
    })
  })
})
