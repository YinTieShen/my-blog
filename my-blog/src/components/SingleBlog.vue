<template>
	<div id="single-blog">

    <h1>{{blog.title}}</h1>

    <div class="mes">
      <p>作者: {{blog.author}}</p>
      <ul>
        <li>分类：</li>
        <li v-for="category in blog.categories" :key="category">
          {{category}}
        </li>
		  </ul>
    </div>
    <hr>
		<article v-html="blog.content">{{blog.content}}</article>

        <div class="btn">
            <button @click="deleteSingleBlog()">删除博客</button>
            <button><router-link :to="'/edit/'+id">编辑此博客</router-link></button>
        </div>
    
	</div>
</template>

<script>
export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    this.$http
      .get("https://vue-my-blog-3d81f.firebaseio.com/blog/" + this.id + ".json")
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        this.blog = data;
      });
  },
  methods: {
    deleteSingleBlog() {
      this.$http
        .delete(
          "https://vue-my-blog-3d81f.firebaseio.com/blog/" + this.id + ".json"
        )
        .then(response => {
          this.$router.push({ path: "/" });
        });
    }
  }
};
</script>
<style>

a {
  text-decoration: none;
  color: white;
}
#single-blog *{
  list-style: none;
  margin: 0;
}
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 1px dotted #aaa;
}
#single-blog h1{
  margin: 5px;
  text-align: center;
}
#single-blog .mes{
  margin: 10px;
}
#single-blog p{
  padding: 0 5px;
}

#single-blog ul li{
  
  margin: 0 5px;
  float: left;
}
#single-blog ul::after{
  display: block;
  content: "";
  clear: both;
}
#single-blog .mes{
  display: flex;
  justify-content:center;
}
#single-blog article{
  margin: 10px;
}
#single-blog button {
  display: block;
  margin: 20px 5px;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 8px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
.btn {
  display: flex;
  flex-direction: row;
}
</style>