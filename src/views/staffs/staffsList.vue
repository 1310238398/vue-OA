<template>
  <div class="main">
    <div class="top">
      <van-nav-bar
        title="职工管理"
        left-text="返回"
        left-arrow
        @click-left="handleBack"
        @click-right="handleAdd"
      >
        <van-icon name="plus" slot="right" />
      </van-nav-bar>
      <van-search
        class="search-bar"
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="handleSearch"
        @clear="handleSearchClear"
      >
        <div slot="action" @click="handleSearch">搜索</div>
      </van-search>
    </div>
    <div class="content">
      <van-list
        class="list"
        :loading="loading"
        :finished="finished"
        :immediate-check="false"
        @load="handleListLoad"
        finished-text="我是有底线的"
      >
        <div v-for="item in data" :key="item.record_id" class="item">
          <div class="item-name">
            <span class="item-title">{{ item.name }}</span>
            <span class="item-title"
              ><span class="lable-name">所属组织；</span>{{ item.org_name }}</span
            >
            <!-- <span class="arrow"><van-icon name="arrow"/></span> -->
            <div class="item-oper">
              <van-icon
                name="edit"
                class="item-icon"
                color="blue"
                @click.stop="handleItemEdit(item)"
              />
              <van-icon name="delete" color="red" @click.stop="handleItemDel(item)" />
            </div>
          </div>
          <span class="arrow"><van-icon name="arrow"/></span>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex';

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('staffs');
export default {
  name: 'staff',
  mounted() {
    this.fetch({});
  },
  data() {
    return {
      searchValue: '',
      isSearch: false
    };
  },
  computed: {
    ...mapState(['loading', 'finished', 'data'])
  },
  methods: {
    ...mapActions(['fetch', 'del']),
    ...mapMutations(['saveData']),
    handleBack() {
      this.$router.back();
    },
    handleAdd() {
      this.$router.push('/staff/add');
    },
    handleListLoad() {
      let search;
      if (this.searchValue && this.isSearch) {
        search = { name: this.searchValue };
      }
      this.fetch({ load: true, search });
    },
    handleSearch() {
      if (!this.searchValue) {
        return;
      }
      this.isSearch = true;
      this.fetch({ search: { name: this.searchValue } });
    },
    handleSearchClear() {
      if (this.isSearch) {
        this.isSearch = false;
        this.fetch({});
      }
    },
    handleItemDel(item) {
      this.$dialog
        .confirm({
          title: '删除职工数据',
          message: `确认删除【${item.name}】?`,
          confirmButtonColor: '#ee0a24'
        })
        .then(() => {
          this.del({ record_id: item.record_id });
        });
    },
    handleItemEdit(item) {
      this.$router.push(`/staff/edit/${item.record_id}`);
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  height: 100vh;
  background: #f0f3f6;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow-y: auto;
  padding-top: 10px;
  bottom: 10px;
}
.list {
  margin: 0 15px 20px 15px;
}
.item {
  background-color: #fff;
  height: 100px;
  line-height: 100px;
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  border-radius: 4px;
  justify-content: space-between;
}
.item-oper {
  margin-left: 20px;
  margin-right: 20px;
  // margin-top: 25px;
  display: flex;
  justify-content: flex-start;
}
.item-icon {
  margin-right: 10px;
}
.item-name {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 10px;
}
.arrow {
  color: rgb(25, 137, 250);
  margin-right: 10px;
  height: 100px;
  line-height: 100px;
}
.item-title {
  height: 25px;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
  line-height: 25px;
}
.lable-name {
  color: rgba(69, 90, 100, 0.6);
}
</style>
