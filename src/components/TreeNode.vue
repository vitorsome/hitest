<template>
  <div class="tree" :level="level" v-if="item != 'null'" v-show="item != ''">
    <div class="option-tree" :style="{'padding-left': margin + 'px' }">
      <input type="checkbox" @change="changeTree" :id="id" />{{ item }}</div>
      <TreeNode v-for="child in list" :key="child.id" :list="child.children" :item="child.name" :margin="(child.level * 30)" :id="child.id" :level="child.level"></TreeNode>
  </div>
</template>
<script>
import Storage from '../storage.js';

export default {
  props:['list', 'item', 'margin', 'level', 'id'],
  data() {
    return {
      expanded:true
    }
  },
  methods: {
    changeTree(evt) {
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
      Storage.setCheckboxesSelected(JSON.stringify({
        checked: Array.from(document.querySelectorAll('input:checked')).map((checkbox) => checkbox.id),
        indeterminate: Array.from(document.querySelectorAll('input:indeterminate')).map((checkbox) => checkbox.id)
      }));
      this.setStyleCheckedCheckboxes();
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
    },
    setStyleCheckedCheckboxes() {
      document.querySelectorAll('.selected').forEach(selected => selected.classList.remove('selected'));
      let checkboxes = document.querySelectorAll('input:checked, input:indeterminate');
      checkboxes.forEach((chkbox) => {
        chkbox.parentNode.classList.add('selected');
      });
    }
  }
}
</script>

<style scoped>
.tree {
  text-align: left;
}

.option-tree {
  display: flex;
}

.selected {
  background-color: aquamarine;
}
</style>