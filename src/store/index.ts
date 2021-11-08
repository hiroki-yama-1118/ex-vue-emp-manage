import Vue from "vue";
import Vuex from "vuex";
import { Employee } from "../types/employee";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    totalEmployeeCount: 0, //従業員数
    employees: new Array<Employee>(), //従業員一覧
  }, // end state

  actions: {
    /**
     * 従業員一覧情報を WebAPI から取得 して mutation を呼び出す.
     */
    async getEmployeeList(context, payload) {
      const response = await axios.get(
        "http://34.220.54.161:8080/ex-emp/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));
      payload = response.data;
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 従業員一覧情報を作成してstateに格納する.
     */
    showEmployeeList(state, payload) {
      state.totalEmployeeCount = payload.totalEmployeeCount;

      for (const employee of payload.employees) {
        state.employees.push(
          new Employee(
            employee.id,
            employee.name,
            employee.image,
            employee.gender,
            employee.hireDate,
            employee.mailAddress,
            employee.zipCode,
            employee.address,
            employee.telephone,
            employee.salary,
            employee.characteristics,
            employee.dependentsCount
          )
        );
      }
      //上記のfor文は"state.employees=payload.employees" でも書き換えられる
    },
  }, // end mutations
  getters: {
    /**
     * 従業員数を返す.
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },
    /**
     * 従業員一覧を返す
     */
    getEmployees(state) {
      return state.employees;
    },
    /**
     * ID から従業員を検索し返す
     */
    getEmployeeById(state) {
      return (id: number) => {
        const newArray = [];
        for (const employee of state.employees) {
          if (employee.id == id) {
            newArray.push(id);
          }
        }
        return newArray[0];
      };
    },
  }, // end getters
  modules: {}, // end modules
});
