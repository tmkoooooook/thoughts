import 'jsdom-global/register'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'
import ThoughtPartial from 'thoughts/thoughts_partial'
import 'thoughts_logo_005163.png'
import { beforeEach, describe, expect, it } from '@jest/globals'

describe('ThoughtPartial', () => {
  let wrapper
  const thoughts = [
    { id: 1, title: 'title1', shorted_text: 'text1', user_id: 1,
      user: { name: 'testUser1', user_id: 'testUserId1' }
    },
    { id: 2, title: 'title2', shorted_text: 'text2', user_id: 2,
      user: { name: 'testUser2', user_id: 'testUserId2' }
    }
  ]
  beforeEach(() => {
    wrapper = shallowMount(ThoughtPartial, {
      stubs: { RouterLink: RouterLinkStub },
      propsData: { thoughts: thoughts }
    })
  })

  it('display thought partial', () => {
    expect(wrapper.find('div.thoughts-partial').exists()).toBe(true)
  })

  it('display thought button', () => {
    expect(wrapper.find('.new-thought').exists()).toBe(true)
  })

  it('display thought partials', () => {
    expect(wrapper.findAll('div.thought-info')).toHaveLength(2)
  })

  it('display thought user name', () => {
    const usernames = wrapper.findAll('div.user-info a')
    expect(usernames.at(0).text()).toBe('testUser1')
  })

  it('display thought user user_id', () => {
    const userId = wrapper.findAll('div.user-info span')
    expect(userId.at(0).text()).toBe('testUserId1')
  })

  it('display thought title', () => {
    const title = wrapper.findAll('div.thought-content h3')
    expect(title.at(0).text()).toBe('title1')
  })

  it('display thought shorted text', () => {
    const text = wrapper.findAll('div.thought-content p')
    expect(text.at(0).text()).toBe('text1')
  })
})
