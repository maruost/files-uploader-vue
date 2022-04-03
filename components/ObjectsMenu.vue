<template>
  <div class="objects-menu">
    <Menu title='Объекты'>
      <template v-for="object in objects">
        <MenuItem :id="object.name"
                  :name="object.name"
                  :onMenuItemDelete="deleteObject"
                  :onMenuItemClick="chooseObject"
                  :deleteButton="true"
                  :key="object.name"
                  :class="chosenObject.name === object.name ? 'active' : ''">
          <div v-if="object.files_ids.length" class="objects-menu-item-counter">{{object.files_ids.length}}</div>
        </MenuItem>
      </template>
    </Menu>
    <Button :on-click='addObject' :class-name="'objects-menu-button'">Добавить объект</Button>
  </div>
</template>


<script>
import { v4 as uuidv4 } from 'uuid';
export default {
  computed: {
    objects() {
      return this.$store.getters["objects/getObjects"];
    },
    chosenObject() {
      return this.$store.getters["objects/getChosenObject"];
    }
  },
  mounted() {
    this.addObject();
  },
  methods: {
    addObject() {
      const id = uuidv4();
      this.$store.commit("objects/addObject", {name: id, files_ids:[]});
      this.chooseObject(id);
    },
    deleteObject(id) {
      this.$store.commit("objects/deleteObject", id);
      if (this.chosenObject.name === id) {
        if (this.objects.length)
          this.chooseObject(this.objects[0].name);
        else
          this.chooseObject('')
      }
    },
    chooseObject(id) {
      this.$store.commit("objects/setChosenObject", id);
    },
  }
}
</script>

<style>
.objects-menu {
  width: 350px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
  position: relative;
}
.objects-menu-button {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.objects-menu-item-counter {
  background-color: #182d2d;
  color: white;
  width: 1em;
  height: 1em;
  text-align: center;
  padding: 5px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: bold;
}

</style>
