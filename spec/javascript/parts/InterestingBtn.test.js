import 'jsdom-global/register'
import '../__mocks__/window_confirm_mock'
import { createLocalVue, mount } from '@vue/test-utils'
import InterestingBtn from 'parts/interesting_btn'
import Vuex from 'vuex'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('InterestingBtn', () => {
  let actions
  let getters
  let store
  let wrapper

  beforeEach(() => {
    getters = {
      watchUser: () => { return store.state.user }
    }
    actions = {
      deleteRelationship: jest.fn(),
      createRelationship: jest.fn()
    }
    store = new Vuex.Store({
      state: {
        user: {
          id: 1,
          relationships: []
        }
      },
      getters,
      actions
    })
    wrapper = mount(InterestingBtn, {
      store,
      localVue
    })
  })


  describe('when otherUser', () => {
    beforeEach(() => wrapper.setProps({ userId: 2 }))

    describe('when !relationship', () => {
      it('display interesting', () => {
        expect(wrapper.find('input.interesting-btn').exists()).toBe(true)
      })

      it ('run createRelationship', () => {
        wrapper.find('input.interesting-btn').trigger('submit.prevent')
        expect(actions.createRelationship).toHaveBeenCalled()
      })

      it ('change from interesting to uninteresting', () => {
        expect(wrapper.find('input.interesting-btn').exists()).toBe(true)
        store.state.user.relationships.push({id: 1, interest_id: 2})
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('input.uninteresting-btn').exists()).toBe(true)
        })
      })
    })

    describe('when relationship', () => {
      beforeEach(() => store.state.user.relationships.push({id: 1, interest_id: 2}))

      it('display uninteresting', () => {
        expect(wrapper.find('input.uninteresting-btn').exists()).toBe(true)
      })

      it('run deleteRelationship',() => {
        wrapper.find('input.uninteresting-btn').trigger('submit.prevent')
        expect(actions.deleteRelationship).toHaveBeenCalled()
      })

      it ('change from uninteresting to interesting', () => {
        expect(wrapper.find('input.uninteresting-btn').exists()).toBe(true)
        store.state.user.relationships.pop()
        wrapper.vm.$nextTick(() => {
          expect(wrapper.find('input.interesting-btn').exists()).toBe(true)
        })
      })
    })
  })

  describe('when !otherUser', () => {
    beforeEach(() => wrapper.setProps({ userId: 1 }))

    it('display none', () => {
      expect(wrapper.html()).toBe('')
    })
  })
})
