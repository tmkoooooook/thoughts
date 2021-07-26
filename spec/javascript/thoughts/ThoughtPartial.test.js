import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import ThoughtsPartial from 'thoughts/thoughts_partial'
import MyThought from "thoughts/my_thought"
import 'thoughts_logo_005163.png'
import { beforeEach, describe, expect, it } from '@jest/globals'

describe('ThoughtsPartial', () => {
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
    wrapper = shallowMount(ThoughtsPartial, {
      stubs: ['router-link', 'router-view'],
      mocks: { $router: { push: jest.fn() } },
      propsData: { thoughts: thoughts },
      attrs: { thoughtId: 1, userId: 'testUserId1' }
    })
  })

  it('display thought partial', () => {
    expect(wrapper.find('div.thoughts-partial').exists()).toBe(true)
  })

  it('display thought partials', () => {
    expect(wrapper.findAll('div.thought-info')).toHaveLength(2)
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

  it('display MyThought component', () => {
    expect(wrapper.findComponent(MyThought).exists()).toBe(true)
  })

  describe('activateMyThought', () => {
    it('reverse myThoughtActive', async () => {
      await wrapper.setData({
        myThoughtActive: true,
        thoughtAllActive: false
      })
      wrapper.findComponent(MyThought).vm.$emit('activateMyThought')
      expect(wrapper.vm.myThoughtActive).toBe(false)
    })

    it('returns ThoughtAllActive false when myThoughtActive is false', async () => {
      wrapper.setData({
        myThoughtActive: false,
        thoughtAllActive: true
      })
      expect(wrapper.vm.thoughtAllActive).toBe(true)
      wrapper.findComponent(MyThought).vm.$emit('activateMyThought')
      expect(wrapper.vm.thoughtAllActive).toBe(false)
    })
  })

  describe('activateThoughtAll', () => {
    it('call router.push when route path equals thought partial', () => {
      const content = wrapper.findAll('div.thought-content')
      content.at(1).trigger('click')
      expect(wrapper.vm.$router.push).toHaveBeenCalled()
    })

    it('does not call router.push when route path different thought partial', () => {
      const content = wrapper.findAll('div.thought-content')
      content.at(0).trigger('click')
      expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
    })
  })

})
