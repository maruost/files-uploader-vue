<template>
  <div :key="currentObject.name" v-show="chosenObject.name === id" class="object-form">
    <h2 class="object-form-title">{{currentObject.name}}</h2>
    <DragDropZone :multiple="true" :onUpload="setUpdatedObject" :onDeleteFile="deleteFileFromObject" :update-upload-status="setButtonView"/>
    <Button v-if='isSaveButtonShown && currentObject.files_ids.length' :on-click="onSubmit" :class-name="'object-form-button'">Сохранить</Button>
  </div>
</template>

<script>
import DragDropZone from "./DragDropZone";
import Button from "./Button";
import {parseState} from "./tools";
export default {
  components: {Button, DragDropZone},
  props: {
    id: String
  },
  data() {
    return {
      isSaveButtonShown: false,
      object: this.upload,
    }
  },
  computed: {
    chosenObject() {
      return this.$store.getters['objects/getChosenObject'];
    },
    currentObject() {
      return this.objects.find(object => object.name === this.id);
    },
    objects() {
      return this.$store.getters["objects/getObjects"]
    },

  },

  methods: {
    setUpdatedObject(updatedObjectIds) {
      const toUpdate = {name: this.chosenObject.name, files_ids: updatedObjectIds};
      this.$store.commit('objects/addObjectFiles',
        toUpdate);
      // if (toUpdate.files_ids.length)
      //   this.isSaveButtonShown = true;
    },
    onSubmit() {
      this.$store.commit('objects/saveObject', this.chosenObject);
      this.$store.commit('objects/deleteObject', this.chosenObject.name);
      if (this.objects.length)
        this.chooseObject(this.objects[0].name);
      else
        this.chooseObject('')
    },
    chooseObject(id) {
      this.$store.commit("objects/setChosenObject", id);
    },
    deleteFileFromObject(fileId) {
      this.$store.commit('objects/deleteObjectFile', {name: this.chosenObject.name, fileId});
    },
    setButtonView(status) {
      this.isSaveButtonShown = !status;
    }
  },
}
</script>

<style>
.object-form {
  position: relative;
  width: 400px;
  height: 100%;

}

.object-form-title {
  text-align: center;
  font-size: 18px;
}

.object-form-button {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
