import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import useAuthViewModel from '../viewmodels/authViewModel';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFF8',
    padding: '1rem'
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '1rem',
    color: '#555',
    fontWeight: 500,
    textAlign: 'left'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s'
  },
  inputFocus: {
    outline: 'none',
    borderColor: '#ED1C24'
  },
  errorMessage: {
    color: '#dc3545',
    fontSize: '0.9rem',
    marginTop: '-0.5rem'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#ED1C24',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonHover: {
    backgroundColor: '#ED1C24'
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    color: '#666'
  },
  link: {
    color: '#ED1C24',
    textDecoration: 'none',
    fontWeight: 500
  },
  linkHover: {
    textDecoration: 'underline'
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();
  const { handleLogin } = useAuthViewModel();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userData = await handleLogin({ email, password });
      if (userData) {
        login(userData);
        navigate('/');
      }
    } catch (err) {
      setError('Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.');
      console.error('Login error:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Giriş Yap</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>E-posta</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          {error && <p style={styles.errorMessage}>{error}</p>}

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
          >
            Giriş Yap
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Hesabınız yok mu?{' '}
            <Link
              to="/register"
              style={styles.link}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
