import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import ThoughtsCollection from 'thoughts/thoughts_collection'
import 'thoughts_logo_005163.png'
import { beforeEach, describe, expect, it } from '@jest/globals'

describe('ThoughtsCollection', () => {
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
    wrapper = shallowMount(ThoughtsCollection, {
      stubs: ['router-link'],
      propsData: { thoughts: thoughts }
    })
  })

  it('display thought partials', () => {
    expect(wrapper.findAll('div.info')).toHaveLength(2)
  })

  it('display thought user name', () => {
    const usernames = wrapper.findAll('div.user-info .user-show-link')
    expect(usernames.at(0).text()).toContain('testUser1')
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

  it(' emit activateThoughtAll at click', () => {
    wrapper.find('.thought-content').trigger('click')
    expect(wrapper.emitted().activateThoughtAll).toBeTruthy
  })

})
