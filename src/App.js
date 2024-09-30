import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './components/dashboard/Homepage';
import Login from './components/dashboard/login';
import Register from './components/dashboard/register';
import HomepageCustomer from './components/customer/homepage';
import Restaurants from './components/customer/restaurants';
import Restaurant from './components/customer/restaurantById';
import Cart from './components/customer/cart';
import Payment from './components/customer/payment';
import HomepageRestaurant from './components/restaurant/homepage';
import RestaurantMenu from './components/restaurant/restaurantMenu';
import RestaurantOrder from './components/restaurant/restaurantOrder';
import MenuById from './components/customer/menuById';
import DeleteCartItem from './components/customer/deleteCartItem';
import MyOrders from './components/customer/orders';
import MyOrderDetails from './components/customer/orderDetails';
import DeleteMenu from './components/restaurant/deleteRestaurantMenu';
import EditMenu from './components/restaurant/editRestaurantMenu';
import OrderEdit from './components/restaurant/restaurantOrderEdit';
import RegisterRestaurant from './components/dashboard/registerRestaurant';
import RegisterDeliveryBoy from './components/dashboard/registerDeliveryBoy';
import HomePageDelivery from './components/deliveryBoy/homepage';
import OrderDetailsDelivery from './components/deliveryBoy/orderdetails';
import CollectedOrders from './components/deliveryBoy/collectedorders';
import CollectedOrderUpdate from './components/deliveryBoy/collectedorderUpdate';
import RestaurantCollectedOrder from './components/restaurant/restaurantCollectedOrder';
import UpdateDetails from './components/restaurant/updateDetails';



function App() {
  
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>

          <Route path='/' element={<HomePage/>} />

          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Register/>} />
          <Route path='/signup/restaurant' element={<RegisterRestaurant/>} />
          <Route path='/signup/deliveryboy' element={<RegisterDeliveryBoy/>} />
          
          
          <Route path='/homepage' element={<HomepageCustomer/>} />
          <Route path='/restaurants' element={<Restaurants/>} />
          <Route path='/restaurant/:id' element={<Restaurant/>} />

          <Route path='/delivery/homepage' element={<HomePageDelivery/>} />
          <Route path='/delivery/orderdetails/:id' element={<OrderDetailsDelivery/>} />
          <Route path='/delivery/order/collected' element={<CollectedOrders/>} />
          <Route path='/delivery/order/edit/:id' element={<CollectedOrderUpdate/>} />

          
          <Route path='/menu/:id' element={<MenuById/>} />

          <Route path='/cart' element={<Cart/>} />
          <Route path='/cart/delete/:id' element={<DeleteCartItem/>} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/order/:id' element={<MyOrders/>} />
          <Route path='/order/details/:userId' element={<MyOrderDetails/>} />
          


          <Route path='/restaurant/homepage' element={<HomepageRestaurant/>} />
          {/* <Route path='/menu' element={<Menu/>} /> */}
          <Route path='/restaurant/menu' element={<RestaurantMenu/>} />
          <Route path='/restaurant/menu/delete/:id' element={<DeleteMenu/>} />
          <Route path='/restaurant/menu/edit/:id' element={<EditMenu/>} />
          <Route path='/restaurant/order' element={<RestaurantOrder/>} />
          <Route path='/restaurant/order/edit/:id' element={<OrderEdit/>} />
          <Route path='/restaurant/collected/orders' element={<RestaurantCollectedOrder/>} />
          <Route path='/restaurant/update/:id' element={<UpdateDetails/>} />


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
