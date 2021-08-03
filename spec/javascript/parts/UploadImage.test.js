import 'jsdom-global/register'
import { shallowMount } from '@vue/test-utils'
import UploadImage from 'parts/upload_image'
import { beforeEach, describe, expect, it } from '@jest/globals'
import VueCropper from 'vue-cropperjs'

describe('UploadImage', () => {
  let wrapper
  let props

  const factory = (props) => {
    return shallowMount(UploadImage, {
      propsData: props
    })
  }

  describe('when imgSrc is not exists', () => {
    beforeEach(() => {
      props = {
        value: 'cropped_image.png',
        accountImage: { url: 'user_image.png' },
        imageSize: 'icon'
      }
    })

    it('is icon_image size when imageSize is icon', () => {
      wrapper = factory(props)
      expect(wrapper.find('.user-thumbnail-edit').exists()).toBe(true)
    })

    it('is header_image size when imageSize is header', () => {
      props.imageSize = 'header'
      wrapper = factory(props)
      expect(wrapper.find('.header-img-wrapper-edit').exists()).toBe(true)
    })

    it('display user image when value is not exists', () => {
      props.value = null
      wrapper = factory(props)
      expect(wrapper.find('img').attributes().src).toBe('user_image.png')
    })

    it('display cropped image when value is exists', () => {
      wrapper = factory(props)
      expect(wrapper.find('img').attributes().src).toBe('cropped_image.png')
    })
  })

  describe('when imgSrc is exists', () => {
    beforeEach(() => {
      props = {
        value: 'cropped_image.png',
        accountImage: { url: 'user_image.png' },
        imageSize: 'icon'
      }
      wrapper = factory(props)
      wrapper.setData({ imgSrc: 'image' })
    })

    it('display VueCropper', () => {
      expect(wrapper.findComponent(VueCropper).exists()).toBe(true)
    })

    it('display 適用 button', () => {
      expect(wrapper.find('button').exists()).toBe(true)
    })
  })

  describe('checkFile', () => {
    let file
    let event

    beforeEach(() => {
      event = {
        target: {
          files: [
            {
              name: 'image.png',
              size: 50000,
              type: 'image/png',
            },
          ],
        }
      }
      file = event.target.files[0]
      wrapper = factory(props)
    })

    it('returns false when file type is not jpeg or png', () => {
      file.type = 'text/plain'
      expect(wrapper.vm.checkFile(file)).toBe(false)
    })

    it('returns false when file size over 5000000', () => {
      file.size = 5000001
      expect(wrapper.vm.checkFile(file)).toBe(false)
    })

    it('returns true when file type is image/png and size is under 5000000', () => {
      expect(wrapper.vm.checkFile(file)).toBe(true)
    })
  })

  //以下FileReaderのテストの仕方が全くわからないため、お手上げ
  // describe('upload', () => {
    // const VueCropperStub = {
    //   render: () => {},
    //   methods: {
    //     replace: () => {},
    //     getCroppedCanvas: () => 'croppedImage',
    //     toDataURL: jest.fn()
    //   }
    // }

  //   it('emit picture when upload image then click 適用button', async () => {
  //     UploadImage.methods.getBase64 = jest.fn(() => 'data:image/png;base64,imagedata')
  //     wrapper = shallowMount(UploadImage, {
  //       stubs: { VueCropper: VueCropperStub },
  //       propsData: props
  //     })
  //     await wrapper.vm.upload(event)
  //     expect(wrapper.vm.imgSrc).toBe('data:image/png;base64,imagedata')
  //     console.log(wrapper.html())
  //     wrapper.find('button').trigger('click')
  //     expect(wrapper.emitted()).toBe(true)
  //   })
  // })
})
