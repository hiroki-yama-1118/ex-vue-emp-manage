<template>
  <div class="container">
    <div class="row">
      <form action="employeeList.html">
        <fieldset>
          <legend>従業員情報</legend>
          <table>
            <tr>
              <th nowrap>従業員名</th>
              <td>
                <span>{{ currentEmployee.name }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>写真</th>
              <td>
                <img v-bind:src="currentEmployeeImage" />
              </td>
            </tr>
            <tr>
              <th nowrap>性別</th>
              <td>
                <span>{{ currentEmployee.gender }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>入社日</th>
              <td>
                <span>{{ currentEmployee.hireDate }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>メールアドレス</th>
              <td>
                <span>{{ currentEmployee.mailAddress }}}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>郵便番号</th>
              <td>
                <span>{{ currentEmployee.zipCode }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>住所</th>
              <td>
                <span>{{ currentEmployee.address }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>電話番号</th>
              <td>
                <span>{{ currentEmployee.telephone }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>給料</th>
              <td>
                <span>{{ currentEmployee.salary }}円</span>
              </td>
            </tr>
            <tr>
              <th nowrap>特性</th>
              <td>
                <span>{{ currentEmployee.characteristics }}</span>
              </td>
            </tr>
            <tr>
              <th nowrap>扶養人数</th>
              <td>
                <div class="input-field col s12">
                  <div class="error" v-bind="errorMessage">
                    {{ errorMessage }}
                  </div>
                  <input
                    id="dependentsCount"
                    type="text"
                    class="validate"
                    value="3"
                    required
                  />
                  <label for="dependentsCount2">扶養人数</label>
                </div>
              </td>
            </tr>
          </table>

          <button class="btn btn-register waves-effect waves-light">
            更新
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "../types/employee";
import axios from "axios";
@Component
export default class EmployeeDetail extends Vue {
  private currentEmployee!: Employee; //対象の従業員オブジェクト
  private errorMessage = ""; //エラーメッセージ
  private currentEmployeeImage = ""; //対象の従業員のimageパス
  private currentDependentCount = 0; //対象の従業員の扶養人数

  /**
   * Vuex ストアの Getter 経由で受け取ったリクエ ストパラメータの ID から1件の従業員情報を取得する
   */
  created(): void {
    const employeeId = parseInt(this["$route"].params.id);

    this.currentEmployee = this["$store"].getters.getEmployeeById(employeeId);
    console.log("this.currentEmployee:" + this.currentEmployee);

    this.currentEmployeeImage =
      "http://35.86.97.127:8080/ex-emp-api/img/" + this.currentEmployee.image;

    this.currentDependentCount = this.currentEmployee.dependentsCount;
  }
}
</script>

<style></style>
