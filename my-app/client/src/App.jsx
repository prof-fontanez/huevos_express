import { Navigate, Route, Routes } from 'react-router-dom';
import MyHistory from './pages/MyHistory';
import Product from './pages/Product';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import ProductAdmin from './pages/ProductAdmin';
import Activities from './pages/Activities';
import MyHeroes from './pages/MyHeroes';
import { useAuth } from './context/AuthContext';

function App() {

  const { auth } = useAuth();

  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/admin/products"
            element={
              auth.isAdmin ? <ProductAdmin /> : <Navigate to="/" replace />
            } />
          <Route path='/calendar' element={<Activities />} />
          <Route path="/heroes" element={<MyHeroes />} />
          <Route path="/product" element={<Product />} />
          <Route path="/history" element={<MyHistory />} />
          <Route path="/" element={<MyHistory />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
