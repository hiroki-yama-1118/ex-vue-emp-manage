<template>
  <div>dubby</div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class LogoutAdmin extends Vue {

  /**
   * ログアウトをする.
   */
  async created(): Promise<void> {
    const response = await axios.get(
      "http://35.86.97.127:8080/ex-emp-api/logout"
    );
    console.dir("response:" + JSON.stringify(response));
    this["$router"].push("/loginAdmin");
  }
}
</script>

<style></style>
