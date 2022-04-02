<template>
  <div class="saved-objects">
    <Menu title="Сохраненные объекты"/>
    <template v-for="savedObject in savedObjects">
      <MenuItem :id="savedObject.name" :delete-button="false" :name="savedObject.name"/>
    </template>
  </div>
</template>


<script>
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import {parseState} from "./tools";
export default {
  components: {MenuItem, Menu},
  computed: {
    savedObjects() {

      return this.$store.getters["objects/getSaveObjects"];
    }
  },
}
</script>

<style>
.saved-objects {
  width: 350px;
}

</style>
