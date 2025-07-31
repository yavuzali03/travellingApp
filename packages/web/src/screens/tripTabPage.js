import React, { useCallback, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { useTripViewModel } from '../viewmodels/tripViewModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import ExpenseModal from '../components/ExpenseModal';
import { addExpenses } from '../services/tripServices';

const styles = {
  tripsScreen: {
    padding: '1rem'
  },
  tripTitle: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '1rem'
  },
  addExpenseButton: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    backgroundColor: '#ED1C24',
    color: 'white',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s'
  },
  addExpenseButtonHover: {
    transform: 'scale(1.1)'
  },
  mapScreen: {
    padding: '1rem'
  },
  expensesSummary: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  expensesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem'
  },
  expenseCard: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  noExpenses: {
    textAlign: 'center',
    color: '#666',
    padding: '2rem'
  },
  profileScreen: {
    padding: '1rem'
  },
  tripDescription: {
    color: '#666',
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '1rem'
  },
  participantsList: {
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  tripTabPage: {
    minHeight: 'calc(100vh - 40px)',
    backgroundColor: '#FFFFF8',
    padding: '1rem',
    marginTop: '20px',
    position: 'relative',
    zIndex: 1,
    marginLeft: '200px'
  },
  tabButtons: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid #e6e6df',
    paddingBottom: '1rem'
  },
  tabButton: {
    padding: '0.5rem 1rem',
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    color: '#666',
    cursor: 'pointer',
    position: 'relative',
    transition: 'color 0.2s'
  },
  tabButtonHover: {
    color: '#ED1C24'
  },
  activeTabButton: {
    color: '#ED1C24',
    fontWeight: 500
  },
  activeTabButtonAfter: {
    content: '""',
    position: 'absolute',
    bottom: '-1rem',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#ED1C24'
  },
  tabContent: {
    padding: '1rem 0'
  }
};

const TripsScreen = ({ trip }) => {
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const handleAddExpense = async ({ amount, description }) => {
    try {
      const response = await addExpenses(trip._id, user._id, { amount, description });
      console.log("✅ Harcama eklendi:", response);
      setShowModal(false);
    } catch (err) {
      console.error("❌ Harcama eklenemedi:", err.message);
    }
  };

  return (
    <div style={styles.tripsScreen}>
      <h1 style={styles.tripTitle}>{trip.title}</h1>

      <button
        style={styles.addExpenseButton}
        onMouseOver={(e) => e.currentTarget.style.transform = styles.addExpenseButtonHover.transform}
        onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} size="2x" />
      </button>

      <ExpenseModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

const MapScreen = ({ trip }) => {
  const { getUserTrip } = useTripViewModel();
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const [tripData, setTripData] = useState(trip);

  const totalAmount = tripData.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const perPerson = tripData.participants.length > 0
    ? (totalAmount / tripData.participants.length).toFixed(2)
    : 0;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const updatedTrip = await getUserTrip(tripData._id);
      setTripData(updatedTrip);
    } catch (err) {
      console.warn("Yenileme başarısız:", err.message);
    }
    setRefreshing(false);
  }, [tripData._id]);

  return (
    <div style={styles.mapScreen}>
      <div style={styles.expensesSummary}>
        <h2>Toplam Harcama: ₺ {totalAmount.toFixed(2)}</h2>
        <p>Kişi başı: ₺ {perPerson}</p>
      </div>

      <div style={styles.expensesList}>
        {tripData.expenses.length > 0 ? (
          tripData.expenses.map((expense, index) => (
            <div key={index} style={styles.expenseCard}>
              <h3>₺ {expense.amount.toFixed(2)}</h3>
              <p>{expense.description}</p>
              <p>Ödeyen: {expense.paidBy?.username || 'Bilinmiyor'}</p>
              <p>Tarih: {new Date(expense.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p style={styles.noExpenses}>Henüz harcama yok.</p>
        )}
      </div>
    </div>
  );
};

const ProfileScreen = ({ trip }) => {
  const { user: currentUser } = useUser();

  return (
    <div style={styles.profileScreen}>
      <h1 style={styles.tripTitle}>{trip.title}</h1>
      <p style={styles.tripDescription}>{trip.description}</p>

      <h2 style={styles.sectionTitle}>Tarihler</h2>
      <p>Başlangıç: {new Date(trip.startDate).toLocaleDateString()}</p>
      <p>Bitiş: {new Date(trip.endDate).toLocaleDateString()}</p>

      <h2 style={styles.sectionTitle}>Katılımcılar</h2>
      <div style={styles.participantsList}>
        {trip.participants.map((user, index) => (
          <p key={user._id}>
            {index + 1}. {user.username}
            {user._id === trip.creator && ' (Yönetici)'}
          </p>
        ))}
      </div>
    </div>
  );
};

const TripTabPage = ({ trip }) => {
  const [activeTab, setActiveTab] = useState('trips');

  const renderContent = () => {
    switch (activeTab) {
      case 'trips':
        return <TripsScreen trip={trip} />;
      case 'map':
        return <MapScreen trip={trip} />;
      case 'profile':
        return <ProfileScreen trip={trip} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.tripTabPage}>
      <div style={styles.tabButtons}>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'trips' ? styles.activeTabButton : {}),
            ...(activeTab === 'trips' ? styles.activeTabButtonAfter : {})
          }}
          onMouseOver={(e) => e.currentTarget.style.color = styles.tabButtonHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = activeTab === 'trips' ? styles.activeTabButton.color : styles.tabButton.color}
          onClick={() => setActiveTab('trips')}
        >
          Anasayfa
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'map' ? styles.activeTabButton : {}),
            ...(activeTab === 'map' ? styles.activeTabButtonAfter : {})
          }}
          onMouseOver={(e) => e.currentTarget.style.color = styles.tabButtonHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = activeTab === 'map' ? styles.activeTabButton.color : styles.tabButton.color}
          onClick={() => setActiveTab('map')}
        >
          Harcamalar
        </button>
        <button
          style={{
            ...styles.tabButton,
            ...(activeTab === 'profile' ? styles.activeTabButton : {}),
            ...(activeTab === 'profile' ? styles.activeTabButtonAfter : {})
          }}
          onMouseOver={(e) => e.currentTarget.style.color = styles.tabButtonHover.color}
          onMouseOut={(e) => e.currentTarget.style.color = activeTab === 'profile' ? styles.activeTabButton.color : styles.tabButton.color}
          onClick={() => setActiveTab('profile')}
        >
          Bilgiler
        </button>
      </div>

      <div style={styles.tabContent}>
        {renderContent()}
      </div>
    </div>
  );
};

export default TripTabPage;
