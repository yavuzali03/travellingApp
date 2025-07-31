import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    minHeight: 'calc(100vh - 40px)',
    backgroundColor: '#FFFFF8',
    padding: '1rem',
    marginTop: '20px',
    position: 'relative',
    zIndex: 1,
    marginLeft: '200px'
  },
  content: {
    width: '100%',
    maxWidth: '800px',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '2rem',
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
  textarea: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
    resize: 'vertical'
  },
  dateRange: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  coverUpload: {
    position: 'relative',
    width: '100%'
  },
  fileInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'pointer',
    zIndex: 2
  },
  uploadPlaceholder: {
    width: '100%',
    height: '200px',
    border: '2px dashed #ddd',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    transition: 'border-color 0.2s'
  },
  uploadPlaceholderHover: {
    borderColor: '#007bff'
  },
  uploadText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#666'
  },
  uploadHint: {
    fontSize: '0.875rem',
    color: '#999'
  },
  coverPreview: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px'
  },
  formActions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  button: {
    flex: 1,
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    color: '#666'
  },
  cancelButtonHover: {
    backgroundColor: '#e9ecef'
  },
  createButton: {
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white'
  },
  createButtonHover: {
    backgroundColor: '#0056b3'
  },
  createButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed'
  }
};

const CreateTrips = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    coverImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Şimdilik butonlar aktif değil
    console.log('Create trip attempt:', formData);
        };

        return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Yeni Gezi Oluştur</h1>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="title" style={styles.label}>Gezi Başlığı</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Gezinize bir isim verin"
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Açıklama</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Geziniz hakkında kısa bir açıklama yazın"
              rows="4"
              required
              style={styles.textarea}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = styles.input.border}
            />
          </div>

          <div style={styles.dateRange}>
            <div style={styles.formGroup}>
              <label htmlFor="startDate" style={styles.label}>Başlangıç Tarihi</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.border}
              />
            </div>

            <div style={styles.formGroup}>
              <label htmlFor="endDate" style={styles.label}>Bitiş Tarihi</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
                onBlur={(e) => e.target.style.borderColor = styles.input.border}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="coverImage" style={styles.label}>Kapak Fotoğrafı</label>
            <div style={styles.coverUpload}>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                accept="image/*"
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  coverImage: e.target.files[0]
                }))}
                style={styles.fileInput}
              />
              <div 
                style={styles.uploadPlaceholder}
                onMouseOver={(e) => e.currentTarget.style.borderColor = styles.uploadPlaceholderHover.borderColor}
                onMouseOut={(e) => e.currentTarget.style.borderColor = styles.uploadPlaceholder.border}
              >
                {formData.coverImage ? (
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="Cover preview"
                    style={styles.coverPreview}
                  />
                ) : (
                  <div style={styles.uploadText}>
                    <span>Fotoğraf seçmek için tıklayın</span>
                    <span style={styles.uploadHint}>veya sürükleyip bırakın</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={styles.formActions}>
            <button
              type="button"
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.cancelButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.cancelButton.backgroundColor}
              onClick={() => navigate(-1)}
            >
              İptal
            </button>
            <button 
              type="submit" 
              style={{
                ...styles.button,
                ...styles.createButton,
                ...(formData.title && formData.description && formData.startDate && formData.endDate ? {} : styles.createButtonDisabled)
              }}
              onMouseOver={(e) => {
                if (formData.title && formData.description && formData.startDate && formData.endDate) {
                  e.currentTarget.style.backgroundColor = styles.createButtonHover.backgroundColor;
                }
              }}
              onMouseOut={(e) => {
                if (formData.title && formData.description && formData.startDate && formData.endDate) {
                  e.currentTarget.style.backgroundColor = styles.createButton.backgroundColor;
                }
              }}
              disabled={!formData.title || !formData.description || !formData.startDate || !formData.endDate}
            >
              Gezi Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrips;
