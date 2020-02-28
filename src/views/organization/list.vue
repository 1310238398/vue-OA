<template>
  <div class="main">
    <div class="top">
      <van-nav-bar
        title="组织管理"
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
      >
        <div
          v-for="item in data"
          :key="item.record_id"
          class="item"
          @click="handleItemEdit(item)"
        >
          <div class="item-name">
            <span class="item-title">{{ item.name }}</span>
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

const { mapState, mapActions, mapMutations } = createNamespacedHelpers('organization');

export default {
  name: 'OrganizationList',
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
      this.$router.push('/organization/add');
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
          title: '删除组织机构',
          message: `确认删除【${item.name}】?`,
          confirmButtonColor: '#ee0a24'
        })
        .then(() => {
          this.del({ record_id: item.record_id });
        });
    },
    handleItemEdit(item) {
      this.$router.push(`/organization/edit/${item.record_id}`);
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
  height: 80px;
  line-height: 50px;
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
  margin-top: 25px;
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
}
.arrow {
  color: rgb(25, 137, 250);
  margin-right: 10px;
  height: 80px;
  line-height: 80px;
}
.item-title {
  height: 20px;
  display: flex;
  justify-content: flex-start;
  margin-left: 20px;
}
</style>
