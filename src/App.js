import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Use HashRouter
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Cart from './components/Cart/Cart';
import { CartProvider } from './components/Cart/CartContext';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Electronics from './components/Electronics/Electronics';
import Fashion from './components/Fashion/Fashion';
import Books from './components/Books & Stationery/Books';
import Fashiondetail from './components/Fashiondetail';
import Homedecordetail from './components/Homedecordetail';
import HomeDecor from './components/HomeDecor/HomeDecor';
import Groceries from './components/Groceries/Groceries';
import Toys from './components/Toys/Toys';
import Toysdetail from './components/Toysdetail';
import Sports from './components/Sports/Sports';
import Sportsdetail from './components/Sportsdetail';
import Groceriesdetail from './components/Groceriesdetail';
import ElectronicsDetails from './components/ElectronicsDetails';
import BookDetail from './components/BookDetail';
import Checkout from './components/Checkout/Checkout';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <CartProvider>
        <Navbar />
        <div style={{ marginTop: '70px' }}></div>
        <Routes>

          {/* Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/electronics/:id" element={<ElectronicsDetails />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/fashion/:id" element={<Fashiondetail />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/homedecor" element={<HomeDecor />} />
          <Route path="/homedecor/:id" element={<Homedecordetail />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/groceries/:id" element={<Groceriesdetail />} />
          <Route path="/toys" element={<Toys />} />
          <Route path="/toys/:id" element={<Toysdetail />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/:id" element={<Sportsdetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
