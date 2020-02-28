<template>
  <div class="demo">
    <van-nav-bar
      title="查询列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <van-list
      :loading="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <van-cell v-for="item in data" :key="item.record_id" :title="item.name" />
    </van-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('demo');

export default {
  mounted() {
    this.saveData([]);
    this.onLoad();
  },
  data() {
    return {
      current: 0,
      pageSize: 3
    };
  },
  computed: {
    ...mapState(['loading', 'finished', 'data'])
  },
  methods: {
    ...mapActions(['fetch']),
    ...mapMutations(['saveData']),
    onLoad() {
      this.current++;

      this.fetch({
        current: this.current,
        pageSize: this.pageSize
      });
    },
    onClickLeft() {
      this.$router.back();
    }
  }
};
</script>
