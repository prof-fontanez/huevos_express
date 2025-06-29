import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import MyHistory from './pages/MyHistory';
import Product from './pages/Product';
import Layout from './components/Layout';
import ProductAdmin from './pages/ProductAdmin';
import { useEffect } from "react";
import { initGA, logPageView } from "./analytics";
import MyHeroes from './pages/MyHeroes';
import { useAuth } from './components/AuthContext';

function App() {

  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    initGA(); // initialize once
  }, []);

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);


  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/admin/products"
            element={
              auth.isAdmin ? <ProductAdmin /> : <Navigate to="/" replace />
            } />
          <Route path="/heroes" element={<MyHeroes />} />
          <Route path="/product" element={<Product />} />
          <Route path="/" element={<MyHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
