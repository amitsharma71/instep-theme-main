import { getToken, getUserId } from "./auth";
import AdminLayout from "./AdminLayout";
// import Allunit from "../component/admin/dashboardPage/sideNavOption/Products/Allunit";
// import Alltaxes from "../component/admin/dashboardPage/sideNavOption/Products/Alltaxes";
import Productsale from "../component/admin/dashboardPage/sideNavOption/Reports/Productsale.js";
import Orderreport from "../component/admin/dashboardPage/sideNavOption/Reports/Orderreport.js";
import Categorywise from "../component/admin/dashboardPage/sideNavOption/Reports/Categorieswisesales.js";
import Salesamount from "../component/admin/dashboardPage/sideNavOption/Reports/Salesamountreport.js";
import SignUp from "../component/user/Signup/signup.js";
import { Navigate } from "react-router-dom";
import Layout from "./Layout.js";
import CustomerLayout from "./CustomerLayout.js";
import DeliveryStatus from "../component/admin/dashboardPage/sideNavOption/Reports/Deliverystatusreport.js";
import ProductForm from "../component/admin/addProductDetails/addProductFrom.js";
import Usernavbar from "../component/user/UserHeader/usernavbar/usernavbar.js";
import SignIn from "../component/user/signin/sign.js";
import Home from "../component/user/UserHeader/home/homepage.js";
import Subcategory from "../component/user/filterbyCategory/subcategory.js";
import Searchproduct from "../component/SearchProducts/searchProduct.js";
import AddToCartProduct from "../component/user/AddCartprouct/addtocart.js";
import Homecategory from "../component/user/filterbyCategory/homecategory.js";
import Profile from "../component/user/profile/Profile.jsx";
import AllProductDetail from "../component/user/UserHeader/allProduct/allProductDetail.js";
import ProductDetails from "../component/user/Products/productDetails.js";
import Aboutus from "../component/user/aboutUs/aboutus.js";
import Delieverydetail from "../component/user/placeOrder/delieverydetail.js";
import Payment from "../component/user/paymentsdetail/payment.js";
import Shipping from "../component/user/shippingDetail/shipping.js";
import TermsofuseDetail from "../component/user/termofuseDetail/termsDetail.js";
import Security from "../component/user/securityDetail/security.js";
import Privacy from "../component/user/privacyDetail/privacy.js";
import Sliderpost from "../component/admin/dashboardPage/sideNavOption/Products/Sliderpost.js";
import Alltypesubcategory from "../component/admin/dashboardPage/sideNavOption/Products/Alltypesubcategory.js";
import Payments from "../component/user/placeOrder/startpayment.js";
import Customer from "../component/admin/dashboardPage/sideNavOption/customerDetail/customer.js";
import ProductSpecification from "../component/admin/addProductDetails/productSpecification.js";
import OrderConfirmation from "../component/user/placeOrder/orderConfirm/orderConfirmation.js";
import Trendingproducts from "../component/admin/dashboardPage/sideNavOption/Products/Trendingproducts.js";
import Editprofile from "../component/user/Editprofile/editprofile.js";
import SliderPages from "../component/user/UserHeader/sliderPages/sliderPages.js";
import Headeradmin from "../component/admin/dashboardPage/sideNavOption/Products/Headeradmin.js";
import Onlymobile from "../component/user/Products/sliderSubcategory.js";
import Wishlistinform from "../component/user/wshlistData/wishlistDataInfo.js";
import SubCategoryfilter from "../component/user/filterbyCategory/subCategoryfilter.js";
import Careers from "../component/user/Careers/Careers.js";
import GrievanceRedressal from "../component/user/Grievance Redressal/GrievanceRedressal.js";
import ContactUs from "../component/user/contactUs/contactUs.js";
import OrderReport from "../component/admin/dashboardPage/sideNavOption/orders/orderReport.js";
import AllCategories from "../component/user/Allcategories/allCategories.js";
import Discount from "../component/user/UserHeader/sliderPages/discount.js";
import OrderCancellation from "../component/user/Cancellation & return/OrderCancellation.js";
import Returnpolicy from "../component/user/Return Policy/returnpolicy.js";
import EPRcompliance from "../component/user/EPR/EPRcompliance.js";
import Admindashboard from "../component/admin/dashboardPage/sideNavOption/dashboardAdmin/dashboardpage.js";
import Possystemtype from "../component/admin/dashboardPage/sideNavOption/posSystems/Systempos.js";
import Allproductss from "../component/admin/dashboardPage/sideNavOption/Products/Allproducts.js";
import Orders from "../component/admin/dashboardPage/orderPage/Orders.js";
import Alllocations from "../component/admin/dashboardPage/sideNavOption/Stocks/Alllocations.js";
import Bulkemail from "../component/admin/dashboardPage/sideNavOption/Newsletter/Bulkemailtype.js";
import StockFiles from "../component/admin/dashboardPage/sideNavOption/Stocks/Addstocks.js";
import Subscribeuser from "../component/admin/dashboardPage/sideNavOption/Newsletter/Subscribers.js";
import Allcategories from "../component/admin/dashboardPage/sideNavOption/Products/Allcategory.js";
import Allsubcategorys from "../component/admin/dashboardPage/sideNavOption/Products/Allsubcategory.js";
import Allbrands from "../component/admin/dashboardPage/sideNavOption/Products/Allbrand.js";


