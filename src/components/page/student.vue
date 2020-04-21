<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchParams.nickName" placeholder="学生姓名" class="handle-input mr10"></el-input>
        <el-input v-model="searchParams.phone" placeholder="联系电话" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="dataTable" ref="multipleTable" style="width: 100%" v-loading="loading" border
                class="elTable">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="生日" prop="birthday"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.$index,scope.row)">查看/编辑</el-button>
<!--            <el-button size="small" type="primary" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>-->
            <!--<el-button size="small" type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="detailDialogVisible" width="740px" title="学员详情">
      <div class="detailDialog-header">
        <p><label>姓名：</label><el-input v-model="detail.name"></el-input> </p>
        <p><label>性别：</label>
          <el-radio v-model="detail.gender" label="男">男</el-radio>
          <el-radio v-model="detail.gender" label="女">女</el-radio>
        </p>
        <p><label>电话：</label><el-input v-model="detail.phone"></el-input></p>
        <p><label>生日：</label>
          <el-date-picker
            v-model="detail.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </p>
        <p class="button_right"><el-button type="primary" @click="handleSave" style="margin-top: 8px;">保存</el-button></p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataTable: [{
          nickName: '1111',
          genderText: '男',
          phone: '1111111111',
          country: '🇨🇳',
          province: 'gd',
          city: 'gz'
        }],
        detail: {},
        searchParams: {},
        loading: false,
        detailDialogVisible: false,
        total: 0
      }
    },
    methods: {
      async handleSave() {
        this.detail.student_id = this.detail.id;
        const resp = await this.$axios.post('/api/public/changeStudent', this.detail);
        const value = resp.data;
        if (value && value.code === 1) {
          this.$message({
            message: value.msg,
            type: 'success'
          });
        } else {
          this.$message({
            message: value.msg,
            type: 'danger'
          });
        }
      },
      handleDetail(index,row){
        this.detail = this.dataTable[index];
        this.detailDialogVisible = true;
      },
      search() {

      },
      handleCurrentChange() {

      },
      async getStudentList() {
        const resp = await this.$axios.get('/api/public/getAllStudent');
        const value = resp.data;
        if (value) {
          this.dataTable = value;
        }
      }
    },
    created() {
      this.getStudentList();
    }
  };
</script>
<style lang="less">
  @import "../../../static/css/main.css";

</style>
