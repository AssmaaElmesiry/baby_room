import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@pages/home/Index.vue'
import ProductDetails from '@pages/products/ProductDetails/Index.vue'
import CartPage from '@pages/cart/Index.vue'
import CheckOutPage from '@pages/check_out/Index.vue'
import AboutUsPage from '@pages/about_us/Index.vue'
import ProductsShop from '@pages/products/Index.vue'
import NotFound from '@pages/not_found/Index.vue'
import WishListPage from '@pages/wishlist/Index.vue'
import ComparePage from '@pages/compare/Index.vue'
import LoginPage from '@pages/login/Index.vue'
import CreateAccount from '@pages/login/CreateAccount.vue'
import ForgotPass from '@pages/forgot_pass/Index.vue'
import ResetPassword from '@pages/forgot_pass/ResetPassword.vue'
import RegisterPage from '@pages/register/Index.vue'
import CategoryFilterPage from '@pages/products/CategoryFilterPage.vue'
import ContactUsPage from '@pages/contact_us/Index.vue'
import MyAccount from '@pages/account/Index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsShop,
    },
    {
      path: '/product/:id',
      name: 'product_details',
      component: ProductDetails,
      props: true
    },
    {
      path: '/category/:categoryId',
      name: 'CategoryFilter',
      component: CategoryFilterPage,
      props: true,
    },
    {
      path: "/cart",
      name: "cart",
      component: CartPage,
    },
    {
      path: "/about_us",
      name: "about_us",
      component: AboutUsPage,
    },
    {
      path: "/check_out",
      name: "check_out",
      component: CheckOutPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: "/wishlist",
      name: "wishlist",
      component: WishListPage,
    },
    {
      path: "/compare",
      name: "compare",
      component: ComparePage,
    },
    {
      path: "/login",
      name:"login",
      component: LoginPage
    },
    {
      path: "/create_account",
      name:"create_account",
      component: CreateAccount
    },
    {
      path: "/forgot_password",
      name:"forgot_password",
      component: ForgotPass
    },
    {
      path: "/reset_password",
      name:"reset_password",
      component: ResetPassword
    },
    {
      path: "/register",
      name:"register",
      component: RegisterPage
    },
    {
      path: "/contact_us",
      name:"contact_us",
      component: ContactUsPage
    },
    {
      path: "/My_Account",
      name: "MyAccount",
      component: MyAccount,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    };
  }

  
})

export default router
