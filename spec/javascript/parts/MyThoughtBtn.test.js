import 'jsdom-global/register'
import { mount } from '@vue/test-utils'
import MyThoughtBtn from 'parts/my_thought_btn'
import { beforeEach, describe, expect, it } from '@jest/globals'

describe('MyThoughtBtn', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(MyThoughtBtn)
  })

  it('run showMyThought at click', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().activeMyThought).toBeTruthy
  })
})