const role = getUserId() ? getUserId()?.userRole : null;
// console.log(role, "aaasdfgfds");
const isLoggedIn = getToken();
const protects = {
  user: [
    {
      path: "/",
      element: isLoggedIn ? <Layout /> : <Navigate to="/" />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/userheader", element: <Usernavbar /> },
        { path: "/productdetail/:_id", element: <ProductDetails /> },
        { path: "/subcategory/:subcategory", element: <Subcategory /> },
        { path: "/search", element: <Searchproduct /> },
        { path: "/addtocart", element: <AddToCartProduct /> },
        {
          path: "/category/:categoryName/:subcategoryName",
          element: <Homecategory />,
        },
        { path: "/category/:categoryName", element: <Homecategory /> },
        { path: "/profile", element: <Profile /> },
        { path: "/allproduct", element: <AllProductDetail /> },
        { path: "/aboutus", element: <Aboutus /> },
        { path: "/deliverydetail/:_id", element: <Delieverydetail /> },
        { path: "/paymentdetail", element: <Payment /> },
        { path: "/shippingdetail", element: <Shipping /> },
        { path: "/termofuse", element: <TermsofuseDetail /> },
        { path: "/paymentsecurity", element: <Security /> },
        { path: "/privacypolicy", element: <Privacy /> },
        { path: "/payment", element: <Payments /> },
        { path: "/contactus", element: <ContactUs /> },
        { path: "careers", element: <Careers /> },
        { path: "grievanceRedressal", element: <GrievanceRedressal /> },
        { path: "/orderconfirmation/:_id", element: <OrderConfirmation /> },
        { path: "/editprofile", element: <Editprofile /> },
        { path: "/salespage", element: <SliderPages /> },
        { path: "/slidersubcategory", element: <Onlymobile /> },
        { path: "/wishlist", element: <Wishlistinform /> },
        { path: "/allcategory", element: <AllCategories /> },
        { path: "/discountproducts", element: <Discount /> },
        { path: "/filterbycategory", element: <SubCategoryfilter /> },
        { path: "/ordercancellationandreturn", element: <OrderCancellation /> },
        { path: "/returnpolicy", element: <Returnpolicy /> },
        { path: "/orders", element: <Orders /> },
        { path: "/e-wastecompliance", element: <EPRcompliance /> },
        { path: "*", element: "NO PAGE FOUND" },
      ],
    },
  ],

  admin: [
    {
      path: "/",
      element: isLoggedIn ? <AdminLayout /> : <Navigate to="/" />,
      children: [
        { path: "/", element: <Admindashboard /> },
        { path: "/allproduct", element: <Allproductss /> },
        { path: "/addstock", element: <StockFiles /> },
        { path: "/allloation", element: <Alllocations /> },
        { path: "/subscriber", element: <Subscribeuser /> },
        { path: "/allcategories", element: <Allcategories /> },
        { path: "/allsubcategory", element: <Allsubcategorys /> },
        { path: "/allsubtypecategory", element: <Alltypesubcategory /> },
        { path: "/allbrands", element: <Allbrands /> },
        // { path: "/allunit", element: <Allunit /> },
        // { path: "/alltaxes", element: <Alltaxes /> },
        { path: "/orderreport", element: <Orderreport /> },
        { path: "/trackorder", element: <OrderReport /> },
        { path: "/categorywise", element: <Categorywise /> },
        { path: "/bulkemails", element: <Bulkemail /> },
        { path: "/productsale", element: <Productsale /> },
        { path: "/salesamountreport", element: <Salesamount /> },
        { path: "/deliverystatusreport", element: <DeliveryStatus /> },
        { path: "/product", element: <ProductForm /> },
        { path: "/possystem", element: <Possystemtype /> },

        { path: "/slider", element: <Sliderpost /> },
        { path: "/customerdetail", element: <Customer /> },
        { path: "/orders", element: <Orders /> },
        {
          path: "/productspecification/:id",
          element: <ProductSpecification />,
        },
        { path: "/trending", element: <Trendingproducts /> },
        { path: "/Headeradmin", element: <Headeradmin /> },
        { path: "*", element: "NO PAGE FOUND" },
      ],
    },
  ],
  default: [
    {
      path: "/",
      element: <CustomerLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/productdetail/:_id", element: <ProductDetails /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/subcategory/:subcategory", element: <Subcategory /> },
        { path: "/search", element: <Searchproduct /> },
        { path: "/category/:categoryName", element: <Homecategory /> },
        { path: "/allproduct", element: <AllProductDetail /> },
        { path: "/aboutus", element: <Aboutus /> },
        { path: "/deliverydetail", element: <Delieverydetail /> },
        { path: "/paymentdetail", element: <Payment /> },
        { path: "/shippingdetail", element: <Shipping /> },
        { path: "/termofuse", element: <TermsofuseDetail /> },
        { path: "/paymentsecurity", element: <Security /> },
        { path: "/privacypolicy", element: <Privacy /> },
        { path: "/payment", element: <Payments /> },
        { path: "/salespage", element: <SliderPages /> },
        { path: "/slidersubcategory", element: <Onlymobile /> },
        { path: "/contactus", element: <ContactUs /> },
        { path: "careers", element: <Careers /> },
        { path: "GrievanceRedressal", element: <GrievanceRedressal /> },
        { path: "/allcategory", element: <AllCategories /> },
        { path: "/filterbycategory", element: <SubCategoryfilter /> },
        {
          path: "/category/:categoryName/:subcategoryName",
          element: <Homecategory />,
        },
        { path: "/category/:categoryName", element: <Homecategory /> },
        { path: "/discountproducts", element: <Discount /> },
        { path: "/ordercancellationandreturn", element: <OrderCancellation /> },
        { path: "/returnpolicy", element: <Returnpolicy /> },
        { path: "/e-wastecompliance", element: <EPRcompliance /> },
        { path: "*", element: "NO PAGE FOUND" },
      ],
    },
  ],
};

export const protect =
  role && isLoggedIn ? protects[role] : protects["default"];
export const defaultProtect = protects["default"];
