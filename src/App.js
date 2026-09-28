import "./App.css";
import StandardErrorBoundry from "./components/errorBoundry/StandardErrorBoundry.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import TestPage from "./pages/TestPage.jsx";
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import CartPage from "./pages/CartPage.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Confirm from "./pages/Confirm.jsx";
import CompleteOrder from "./pages/CompleteOrder.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
function App() {


  
  return (
    
    
      <StandardErrorBoundry>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<TestPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/confirm" element={<Confirm />} />
          <Route path="/cart/completeOrder" element={<CompleteOrder />} />
          <Route path="/track-order" element={<TrackOrder />} />


          <Route path="*" element={<ErrorPage />} />

        </Routes>
        </BrowserRouter>
    </Provider>
      </StandardErrorBoundry>
    
    
    
  );
}

export default App;