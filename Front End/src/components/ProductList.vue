<template>
  <div v-if="products && products.length">
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-else>You haven't added anything into cart yet</div>
</template>
<script>
import ProductListItem from "./ProductListItem.vue";
export default {
  name: "ProductList",
  components: { ProductListItem },
  props: {
    products: {
      reuired: true,
      type: Array,
    },
  },
};
</script>
