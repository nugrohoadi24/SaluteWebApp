import Vue from "vue"
import VueRouter from "vue-router"

import Splash from "@/page/splash.vue"
import Login from "@/page/Login.vue"
import ForgotPassword from "@/page/ForgotPassword.vue"

import Dashboard from "@/page"
import Account from "@/page/MyAccount"
import EditAccount from "@/page/MyAccount/Edit"
import Benefit from "@/page/MyBenefit"
import Rekanan from "@/page/Rekanan"
import RekananList from "@/page/Rekanan/List.vue"
import RekananDetail from "@/page/Rekanan/Detail.vue"
import BenefitDetail from "@/page/MyBenefit/Detail"

import History from "@/page/History"

import Klaim from "@/page/Klaim"
import KlaimDetail from "@/page/Klaim/KlaimDetail"
import SelectBenefit from "@/page/Klaim/SelectBenefit"
import FormCashless from "@/page/Klaim/FormCashless"
import FormReimburse from "@/page/Klaim/FormReimburse"
import SelectProvider from "@/page/Klaim/SelectProvider"

import Shop from "@/page/Shop"
import ProductList from "@/page/Shop/ProductList"
import ProductDetail from "@/page/Shop/ProductDetail"
import VoucherList from "@/page/Shop/VoucherList"
import VoucherDetail from "@/page/Shop/VoucherDetail"
import Pesanan from "@/page/Shop/Pesanan"

import PaymentMethod from "@/page/Shop/PaymentMethod"
import TransactionManual from "@/page/Shop/TransactionManual"
import PendingPayment from "@/page/Shop/PendingPayment"

import About from "@/page/About"
import Faq from "@/page/About/PertanyaanJawaban.vue"
import Info from "@/page/About/Pemberitahuan.vue"
import InfoDetail from "@/page/About/PemberitahuanDetail.vue"
import KetentuanPenggunaan from "@/page/About/KetentuanPenggunaan.vue"
import KebijakanPrivasi from "@/page/About/KebijakanPrivasi.vue"
import HubungiKami from "@/page/About/HubungiKami.vue"

import NotFound from "@/page/404.vue"

Vue.use(VueRouter)
var router = new VueRouter({
    mode:'hash',
    routes: [
    {
        path: "/splash",
        name: "Splash",
        component: Splash
    },
    {
        path: "/",
        name: "Login",
        component: Login
    },
    {
        path: "/forgot-password",
        name: "ForgotPassword",
        component: ForgotPassword
    },
    {
        path: "/home",
        name: "Dashboard",
        component: Dashboard,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/account",
        name: "account",
        component: Account,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/edit-account",
        name: "editAccount",
        component: EditAccount,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/benefit",
        name: "benefit",
        component: Benefit,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/benefit-detail",
        name: "benefitDetail",
        props: route => ({ queryid: route.query._id }),
        component: BenefitDetail,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/history",
        name: "history",
        component: History,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/rekanan",
        name: "rekanan",
        component: Rekanan,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/rekanan-list",
        name: "rekananList",
        component: RekananList,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/rekanan-detail",
        name: "rekananDetail",
        component: RekananDetail,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/shop",
        name: "shop",
        component: Shop,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/product-list",
        name: "ProductList",
        component: ProductList,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/product-detail",
        name: "ProductDetail",
        component: ProductDetail,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/voucher-list",
        name: "VoucherList",
        component: VoucherList,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/voucher-detail",
        name: "VoucherDetail",
        component: VoucherDetail,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/pesanan",
        name: "Pesanan",
        component: Pesanan,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/payment-method",
        name: "PaymentMethod",
        component: PaymentMethod,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/transaction-manual",
        name: "TransactionManual",
        component: TransactionManual,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/pending-payment",
        name: "PendingPayment",
        component: PendingPayment,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/about",
        name: "about",
        component: About,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/faq",
        name: "faq",
        component: Faq,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/info",
        name: "info",
        component: Info,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/info-detail",
        name: "infoDetail",
        props: route => ({ queryid: route.query._id }),
        component: InfoDetail,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/ketentuan-penggunaan",
        name: "ketentuanPenggunaan",
        component: KetentuanPenggunaan,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/kebijakan-privasi",
        name: "kebijakanPrivasi",
        component: KebijakanPrivasi,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/hubungi-kami",
        name: "hubungiKami",
        component: HubungiKami,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/klaim",
        name: "klaim",
        component: Klaim,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/klaim-detail",
        name: "klaimDetail",
        props: route => ({ queryid: route.query._id }),
        component: KlaimDetail,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/select-benefit",
        name: "SelectBenefit",
        props: route => ({ querytype: route.query.type }),
        component: SelectBenefit,
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/form-cashless",
        name: "FormCashless",
        component: FormCashless,
        props: route => ({ 
            queryid: route.query.id
        }),
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/form-reimburse",
        name: "FormReimburse",
        component: FormReimburse,
        props: route => ({ 
            queryid: route.query.id
        }),
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/select-provider",
        name: "SelectProvider",
        component: SelectProvider,
        props: route => ({ 
            queryid: route.query.id
        }),
        meta:{
            requiresAuth:true
        }
    },
    {
        path: "/404",
        component:NotFound
    },
    {
        path: "*",
        redirect: '/404'
    },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (Vue.prototype.$auth.getToken() == null) {
            next({
                path: '/',
                params: { nextUrl: to.fullPath }
            })
        } else {
          next();
        }
    } else {
      next();
    }
})

export default router