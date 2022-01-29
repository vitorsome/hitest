<template>
  <div class="tree" :level="level">
    <div class="option-tree" :style="{'margin-left': margin + 'px' }">
      <input type="checkbox" @change="emitChangeSubtree" :id="id" />{{ item }}</div>
      <TreeNode v-for="child in list" :key="child.id" :list="child.children" :item="child.name" :margin="(child.level * 30)" :id="child.id" :level="child.level"></TreeNode>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expanded:true
    }
  },
  methods: {
    emitChangeSubtree(evt) {
      if (this.getParents(evt.target).filter(parent => parent.checked == true).length == 0 || this.getChildren(evt.target).length > 0) {
        if (evt.target.checked == true) {
          this.getChildren(evt.target).forEach(domElement => domElement.checked = true);
          this.getParents(evt.target).forEach(checkbox => checkbox.indeterminate = true);
        } else {
          this.getChildren(evt.target).forEach(domElement => domElement.checked = false);
          this.getParents(evt.target).every(checkbox => {
            let siblingsChecked = Array.from(this.getChildren(checkbox)).filter(sibCheckbox => sibCheckbox.checked === true);
            if (checkbox.checked == true || siblingsChecked.length > 0) {
              return false;
            } else {
              checkbox.indeterminate = false;
              return true;
            }
          });
        }
      }
    },
    getParents(element) {
      let parents = [];
      for (let i = element.parentNode.parentNode.getAttribute('level') - 1; i >= 0; i--) {
        parents.push(element.closest('.tree[level="'+i+'"]').firstElementChild.querySelector('[type=checkbox]'));
      }
      return parents;
    },
    getChildren(element) {
      return element.parentNode.parentNode.querySelectorAll('[type=checkbox]');
    }
  },
  props:['list', 'item', 'margin', 'level', 'id']
}
</script>

<style scoped>
.tree {
  text-align: left;
}

.option-tree {
  display: flex;
}
</style>