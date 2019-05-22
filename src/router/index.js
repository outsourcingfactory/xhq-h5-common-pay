import Vue from 'vue'
import Router from 'vue-router'
//通用支付页面
const Pay = (resolve) => {
  import('@/components/pay/pay').then((module) => {
    resolve(module)
  })
};

//iframe 跳转到第三方
const Mall = (resolve) => {
  import('@/components/mall').then((module) => {
    resolve(module)
  })
};

Vue.use(Router);

let router= new Router({
  routes: [
    {
      path:'/pay',
      name:'Pay',
      component:Pay,
      meta:{
        title:'订单支付'
      }
    },
    {
      path:'/mall',
      name:'Mall',
      component:Mall
    }
  ]
});


router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()

});

export default router
