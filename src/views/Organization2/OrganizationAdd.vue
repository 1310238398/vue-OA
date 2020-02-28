<template>
  <div>
    <van-nav-bar
      title="新增组织"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="name"
        required
        clearable
        label="组织名称"
        placeholder="请输入组织名称"
      />

      <van-field
        readonly
        clickable
        v-model="parent_id"
        label="组织上级"
        placeholder="请选择"
        @click="showPicker = true"
      />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
          @change="onChange"
        />
      </van-popup>
      <van-field
        v-model="sequence"
        required
        clearable
        type="number"
        label="排序"
        placeholder="请输入"
      />
    </van-cell-group>
    <div class="btn-submit">
      <van-button type="primary" size="large" class="submitBtn" @click="submitSave"
        >提交</van-button
      >
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('organization');
const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州']
};
export default {
  name: 'organizationadd',
  data() {
    return {
      name: '',
      parent_id: '',
      showPicker: false,
      sequence: 0,
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ]
    };
  },
  methods: {
    ...mapActions(['onAddOrgData']),
    onConfirm(value) {
      this.parent_id = value;
      this.showPicker = false;
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    onClickLeft() {
      this.$router.back();
    },
    // 提交数据
    submitSave() {
      this.onAddOrgData({
        payload: {
          name: this.name,
          parent_id: this.parent_id,
          sequence: parseFloat(this.sequence, 10)
        }
      });
      this.$router.push('/organization');
    }
  }
};
</script>
<style>
.btn-submit {
  margin: 50px 10px 10px 10px;
}
.submitBtn {
  border-radius: 5px;
}
</style>
