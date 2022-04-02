<template>
  <button @click = "onClick" class ='button' :class="className" :type='type'>
    <slot></slot>
  </button>
</template>

<style>
.button {
  background-color: darkslategray;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  border: 1px solid #182d2d;
  font-size: 14px;
}

.button:hover {
  background-color: #182d2d;
  transition: 0.25s background-color ease-in-out;
}
</style>

<script>
export default {
  props: {
    onClick: Function,
    className: String,
    type: String,
  },
}
</script>
