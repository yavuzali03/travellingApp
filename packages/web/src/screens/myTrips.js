import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/userContext';
import useTripViewModel from '../viewmodels/tripViewModel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faLocationDot, faAngleRight, faUsers } from '@fortawesome/free-solid-svg-icons';

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
  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '16px',
    marginVertical: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '30px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '12px',
    objectFit: 'cover',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  infoContainer: {
    flex: 1,
    marginLeft: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: '8px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px'
  },
  dateText: {
    fontSize: '13px',
    color: '#666',
    marginLeft: '4px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    marginTop: '4px'
  },
  desc: {
    fontSize: '14px',
    color: '#666',
    marginLeft: '4px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  statsContainer: {
    display: 'flex',
    gap: '16px',
    marginTop: '8px'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#666'
  },
  arrowContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    marginLeft: '16px'
  }
};

const MyTrips = () => {
  const { user } = useUser();
  const { getUserTrips } = useTripViewModel();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrips = async (userId) => {
      try {
        const response = await getUserTrips(userId);
        setTrips(response);
        console.log(response);
      } catch (err) {
        console.log(err.message);
      }
    };
    getTrips(user._id);
  }, [user._id, getUserTrips]);

  const handleTripClick = (trip) => {
    navigate(`/trip-dashboard/${trip._id}`, { state: { trip } });
  };

  return (
    <div style={styles.container}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {trips.map((trip) => (
          <div key={trip._id} style={styles.card} onClick={() => handleTripClick(trip)}>
            {trip.profileImage ? (
              <img src={trip.profileImage} alt={trip.title} style={styles.image} />
            ) : (
              <div style={{ ...styles.image, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faLocationDot} size={24} color="#999" />
              </div>
            )}

            <div style={styles.infoContainer}>
              <div style={styles.row}>
                <FontAwesomeIcon icon={faCalendarDays} size={14} color="#666" />
                <span style={styles.dateText}>
                  {new Date(trip.startDate).toLocaleDateString('tr-TR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })} - {new Date(trip.endDate).toLocaleDateString('tr-TR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <span style={styles.title}>{trip.title}</span>

              <div style={styles.row}>
                <FontAwesomeIcon icon={faLocationDot} size={14} color="#666" />
                <span style={styles.desc}>{trip.description || 'Konum bilgisi yok'}</span>
              </div>

              <div style={styles.statsContainer}>
                <div style={styles.stat}>
                  <FontAwesomeIcon icon={faUsers} size={14} color="#666" />
                  <span>{trip.participants?.length || 0} Katılımcı</span>
                </div>
              </div>
            </div>

            <div style={styles.arrowContainer}>
              <FontAwesomeIcon icon={faAngleRight} size={14} color="#666" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTrips;