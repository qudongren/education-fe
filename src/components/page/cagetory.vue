<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="searchParams.nickName" placeholder="年纪" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="handleAdd()">添加</el-button>
      </div>
      <el-table :data="dataTable" ref="multipleTable" style="width: 100%" v-loading="loading" border
                class="elTable">
        <el-table-column label="年级" prop="grade_dec"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.$index,scope.row)">查看/编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" page-size="10">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="detailDialogVisible" width="740px" title="年级详情">
      <div class="detailDialog-header">
        <p><label>年级：</label><el-input v-model="detail.grade_dec"></el-input> </p>
        <p><label>添加学科：</label><el-input type="textarea" v-model="detail.newSubject" placeholder="可添加多个以逗号分隔"></el-input></p>
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;">保存</el-button></p>
      </div>
      <div class="detailDialog-body" v-if="type === 'edit'">
        <label>已有学科</label>
        <el-table :data="detail.subject" style="width: 100%" border class="elTable">
          <el-table-column label="评价" prop="text"></el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
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

      }
    }
  };
</script>
<style lang="less">
  @import "../../../static/css/main.css";

</style>
