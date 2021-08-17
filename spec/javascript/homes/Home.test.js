import 'jsdom-global/register'
import '../__mocks__/sessionStorage_mock'
import {RouterLinkStub, createLocalVue, shallowMount } from '@vue/test-utils'
import Home from 'homes/home'
import { beforeEach, describe, expect, it } from '@jest/globals'
import VueMoment from 'vue-moment'
import Vuex from 'vuex'
import axios from 'axios'


const localVue = createLocalVue()
localVue.use(VueMoment)
localVue.use(Vuex)

describe('Home', () => {
  let wrapper
  let store
  let mutations
  let links
  beforeEach(() => {
    mutations = {
      setUserSessionTokens: jest.fn(),
      setErrors: jest.fn()
    }
    store = new Vuex.Store({
      state: {},
      mutations
    })
    wrapper = shallowMount(Home, {
      localVue,
      store,
      stubs: { RouterLink: RouterLinkStub }
    })
    links = wrapper.findAllComponents(RouterLinkStub)
  })

  it('Log in link has name: signIn', () => {
    expect(links.at(0).props().to).toEqual({ name: 'signIn' })
  })

  it('Sign up link has name: signUp', () => {
    expect(links.at(1).props().to).toEqual({ name: 'signUp' })
  })

  it('footer logo link has name: home', () => {
    expect(links.at(2).props().to).toEqual({ name: 'home' })
  })

  it('calls signInUser when click Guest Log In ', async () => {
    wrapper.find('button').trigger('click')
    await wrapper.vm.$nextTick()
    expect(axios.post).toHaveBeenCalled()
  })
})
