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
    console.log(456, this.ticket);
  },
  methods: {
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
    comfirmAri(id,eid){
      this.$router.push({
        path:'/air/order',
        query:{
          id,
          seat_xid:eid
        }
      })
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
</style>