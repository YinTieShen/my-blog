<template>
  <div id="editorBlog">
    <h2>编辑博客</h2>
    <form v-if="!submitted"  action="">
        <label for="">博客标题</label>
        <input type="text" v-model="blog.title" required >

        <label for="">博客内容</label>
        <div ref="editorBlog" style="text-align:left"></div>
        <!-- <textarea name="" id="" cols="30" rows="10" v-model="blog.content"></textarea> -->
        <div id="checkboxes">
            <label for="">Vue.js</label>
            <input type="checkbox" value="Vue.js" v-model="blog.categories">
            <label for="">Node.js</label>
            <input type="checkbox" value="Node.js" v-model="blog.categories">
            <label for="">React.js</label>
            <input type="checkbox" value="React.js" v-model="blog.categories">
            <label for="">Angular4.js</label>
            <input type="checkbox" value="Angular4.js" v-model="blog.categories">
        </div>

        <label for="">作者</label>
        <select v-model="blog.author">
            <option v-for="author in authors">
                {{author}}
            </option>
        </select>

        <button v-on:click.prevent='post'>发布博客</button>
    </form>

    <div v-if="submitted" >
        <h3>您的博客发布成功</h3>
    </div>

    <!-- <div id="preview">
        <h3>总览</h3>
        <p>标题： {{blog.title}}</p>
        <p>内容： </p>
        <p>{{blog.content}}</p>
        <p>博客分类</p>
        <ul>
            <li v-for="category in blog.categories">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
    </div> -->
  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "editorBlog",
  data() {
    return {
      editor:null,
      editorContent:"123as",
      id:this.$route.params.id,
      blog: {},
      authors: ["铁燊", "老铁", "小燊"],
      submitted:false,
    
    };
  },
  created(){
      this.fetchData();
  },
  mounted() {
    var editor = new E(this.$refs.editorBlog);
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "justify", // 对齐方式
      "image", // 插入图片
      "code", // 插入代码
      "undo", // 撤销
      "redo" // 重复
    ];
    editor.create();
    this.editor = editor;
  },
  methods: {
      fetchData(){
           this.$http
        .get("https://vue-my-blog-3d81f.firebaseio.com/blog/"+this.id+".json")
        .then(response =>{
            this.blog = response.body;
            this.editorContent = this.blog.content;
            this.editor.txt.html(this.editorContent);
        })
      },
    post() {
      this.blog.content = this.editorContent;
      this.$http
        .put("https://vue-my-blog-3d81f.firebaseio.com/blog/"+this.id+".json", this.blog)
        .then(function(data) {
          // console.log(data);
          this.submitted = true;
        
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#editorBlog{
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}

label{
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],textarea,select{
  display: block;
  width: 100%;
  padding: 8px;
}

 #editorBlog *{
  box-sizing: border-box;
}
textarea{
  height: 200px;
}
#checkboxes label{
  display: inline-block;
  margin-top: 0;
}
#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}
button{
  display: block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border: 0;
  padding: 14px;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
#preview{
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h3{
  margin-top: 10px;
}

</style>
