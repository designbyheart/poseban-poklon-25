//Register components for a global usage
import Vue from 'vue'
import CommonHeader from './components/CommonHeader';
import NewsletterSection from './components/NewsletterSection';
import CommonFooter from './components/CommonFooter';
import ProfileSidebar from './components/profile/Sidebar';
import ProfileForm from './components/profile/ProfileForm';
import ShippingAddresses from './components/profile/ShippingAddresses';
import NewsletterForm from './components/profile/NewsletterForm';
import ProductCarousel from './components/product/ProductCarousel';
import CategoryBanner from './components/category/CategoryBanner';
import CategorySidebar from './components/category/CategorySidebar';
import CategoryProducts from './components/category/CategoryProducts';
import CategoriesBreadcrumb from './components/category/CategoriesBreadcrumb';
import HomeSlider from './components/home/HomeSlider';
import RecommendedProducts from './components/product/RecommendedProducts';
import PopularProducts from './components/product/PopularProducts';
import FilterBar from './components/home/FilterBar';
import HeaderCart from './components/cart/HeaderCart';
import AddToCart from './components/cart/AddToCart';
import StarsRating from './components/review/Stars';
import CheckoutPage from './components/checkout/CheckoutPage';
import InformationSidebar from './components/information/InformationSidebar';
import CompanyTabs from './components/information/CompanyTabs';
import TextareaWithCounter from './components/common/TextareaWithCounter';
import HeaderWishlist from './components/wishlist/HeaderWishlist.vue';
import UserWishlist from './components/wishlist/UserWishlist.vue';
import WishlistButtons from './components/wishlist/WishlistButtons.vue';
import AuthModal from './components/common/AuthModal';
import Toasted from 'vue-toasted';

//Header
Vue.component(CommonHeader.name, CommonHeader);

//Newsletter
Vue.component(NewsletterSection.name, NewsletterSection);

//Footer
Vue.component(CommonFooter.name, CommonFooter);

//Cart
Vue.component(HeaderCart.name, HeaderCart);
Vue.component(AddToCart.name, AddToCart);

//Checkout
Vue.component(CheckoutPage.name, CheckoutPage);

//Auth
Vue.component(AuthModal.name, AuthModal);

//Profile
Vue.component(ProfileSidebar.name, ProfileSidebar);
Vue.component(ProfileForm.name, ProfileForm);
Vue.component(ShippingAddresses.name, ShippingAddresses);
Vue.component(NewsletterForm.name, NewsletterForm);

//Home
Vue.component(HomeSlider.name, HomeSlider);
Vue.component(FilterBar.name, FilterBar);

//Product
Vue.component(ProductCarousel.name, ProductCarousel);
Vue.component(RecommendedProducts.name, RecommendedProducts);
Vue.component(PopularProducts.name, PopularProducts);
Vue.component(StarsRating.name, StarsRating);

//Category
Vue.component(CategoryBanner.name, CategoryBanner);
Vue.component(CategorySidebar.name, CategorySidebar);
Vue.component(CategoryProducts.name, CategoryProducts);
Vue.component(CategoriesBreadcrumb.name, CategoriesBreadcrumb);

//Information page
Vue.component(InformationSidebar.name, InformationSidebar);
Vue.component(CompanyTabs.name, CompanyTabs);

//Common
Vue.component(TextareaWithCounter.name, TextareaWithCounter);

//Wishlist
Vue.component(HeaderWishlist.name, HeaderWishlist);
Vue.component(UserWishlist.name, UserWishlist);
Vue.component(WishlistButtons.name, WishlistButtons);

//Notifications
Vue.use(Toasted);