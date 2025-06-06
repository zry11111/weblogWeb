<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale = zhCn
// import { loadOml2d } from 'oh-my-live2d';
// loadOml2d({
//   models: [
//     {
//       path: 'https://model.oml2d.com/Senko_Normals/senko.model3.json',
//       position: [-10, 20]
//     }
//   ]
// });
</script>
<template>
  <!-- 将全局的样式语言设置为中文 -->
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>

<style scoped>
/* 在这里自定义顶部加载 Loading 颜色 貌似没改成功*/
#nprogress .bar {
   background: #1b1b1b !important;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
