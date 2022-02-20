<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <product-list :products="cartItems" />
    <h3 id="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to Checkout</button>
  </div>
</template>
<script>
import { cartItems } from "../fake-data";
import ProductList from "../components/ProductList.vue";
export default {
  name: "CartPage",
  components: { ProductList },
  data: function () {
    return {
      cartItems,
    };
  },
  computed: {
    totalPrice: function () {
      let totalPrice = 0;
      this.cartItems.filter(function (product) {
        totalPrice += Number(product.price);
      });
      return totalPrice;
    },
  },
};
</script>
<style scoped>
h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

#total-price {
  padding: 16px;
  text-align: right;
}

#checkout-button {
  width: 100%;
}
</style>