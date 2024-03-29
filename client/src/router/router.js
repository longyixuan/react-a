import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: '登录 - 工时系统 '
    },
    component: () => import('@/views/login.vue')
};

export const registRouter = {
    path: '/regist',
    name: 'regist',
    meta: {
        title: '注册 - 工时系统'
    },
    component: () => import('@/views/regist.vue')
};

export const registResult = {
    path: '/regist-result',
    name: 'regist-result',
    meta: {
        title: '注册结果 - 工时系统'
    },
    component: () => import('@/views/regist-result.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@/views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = {
    path: '/',
    name: 'appRouter',
    redirect: '/home',
    component: Main,
    children: [
        { 
            path: 'home',
            title: '首页', 
            name: 'home_index', 
            component: () => import('@/views/home/home.vue')
        },
        {
            path: 'department-manage',
            title: '部门管理',
            name: 'department-manage',
            component: () => import('@/views/sys/department-manage/departmentManage.vue')
        },
        {
            path: 'user-manage',
            title: '用户管理',
            name: 'user-manage',
            component: () => import('@/views/sys/user-manage/userManage.vue')
        },
        {
            path: 'system-manage',
            title: '系统管理',
            name: 'system-manage',
            component: () => import('@/views/sys/system-manage/systemManage.vue')
        },
        {
            path: 'work-time',
            title: '我的工时-录入',
            name: 'work-time',
            component: () => import('@/views/work-time/work-time.vue')
        }, 
        {
            path: 'work-time-seach',
            title: '我的工时-统计',
            name: 'work-time-seach',
            component: () => import('@/views/work-time/work-time-seach.vue')
        },
        {
            path: 'own-space',
            title: '个人信息',
            name: 'own-space',
            component: () => import('@/views/own-space/own-space.vue')
        }
    ]
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    registRouter,
    registResult,
    appRouter,
    page500,
    page403
];
