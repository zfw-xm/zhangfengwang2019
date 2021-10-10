<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path:'/users'}">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户xinzeng</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 内容主体区域 -->
    <el-form
      ref="addFormRef"
      label-width="70px"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addForm.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="over">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </div>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, cd) => {
      const regEmail =
        /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
      if (regEmail.test(value)) {
        return cd();
      } else {
        cd(new Error("请输入合法邮箱"));
      }
    };
    const checkMobile = (rule, value, cb) => {
      let reg =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (reg.test(value)) {
        cb();
      } else {
        cb(new Error("手机号码格式不正确"));
      }
    };
    return {
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加表单验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 8,
            message: "用户名长度在3~8个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名长度在6~15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          // { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入用手机号码", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        this.$router.push('/users')
        // 重新获取用户列表
       
      });
    },
    over(){
        this.$router.push('/users')
    }
  },
};
</script>