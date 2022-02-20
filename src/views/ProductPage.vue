<template>
  <div id="page-wrap">
    <ProductGrid :products="products" />
  </div>
</template>
<script>
import { products } from "../fake-data";
import ProductGrid from "../components/ProductGrid";
export default {
  name: "ProductsPage",
  components: {
    ProductGrid,
  },
  data: function () {
    return {
      products,
    };
  },
};
</script>
