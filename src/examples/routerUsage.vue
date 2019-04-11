<template>
  <section>
    <header>
        <h1>请选择一个身份</h1>
      <input type="radio" v-model="role" name="admin" value='admin'>管理员
      <input type="radio" v-model="role" name="client" value='client'>普通用户
    </header>
    <p>
        <h1>请选择进入页面</h1>
        <a href=';'>后台管理</a>
        <a href=';'>商城</a>
        <a href=';'>个人信息</a>
    </p>
  </section>
</template>
    
<script>
export default {
  data() {
    return {
      role: "admin"
    };
  }
};
</script>
