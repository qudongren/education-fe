<template>
  <div id="login_wrap">
    <el-container>
      <el-main id="login_main">
        <el-container id="login_container">
          <el-header id="login_container_header">
            <p>教育培训学员管理系统登录</p>
          </el-header>
          <p style="color:#e22841;font-size: 12px;text-align: center">{{errormsg}}</p>
          <el-container id="login_container_main">
            <el-form :model="loginForm" :rules="rules" ref="loginForm">
              <el-form-item prop="username">
                <el-input v-model="loginForm.username" placeholder="ID" @change="vp" class="loginInput"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input placeholder="密码" type="password" v-model="loginForm.password" @keyup.enter.native="submitForm()"  class="loginInput"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')"  class="loginInput">登录</el-button>
              </el-form-item>
            </el-form>
          </el-container>
        </el-container>
      </el-main>
      <el-footer style=" height: 40px;"></el-footer>
    </el-container>
  </div>
</template>
<script>
  import qs from 'qs';
  export default {
    data: function () {
      return {
        errormsg:'',
        loginForm: {
          username: "",
          password: ""
        },
        rules: {
          userId: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"}
          ],
        }
      };
    },
    methods: {
      vp() {

      },
      submitForm(){

      }
    }
  }
</script>
<style>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    font-family: "微软雅黑", Arial, Helvetica, sans-serif;
  }

  .el-container {
    position: relative;
  }

  #login_main {
    background: linear-gradient(to bottom, #f8fcff, #f8fcff, #f8fcff);
    min-height: 750px;
    max-height: 1080px;
    position: relative;
  }

  #login_main:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

  }

  #login_container {
    width: 350px;
    height: 400px;
    background: white;
    position: relative;
    top: 100px;
    left: 60%;
  }

  #login_container_header {
    height: 120px !important;
    color: rgb(12, 187, 239);
    font-size: 20px;
    text-align: center;
    line-height: 120px;
  }

  .loginInput{
    width: 300px;
    height: 46px;
  }

  #login_container_main {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
  }

  .el-footer {
    bottom: 0;
    text-align: center;
    background-color: #ffffff;
    width: 100%;
    line-height: 40px;
    font-size: 12px;
  }

  @media screen and (max-width: 960px) {
    body {
      width: 1080px;
    }
  }
</style>
