<template>
  <div class="modal">
    <div class="modal-container">
      <div class="modal-close-icon-container">
        <div class="modal-close-icon" @click="onCloseModal">
        </div>
      </div>
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
 props: {
   onCloseModal: Function,
 },
}
</script>

<style>
.modal {
  z-index: 10;
  position: absolute;
}

.modal-container {
  display: flex;
  flex-direction: column;
  justify-content: right;
  height: 500px;
  background-color: #f3f3f3;
}

.modal-content {
  display: flex;
  height: 97%;
}

.modal-close-icon-container {
  display: flex;
  justify-content: flex-end;
  height: 3%;
}

.modal-close-icon {
  background-image: url("../content/images/close.svg");
  width: 20px;
  height: 20px;
  background-position: center;
  background-size: cover;
  margin: 5px;
  cursor: pointer;

}

</style>
