<template>
    <div class="login">
        
        <div class="login-box">
            <div class="avatar-box">
                <img src="../assets/logo.png" alt="">
            </div>
            <el-form  class="login-from"  label-width="0" ref="formRef" :model="form" :rules="loginRule">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input prefix-icon="el-icon-s-platform" v-model="form.password" type="password"></el-input>
                </el-form-item >
                <el-form-item class="box-btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="formRef">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                username:"admin",
                password:"123456"

            },
            loginRule:{
                name:[ { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
                        ],
                pas:[ { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在6 到 12 个字符', trigger: 'blur' }
                ]    
            }
        }
        
    },
    methods: {
        // 重置表单
        formRef(){
            this.$refs.formRef.resetFields()
        },
        login() {
            this.$refs.formRef.validate(async valid =>{
                if (!valid) return;
                const { data:res } = await this.$http.post("login",this.form)
                if(res.meta.status !== 200 )return this.$message.error("登录失败")
                this.$message.success("登录成功")
                console.log(res)
                window.sessionStorage.setItem('token',res.data.token)
                this.$router.push('/home')
            })
           
        }
    }
}
</script>
<style  scoped>
.login{
    background-color: #408bd6;
    height: 100%;
    }
.login-box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar-box{
    width: 130px;
    height: 130px;
    /* border: 1px solid ; */
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
}
.avatar-box > img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;    
}
.box-btns{
    display: flex;
    justify-content: flex-end;
}
.login-from{
    position: absolute;
    width: 100%;
    bottom: 0;
    box-sizing: border-box;
    padding: 0 20px ;
}
</style>