import { Route, Routes } from 'react-router-dom';
import MyHistory from './pages/MyHistory';
import Product from './pages/Product';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/product" element={<Product />} />
          <Route path="/" element={<MyHistory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
