<template>
  <div>
    <div class="container">
      <div class="row register-page">
        <div class="error" v-bind="errorMessage">
          {{ errorMessage }}
        </div>
        <form class="col s12" id="reg-form">
          <div class="row">
            <div class="input-field col s6">
              <input
                id="last_name"
                type="text"
                class="validate"
                required
                v-model="lastName"
              />
              <label for="last_name">姓</label>
            </div>
            <div class="input-field col s6">
              <input
                id="first_name"
                type="text"
                class="validate"
                required
                v-model="firstName"
              />
              <label for="first_name">名</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="email"
                type="email"
                class="validate"
                required
                v-model="mailAddress"
              />
              <label for="email">メールアドレス</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input
                id="password"
                type="password"
                class="validate"
                minlength="8"
                required
                v-model="password"
              />
              <label for="password">パスワード</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s6">
              <button
                type="button"
                class="btn btn-large btn-register waves-effect waves-light"
                v-on:click="registerAdmin"
              >
                登録
                <i class="material-icons right">done</i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
@Component
export default class RegisterAdmin extends Vue {
  private errorMessage = "";
  private lastName = "";
  private firstName = "";
  private mailAddress = "";
  private password = "";

  /**
   * 管理者情報を登録する
   */
  async registerAdmin(): Promise<void> {
    //console.log("registerAdminよばれた");

    const response = await axios.post(
      "http://35.86.97.127:8080/ex-emp-api/insert",
      {
        name: this.lastName + " " + this.firstName,
        mailAddress: this.mailAddress,
        password: this.password,
      }
    );
    //console.log("registerAdminよばれた２");
    console.dir("response:" + JSON.stringify(response));
    if (response.data.status == "success") {
      //console.log("success:" + response.data.status);

      this["$router"].push("/loginAdmin");
    } else if (response.data.status == "error") {
      //console.log("error" + response.data.status);

      return (this.errorMessage = response.data.message);
    }
  }
}
</script>

<style scoped>
.register-page {
  width: 600px;
}
</style>
