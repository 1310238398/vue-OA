<template>
  <div class="main">
    <van-nav-bar :title="formTitle" left-text="返回" left-arrow @click-left="handleBack">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="formData.account"
        required
        clearable
        label="账号"
        placeholder="请输入账号"
      />
      <van-field
        v-model="formData.name"
        required
        clearable
        label="真实姓名"
        placeholder="请输入真实姓名"
      />
      <van-field
        type="password"
        v-model="formData.pwd"
        required
        clearable
        label="密码"
        placeholder="请输入密码"
      />
      <div class="test-radio">
        <label class="state_name">状态</label>
        <van-radio name="0" v-model="formData.pwd" class="radio-name">正常</van-radio>
        <van-radio name="1" v-model="formData.pwd">禁用</van-radio>
      </div>
      <div class="test-radio">
        <label class="state_name" is-link @click="showPopup">所属组织部门</label>
        <van-popup v-model="showOrg" closeable :style="{ height: '30%' }">
          <organization-select v-model="formData.org_id"></organization-select>
          <organization-select v-model="formData.org_id"></organization-select>
        </van-popup>
        <span>汉峪金谷-设计部</span>
      </div>
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

const { mapState, mapActions } = createNamespacedHelpers('staffs');

export default {
  name: 'StaffsForm',
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
      showOrg: false,
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
        this.$toast.fail('名称不能为空');
        return;
      }
      this.submit(formData);
    },
    // 新增组织-部门弹窗
    handleAddOrg() {},
    showPopup() {
      this.showOrg = true;
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
.test-radio {
  display: flex;
  flex-direction: row;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  background-color: #fff;
}
.state_name {
  width: 90px;
}
.radio-name {
  margin-right: 10px;
}
</style>
