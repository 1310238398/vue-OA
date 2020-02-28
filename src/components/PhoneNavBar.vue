<template>
  <div>
    <van-nav-bar
      title="组织管理"
      left-text="返回"
      left-arrow
      @click-left="handleBack"
      @click-right="handleAdd"
    >
      <van-icon name="plus" slot="right" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'PhoneNavBar',
  props: {
    title: String
  }
};
</script>

<style lang="less" scoped></style>
