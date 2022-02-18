import { createRouter, createWebHistory } from 'vue-router'
import ProductPage from '../views/ProductPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import CartPage from '../views/CartPage.vue'

const routes = [
  {
    path: '/products',
    name: 'Products',
    component: ProductPage
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetailPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/',
    redirect: '/products'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
