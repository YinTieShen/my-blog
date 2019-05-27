<template>
  <div id="editor">
    <h2>添加博客</h2>
    <form v-if="!submitted"  action="">
        <label for="">博客标题</label>
        <input type="text" v-model="blog.title" required >

        <label for="">博客内容</label>
        <!-- <div id="editor"></div> -->
        <div ref="editor" style="text-align:left"></div>
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
<script src="https://unpkg.com/wangeditor@3.1.1/release/wangEditor.min.js"></script>
<script>
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      editorContent: "",
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["铁燊", "老铁", "小燊"],
      submitted: false
    };
  },
  mounted() {
    var editor = new E(this.$refs.editor);
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
  },
  methods: {
    getContent: function() {
      this.blog.content = editor2.txt.html();
    },
    post() {
      this.blog.content = this.editorContent;
      this.$http
        .post("https://vue-my-blog-3d81f.firebaseio.com/blog.json", this.blog)
        .then(function(data) {
          console.log(data);
          this.submitted = true;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#editor {
  margin: 20px auto;
  max-width: 800px;
  padding: 20px;
}

label {
  display: block;
  margin: 20px 0 10px;
}

input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
  padding: 8px;
}

#add-blog * {
  box-sizing: border-box;
}
textarea {
  height: 200px;
}
#checkboxes label {
  display: inline-block;
  margin-top: 0;
}
#checkboxes input {
  display: inline-block;
  margin-right: 10px;
}
button {
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
#preview {
  padding: 10px 20px;
  border: 1px dotted #ccc;
  margin: 30px 0;
}

h3 {
  margin-top: 10px;
}
</style>
