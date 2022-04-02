<template>
  <div class='menu'>
    <h2 class="menu-title">{{title}}</h2>
    <div class='menu-container'>
      <ul>
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
export default {
  components: {MenuItem},

  props: {
    title: String,
  },
}
</script>

<style>
.menu {
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: auto;
}

.menu-title {
  text-align: center;
  font-size: 18px;
}


.menu-container {
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.menu-container ul {
  padding: 0;
  margin: 0;
}

.menu-object {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  width: 100%;
}

.menu-object li {
  list-style-type: none
}
.menu-object:nth-child(even) {
  background-color: #f5f5f5;
}

.menu-object:nth-child(odd) {
  background-color: #e8e8e8;
}

.menu-object button {
  border: none;
  background-color: transparent;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.menu-button {
}
</style>

