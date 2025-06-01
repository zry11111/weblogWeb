import router from '@/router/index.js'
import { showMessage,showPageLoading,hidePageLoading } from '@/composables/utils'
import { getToken } from '@/composables/cookie'
import { useBlogSettingsStore } from '@/stores/blogsettings'
router.beforeEach((to, from, next) => {
    showPageLoading()
    // 如果路由需要登录,
    // 或者，在if中直接检查to.path是否在白名单中to.path.startsWith('/admin')
    if (to.meta.requireAuth) {
        // 如果没有token，跳转到登录页
        if (!getToken()) {
            showMessage('请先登录', 'error')
            next({ path: '/login' })
        } else{
            next()
        }
    } else if(to.path == '/login'&& getToken()){
        // 如果已经登录，跳转到首页
        showMessage('请勿重复登录','error')
        next({ path: '/admin/index' })
    }
    else if(!to.path.startsWith('/admin')){
        // 如果是公共路由，直接放行
        let blogSettingsStore = useBlogSettingsStore()
        // 获取博客设置信息并保存到全局状态中
        blogSettingsStore.getBlogSettings()
        next()
    } else {
        next()
    }
})
router.afterEach((to) => {
    let title = to.meta.title? to.meta.title : ''+'weblog'
    document.title = title
    hidePageLoading()
})