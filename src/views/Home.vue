<template>
  <div>
    <van-nav-bar title="企业办公"></van-nav-bar>
    <div class="nav">
      <van-grid :gutter="10" :column-num="3">
        <van-grid-item
          v-for="value in funcList"
          :key="value.id"
          :icon="value.icon"
          :text="value.text"
          :to="value.to"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState } = createNamespacedHelpers('home');

export default {
  name: 'home',
  computed: {
    ...mapState(['funcList'])
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false;
    next();
  }
};
</script>
