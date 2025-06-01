import Index from "@/pages/frontend/index.vue";
import Login from "@/pages/admin/login.vue";
import AdminIndex from "@/pages/admin/index.vue";
import AdminArticleList from "@/pages/admin/article-list.vue";
import AdminCategoryList from "@/pages/admin/category-list.vue";
import AdminTagList from "@/pages/admin/tag-list.vue";
import AdminBlogSetting from "@/pages/admin/blog-setting.vue";
import { createRouter, createWebHistory } from "vue-router";
import Admin from "@/layouts/admin/admin.vue";
import ArchiveList from "@/pages/frontend/archive-list.vue";
import CategoryList from "@/pages/frontend/category-list.vue";
import CategoryArticleList from '@/pages/frontend/category-article-list.vue'
const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      title: "首页",
    },
  },
  {
    path: "/archive/list", // 归档页
    component: ArchiveList,
    meta: {
      // meta 信息
      title: "Weblog 归档页",
    },
  },
  {
    path: "/category/list", // 分类页
    component: CategoryList,
    meta: {
      // meta 信息
      title: "Weblog 分类页",
    },
  },
  {
    path: '/category/article/list', // 分类文章页
    component: CategoryArticleList,
    meta: { // meta 信息
        title: 'Weblog 分类文章页'
    }
},
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "/admin/index",
        component: AdminIndex,
        meta: {
          title: "仪表盘",
        },
      },
      {
        path: "/admin/article/list",
        component: AdminArticleList,
        meta: {
          title: "文章管理",
        },
      },
      {
        path: "/admin/category/list",
        component: AdminCategoryList,
        meta: {
          title: "分类管理",
        },
      },
      {
        path: "/admin/tag/list",
        component: AdminTagList,
        meta: {
          title: "标签管理",
        },
      },
      {
        path: "/admin/blog/setting",
        component: AdminBlogSetting,
        meta: {
          title: "博客设置",
        },
      },
    ],
    meta: {
      requireAuth: true, // 需要登录
      title: "管理后台",
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
