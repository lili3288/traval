<template>
  <div class="ticket">
    <el-table
      :data="ticket"
      header-align="center"
      style="width: 100%;"
      :span-method="arraySpanMethod"
    >
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
         12312
          </el-form>
        </template>
      </el-table-column>
      <!-- 展开行 -->
      <el-table-column prop="airline_name" label="航空信息" width="180">
        <template slot-scope="scope">{{scope.row.airline_name}} &nbsp; {{scope.row.flight_no}}</template>
      </el-table-column>
      <el-table-column prop="name" label="起飞时间" width="180">
        <template slot-scope="scope">
          <el-row type="flex">
            <div class="startTime">
              <p>{{scope.row.dep_time}}</p>
              <span>{{scope.row.org_airport_name}}</span>
            </div>
            <div class="middleTime">
              <span>{{scope.row|time}}</span>
            </div>
            <div class="arriveTime">
              <p>{{scope.row.arr_time}}</p>
              <span>{{scope.row.dst_airport_name}}</span>
            </div>
          </el-row>
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
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      } else if (columnIndex === 3) {
        return [0, 0];
      }
    }
  },
  filters: {
    time(data) {
      let time1 = new Date(data.arr_datetime).getTime();
      let time2 = new Date(data.dep_datetime).getTime();
      let time = (time1 - time2) / 1000 / 60;
      let minute = time % 60;
      let hour = Math.floor(time / 60);
      return hour + "时" + minute + "分";
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
  .middleTime {
    margin: 0 35px;
    span {
      border-bottom: 1px solid #999;
    }
  }
}
</style>