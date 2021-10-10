<template>
  <div>
    <el-form
      ref="addFormRef"
      label-width="70px"
      :model="addForm"
      :rules="addFormRules"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary" @click="editUserInfo">确 定</el-button>
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
  async created() {
    let id = this.$route.query.id
    console.log(this.$route)
    // console.log(this.$route, this.$route.params);

    const { data: res } = await this.$http.get("users/" + id);
    if (res.meta.status !== 200) {
      return this.$message.error("查询失败");
    }
    // console.log(res.data);
    this.addForm.username = res.data.username;
    this.addForm.email = res.data.email;
    this.addForm.mobile = res.data.mobile;
  },
  methods: {
    editUserInfo() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        // 发起修改表单的与验证
        const { data: res } = await this.$http.put(
          "uesrs/" + this.$route.params.id,
          {
            email: this.addForm.email,
            mobile: this.addForm.mobile,
          }
        );
        // console.log(this.editForm.id);
        // if (res.meta.status !== 200) {
        //   return this.$message.error("更新用户失败！");
        // }
        // 关闭对话框
        // this.editDialogVisible = false;
        // 刷新数据列表
        // this.getUserList();
        // 修改成功
        this.$message.success("更新用户信息成功");
        this.$router.push('/users')
      });
    },
  },
};
</script>