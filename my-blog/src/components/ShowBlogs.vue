<template>
  <div id="show-blogs">
      <h1>博客总览</h1>
      <input type="text" v-model="search" placeholder="点击搜索">
      <div class="single-blog" v-for="blog in filteredBlogs">
          <router-link v-bind:to="'/blog/'+ blog.id">
            <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
            <!-- <article v-html="blog.content">{{blog.content}}</article> -->
          </router-link>
      </div>
  </div>
</template>

<script>

export default {
  name: 'show-blogs',
  data(){
      return {
          blogs:[],
          search:"",
      }
  },
  created(){
      this.$http.get("https://vue-my-blog-3d81f.firebaseio.com/blog.json")
      .then(function(data){
         return data.json();
      })
      .then(function(data){
          var blogArray = [];
          for(let key in data){
              data[key].id = key;
              blogArray.push(data[key]);
          }
          this.blogs = blogArray;
          
      })
  },
  computed:{
      filteredBlogs:function(){
          return this.blogs.filter((blog)=>{
              return blog.title.match(this.search);
          })
      }
  },
  filters:{
      "to-uppercase":function(value){
          return value.toUpperCase();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#show-blogs{
	max-width: 800px;
	margin: 0 auto;
}

.single-blog{
	padding: 20px;
	margin: 20px 0;
	box-sizing: border-box;
	background: #eee;
  border: 1px dotted #aaa;
}

#show-blogs a{
  color: #444;
  text-decoration: none;
}

input[type="text"]{
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

</style>
