<template>
  <div class="d">
    儿子：
    <son :aa="son" />
  </div>
</template>

<script>
import son from "@/pages/hotel/father";
export default {
  data() {
    return {
      son: [
        {
          name: "jack",
          age: 15,
          children: [
            {
              name: "rose",
              age: 15
            },
            {
              name: "john",
              age: 15
            }
          ]
        },
        {
          name: "tom",
          age: 15,
          children: [
            {
              name: "rose",
              age: 15
            },
            {
              name: "john",
              age: 15
            }
          ]
        }
      ]
    };
  },
  components: {
    son
  }
};
</script>

<style>
</style>