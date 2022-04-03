<template>
  <li class="menu-item" :key='id' :class="className" @click="onClickMenuItem">
    <a>{{name}}</a>
    <div class="menu-item-additional">
      <slot></slot>
      <button v-if="deleteButton" @click.stop='deleteMenuItem' class="menu-item-button"></button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: String,
    name: String,
    onMenuItemDelete: Function,
    onMenuItemClick: Function,
    deleteButton: Boolean,
    className: String,
  },

  methods: {
    deleteMenuItem() {
      if (this.onMenuItemDelete)
        this.onMenuItemDelete(this.id);
    },
    onClickMenuItem() {
      if (this.onMenuItemClick)
        this.onMenuItemClick(this.id);
    }
  }
}
</script>

<style>

.menu-item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #ececec;
  transition: 0.25s background-color ease-in-out;
}
.menu-item-button {
  background-image: url("../content/images/close.svg");
  background-size: cover;
  background-position: center;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}

.menu-item-additional {
  display: flex;
  justify-content: space-between;
}

.active {
  background-color: #d0d0d0;
}
.active:hover {
  background-color: #bbbbbb;
}
</style>
