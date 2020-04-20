<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button icon="el-icon-circle-plus-outline" @click="handleAdd()">添加</el-button>
      </div>
      <el-table :data="gradeTable" ref="multipleTable" style="width: 50%" v-loading="loading" border
                class="elTable">
        <el-table-column label="分类名称" prop="dec"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleDetail(scope.$index,scope.row)">查看</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="addDialogVisible" width="740px" title="添加一级分类">
      <div class="detailDialog-header">
        <p><label>分类：</label><el-input v-model="cate_dec"></el-input></p>
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;" @click="createCate()">添加</el-button></p>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="detailDialogVisible" width="740px" title="年级详情">
      <div class="detailDialog-header">
        <p><label>年级：</label><el-input v-model="detail.dec"></el-input> </p>
        <!-- <p><label>添加学科：</label><el-input type="textarea" v-model="detail.newSubject" placeholder="可添加多个以逗号分隔"></el-input></p> -->
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;" @click="saveCate()">保存</el-button></p>
      </div>
      <div class="detailDialog-body">
        <label>二级分类</label>
        <el-button icon="el-icon-circle-plus-outline" @click="handleAddSec()">添加</el-button>
        <el-table :data="subjectTable" style="width: 100%" border class="elTable">
          <el-table-column label="分类名称">
            <template slot-scope="scope">
              <el-input v-if="scope.row.status" v-model="scope.row._dec"></el-input>
              <span v-else>{{scope.row.dec}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small"  v-if="!scope.row.status" @click="handleSecDetail(scope.$index,scope.row)">修改</el-button>
              <el-button type="primary" size="small"  v-if="!scope.row.status" @click="handleDelSec(scope.$index,scope.row)">删除</el-button>
              <el-button type="primary" size="small"  v-if="scope.row.status" @click="handleSaveSec(scope.$index,scope.row)">保存</el-button>
              <el-button type="primary" size="small"  v-if="scope.row.status" @click="handleCanSec(scope.$index,scope.row)">取消</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addSecVisible" width="740px" title="添加二级分类">
      <div class="detailDialog-header">
        <p><label>分类名称：</label><el-input v-model="cateSec_dec"></el-input></p>
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;" @click="createSecCate(detail.id)">添加</el-button></p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        gradeTable: [],
        detail: {},
        loading: false,
        detailDialogVisible: false,
        addDialogVisible: false,
        addSecVisible: false,
        total: 0,
        type: '',
        cate_dec: '',
        subjectList: [],
        subjectTable: [],
        cateSec_dec: '',
        sec_cate: ''
      }
    },
    async created() {
      await this.getCate();
    },
    methods: {
      handleAdd() {
        this.addDialogVisible = true;
      },
      handleAddSec() {
        this.addSecVisible = true;
      },
      handleDetail(index,row){
        this.detail = JSON.parse(JSON.stringify(this.gradeTable[index]));
        let id = this.detail.id;
        this.getSubjectTable(id);
        this.detailDialogVisible = true;
      },
      handleSecDetail(index, row) {
        let newRow = JSON.parse(JSON.stringify(row));
        newRow.status = 1;
        this.subjectTable.splice(index, 1, newRow);
      },
      handleCanSec(index, row) {
        this.$set(this.subjectTable[index], 'status', 0);
      },
      async handleSaveSec(index, row) {
        let {id} = row;
        let _dec = row._dec.replace(/\s*/g,"");
        if (!_dec) {
          this.$message('分类名称不能为空');
          return;
        }
        let res = await axios.post('/api/public/changeCate', {
          cate_dec: _dec,
          id: id
        });
        if (res.data.code === 1) {
          this.$message('修改成功');
        } else {
          this.$message('修改成功');
        }
        await this.getCate();
        let cate_id = this.detail.id;
        this.getSubjectTable(cate_id);
        // let subjectTable = this.subjectList.filter(item => {
        //   return item.parent_id === cate_id;
        // })
        // this.subjectTable = subjectTable;
      },
      async handleDelSec(index, row) {
        let id = row.id;
        try {
          await this.$confirm('将删除分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        } catch (e) {
          return;
        }
        let res = await axios.post('/api/public/delCate', {
          id
        });
        if (res.data.code === 1) {
          this.$message('删除成功');
        } else {
          this.$message('删除失败');
        }
        await this.getCate();
        let cate_id = this.detail.id;
        this.getSubjectTable(cate_id);
      },
      async saveCate() {
        let {dec, id} = this.detail;
        dec = dec.replace(/\s*/g,"");
        if (!dec) {
          this.$message('分类名称不能为空');
          return;
        }
        let res = await axios.post('/api/public/changeCate', {
          cate_dec: dec,
          id: id
        });
        if (res.data.code === 1) {
          this.$message('修改成功');
        } else {
          this.$message('修改成功');
        }
        await this.getCate();
        this.detailDialogVisible = false;
      },
      async handleDel(index, row) {
        let id = row.id;
        try {
          await this.$confirm('将删除分类, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
        } catch (e) {
          return;
        }
        let res = await axios.post('/api/public/delCate', {
          id
        });
        if (res.data.code === 1) {
          this.$message('删除成功');
        } else {
          this.$message('删除失败');
        }
        await this.getCate();
      },
      async createCate() {
        let cate_dec = this.cate_dec;
        cate_dec = cate_dec.replace(/\s*/g,"");
        if (!cate_dec) {
          this.$message('分类名称不能为空');
          return;
        }
        let res = await axios.post('/api/public/addCate', {
          cate_dec: cate_dec,
          parent_id: 0
        });
        if (res.data.code === 1) {
          this.$message('添加成功');
        } else {
          this.$message('添加失败');
        }
        await this.getCate();
        this.addDialogVisible = false;
        this.cate_dec = ''
      },
      async createSecCate(id) {
        let cateSec_dec = this.cateSec_dec;
        cateSec_dec = cateSec_dec.replace(/\s*/g,"");
        if (!cateSec_dec) {
          this.$message('分类名称不能为空');
          return;
        }
        let res = await axios.post('/api/public/addCate', {
          cate_dec: cateSec_dec,
          parent_id: id
        });
        if (res.data.code === 1) {
          this.$message('添加成功');
        } else {
          this.$message('添加失败');
        }
        this.addSecVisible = false;
        this.cateSec_dec = ''
        await this.getCate();
        this.getSubjectTable(id);
      },
      async getCate() {   //处理课程目录
        let res = await axios.get('/api/categories');
        let {data} = res;
        let grade = data.filter(item => item.parent_id === 0);
        let subject = data.filter(item => item.parent_id !== 0);
        this.gradeTable = grade;
        this.subjectList = subject;
      },
      getSubjectTable(id) {
        let subjectTable = this.subjectList.filter(item => {
          return item.parent_id === id;
        })
        subjectTable = subjectTable.map((item, index, arr) => {
          item.status = 0;
          item._dec = item.dec;
          return item;
        })
        this.subjectTable = subjectTable;
      }
    }
  };
</script>
<style lang="less">
  @import "../../../static/css/main.css";

</style>
