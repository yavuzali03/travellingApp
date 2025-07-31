import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    fontWeight: 500
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
    borderColor: '#007bff'
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  buttonHover: {
    backgroundColor: '#0056b3'
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  },
  footer: {
    marginTop: '2rem',
    textAlign: 'center',
    color: '#666'
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 500
  },
  linkHover: {
    textDecoration: 'underline'
  }
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şimdilik butonlar aktif değil
    console.log('Register attempt:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Kayıt Ol</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Kullanıcı Adı</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Kullanıcı adınızı girin"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="E-posta adresinizi girin"
              required
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Şifrenizi girin"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Şifre Tekrar</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Şifrenizi tekrar girin"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <button 
            type="submit" 
            style={{
              ...styles.button,
              ...(formData.username && formData.email && formData.password && formData.confirmPassword ? {} : styles.buttonDisabled)
            }}
            onMouseOver={(e) => {
              if (formData.username && formData.email && formData.password && formData.confirmPassword) {
                e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor;
              }
            }}
            onMouseOut={(e) => {
              if (formData.username && formData.email && formData.password && formData.confirmPassword) {
                e.currentTarget.style.backgroundColor = styles.button.backgroundColor;
              }
            }}
            disabled={!formData.username || !formData.email || !formData.password || !formData.confirmPassword}
          >
            Kayıt Ol
          </button>
        </form>

        <div style={styles.footer}>
          <p>
            Zaten hesabınız var mı?{' '}
            <Link 
              to="/login" 
              style={styles.link}
              onMouseOver={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration}
              onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
            >
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
