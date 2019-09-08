<template>
  <div class="ticket">
    <el-table
      :data="currentList"
      header-align="center"
      style="width: 100%;"
      :span-method="arraySpanMethod"
      :expand-row-keys="expands"
      @row-click="selectExpand"
      row-key="id"
    >
      <!-- 展开行 -->
      <el-table-column type="expand" width="1" style="font-size:0;
        overflow: hidden;">
        <template slot-scope="scope">
          <el-row type="flex" class="sale">
            <el-col :span="6">低价推荐</el-col>
            <el-col :span="18">
              <el-row
                type="flex"
                class="content"
                v-for="(item,index) in scope.row.seat_infos"
                :key="index"
              >
                <div class="plane">
                  <span>{{item.group_name}}</span>
                  |{{item.supplierName}}
                </div>
                <i class="middle">&yen;{{item.par_price}}</i>
                <div class="select">
                  <span @click="comfirmAri(item.ota_id,item.seat_xid)">选定</span>
                  <p>剩余：{{item.discount}}</p>
                </div>
              </el-row>
            </el-col>
          </el-row>
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
            <span>{{scope.row.base_price/2}}{{scope.row.plane_size}}</span>起
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["resdata"],
  data() {
    return {
      // 机票列表
      ticket: [],
      // 当前显示列表
      currentList: [],
      // 展开行
      expands: [],
      pageSize: 5,
      pageNum: 1,
      total: 0
    };
  },
  watch: {
    resdata(newvalue, old) {
      this.ticket = newvalue;
      this.currentList = this.ticket.slice(0, this.pageSize);
    }
  },
  mounted() {
    this.ticket = this.resdata;
    this.total = this.ticket.length;
    this.currentList = this.ticket.slice(0, this.pageSize);
    console.log(this.currentList);
    console.log(this.ticket);
  },
  methods: {
    // 分页操作
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.currentList = this.ticket.slice(0, this.pageSize);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.currentList = this.ticket.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },

    // 展开行
    selectExpand(row, column, event) {
      this.expands = [];
      this.expands.push(row.id);
    },
    // 合并列
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      } else if (columnIndex === 3) {
        return [0, 0];
      }
    },
    // 合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    // 确认机票
    comfirmAri(id, eid) {
      this.$router.push({
        path: "/air/order",
        query: {
          id,
          seat_xid: eid
        }
      });
    }
  },
  filters: {
    time(data) {
      let time1 = new Date(data.arr_datetime).getTime();
      let time2 = new Date(data.dep_datetime).getTime();
      let time = (time1 - time2) / 1000 / 60;
      // 数据可能有问题，传回来的隔天达的时间是日期是同一天，在此判断，可能有bug
      if (time < 0) {
        time = time + 24 * 60;
      }
      let minute = time % 60;
      let hour = Math.floor(time / 60);
      console.log(time, minute, hour);
      return hour + "时" + minute + "分";
    }
  }
};
</script>

<style lang="less" scoped>
.ticket {
  /deep/ .el-table__row {
    cursor: pointer;
    margin-top: 10px;
    border: 1px solid #eee;
  }
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
  .sale {
    background-color: #f6f6f6;
    box-sizing: border-box;
    padding: 0 20px;
    align-items: center;
    .content {
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      .plane {
        flex: 1;
        span {
          color: green;
        }
      }
      i {
        width: 100px;
        font-size: 24px;
        color: orange;
      }
      .select {
        width: 75px;
        text-align: center;
        span {
          display: block;
          border-radius: 5px;
          width: 75px;
          height: 28px;
          line-height: 28px;
          cursor: pointer;
          color: #fff;
          background-color: orange;
        }
      }
    }
  }
}
/deep/ .el-table__expanded-cell {
  padding: 0;
}

/deep/ .el-table td {
  overflow: hidden;
}
</style>