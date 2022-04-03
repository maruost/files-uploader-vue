<template>
  <div class="dropzone-component">
  <div class="dropzone" :class='className' id="dropzone" ref={dropzone}
       @dragover.prevent.stop="() => changeClass('dropzone-dragging')"
       @dragleave.prevent.stop="() => changeClass('')"
       @drag.prevent.stop
       @dragend.prevent.stop
       @dragenter.prevent.stop
       @dragstart.prevent.stop
       @drop.prevent.stop="(e) => onDrop(e)"
       @click="() => this.$refs.dropzoneInput.click()"
  >
    <input ref="dropzoneInput"
           type="file"
           name="files"
           class="dropzone-input"
           :multiple='multiple'
           @change="handleInputChange"/>
      <div class="dropzone-icon"></div>
      <div v-if="isLoading" class="file-status">Идёт загрузка...</div>
      <div v-else class="file-status">Нажмите или перетащите файлы, чтобы загрузить</div>
  </div>
    <div class="dropzone-files">
      <Menu>
        <template v-for="preview in previews">
          <MenuItem :id="preview.name"
                    :name="preview.name"
                    :on-menu-item-delete="deleteUploadFile"
                    :delete-button="preview.status !== 'loading'">
            <div :id="preview.name" :ref="preview.name" :style="{ backgroundImage: `url(${preview.img})` }" class="file-preview"></div>
            <div v-if="preview.status === 'loading'" class="file-spinner"></div>
          </MenuItem>
        </template>
      </Menu>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import {fakeRequest, generateUUIDs, getRandomNumber} from "./tools";
import MenuItem from "./MenuItem";

export default {
  components: {MenuItem},
  data() {
    return {
      className: "",
      isLoading: false,
      previews: [],
    }
  },
  props: {
    multiple: Boolean,
    onUpload: Function,
    onDeleteFile: Function,
    updateUploadStatus: Function,
  },
  methods: {
    changeClass(className) {
      this.className = className;
    },
    onDrop(event) {
      this.changeClass('');
      const files = this.handleFilesToUpload([...event.dataTransfer.files]);
      this.uploadFiles(files, 2, this.handleUploadFile, this.handleUploadAll);
    },
    handleFilesToUpload(files) {
      const filesToUpload = files.map(file => {
        return {
          name: uuidv4(),
          file: file
        }
      });
      filesToUpload.forEach(file => {
        this.previews.push({name: file.name, status: 'loading' })
        if (file.file.type.startsWith('image/')) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const img = this.$refs[file.name];
                img[0].style.backgroundImage = `url(${e.target.result})`;
                const prev = this.previews.find(prev => prev.name === file.name);
                prev.img = e.target.result;
              }
              reader.readAsDataURL(file.file);
        }
      });
      return filesToUpload;
    },

    handleUploadFile(file, ids) {
      const prev = this.previews.find(prev => prev.name === file.name);
      prev.status = 'ended';
      this.onUpload(ids);
    },

    handleUploadAll() {
      this.isLoading = false;
      this.updateUploadStatus(this.isLoading);
    },

    uploadFiles(files, uploadLimit, uploadFileCb, uploadAllFilesCb) {
      this.isLoading = true;
      this.updateUploadStatus(this.isLoading);
      let i = files.length;
      const filesToUpload = files.splice(0, uploadLimit);
      const queue = [...files];
      function uploadAsync(filesToUpload, queue) {
        filesToUpload.forEach(async (file) => {
          const data = new FormData();
          data.append('file', file);
          const requestBody = {
            name: file.name,
            data: data
          }
          const res = await fakeRequest(requestBody, [file.name, ...generateUUIDs(Math.ceil(getRandomNumber(0, 4)))])
          if (queue.length)
            uploadAsync(queue.splice(0,1), queue);
          uploadFileCb(file, res);
          i--;
          if (!i)
            uploadAllFilesCb();
        });
      }
      uploadAsync(filesToUpload, queue);
    },
    deleteUploadFile(fileId) {
      this.previews = this.previews.filter(file => file.name !== fileId);
      this.onDeleteFile(fileId);
    },
    handleInputChange(e) {
      const files = this.handleFilesToUpload([...e.target.files]);
      this.uploadFiles(files, 2, this.handleUploadFile, this.handleUploadAll);
    }
  }
}
</script>

<style>
.dropzone {
  padding: 2rem;
  border-radius: 0.25rem;
  background-color: #dcdcdc;
  text-align: center;
  transition: 0.25s background-color ease-in-out;
  cursor: pointer;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}

.dropzone-dragging, .dropzone:hover {
  background-color: #d0d0d0;
}

.dropzone-icon {
  background-image: url("../content/images/upload.svg");
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
}

.file-preview {
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
}

.dropzone-input {
  display: none;
}
.dropzone-files {
  height: 50%;
  overflow: auto;
  margin: 20px;
}

.dropzone-component {
  height: 80%;
}

.file-spinner {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 3px solid rgba(165, 165, 165, 0.3);
  border-radius: 50%;
  border-top-color: #4c4c4c;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}

.file-status {
  margin-top: 10px;
}

</style>



