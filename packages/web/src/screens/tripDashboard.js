import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useTripViewModel from '../viewmodels/tripViewModel';
import { useUser } from '../contexts/userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFileCirclePlus, faUser, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getUserTrip } from '../services/tripServices';

const styles = {
  container: {
    minHeight: 'calc(100vh - 40px)',
    backgroundColor: '#FFFFF8',
    padding: '1rem',
    marginTop: '20px',
    position: 'relative',
    zIndex: 1,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#666'
  },
  header: {
    position: 'relative',
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  coverImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover',
    borderRadius: '12px'
  },
  content: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '0 20px'
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333'
  },
  chatButton: {
    backgroundColor: '#ED1C24',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '1rem',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#c41820'
    }
  },
  description: {
    fontSize: '1.1rem',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '30px'
  },
  tabs: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px'
  },
  tab: {
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    color: '#666',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s',
    '&:hover': {
      color: '#333'
    }
  },
  activeTab: {
    color: '#ED1C24',
    borderBottom: '2px solid #ED1C24'
  },
  tabContent: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  participantsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1rem'
  },
  participantCard: {
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateX(5px)'
    }
  },
  participantInfo: {
    flex: 1
  },
  name: {
    fontSize: '1.1rem',
    color: '#333',
    marginBottom: '0.25rem',
    fontWeight: 500
  },
  role: {
    fontSize: '0.9rem',
    color: '#666',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  roleBadge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    marginTop: '4px',
  },
  organizerBadge: {
    backgroundColor: '#fbd2d3',
    color: '#ed1c24',
  },
  participantBadge: {
    backgroundColor: '#F5F5F5',
    color: '#757575',
  },
  expensesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  expenseCard: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseInfo: {
    flex: 1,
  },
  expenseAmount: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  expenseDescription: {
    color: '#666',
    marginTop: '4px',
  },
  addExpenseButton: {
    backgroundColor: '#007AFF',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
  },
  mediaItem: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
};

// Varsayılan avatar için base64 resim
const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2NjY2NjYyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MyLjY3IDAgNC44NCAyLjE3IDQuODQgNC44NCAwIDIuNjctMi4xNyA0Ljg0LTQuODQgNC44NC0yLjY3IDAtNC44NC0yLjE3LTQuODQtNC44NCAwLTIuNjcgMi4xNy00Ljg0IDQuODQtNC44NHptMCAxMmM0LjQyIDAgOC4xNy0yLjIyIDkuNTctNS41Mi0yLjQ3LTEuNTktNS4zMy0yLjQ4LTguNDctMi40OHMtNiAuODktOC40NyAyLjQ4YzEuNC0zLjMgNS4xNS01LjUyIDkuNTctNS41MnoiLz48L3N2Zz4=';

const fixImageUrl = (url) => {
    if (!url) return null;
    return url.replace('http://10.0.2.2:5002', 'http://localhost:5002');
};

