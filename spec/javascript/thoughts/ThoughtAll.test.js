import 'jsdom-global/register'
import '../__mocks__/window_confirm_mock'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import ThoughtAllText from 'thoughts/thought_all_text'
import { ModalPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import axios from 'axios'

jest.mock('axios')
const response = '200 ok'
axios.delete.mockResolvedValue(response)

const localVue = createLocalVue()

localVue.use(ModalPlugin)
localVue.use(Vuex)

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
  let store

  beforeEach(() => {
    getters = {
      watchUser: () => { return store.state.user }
    }
    store = new Vuex.Store({
      state: {
        user: { id: 1 }
      },
      getters
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

    it('display thought title', () => {
      expect(wrapper.find('p').text()).toBe('text')
    })

    it('run deleteThought at click trash icon', () => {
      const trash = wrapper.find('button.fa-trash')
      trash.trigger('click')
      expect(axios.delete).toHaveBeenCalled()
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

    it('display thought title', () => {
      expect(wrapper.find('p').text()).toBe('text')
    })

    it('run deleteThought at click trash icon', () => {
      const trash = wrapper.find('button.fa-trash')
      trash.trigger('click')
      expect(axios.delete).toHaveBeenCalled()
    })
  })
})
