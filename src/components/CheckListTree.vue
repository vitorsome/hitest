<template>
  <div class="checkboxes">
    <div>
      <TreeNode :list="list"></TreeNode>
    </div>
  </div>
</template>

<script>
import json from '../assets/data.json';
import TreeNode from './TreeNode.vue';
import Storage from '../storage.js';

export default {
  props: [],
  data() {
    return {
      list: json,
      storage: new Storage()
    }
  },
  methods: {
    setStorageCheckboxes() {
      try {
        let checkboxes = JSON.parse(Storage.getCheckboxesChecked());
        checkboxes.checked.forEach((id) => {
          document.getElementById(id).checked = true;
        });
        checkboxes.indeterminate.forEach((id) => {
          document.getElementById(id).indeterminate = true;
        });
      } catch (e) {
        Storage.setCheckboxesSelected([]);
      }
      
    }
  },
  mounted() {
    this.setStorageCheckboxes();
  },
  components: {
    TreeNode
  }
}
</script>

<style scoped>

.checkboxes {
  display: flex;
  justify-content: center;
}

</style>
