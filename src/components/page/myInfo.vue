<template>
  <div class="my-info">
    <div class="info-bar">
      <label class="info-bar-title">个人资料</label>
      <div class="info-bar-content">
        <div class="info-left"><img :src="info.avatarUrl" width="120px" height="120px"></div>
        <div class="info-right">
          <p class="info-text">姓名: {{info.name}}</p>
          <p class="info-text">性别: <span v-show="info.gender === 1">男</span><span v-show="info.gender === 2">女</span>
          </p>
          <p class="info-text">联系电话:
            <span v-if="!info.phoneUpdate">{{info.phone}}
              <span class="info-text-update" @click="clickUpdate('phoneUpdate', true)">修改</span>
            </span>
            <span class="info-text-input" v-if="info.phoneUpdate">
                <el-input type="text" v-model="info.phone"></el-input>
                <el-button type="primary" @click="clickComform('phoneUpdate')">确认</el-button>
            </span>
          </p>
          <p class="info-text">个人简介:
            <span v-if="!info.introduceUpdate">{{info.introduce}}
              <span class="info-text-update" @click="clickUpdate('introduceUpdate', true)">修改</span>
            </span>
            <span class="info-text-input" v-if="info.introduceUpdate">
              <el-input type="text" v-model="info.introduce"></el-input>
              <el-button type="primary" @click="clickComform('introduceUpdate')">确认</el-button>
            </span>
          </p>

        </div>
      </div>
    </div>
    <div class="info-bar">
      <label class="info-bar-title">个人安全</label>
      <div class="info-bar-content">
        <p class="info-text">
          <el-button type="primary" v-if="!info.pwdUpdate" @click="clickUpdate('pwdUpdate', true)">密码修改</el-button>
          <span class="info-text-input" v-if="info.pwdUpdate">
              <el-input type="text" v-model="info.password" placeholder="请输入新密码"></el-input>
              <el-button type="primary" @click="clickComform('pwdUpdate')">确认</el-button>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        info: {
          name: '1234',
          gender: 1,
          phone: 1313131313,
          introduce: 'hhhhhhhhhhhh'
        }
      }
    },
    methods: {
      clickUpdate(property, bool) {
        this.$set(this.info, property, bool);
      },
      clickComform(property) {
        this.clickUpdate(property, false);
      }
    }
  };
</script>
<style lang="less">
  .my-info {
    .info-bar {
      margin-bottom: 20px;

      .info-bar-title {
        color: #333333;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
        margin-bottom: 10px;
      }

      .info-bar-content {
        display: flex;

        .info-right {
          margin-left: 20px;
          line-height: 30px;

          .info-text {
            color: #666666;

            .info-text-update {
              font-size: 14px;
              color: #409EFF;
              vertical-align: top;
              padding-left: 10px;
            }

          }
        }

        .info-text-input {
          display: flex;

          .el-button {
            margin-left: 10px;
          }
        }
      }

    }
  }
</style>