const TripDashboard = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [trip, setTrip] = useState(null);
  const [tripData, setTripData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const { getUserTrip } = useTripViewModel();

  useEffect(() => {
    console.log('useEffect çalıştı');
    console.log('Trip ID:', tripId);
    console.log('Loading State:', isLoading);

    const fetchData = async () => {
      try {
        console.log('fetchData fonksiyonu çağrıldı');
        console.log('Trip ID:', tripId);

        console.log('API\'den trip verisi alınıyor');
        const tripData = await getUserTrip(tripId);
        console.log('API\'den gelen trip verisi:', tripData);

        if (!tripData) {
          throw new Error('Gezi verisi bulunamadı');
        }

        setTrip(tripData);
        setTripData(tripData);
      } catch (error) {
        console.error('Trip verisi alınamadı:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response,
          status: error.response?.status
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (tripId) {
        console.log('fetchData çağrılıyor...');
        fetchData();
    } else {
        console.error('Trip ID bulunamadı');
    }
  }, [tripId, getUserTrip]);

  const handleChatClick = () => {
    const roomId = trip._id;
    navigate(`/chat/${roomId}`, {
      state: {
        roomId,
        roomType: "group",
        currentUser: user._id,
        groupName: trip.title,
        groupPhoto: trip.profileImage,
        participants: trip.participants
      }
    });
  };

  const handleAddExpense = async ({ amount, description }) => {
    try {
      const response = await axios.post(
        `http://localhost:5002/api/addExpenses/${trip._id}/${user._id}`,
        {
          amount,
          description,
          receipt: null
        }
      );

      console.log("✅ Harcama eklendi:", response.data);
      
      // Harcama eklendikten sonra verileri yenile
      const updatedTrip = await getUserTrip(tripId);
      setTripData(updatedTrip);
      setTrip(updatedTrip);
      setShowExpenseModal(false);
    } catch (err) {
      console.error("❌ Harcama eklenemedi:", err.message);
    }
  };

  const renderTabContent = () => {
    if (!tripData) return null;

    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Gezi Detayları</h2>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <strong>Başlangıç:</strong> {new Date(tripData.startDate).toLocaleDateString('tr-TR')}
              </div>
              <div>
                <strong>Bitiş:</strong> {new Date(tripData.endDate).toLocaleDateString('tr-TR')}
              </div>
            </div>
            <p>{tripData.description}</p>

            <button 
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#ED1C24',
                borderRadius: '30px',
                position: 'fixed',
                bottom: '20px',
                right: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
              onClick={() => setShowExpenseModal(true)}
            >
              <FontAwesomeIcon icon={faFileCirclePlus} size="2x" color="white" />
            </button>

            {showExpenseModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  width: '400px',
                  maxWidth: '90%'
                }}>
                  <h3 style={{ marginBottom: '1rem' }}>Yeni Harcama Ekle</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const amount = parseFloat(e.target.amount.value);
                    const description = e.target.description.value;
                    handleAddExpense({ amount, description });
                  }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Miktar (TL)</label>
                      <input
                        type="number"
                        name="amount"
                        step="0.01"
                        required
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem' }}>Açıklama</label>
                      <input
                        type="text"
                        name="description"
                        required
                        style={{
                          width: '100%',
                          padding: '8px',
                          borderRadius: '4px',
                          border: '1px solid #ddd'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        onClick={() => setShowExpenseModal(false)}
                        style={{
                          padding: '8px 16px',
                          borderRadius: '4px',
                          border: '1px solid #ddd',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        style={{
                          padding: '8px 16px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: '#ED1C24',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        Ekle
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'participants':
        return (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Katılımcılar</h2>
            <div style={styles.participantsList}>
              {tripData.participants?.map((participant) => (
                <div 
                  key={participant._id} 
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px',
                    backgroundColor: '#FFFFF8',
                    border: '2px solid #e6e6df',
                    borderRadius: '12px',
                    marginBottom: '8px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <img
                      src={fixImageUrl(participant.profileImage) || DEFAULT_AVATAR}
                      alt={participant.username}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '24px',
                        objectFit: 'cover'
                      }}
                    />
                    <span style={{ paddingLeft: '10px', fontSize: '16px', fontWeight: 'bold', color: '#313335' }}>
                      {participant.username}
                    </span>
                  </div>
                  {participant._id === tripData.creator && (
                    <div style={{
                      backgroundColor: '#fbd2d3',
                      borderRadius: '20px',
                      border: '1px solid #ed1c24'
                    }}>
                      <span style={{
                        padding: '6px',
                        color: '#ed1c24',
                        fontWeight: 'bold'
                      }}>
                        Organizatör
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'expenses':
        const totalAmount = tripData.expenses?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
        const perPerson = tripData.participants?.length > 0
          ? (totalAmount / tripData.participants.length).toFixed(2)
          : 0;

        return (
          <div>
            <h2 style={{ marginBottom: '1rem' }}>Harcamalar</h2>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                Toplam Harcama: ₺ {totalAmount.toFixed(2)}
              </p>
              <p style={{ color: '#666' }}>
                Kişi başı: ₺ {perPerson}
              </p>
            </div>
            <div style={styles.expensesList}>
              {tripData.expenses?.map(expense => (
                <div key={expense._id} style={styles.expenseCard}>
                  <div style={styles.expenseInfo}>
                    <h3 style={styles.expenseAmount}>
                      ₺ {expense.amount.toFixed(2)}
                    </h3>
                    <p style={styles.expenseDescription}>{expense.description}</p>
                    <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '4px' }}>
                      Ödeyen: {expense.paidBy?.username || 'Bilinmiyor'}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                      Tarih: {new Date(expense.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Yükleniyor...</div>
      </div>
    );
  }

  if (!trip || !tripData) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <h2>Gezi bulunamadı</h2>
          <p>Lütfen geçerli bir gezi seçin veya ana sayfaya dönün.</p>
          <button 
            onClick={() => navigate('/my-trips')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ED1C24',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '20px'
            }}
          >
            Gezilerime Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <img 
          src={trip.profileImage} 
          alt={trip.title} 
          style={styles.coverImage}
        />
      </div>

      <div style={styles.content}>
        <div style={styles.titleRow}>
          <h1 style={styles.title}>{trip.title}</h1>
          <button style={styles.chatButton} onClick={handleChatClick}>
            <FontAwesomeIcon icon={faComments} />
            Sohbete git
          </button>
        </div>

        <p style={styles.description}>{trip.description}</p>

        <div style={styles.tabs}>
          <div 
            style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('overview')}
          >
            Genel Bakış
          </div>
          <div 
            style={{...styles.tab, ...(activeTab === 'participants' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('participants')}
          >
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px' }} />
            Katılımcılar
          </div>
          <div 
            style={{...styles.tab, ...(activeTab === 'expenses' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('expenses')}
          >
            <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: '8px' }} />
            Harcamalar
          </div>
        </div>

        <div style={styles.tabContent}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TripDashboard;
