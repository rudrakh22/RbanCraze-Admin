import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import {Toaster} from 'react-hot-toast'
import "swiper/swiper-bundle.css";
import "flatpickr/dist/flatpickr.css";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AppWrapper } from './components/common/PageMeta.jsx';
const store=configureStore({
  reducer:rootReducer,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AppWrapper>
            <Toaster
              toastOptions={{
                style: {
                  zindex: 9999, // Optional, if your toast goes under modals
                }}}
            />
            <App />
          </AppWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
