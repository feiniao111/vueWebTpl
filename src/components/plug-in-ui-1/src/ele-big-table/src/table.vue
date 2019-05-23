<!-- element-table风格的表格，支持超大量数据展示，渲染、拖曳不卡顿 -->
<template>
  <div
    class="ele-big-table el-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition"
    style="height: 400px"
  >
    <div class="el-table__header-wrapper">
      <table
        cellspacing="0"
        cellpadding="0"
        border="0"
        class="el-table__header"
        style="width: 100%;"
      >
        <!-- 构造表头 -->
        <thead>
          <tr>
            <th
              v-for="(title, index) in theaders"
              :key="index"
              colspan="1"
              rowspan="1"
              class="el-table_1_column_1 is-leaf"
            >
              <div class="cell">{{title}}</div>
            </th>
            <!-- 留出空间给滚动条 -->
            <th class="gutter" style="width: 6px;"></th>
          </tr>
        </thead>
      </table>

      <!-- 展示数据 -->
      <RecycleScroller
        :items="items"
        class="el-table2 scroller scrollbar"
        :item-height="40"
        :item-size="40"
        :key-field="keyField"
      >
        <template slot-scope="{ item }">
          <div class="table_row">
            <div v-for="(attr, index) in dataKeys" :key="index" :class="attr">
              <div class="cell">
                <span :title="item.attr">{{item.attr}}</span>
              </div>
            </div>
          </div>
        </template>
      </RecycleScroller>
    </div>
  </div>
</template>

<style lang='scss'>
.ele-big-table {
  .table_row {
    display: flex;
    justify-content: space-around;
    height: 40px;
    align-items: center;

    div.cell {
      white-space: pre;
      text-align: left; 
    }
  }
  .scroller {
    height: calc(100% - 40px);
  }
}
</style>

<script>
import { RecycleScroller } from "vue-virtual-scroller";
Vue.component("RecycleScroller", RecycleScroller);
export default {
  name: "ele-big-table",
  props: {
    theaders: Array, // 表头标题数组
    items: Array, // 数据数组，每个元素是一个对象
    dataKeys: Array, // 数据属性，与数据元素中的字段对应
    keyField: String // 唯一标识数据元素的关键字段，注意每个数据元素的该字段值都是不一样的
  },
  data() {
    return {};
  }
};
</script>