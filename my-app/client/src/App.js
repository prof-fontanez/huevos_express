import { Route, Routes, useLocation } from 'react-router-dom';
import MyHistory from './pages/MyHistory';
import Product from './pages/Product';
import Layout from './components/Layout';
import { useEffect } from "react";
import { initGA, logPageView } from "./analytics";
import MyHeroes from './pages/MyHeroes';

function App() {

  const location = useLocation();

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
        <Route path="/heroes" element={<MyHeroes />} />
        <Route path="/product" element={<Product />} />
        <Route path="/" element={<MyHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
