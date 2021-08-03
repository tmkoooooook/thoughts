import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import UserImage from 'parts/user_image'
import {describe, expect, it } from '@jest/globals'

describe('UserImage', () => {
  let wrapper

  it('display default image when imageUrl is null', () => {
    wrapper = shallowMount(UserImage, { propsData: { imageUrl: null } })
    expect(wrapper.find('img').attributes().src).toBe('~thoughts_logo_white.png')
  })

  it('display user image when imageUrl is exist', () => {
    wrapper = shallowMount(UserImage, { propsData: { imageUrl: 'image.png' } })
    expect(wrapper.find('img').attributes().src).toBe('image.png')
  })
})
