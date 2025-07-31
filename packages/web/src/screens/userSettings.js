import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#FFFFF8',
    padding: '20px',
    marginLeft: '200px',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  header: {
    marginBottom: '2rem',
    '& h1': {
      margin: 0,
      color: '#333',
      fontSize: '1.8rem'
    }
  },
  content: {
    display: 'flex',
    gap: '2rem'
  },
  sidebar: {
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  sidebarButton: {
    padding: '0.8rem 1rem',
    border: 'none',
    background: 'none',
    textAlign: 'left',
    fontSize: '1rem',
    color: '#666',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    '&:hover': {
      background: '#f5f5f5',
      color: '#333'
    },
    '&.active': {
      background: '#2196f3',
      color: '#fff'
    }
  },
  main: {
    flex: 1
  },
  section: {
    '& h2': {
      margin: '0 0 1.5rem 0',
      color: '#333',
      fontSize: '1.4rem'
    }
  },
  profileImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
    '& img': {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      objectFit: 'cover'
    }
  },
  profilePlaceholder: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999'
  },
  changePhotoButton: {
    padding: '0.5rem 1rem',
    background: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: '#1976d2'
    }
  },
  formGroup: {
    marginBottom: '1.5rem',
    '& label': {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#666',
      fontSize: '0.9rem'
    },
    '& input': {
      width: '100%',
      padding: '0.8rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '1rem',
      '&:focus': {
        outline: 'none',
        borderColor: '#2196f3'
      }
    }
  },
  saveButton: {
    padding: '0.8rem 2rem',
    background: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    '&:hover': {
      background: '#1976d2'
    },
    '&:disabled': {
      background: '#ccc',
      cursor: 'not-allowed'
    }
  },
  settingItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '1rem'
  },
  settingInfo: {
    '& h3': {
      margin: '0 0 0.3rem 0',
      color: '#333',
      fontSize: '1rem'
    },
    '& p': {
      margin: 0,
      color: '#666',
      fontSize: '0.9rem'
    }
  },
  switch: {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px',
    '& input': {
      opacity: 0,
      width: 0,
      height: 0
    }
  },
  slider: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#ccc',
    transition: '0.4s',
    borderRadius: '24px',
    '&:before': {
      position: 'absolute',
      content: '""',
      height: '16px',
      width: '16px',
      left: '4px',
      bottom: '4px',
      background: '#fff',
      transition: '0.4s',
      borderRadius: '50%'
    }
  },
  select: {
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#333',
    '&:focus': {
      outline: 'none',
      borderColor: '#2196f3'
    }
  }
};

const UserSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Örnek kullanıcı verisi
  const [user, setUser] = useState({
    firstName: 'Ahmet',
    lastName: 'Yılmaz',
    email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    profileImage: 'https://picsum.photos/200/200',
    language: 'tr',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      showProfile: 'public',
      showTrips: 'friends',
      showLocation: 'private'
    }
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // API çağrısı simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // API çağrısı simülasyonu
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const handleNotificationChange = (type) => {
    setUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (type, value) => {
    setUser(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value
      }
    }));
  };

  const pickImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);

    // API çağrısı burada yapılacak
    const formData = new FormData();
    formData.append('image', file);
    formData.append('userId', 'user_id'); // Gerçek user_id buraya gelecek

    try {
      // API endpoint'i buraya gelecek
      // const res = await axios.post('/api/upload-profile', formData);
      console.log('✅ Resim yüklendi');
    } catch (err) {
      console.error('❌ Yükleme hatası:', err.message);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-section">
            <h2>Profil Bilgileri</h2>
            <form onSubmit={handleProfileUpdate}>
              <div className="profile-image">
                {selectedImage ? (
                  <img src={selectedImage} alt="Profil" />
                ) : (
                  <div className="profile-placeholder">
                    <span>Fotoğraf Yok</span>
                  </div>
                )}
                <label className="change-photo-btn">
                  Fotoğraf Seç
                  <input
                    type="file"
                    accept="image/*"
                    onChange={pickImage}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
              <div className="form-group">
                <label>Ad</label>
                <input type="text" value={user.firstName} onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Soyad</label>
                <input type="text" value={user.lastName} onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>E-posta</label>
                <input type="email" value={user.email} onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input type="tel" value={user.phone} onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))} />
              </div>
              <button type="submit" className="save-btn" disabled={isLoading}>
                {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </form>
          </div>
        );

      case 'security':
        return (
          <div className="settings-section">
            <h2>Güvenlik</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Mevcut Şifre</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Yeni Şifre</label>
                <input type="password" />
              </div>
              <div className="form-group">
                <label>Yeni Şifre (Tekrar)</label>
                <input type="password" />
              </div>
              <button type="submit" className="save-btn" disabled={isLoading}>
                {isLoading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
              </button>
            </form>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-section">
            <h2>Bildirim Ayarları</h2>
            <div className="notification-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>E-posta Bildirimleri</h3>
                  <p>Önemli güncellemeler ve aktiviteler hakkında e-posta al</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Push Bildirimleri</h3>
                  <p>Anlık bildirimler ve güncellemeler al</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>SMS Bildirimleri</h3>
                  <p>Önemli güncellemeler için SMS al</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={user.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="settings-section">
            <h2>Gizlilik Ayarları</h2>
            <div className="privacy-settings">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Profil Görünürlüğü</h3>
                  <p>Profilinizi kimler görebilir?</p>
                </div>
                <select
                  value={user.privacy.showProfile}
                  onChange={(e) => handlePrivacyChange('showProfile', e.target.value)}
                >
                  <option value="public">Herkes</option>
                  <option value="friends">Sadece Arkadaşlar</option>
                  <option value="private">Gizli</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Gezi Görünürlüğü</h3>
                  <p>Gezilerinizi kimler görebilir?</p>
                </div>
                <select
                  value={user.privacy.showTrips}
                  onChange={(e) => handlePrivacyChange('showTrips', e.target.value)}
                >
                  <option value="public">Herkes</option>
                  <option value="friends">Sadece Arkadaşlar</option>
                  <option value="private">Gizli</option>
                </select>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Konum Görünürlüğü</h3>
                  <p>Konumunuzu kimler görebilir?</p>
                </div>
                <select
                  value={user.privacy.showLocation}
                  onChange={(e) => handlePrivacyChange('showLocation', e.target.value)}
                >
                  <option value="public">Herkes</option>
                  <option value="friends">Sadece Arkadaşlar</option>
                  <option value="private">Gizli</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Ayarlar</h1>
      </div>
      <div style={styles.content}>
        <div style={styles.sidebar}>
          <button
            style={{
              ...styles.sidebarButton,
              ...(activeTab === 'profile' && styles.sidebarButton.active)
            }}
            onClick={() => setActiveTab('profile')}
          >
            Profil
          </button>
          <button
            style={{
              ...styles.sidebarButton,
              ...(activeTab === 'security' && styles.sidebarButton.active)
            }}
            onClick={() => setActiveTab('security')}
          >
            Güvenlik
          </button>
          <button
            style={{
              ...styles.sidebarButton,
              ...(activeTab === 'notifications' && styles.sidebarButton.active)
            }}
            onClick={() => setActiveTab('notifications')}
          >
            Bildirimler
          </button>
          <button
            style={{
              ...styles.sidebarButton,
              ...(activeTab === 'privacy' && styles.sidebarButton.active)
            }}
            onClick={() => setActiveTab('privacy')}
          >
            Gizlilik
          </button>
        </div>
        <div style={styles.main}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
