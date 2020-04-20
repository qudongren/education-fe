<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="教师姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="handleAdd()">添加教师</el-button>
      </div>
      <el-table :data="dataTable" ref="multipleTable" style="width: 100%" v-loading="loading" border
                class="elTable">
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="gender"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="标签" prop="tags"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleDetail(scope.$index,scope.row)">查看/编辑</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="detailDialogVisible" width="740px" title="教师详情">
      <div class="detailDialog-header">
        <p><label>姓名：</label><el-input v-model="detail.name"></el-input> </p>
        <p><label>性别：</label><el-input v-model="detail.gender"></el-input></p>
        <p><label>电话：</label><el-input v-model="detail.phone"></el-input></p>
        <p><label>标签：</label><el-input v-model="detail.tags"></el-input></p>
        <p><label>简介：</label><el-input v-model="detail.introduce"></el-input></p>
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;">保存</el-button></p>
      </div>
      <div class="detailDialog-body" v-if="type === 'edit'">
        <label>课程列表</label>
        <el-table :data="detail.course" style="width: 100%" border class="elTable">
          <el-table-column label="课程名称" prop="cName"></el-table-column>
          <el-table-column label="年级" prop="grade_dec"></el-table-column>
          <el-table-column label="学科" prop="subject_dec"></el-table-column>
          <el-table-column label="课程时间" prop="time"></el-table-column>
          <el-table-column label="课程价格" prop="price"></el-table-column>
          <el-table-column label="总名额" prop="total"></el-table-column>
          <el-table-column label="已算名额" prop="nowNum"></el-table-column>
          <el-table-column label="热度值" prop="hotLevel"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dataTable: [],
        select_word: '',
        loading: false,
        total: 0,
        detailDialogVisible: false,
        detail: {},
        type: 'edit'
      }
    },
    methods: {
      handleAdd() {
        this.detailDialogVisible = true;
        this.type = 'add';
      },
      handleDetail(index,row){
        this.detail = this.dataTable[index];
        this.detailDialogVisible = true;
      },
      search() {

      },
      handleCurrentChange() {

      },
      async init() {
        const resp = await this.$axios.get('/api/public/teacherList');
        const value = resp.data;
        if(value) {
          this.dataTable = value;
        }
      }
    },
    created() {
      this.init();
    }
  };
</script>
<style lang="less">
  @import "../../../static/css/main.css";

</style>
