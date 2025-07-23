import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { lazy } from "react";
const Login = lazy(() => import("./pages/Login"));
const Splash = lazy(() => import("./pages/Splash"));
const Phone = lazy(() => import("./pages/Phone"));
const Otp = lazy(() => import("./pages/Otp"));
const Location = lazy(() => import("./pages/Location"));
const Notification = lazy(() => import("./pages/Notification"));
const Address = lazy(() => import("./pages/Address"));
const Businessdetails = lazy(() => import("./pages/Businessdetails"));
const Home = lazy(() => import("./pages/Home"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Ordersuccess = lazy(() => import("./pages/Ordersuccess"));
const Addressdetails = lazy(() => import("./pages/Addressdetails"));
const Shop = lazy(() => import("./pages/Shop"));
const Products = lazy(() => import("./pages/Products"));
const Favourite = lazy(() => import("./pages/Favourite"));
const MyProfile = lazy(() => import("./pages/MyProfile"));
const Profile = lazy(() => import("./pages/Profile"));
const Term = lazy(() => import("./pages/Term"));
const Pin = lazy(() => import("./pages/Pin"));
const SetPin = lazy(() => import("./pages/SetPin"));
const AuthAddress = lazy(() => import("./pages/AuthAddress"));
const AuthBusinessdetails = lazy(() => import("./pages/AuthBusinessdetails"));
const PolicyDetails = lazy(() => import("./pages/PolicyDetails"));
const ProductList = lazy(() => import("./pages/ProductList"));
import { AuthProvider } from "./contexts/AuthContext";
import PublicRoute from "./components/PublicRoute";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import { useEffect } from "react";
import { initPushNotifications } from "./components/pushNotifications";
import { Capacitor } from "@capacitor/core";

function App() {
  useEffect(() => {
    if (Capacitor.getPlatform() === "web") return;
    initPushNotifications();
  }, []);
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes - only accessible when NOT authenticated */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <PublicLayout />
                </PublicRoute>
              }
            >
              <Route path="/" element={<Splash />} />
              <Route path="login" element={<Login />} />
              <Route path="pin" element={<Pin />} />
              <Route path="setpin" element={<SetPin />} />
              <Route path="phone" element={<Phone />} />
              <Route path="otp" element={<Otp />} />
              <Route path="location" element={<Location />} />
              <Route path="notification" element={<Notification />} />
              <Route path="address" element={<Address />} />
              <Route path="businessdetails" element={<Businessdetails />} />
            </Route>
            {/* Protected routes - only accessible when authenticated */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AuthenticatedLayout />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order" element={<Ordersuccess />} />
              <Route path="authaddress" element={<AuthAddress />} />
              <Route path="addressdetails" element={<Addressdetails />} />
              <Route
                path="authbusinessdetails"
                element={<AuthBusinessdetails />}
              />
              <Route path="policydetails" element={<PolicyDetails />} />
              <Route path="shop" element={<Shop />} />
              <Route path="products" element={<Products />} />
              <Route path="productlist" element={<ProductList />} />
              <Route path="favourite" element={<Favourite />} />
              <Route path="myprofile" element={<MyProfile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="term" element={<Term />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Route>
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar
            theme="colored"
            toastStyle={{ backgroundColor: "#fe0c10", color: "white" }}
            style={{ fontSize: "12px", fontWeight: "bold" }}
          />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
