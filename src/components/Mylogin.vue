<template>
    <div>
         <!-- 登入 -->
      <el-dialog  width="400px" @close="close" @open="open" :visible="this.$store.state.showlogin">
        <el-form >
          <p style="text-align:center;font-size:20px;margin-bottom:10px">登入</p>
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input show-password v-model="password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <p style="text-align:center;font-size:15px;margin-bottom:10px;color:red"
        v-show="logintitle">登入失败，请重试！</p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button :plain="true" type="primary" @click="login();">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 登入 end -->
    </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
    name:'Mylogin',
    data(){
        return{
            userName:'',
            password:'',
            // 登入表单
            formLabelWidth: '80px',
            logintitle:false,
        }
    },
    
    methods:{
        ...mapActions(["setUser","setShowlogin"]),
        open(){
        },
        close(){
            this.setShowlogin(false)
        },

        // 登入请求
        login(){
            this.$axios.post("/api/users/login", {
                    userName: this.userName,
                    password: this.password
            }).then(res =>{
            // 异步操作
                if (res.data.code === "001") {
                console.log(res.data);
                
                this.setShowlogin(false)

                let user = JSON.stringify(res.data.user)
                localStorage.setItem("user", user);
                // 登录信息存到vuex
                this.setUser(res.data.user);
                this.logsec()
                }else{
                this.logintitle = true
                    console.log(111);
                
                }
            })
        },
        // 登入成功信息
        logsec() {
          this.$message('登入成功！');
        },
        // 取消表单
        cancel(){
            this.$store.commit("setShowlogin",false);
        }
    }
}
</script>
<style  scoped>
/* 登入表单按钮 */
.dialog-footer{
  margin-top:-20px ;
  text-align: center;
}
</style>