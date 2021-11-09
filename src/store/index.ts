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
     * @param context  コンテキストオブジェクト.
     * @param payload  JSON形式でコンポーネントから情報を受け取る.
     */
    async getEmployeeList(context, payload) {
      const response = await axios.get(
        "http://35.86.97.127:8080/ex-emp-api/employee/employees"
      );
      console.dir("response:" + JSON.stringify(response));
      payload = response.data;
      context.commit("showEmployeeList", payload);
    },
  }, // end actions
  mutations: {
    /**
     * 従業員一覧情報を作成してstateに格納する.
     * @param state  ステイトオブジェクト.
     * @param payload JSON形式でコンポーネントから情報を受け取る.
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
     * @param state ステイトオブジェクト
     * @returns 従業員数
     */
    getEmployeeCount(state) {
      return state.totalEmployeeCount;
    },
    /**
     * 従業員一覧を返す
     * @param state ステイトオブジェクト
     * @returns 従業員一覧
     */
    getEmployees(state) {
      return state.employees;
    },
    /**
     * ID から従業員を検索し返す
     * @param state ステイトオブジェクト
     * @returns 従業員IDから従業員を検索して返す
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
      //return(id:number){
      // return state.employees.filter((employee)=>employee.id=id)[0]
      //}
    },
  }, // end getters
  modules: {}, // end modules
});
