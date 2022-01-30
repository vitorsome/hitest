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
      this.setStyleCheckedCheckboxes();
    },
    setStyleCheckedCheckboxes() {
      document.querySelectorAll('.selected').forEach(selected => selected.classList.remove('selected'));
      let checkboxes = document.querySelectorAll('input:checked, input:indeterminate');
      checkboxes.forEach((chkbox) => {
        chkbox.parentNode.classList.add('selected');
      });
    }
  },
  mounted() {
    this.setStorageCheckboxes();
    document.querySelector('.option-tree').style.display = 'none';
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
