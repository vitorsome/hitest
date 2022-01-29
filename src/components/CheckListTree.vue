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

export default {
  props: [],
  data() {
    return {
      list: json
    }
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
