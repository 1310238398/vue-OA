<template>
  <div class="demo">
    <van-nav-bar
      title="查询组织列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="plus" slot="right" />
    </van-nav-bar>
    <form action="/">
      <van-search
        v-model="searchvalue"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </form>
    <van-list
      :loading="loading"
      :finished="finished"
      :immediate-check="false"
      @load="onLoad"
    >
      <div
        v-for="item in data"
        :key="item.record_id"
        :title="item.name"
        class="title-company"
      >
        <div class="title-name">{{ item.name }}</div>
        <div class="opt-title">
          <van-icon
            name="edit"
            class="text-btn"
            color="blue"
            @click.stop="onEditOrg(item)"
          />
          <van-icon name="delete" color="red" @click.stop="onDeleteOrg(item)" />
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('organization');
import { Dialog } from 'vant';
export default {
  name: 'organization',
  mounted() {
    this.saveData([]);
    this.onLoad();
  },
  data() {
    return {
      current: 0,
      pageSize: 10,
      searchvalue: '',
      newIcon: <van-icon name="add" />
    };
  },
  computed: {
    ...mapState(['loading', 'finished', 'data'])
  },
  methods: {
    ...mapActions(['fetch', 'onDeleteOrgData', 'onGetOneOrgData']),
    ...mapMutations(['saveData']),
    onLoad() {
      this.current++;

      this.fetch({
        name: this.searchvalue,
        current: this.current,
        pageSize: this.pageSize
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      this.$router.push('/organizationadd');
    },
    onSearch() {
      this.fetch({
        name: this.searchvalue,
        current: this.current,
        pageSize: this.pageSize
      });
    },
    // 删除组织
    onDeleteOrg(item) {
      Dialog.confirm({
        message: `确定删除【组织数据：${item.name}】？`
      })
        .then(() => {
          // on confirm
          this.onDeleteOrgData(item);
        })
        .catch(() => {
          // on cancel
        });
    },
    // 编辑组织
    onEditOrg(item) {
      this.onGetOneOrgData({ payload: item });
      this.$router.push({ path: '/organizationedit', query: { id: item.record_id } });
    }
  }
};
</script>

<style lang="less" scoped>
.optBtnCompany {
  float: right;
}
.title-company {
  background-color: #dbdcdb;
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.opt-title {
  margin-left: 20px;
  margin-right: 20px;
}
.text-btn {
  margin-right: 10px;
}
.title-name {
  margin-left: 20px;
}
</style>
