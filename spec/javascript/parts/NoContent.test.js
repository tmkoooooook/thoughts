import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import NoContent from 'parts/no_content'
import { describe, expect, it } from '@jest/globals'


describe('NoContent', () => {
  let wrapper
  let route

  const factory = (route) => {
    const $route = route
    return shallowMount(NoContent, {
      mocks: { $route }
    })
  }

  it('display 興味のある人を探して見ましょう！ when route is userHome', () => {
    route = { name: 'userHome' }
    wrapper =factory(route)
    expect(wrapper.text()).toBe('興味のある人を探して見ましょう！')
  })

  it('display 興味のある人を探して見ましょう！ when route is interests', () => {
    route = { name: 'interests' }
    wrapper =factory(route)
    expect(wrapper.text()).toBe('興味のある人を探して見ましょう！')
  })

  it('display 考えを発信し多くの人に興味を持ってもらいましょう！ when route is userShow', () => {
    route = { name: 'userShow' }
    wrapper =factory(route)
    expect(wrapper.text()).toBe('考えを発信し多くの人に興味を持ってもらいましょう！')
  })

  it('display 考えを発信し多くの人に興味を持ってもらいましょう！ when route is interesters', () => {
    route = { name: 'interesters' }
    wrapper =factory(route)
    expect(wrapper.text()).toBe('考えを発信し多くの人に興味を持ってもらいましょう！')
  })

  it('display no statement', () => {
    route = { name: 'settings' }
    wrapper =factory(route)
    expect(wrapper.text()).toBe('')
  })
})
