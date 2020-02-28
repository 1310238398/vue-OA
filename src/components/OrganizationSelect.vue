<template>
  <div>
    <van-field
      readonly
      clickable
      :value="valueText"
      label="所属组织"
      placeholder="请选择"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        value-key="name"
        :columns="data"
        :default-index="valueIndex"
        @cancel="showPicker = false"
        @confirm="handleConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { query } from '@/services/organization';

export default {
  name: 'OrganizationSelect',
  props: {
    value: String
  },
  mounted() {
    query({ pageSize: 20, current: 1 }).then(res => {
      this.data = res.list || [];
    });
  },
  data() {
    return {
      showPicker: false,
      data: []
    };
  },
  computed: {
    valueText() {
      let text = '';
      if (!this.value) {
        return text;
      }

      this.data.forEach(item => {
        if (item.record_id === this.value) {
          text = item.name;
          return true;
        }
      });
      return text;
    },
    valueIndex() {
      let index = -1;
      if (!this.value) {
        return index;
      }

      this.data.forEach((item, idx) => {
        if (item.record_id === this.value) {
          index = idx;
          return true;
        }
      });
      return index;
    }
  },
  methods: {
    handleConfirm(item) {
      this.$emit('input', item.record_id);
      this.showPicker = false;
    }
  }
};
</script>

<style scoped></style>
