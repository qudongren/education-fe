<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" placeholder="课程名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="handleAdd()">添加课程</el-button>
      </div>
      <el-table :data="dataTable" ref="multipleTable" style="width: 100%" v-loading="loading" border
                class="elTable">
        <el-table-column label="课程名称" prop="cName"></el-table-column>
        <el-table-column label="年级" prop="grade_dec"></el-table-column>
        <el-table-column label="学科" prop="subject_dec"></el-table-column>
        <el-table-column label="授课老师" prop="teacher_name"></el-table-column>
        <el-table-column label="课程时间" prop="time"></el-table-column>
        <el-table-column label="课程价格" prop="price"></el-table-column>
        <el-table-column label="总名额" prop="total"></el-table-column>
        <el-table-column label="已选名额" prop="nowNum"></el-table-column>
        <el-table-column label="热度值" prop="hotLevel"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleDetail(scope.$index,scope.row)">查看/编辑</el-button>
            <el-button size="small" type="danger" @click="handleDel(scope.$index,scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="detailDialogVisible" width="740px" :title="dialogTitle">
      <div class="detailDialog-header">
        <p><label>课程名称：</label><el-input v-model="detail.cName"></el-input> </p>
        <p><label>课程类别：</label><el-cascader v-model="detail.cate_id" :options="cate_options" :props="{ expandTrigger: 'hover' }" @change="handleChange"></el-cascader></p>
        <p><label>授课老师：</label><el-select v-model="detail.teacher_id" placeholder="请选择">
          <el-option
            v-for="item in teacher_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></p>
        <p><label>课程时间：</label>
          <el-time-select
            placeholder="起始时间"
            v-model="detail.start_time"
            :picker-options="{
              start: '08:30',
              step: '00:30',
              end: '22:30'}">
          </el-time-select>
          至
          <el-time-select
            placeholder="结束时间"
            v-model="detail.end_time"
            :picker-options="{
              start: '08:30',
              step: '00:30',
              end: '22:30'}">
          </el-time-select>
        </p>
        <p><label>课程价格：</label><el-input v-model="detail.price"></el-input></p>
        <p><label>总名额：</label><el-input v-model="detail.total"></el-input></p>
        <p><label>热度值：</label><el-input v-model="detail.hotLevel"></el-input></p>
        <p><label>课程详细：</label><el-input type="textarea" v-model="detail.detail"></el-input></p>
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;" @click="saveCourse()">保存</el-button></p>
      </div>
      <div class="detailDialog-body" v-if="type === 'edit'">
        <label>课次列表 <el-button size="small" @click="handleAddSubCourse">添加课次</el-button></label>
        <el-table :data="sub_course" style="width: 100%" border class="elTable">
          <el-table-column label="课次名称" prop="sub_name"></el-table-column>
          <el-table-column label="课次日期" prop="sub_date"></el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button size="small" @click="handleHomework(scope.$index,scope.row)">查看/编辑</el-button>
              <el-button size="small" type="danger" @click="handleSubDel(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" :page-size=10>
          </el-pagination>
        </div>
      </div>
      <div class="detailDialog-body" v-if="type === 'edit'">
        <label>学员列表</label>
        <el-table :data="detail.student" style="width: 100%" border class="elTable">
          <el-table-column label="学生" prop="name"></el-table-column>
          <el-table-column label="性别" prop="gender"></el-table-column>
          <el-table-column label="电话" prop="phone"></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" :page-size=10>
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="homeworkDialogVisible" width="740px" title="课次">
      <div class="detailDialog-header">
        <p><label>课次名称: </label><el-input v-model="homework.sub_name"></el-input></p>
        <p><label>课次时间:</label>
          <el-date-picker
          v-model="homework.sub_date"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
        </p>
        <div class="detailDialog-body">
          <label>作业内容:</label>
          <div class="detailDialog-body-homework">
            <vue-ueditor-wrap v-model="homework.sub_work" :config="myConfig"></vue-ueditor-wrap>
          </div>
        </div>
        <p class="button_right"><el-button type="primary" style="margin-top: 8px;" @click="saveSubCourse()">保存</el-button></p>
      </div>
      <div class="detailDialog-body" v-if="homeworkDialogType === 'edit'">
        <label>学员作业</label>
        <el-table :data="homework.work" style="width: 100%" border class="elTable">
          <el-table-column label="学生" prop="name"></el-table-column>
          <el-table-column label="提交时间" prop="handle_time"></el-table-column>
          <el-table-column label="操作" min-width="150">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleDownload(scope.$index,scope.row)">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next" :total="total" :page-size=10>
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import VueUeditorWrap from 'vue-ueditor-wrap';
  import axios from 'axios'
  export default {
    data() {
      return {
        dataTable: [],
        detail: {},
        homework: {},
        myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 240,
          // 初始容器宽度
          initialFrameWidth: '100%',
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: '/proxy/ueditor',
          // UEditor 资源文件的存放路径
          UEDITOR_HOME_URL: '/static/UE/',
          //工具栏
          // toolbars:[
          //   ['bold','fontsize','indent','selectall', 'cleardoc','emotion','simpleupload','blockquote','source']
          // ],
          //元素路径关闭
          elementPathEnabled:false,
        },
        select_word: '',
        loading: false,
        total: 0,
        detailDialogVisible: false,
        homeworkDialogVisible: false,
        work: '',
        type: 'add',
        homeworkDialogType: 'edit',
        cate_options: {},
        teacher_options: [],
        time_value: [new Date(), new Date()],
        value: 2,
        sub_course: [],
        editHomework: true
      }
    },
    created: function () {
      this.getCourseList();
    },
    methods: {
      handleDownload() {

      },
      handleHomework(index, row) {
        this.homeworkDialogVisible = true;
        this.homeworkDialogType = 'edit';
        this.homework = row;
        this.getHomeworkList(row.id);
      },
      handleAddSubCourse() {
        this.homeworkDialogVisible = true;
        this.homeworkDialogType = 'add';
        this.homework = {};
        this.homework.course_id = this.detail.id;
      },
      handleAdd() {
        this.detail = {};
        this.detailDialogVisible = true;
        this.type = 'add';
        this.getTeacher();
        this.getCate();
      },
      async handleDetail(index,row){
        this.detail = JSON.parse(JSON.stringify(this.dataTable[index]));
        await this.getCate();
        await this.getTeacher();
        await this.getSubCourse(this.dataTable[index].id);
        await this.getStudent(row.id);
        this.detailDialogVisible = true;
        this.type = 'edit';
      },
      async handleDel(index, row) {
        const resp = await this.$axios.post('/api/public/deleteCourse',{course_id: row.id});
        const value = resp.data;
        if(value && value.code === 1) {
          this.$message({
            message: value.msg,
            type: 'success'
          });
          this.getCourseList();
        }else {
          this.$message({
            message: value.msg,
            type: 'danger'
          });
        }
      },
      async handleSubDel(index, row) {
        const resp = await this.$axios.post('/api/public/deleteSubCourse',{subcourse_id: row.id});
        const value = resp.data;
        if(value && value.code === 1) {
          this.$message({
            message: value.msg,
            type: 'success'
          });
          this.getSubCourse(this.detail.id);
        }else {
          this.$message({
            message: value.msg,
            type: 'danger'
          });
        }
      },
      async saveCourse() {
        let resp;
        if(this.type === 'add') {
          this.detail.cate_id = this.detail.cate_id[1];
          resp = await this.$axios.post('/api/public/addCourse', this.detail);
        } else if (this.type === 'edit') {
          this.detail.course_id = this.detail.id;
          resp = await this.$axios.post('/api/public/changeCourse', this.detail);
        }
          const value = resp.data;
          if(value && value.code === 1){
            this.$message({
              message: value.msg,
              type: 'success'
            });
            if(this.type === 'add') {
              this.detailDialogVisible = false;
              this.getCourseList();
            }
          } else {
            this.$message({
              message: value.msg,
              type: 'danger'
            });
          }
      },
      async saveSubCourse() {
        let resp;
        if(this.homeworkDialogType === 'add') {
          resp = await this.$axios.post('/api/public/addSubCourse', this.homework);
        }else  if(this.homeworkDialogType === 'edit') {
          this.homework.subcourse_id = this.homework.id;
          resp = await this.$axios.post('/api/public/changeSubCourse', this.homework);
        }
        const value = resp.data;
        if(value && value.code === 1){
          this.$message({
            message: value.msg,
            type: 'success'
          });
          if(this.homeworkDialogType === 'add') {
            this.homeworkDialogVisible = false;
            this.getSubCourse(this.homework.course_id);
          }
        } else {
          this.$message({
            message: value.msg,
            type: 'danger'
          });
        }
      },
      async search() {
        const resp = await this.$axios.get('/api/public/searchCourse?search=' + this.select_word);
        const value = resp.data;
        if(value) {
          value.forEach(item => {
            item.time = item.start_time + '-' + item.end_time;
          });
          this.dataTable = value;
        }
      },
      handleCurrentChange() {

      },
      handleChange() {

      },
      async getHomeworkList(id) {
        const resp = await this.$axios.get('/api/public/getWorkList?subcourse_id=' + id);
        const value = resp.data;
        this.homework.work = value;
      },
      async getCourseList() {
        let res = await axios.get('/api/public/courseList');
        let {data} = res;
        data.forEach(item => {
          item.time = item.start_time + '-' + item.end_time;
        })
        this.dataTable = res.data;
      },
      async getCate() {   //处理课程目录
        let res = await axios.get('/api/categories');
        let {data} = res;
        data = data.map(item => {return {value: item.id, label: item.dec, parent_id: item.parent_id}});
        let grade = data.filter(item => item.parent_id === 0);
        let subject = data.filter(item => item.parent_id !== 0)
        for (let i = 0, len = grade.length; i < len; i++) {
          grade[i].children = [];
          for (let j = 0, len = subject.length; j < len; j++) {
            if (grade[i].value === subject[j].parent_id) {
              grade[i].children.push(subject[j]);
            }
          }
        }
        this.cate_options = grade;
      },
      async getStudent(id) {
        const resp = await this.$axios.get('/api/public/studentList?course_id=' + id);
        const value = resp.data;
        this.detail.student = value;
      },
      async getTeacher() {
        let res = await axios.get('/api/public/teacherList');
        let data = res.data.map(v => {return {value: v.id, label: v.name + '-' +  v.id}});
        this.teacher_options = data;
      },
      async getSubCourse(course_id) {
        let res = await axios.get('/api/public/subCourse', {
          params: {course_id}
        });
        let {data} = res;
        this.sub_course = data;
        console.log(data);
      }
    },
    components: {
      VueUeditorWrap
    },
    computed: {
      dialogTitle() {
        if(this.type === 'edit') {
          return '课程详情';
        }else {
          return '添加课程';
        }
      }
    },
  };
</script>
<style lang="less">
  @import "../../../static/css/main.css";

  .detailDialog-body-homework {
    margin-bottom: 15px;
  }
</style>
