import 'jsdom-global/register'
import {RouterLinkStub,createLocalVue, shallowMount } from '@vue/test-utils'
import Home from 'homes/home'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import VueMoment from 'vue-moment'

const localVue = createLocalVue()
localVue.use(VueMoment)

describe('Home', () => {
  let wrapper
  let links
  beforeEach(() => {
    wrapper = shallowMount(Home, {
      localVue,
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
})
