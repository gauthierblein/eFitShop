import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages  
import { Home, Contact, Login, Register, Reset, Admin, 
Cart, CheckOutDetails, CheckOut, CheckOutSuccess,
OrderHistory, OrderDetails} from "./pages";
import NotFound from "./pages/notFound/NotFound";

// Components
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import ReviewProducts from "./components/reviewProducts/ReviewProducts";
import OrderDetailsAdmin from "./components/admin/orderDetails/OrderDetails"
//Style
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route 
              path="/admin/*"
              element={<AdminOnlyRoute>
                        <Admin />
                      </AdminOnlyRoute>} 
            />
            <Route path="/product-details/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout-details" element={<CheckOutDetails />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/checkout-success" element={<CheckOutSuccess />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-details/:id" element={<OrderDetails />} />
            <Route path="/admin/order-details/:id" element={<OrderDetailsAdmin />} />
            <Route path="/review-product/:id" element={<ReviewProducts />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
