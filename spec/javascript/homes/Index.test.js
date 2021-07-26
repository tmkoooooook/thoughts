import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import Index from 'homes/index'
import { beforeEach, describe, expect, it } from '@jest/globals'


describe('Index', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(Index, { stubs: ['router-view'] })
  })

  it('exists router-views', () => {
    const routerViews = wrapper.findAll('router-view-stub')
    expect(routerViews.at(0).attributes('name')).toBe('home')
    expect(routerViews.at(1).attributes('name')).toBe('sign_up')
    expect(routerViews.at(2).attributes('name')).toBe('sign_in')
    expect(routerViews.at(3).attributes('name')).toBe('user_home')
  })
})
