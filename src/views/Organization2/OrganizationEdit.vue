<template>
  <div>
    <van-nav-bar
      title="编辑组织"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="formData.Name"
        required
        clearable
        label="组织名称"
        placeholder="请输入组织名称"
      />

      <van-field
        readonly
        clickable
        v-model="formData.parent_id"
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
        v-model="formData.sequence"
        required
        clearable
        type="number"
        label="排序"
        placeholder="请输入"
      />
    </van-cell-group>
    <div class="btn-submit">
      <van-button type="primary" size="large" class="submitBtn" @click="updataSave"
        >提交</van-button
      >
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions } = createNamespacedHelpers('organization');

const citys = {
  浙江: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
  福建: ['福州', '厦门', '莆田', '三明', '泉州']
};
export default {
  name: 'organizationedit',
  created() {
    var param = this.$route.query;
    console.log(param);
  },
  data() {
    return {
      showPicker: false,
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

  computed: {
    ...mapState(['formData'])
  },
  methods: {
    ...mapActions(['onUpdataOrgData']),
    onConfirm(value) {
      this.formData.parent_id = value;
      this.showPicker = false;
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]]);
    },
    onClickLeft() {
      this.$router.back();
    },
    updataSave() {
      this.onUpdataOrgData({
        payload: {
          name: this.formData.name,
          parent_id: this.formData.parent_id,
          sequence: parseFloat(this.formData.sequence, 10)
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
