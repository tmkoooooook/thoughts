<template>
  <div>
    <div v-if="!imgSrc" class="upload">
      <label :for="imageSize">
        <div :class="imageSizeClass">
          <div class="fa-camera-edit">
            <i class="fas fa-camera"></i>
          </div>
          <img v-if="value" :src="value" alt="user-thumbnail">
          <UserImage v-else :imageUrl="accountImage.url"/>
        </div>
      </label>
      <input type="file" class="file-input" :id="imageSize" @change="upload">
    </div>
    <VueCropper
      v-else
      ref="cropper"
      :guides="false"
      :view-mode="2"
      drag-mode="crop"
      :auto-crop-area="1"
      :minCropBoxWidth="cropBoxWidth"
      :minCropBoxHeight="cropBoxHeight"
      :rotatable="false"
      :zoomable="false"
      :cropBoxResizable="false"
      :toggleDragModeOnDblclick="false"
      :src="imgSrc"
      :aspect-ratio="horizontal / vertical"
    />
    <div v-if="imgSrc" class="submit apply">
      <button @click="cropImage" class="btn">適用</button>
    </div>
  </div>
</template>

<script>
import UserImage from '../parts/user_image.vue'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'

export default {
  name: 'UploadImage',

  props: {
    value: String,
    accountImage: Object,
    imageSize: {
      type: String,
      default: 'icon'
    }
  },

  components: {
    UserImage,
    VueCropper
  },

  data: function () {
    return {
      imgSrc: null,
      vertical: 1,
      horizontal: 1,
      cropBoxWidth: 400,
      cropBoxHeight: 400,
      imageSizeClass: 'user-thumbnail user-thumbnail-edit'
    }
  },

  created () {
    this.setVueCropperProps()
  },

  methods: {
    async upload (event) {
      const files = event.target.files || event.dataTransfer.files
      const file = files[0]
      if (this.checkFile(file)) {
        this.imgSrc = await this.getBase64(file)
        this.$nextTick(() => {
          this.$refs.cropper.replace(this.imgSrc)
        })
      }
    },

    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
        reader.readAsDataURL(file)
      })
    },

    checkFile(file) {
      const FILE_LIMIT = 5000000
      if (!file) return false
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') return false
      if (file.size > FILE_LIMIT) return false
      return true
    },

    cropImage() {
      const picture = this.$refs.cropper.getCroppedCanvas().toDataURL()
      this.$emit('input', picture)
      this.imgSrc = null
    },

    setVueCropperProps () {
      if (this.imageSize === 'header') {
        this.horizontal = 3
        this.cropBoxWidth = 1500
        this.cropBoxHeight = 500
        this.imageSizeClass = 'header-img-wrapper-edit'
      }
    }
  }
}
</script>
