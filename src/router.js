import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home.vue'
import AV from '@/page/AV/index.vue'
import Videos from '@/page/Videos/index.vue'
import Tag from '@/page/Tag/index.vue'
import Collect from '@/page/Collect/index.vue'
import User from '@/page/user/index.vue'
import Login from '@/page/user/login.vue'
import register from '@/page/user/register.vue'
import myVideos from '@/page/user/myVideos.vue'
import Results from '@/page/common/videosResult.vue'
import ActorDetail from '@/page/Tag/actorDetail.vue'
import Profile from '@/page/user/myProfile.vue'
import Edit from '@/page/user/editProfile.vue'
import UserSafe from '@/page/user/userSafe.vue'
import Upload from '@/page/user/upload.vue'
import ChangeAvator from '@/page/user/changeAvator.vue'
import VideoPlay from '@/page/common/videoPlayer.vue'
import Pay from '@/page/common/pay.vue'
import Forgetpsw from '@/page/user/Forgetpsw.vue'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'active',
  routes: [{
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
          path: '',
          redirect: {
            name: 'av'
          }
        },
        {
          path: '/av',
          name: 'av',
          meta: {
            keepAlive: true
          },
          component: AV
        },
        {
          path: '/videos',
          name: 'Videos',
          meta: {
            keepAlive: true
          },
          component: Videos
        },
        {
          path: '/tag',
          name: 'Tag',
          meta: {
            keepAlive: true
          },
          component: Tag
        },
        {
          path: '/collect',
          name: 'Collect',
          component: Collect,
          meta: {
            requiresAuth: true,
            keepAlive: true
          }
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/results',
          name: 'results',
          component: Results
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        title: '注册'
      },
      component: register
    },
    {
      path: '/Forgetpsw',
      name: 'Forgetpsw',
      meta: {
        title: '忘记密码'
      },
      component: Forgetpsw
    },
    {
      path: '/actorDetail',
      name: 'actorDetail',
      meta: {
        title: '女优详情'
      },
      component: ActorDetail
    },
    {
      path: '/myVideos',
      meta: {
        title: '我的视频',
        requiresAuth: true,
        keepAlive: true
      },
      name: 'myVideos',
      component: myVideos
    },
    {
      path: '/upload',
      meta: {
        title: '上传视频',
        requiresAuth: true
      },
      name: 'upload',
      component: Upload
    },
    {
      path: '/profile',
      name: 'profile',
      meta: {
        title: '我的资料',
        requiresAuth: true
      },
      component: Profile
    },
    {
      path: '/edit',
      name: 'edit',
      meta: {
        title: '修改我的资料',
        requiresAuth: true
      },
      component: Edit
    }, {
      path: '/userSafe',
      name: 'userSafe',
      meta: {
        title: '账户安全',
        requiresAuth: true
      },
      component: UserSafe
    }, 
    {
      path: '/changeAvator',
      name: 'changeAvator',
      meta: {
        title: '修改头像',
        requiresAuth: true
      },
      component: ChangeAvator
    },
     {
      path: '/videoPlay/:id',
      name: 'videoPlay',
      meta: {
        title: '视频详情'
      },
      component: VideoPlay,
      props: true
    }, {
      path: '/pay',
      name: 'pay',
      meta: {
        title: '购买VIP',
        requiresAuth: true
      },
      component: Pay
    }

  ]
})

router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('userdata')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

export default router
