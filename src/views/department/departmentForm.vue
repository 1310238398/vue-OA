<template>
  <div class="main">
    <van-nav-bar :title="formTitle" left-text="返回" left-arrow @click-left="handleBack">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="formData.name"
        required
        clearable
        label="部门名称"
        placeholder="请输入部门名称"
      />
      <organization-select v-model="formData.org_id"></organization-select>
      <van-field
        type="number"
        v-model.number="formData.sequence"
        clearable
        label="排序值"
        placeholder="请输入排序值"
      />
    </van-cell-group>
    <div class="btn-container">
      <van-button
        :loading="submitting"
        loading-text="提交中..."
        type="primary"
        size="large"
        class="btn-submit"
        @click="handleSubmit"
        >保存</van-button
      >
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import OrganizationSelect from '@/components/OrganizationSelect';

const { mapState, mapActions } = createNamespacedHelpers('department');

export default {
  name: 'DepartmentForm',
  props: {
    action: String
  },
  components: {
    OrganizationSelect
  },
  mounted() {
    this.loadForm({
      formAction: this.action,
      routeParams: this.$route.params
    });
    this.fetchOrg({ current: 1, pageSize: 10, name: '', parentID: '' });
  },
  data() {
    return {
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
    };
  },
  computed: {
    ...mapState(['formData', 'formTitle', 'submitting', 'dataOrg'])
  },
  methods: {
    ...mapActions(['loadForm', 'submit', 'fetchOrg']),
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      const formData = this.formData;
      if (!formData.name) {
        this.$toast.fail('部门名称不能为空');
        return;
      }
      this.submit(formData);
    }
  }
};
</script>

<style lang="less" scoped>
.btn-container {
  margin: 15px 20px;
}

.btn-submit {
  border-radius: 5px;
}
</style>
