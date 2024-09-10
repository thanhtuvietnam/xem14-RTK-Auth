import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

// import '@fontsource/montserrat/300.css';
// import '@fontsource/montserrat/400.css';
// import '@fontsource/montserrat/500.css';
// import '@fontsource/montserrat/700.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
