<template>
  <div class="container">
    <div>従業員数:{{ employeeCount }}人</div>
    <div class="row">
      <table class="striped">
        <thead>
          <tr>
            <th>名前</th>
            <th>入社日</th>
            <th>扶養人数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee of employees" v-bind:key="employee.id">
            <td>
              <router-link :to="'/employeeDetail/' + employee.id">
                {{ employee.name }}
              </router-link>
            </td>
            <td>{{ employee.hireDate }}</td>
            <td>{{ employee.dependentsCount }}人</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Employee } from "../types/employee";

@Component
export default class EmployeeList extends Vue {
  /**
   * Vuex ストアのアクション経由で非同期で WebAPI から従業員一覧を取得する
   */
  created(): void {
    this["$store"].dispatch("getEmployeeList");
  }
  /**
   * 非同期で取得した Vuex ストア内の従業員数を取得し返す
   */
  get employeeCount(): number {
    return this["$store"].getters.getEmployeeCount;
  }
  /**
   * 非同期で取得した Vuex ストア内の従業員一覧を取得し返す
   */
  get employees(): Array<Employee> {
    return this["$store"].getters.getEmployees;
  }
}
</script>

<style></style>
