<template>
  <div class="ticket">
    <el-table
      :data="ticket"
      header-align="center"
      style="width: 100%;"
      :span-method="arraySpanMethod"
    >
      <el-table-column prop="airline_name" label="航空信息" width="180">
        <template slot-scope="scope">{{scope.row.airline_name}} &nbsp; {{scope.row.flight_no}}</template>
      </el-table-column>
      <el-table-column prop="name" label="起飞时间" width="180">
        <template slot-scope="scope">
          <div class="startTime">
            <p>{{scope.row.dep_time}}</p>
            <span>{{scope.row.org_airport_name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="起飞时间" width="180">
        <template slot-scope="scope">
          <div class="arriveTime">
            <p>{{scope.row.arr_time}}</p>
            <span>{{scope.row.dst_airport_name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="价格" width="180">
        <template slot-scope="scope">
          <div class="price">
            &yen;
            <span>{{scope.row.base_price}}</span>起
          </div>
        </template>
      </el-table-column>
    </el-table>
    <button @click="btn">123</button>
  </div>
</template>

<script>
export default {
  props: ["resdata"],
  data() {
    return {
      ticket: []
    };
  },
  mounted() {
    this.ticket = this.resdata;
    console.log(this.ticket);
  },
  methods: {
    btn() {
      console.log(123, this.resdata);
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      
        if (columnIndex === 1) {
          return [1, 2];
        } else if (columnIndex === 2) {
          return [0, 0];
        }
      }
    
  }
};
</script>

<style lang="less" scoped>
.ticket {
  .startTime,
  .arriveTime {
    text-align: center;
    p {
      font-size: 24px;
      color: #333;
    }
    span {
      font-size: 12px;
      color: #999;
    }
  }
  .price {
    span {
      font-size: 24px;
      color: orange;
    }
  }
}
</style>