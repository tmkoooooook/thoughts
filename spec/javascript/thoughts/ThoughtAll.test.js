import 'jsdom-global/register'
import '../__mocks__/window_confirm_mock'
import '../__mocks__/localStorage_mock'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ThoughtAllText from 'thoughts/thought_all_text'
import { ModalPlugin } from 'bootstrap-vue'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'
import Vuex from 'vuex'
import handler from 'utils/handler'

jest.mock('axios')
const response = '200 ok'
axios.delete.mockResolvedValue(response)

const localVue = createLocalVue()
localVue.use(ModalPlugin)
localVue.use(Vuex)
localVue.mixin(handler)

describe('ThoughtAllText', () => {
  const factory = (mq) => {
    const $mq = mq
    return shallowMount(ThoughtAllText, {
      store,
      localVue,
      mocks: { $mq, $router: { push: routerPushMock } },
      propsData: { thoughts: thought },
      attrs: { thoughtId: 1 }
    })
  }
  const thought = [
    { id: 1, title: 'title', text: 'text', user_id: 1 }
  ]
  const routerPushMock = jest.fn()
  let wrapper
  let getters
  let mutations
  let store

  beforeEach(() => {
    getters = { watchUser: () => { return store.state.user } }
    mutations = { setErrors: jest.fn() }
    store = new Vuex.Store({
      state: { user: { id: 1 } },
      getters,
      mutations
    })
  })

  describe('$mq === pc', () => {
    beforeEach(() => {
      wrapper = factory('pc')
    })

    it('display thought_all', () => {
      expect(wrapper.find('div#thought_all').exists()).toBe(true)
    })

    it('display thought title', () => {
      expect(wrapper.find('h1').text()).toBe('title')
    })

    it('display thought text', () => {
      expect(wrapper.find('p').text()).toBe('text')
    })

    it('run deleteThought at click trash icon', () => {
      wrapper.find('button.fa-trash').trigger('click')
      expect(axios.delete).toHaveBeenCalled()
    })

    it('calls setErrors when axios response receive errors', async () => {
      const errors = { message: 'error' }
      handler.methods.handle = jest.fn(() => ([undefined, errors]))
      wrapper = factory('pc')
      wrapper.find('button.fa-trash').trigger('click')
      await wrapper.vm.$nextTick()
      expect(mutations.setErrors).toHaveBeenCalled()
    })
  })

  describe('$mq === sp', () => {
    beforeEach(() => {
      wrapper = factory('sp')
    })

    it('display thought_all_modal', () => {
      expect(wrapper.find('#thought_all_modal').exists()).toBe(true)
    })

    it('display thought title', () => {
      expect(wrapper.find('h1').text()).toBe('title')
    })

    it('display thought text', () => {
      expect(wrapper.find('p').text()).toBe('text')
    })

    it('run deleteThought at click trash icon', () => {
      const trash = wrapper.find('button.fa-trash')
      trash.trigger('click')
      expect(axios.delete).toHaveBeenCalled()
    })
  })

  describe('closeBtnRoute', () => {
    it('returns name userShow', () => {
      window.localStorage.clear()
      window.localStorage.setItem('isShowUser', 'testUser')
      wrapper = factory('sp')
      expect(wrapper.vm.closeBtnRoute).toEqual({ name: 'userShow', params: { userId: 'testUser' } })
    })

    it('returns name userHome', () => {
    window.localStorage.clear()
    wrapper = factory('sp')
      expect(wrapper.vm.closeBtnRoute).toEqual({ name: 'userHome' })
    })
  })

  describe('beforeRouteEnter', () => {
    it('call next when enter the route', async () => {
      const from = { name: 'userHome', params: { userId: null }}
      const next = jest.fn()
      ThoughtAllText.beforeRouteEnter.call(wrapper.vm, undefined, from, next)
      await wrapper.vm.$nextTick()
      expect(next).toHaveBeenCalled()
    })

    it('call next when enter the route', async () => {
      const from = { name: 'userShow', params: { userId: 'testUser' }}
      const next = jest.fn()
      ThoughtAllText.beforeRouteEnter.call(wrapper.vm, undefined, from, next)
      await wrapper.vm.$nextTick()
      expect(window.localStorage.getItem('isShowUser')).toBe('testUser')
    })
  })

  describe('beforeRouteLeave', () => {
    it('call next when route to userShow', async () => {
      const to = { name: 'userShow' }
      const next = jest.fn()
      ThoughtAllText.beforeRouteLeave.call(wrapper.vm, to, undefined, next)
      await wrapper.vm.$nextTick()
      expect(next).toHaveBeenCalled()
    })

    it('call localStorage.clear when route to else', async () => {
      window.localStorage.setItem('isShowUser', 'testUser')
      expect(window.localStorage.getItem('isShowUser')).toBe('testUser')

      const to = { name: 'userHome' }
      const next = jest.fn()
      ThoughtAllText.beforeRouteLeave.call(wrapper.vm, to, undefined, next)
      await wrapper.vm.$nextTick()
      expect(window.localStorage.getItem('isShowUser')).toBe(undefined)
    })
  })
})
