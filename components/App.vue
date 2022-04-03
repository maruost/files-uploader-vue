<template>
  <div class="app" :class="{dark: seen}">
    <Button :on-click="onAddButtonClick">Добавить</Button>
    <Modal v-show = seen :onCloseModal="closeModal">
      <SavedObjects/>
      <ObjectsMenu/>
      <div class="modal-form">
        <p v-if="!objects.length">Добавьте новый объект или выберите существующий, чтобы загрузить файлы</p>
        <template v-for="object in objects">
          <ObjectForm :id="object.name" :key="object.name"/>
        </template>
      </div>
    </Modal>
  </div>
</template>

<script>
import Button from "./Button";
import Modal from "./Modal";
import ObjectsMenu from "./ObjectsMenu";
import SavedObjects from "./SavedObjects";
import ObjectForm from "./ObjectForm";

export default {
  components: {ObjectForm, SavedObjects, ObjectsMenu, Modal, Button},
  data() {
    return {
      seen: false,
    }
  },
  computed: {
    objects() {
      return this.$store.getters["objects/getObjects"];
    }
  },
  methods: {
    onAddButtonClick() {
      this.seen = true;
    },
    closeModal() {
      this.seen = false;
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
body {
  width: 100%;
  height: 100vh;
  margin: 0;
}
.app {
  font-family: "Roboto", "Arial", sans-serif;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dark {
  background-color: #383838;
}

.modal-form {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-form > p {
  color: #555555;
  font-size: 14px;
  text-align: center;
  padding-right: 20px;
  padding-bottom: 20px;
}
</style>
