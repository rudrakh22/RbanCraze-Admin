// App.jsx
import React from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import OpenRoute from './components/OpenRoute';
import PrivateRoute from './components/PrivateRoute';
import Login from './Pages/Login';
import AppLayout from './layout/AppLayout';
import AddProduct from './Pages/AddProduct';
import Products from "./Pages/Products"
import EditProduct from "./Pages/EditProduct"
import Categories from "./Pages/Category"
import AddCategories from "./Pages/AddCategories";
import EditCategories from './Pages/EditCategories';
import AddVariant from './Pages/AddVariant';

function App() {
  const location=useLocation();
  return (
    <Routes>
      <Route path='/' element={
        <OpenRoute>
          <Login />
        </OpenRoute>
        } />
      <Route element={<AppLayout/>}>
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
          } />
        <Route path="/add-product" element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        }/>
        <Route path="/products" element={
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        }/>
        <Route path="/edit-product/:productId" element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        }/>
        <Route path="/categories" element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }/>
        <Route path="/add-category" element={
          <PrivateRoute>
            <AddCategories />
          </PrivateRoute>
        }/>
        <Route path="/edit-category/:categoryId" element={
          <PrivateRoute>
            <EditCategories key={location.pathname} />
          </PrivateRoute>
        }/>
        <Route path="/:productId/add-variant" element={
          <PrivateRoute>
            <AddVariant isEdit={false} />
          </PrivateRoute>
        }/>
        <Route  path="/:productId/edit-variant/:variantId"element={
          <PrivateRoute>
            <AddVariant isEdit={true} />
          </PrivateRoute>
        }/>
      </Route>
    </Routes>
  );
}

export default App;
