<style lang="less">
@import "./own-space.less";
</style>

<template>
  <div class="own-space">
    <Card>
      <Form ref="userForm" :model="userForm" :label-width="100" label-position="right">
        <FormItem label="用户账号：">
          <span>{{userForm.userName}}</span>
        </FormItem>
        <FormItem label="用户姓名：">
          <Input v-model="userForm.nickName" style="width: 200px;"></Input>
        </FormItem>
        <FormItem label="邮箱：">
          <Input v-model="userForm.email" style="width: 200px;"></Input>
        </FormItem>
        <FormItem label="负责的系统：">
          <template v-for="item in SystemList">
            <Tag type="border" :key="item.id" color="default" v-show="userForm.systems.includes(item.id)">{{item.title}}</Tag>
          </template>
          <Button type="primary" size="small" @click="editSystems">编辑</Button>
        </FormItem>
        <FormItem label="所属部门：">
          <span>{{ userForm.departmentTitle }}</span>
        </FormItem>
        <FormItem label="创建时间：">
          <span>{{ userForm.createdAt | timeFormat }}</span>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            style="width: 100px;margin-right:5px"
            :loading="saveLoading"
            @click="saveEdit"
          >保存</Button>
        </FormItem>
      </Form>
    </Card>
    <!-- 系统列表 -->
    <Modal title="选择负责的系统" v-model="systemModalVisible" :mask-closable='false' :width="500" :styles="{top: '30px'}" class="systemModal">
      <Tree
        ref="sysTree"
        empty-text="请联系管理员录入系统列表"
        :data="systemData"
        show-checkbox
        check-directly
        multiple>
      </Tree>
      <Spin size="large" v-if="treeLoading"></Spin>
      <div slot="footer">
        <Button type="text" @click="cancelsystemEdit">取消</Button>
        <Button type="primary" @click="submitsystemEdit">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import moment from "moment";
import {
  userInfoEdit,
  initSystem,
  getSystemTree,
  getSystemList
} from "@/api/index";
import Cookies from "js-cookie";
export default {
  name: "ownspace_index",
  data() {
    return {
      accessToken: {},
      userForm: {
        userId: "",
        userName: "",
        nickName: "",
        email: "",
        status: "",
        departmentTitle: "",
        createdAt: "",
        systems: [] //负责的系统
      },
      defaultList: [
        {
          url: ""
        }
      ],
      SystemList: [],
      uploadList: [],
      viewImage: false,
      imgUrl: "",
      saveLoading: false,
      systemModalVisible: false,
      treeLoading: false,
      systemData: [],
      editSystem: [],
      selectAllFlag: false
    };
  },
  filters: {
    timeFormat: function(data) {
      return moment(data).format('YYYY年MM月DD日');
    }
  },
  methods: {
    init() {
      this.accessToken = {
        accessToken: this.getStore("accessToken")
      };
      let v = JSON.parse(Cookies.get("userInfo"));
      // 转换null为""
      for (let attr in v) {
        if (v[attr] === null && (arr.constructor != Array)) {
          v[attr] = "";
        }
      }
      let str = JSON.stringify(v);
      let userInfo = JSON.parse(str);
      this.userForm = userInfo;
      console.log(this.userForm)
      this.getSystemList();
    },
    getSystemList() {
      getSystemList().then(res => {
        if (res.code===1) {
          this.SystemList = res.data
        }
      })
    },
    saveEdit() {
      this.saveLoading = true;
      let params = this.userForm;
      userInfoEdit(params).then(res => {
        this.saveLoading = false;
        if (res.code === 1) {
          this.$Message.success("保存成功");
          // 更新用户信息
          Cookies.set("userInfo", this.userForm);
        } else {
          this.$Message.error("保存失败");
        }
      });
    },
    editSystems() {
      this.treeLoading = true;
      getSystemTree().then(res => {
        this.treeLoading = false;
        if (res.code === 1) {
          //回显
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].children.length; j++) {
              if (this.userForm.systems.includes(res.data[i].children[j].id)) {
                this.$set(res.data[i].children[j], 'checked', true)
              } else {
                this.$set(res.data[i].children[j], 'checked', false)
              }
            }
          }
          this.systemData = res.data;
          this.systemModalVisible = true;
        }
      })
    },
    cancelsystemEdit() {
      this.systemModalVisible=false;
    },
    submitsystemEdit() {
      let systemIds = [];
      let checkedNodes = this.$refs.sysTree.getCheckedNodes();
      checkedNodes.forEach(function(e) {
        systemIds.push(e.id);
      });
      this.userForm.systems = systemIds;
      this.systemModalVisible = false;
    }
  },
  mounted() {
    this.init();
  }
};
</script>
