<template>
  <div class="dashboard clear">
    <div>
      <div>
        欢迎来到教育培训学员管理系统!
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {

      }
    },
    components: {},
    methods: {},
    created() {}
  }
</script>
<style>
  .dashboard {
    overflow: hidden;
    display: flex;
  }

  .clear::after {
    content: "";
    height: 0;
    clear: both;
  }

  .statusCard {
    padding: 20px;
    width: 600px;
    height: 100px;
    background-color: #fff;
  }

  .el-card {
    overflow: hidden;
    cursor: pointer;
  }

  .el-card i {
    font-size: 32px;
    padding-top: 5px;
    float: left;
    margin-right: 5px;
  }

  .el-card {
    background-color: #409EFF;
    color: #fff;
  }

  .cardInfo-warning {
    background-color: #E6A23C;
    color: #fff;
  }

  .cardInfo-danger {
    background-color: #F56C6C;
    color: #fff;
  }

  .cardInfo-success {
    background-color: #67C23A;
    color: #fff;
  }

  #F56C6C
  .el-card .card-info {
    float: left;
    margin-bottom: 20px;
    padding-left: 10%;
  }

  .card-info p:nth-child(1) {
    font-size: 24px;
  }

  .card-info p:nth-child(2) {
    font-size: 12px;
  }

</style>

