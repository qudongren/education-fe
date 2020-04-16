import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/DashBoard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/myInfo',
          component: resolve => require(['../components/page/myInfo.vue'], resolve),
          meta: { title: '个人信息' }
        },
        {
          path: '/course',
          component: resolve => require(['../components/page/course.vue'], resolve),
          meta: { title: '课程管理' }
        },
        {
          path: '/student',
          component: resolve => require(['../components/page/student.vue'], resolve),
          meta: { title: '学生管理' }
        },
        {
          path: '/teacher',
          component: resolve => require(['../components/page/teacher.vue'], resolve),
          meta: { title: '教师管理' }
        },
        {
          path: '/cagetory',
          component: resolve => require(['../components/page/cagetory.vue'], resolve),
          meta: { title: '分类管理' }
        },
      ]
    },
    {
      path:'/login',
      component: resolve => require(['../components/page/Login.vue'], resolve),
    },

  ]
})
