import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { theme } from './theme';
import AppRoutes from './routes';
import Layout from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';

const AppContent = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      {isLoggedIn ? (
        <Layout>
          <AppRoutes />
        </Layout>
      ) : (
        <AppRoutes />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
