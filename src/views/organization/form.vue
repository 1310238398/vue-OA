<template>
  <div class="main">
    <van-nav-bar :title="formTitle" left-text="返回" left-arrow @click-left="handleBack">
    </van-nav-bar>
    <van-cell-group>
      <van-field
        v-model="formData.name"
        required
        clearable
        label="机构名称"
        placeholder="请输入机构名称"
      />
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

const { mapState, mapActions } = createNamespacedHelpers('organization');

export default {
  name: 'OrganizationForm',
  props: {
    action: String
  },
  mounted() {
    this.loadForm({
      formAction: this.action,
      routeParams: this.$route.params
    });
  },
  computed: {
    ...mapState(['formData', 'formTitle', 'submitting'])
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = true;
    next();
  },
  methods: {
    ...mapActions(['loadForm', 'submit']),
    handleBack() {
      this.$router.back();
    },
    handleSubmit() {
      const formData = this.formData;
      if (!formData.name) {
        this.$toast.fail('机构名称不能为空');
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
