// screens/PlaceDetails.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faMapMarkerAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import TopBar from '../components/topBar';
import ButtonFilled from '../components/buttonFilled';
import { GeminiService } from '../services/geminiApi';

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#FFFFF8'
  },
  loadingSpinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  container: {
    minHeight: '100vh',
    backgroundColor: '#FFFFF8',
    paddingBottom: '2rem'
  },
  image: {
    width: '60%',
    height: '500px',
    objectFit: 'cover',
    margin: '2rem auto 0',
    display: 'block',
    borderRadius: '12px'
  },
  content: {
    padding: '1.5rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
    backgroundColor: '#F3F3EB',
    padding: '1rem',
    borderRadius: '12px'
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0,
    fontWeight: 'bold'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#FFD900',
    padding: '0.5rem 1rem',
    borderRadius: '12px',
    border: '3px solid #FFF200'
  },
  ratingText: {
    color: '#343a40',
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  info: {
    backgroundColor: '#F3F3EB',
    padding: '2rem',
    borderRadius: '12px',
    marginBottom: '2rem'
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '1.5rem'
  },
  aiNotice: {
    fontSize: '1rem',
    color: '#2D2D74',
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  mapButtonContainer: {
    position: 'fixed',
    bottom: '2rem',
    left: 100,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  }
};

const PlaceDetails = () => {
  const navigate = useNavigate();
  const { placeId } = useParams();
  const location = useLocation();
  const place = location.state?.place;
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const geminiInfo = async (place) => {
      try {
        const response = await GeminiService(place.city, place.location.coordinates, place.name);
        setPlaceData(response);
        setLoading(false);
      } catch (error) {
        console.error('Gemini API hatası:', error);
        setLoading(false);
      }
    };

    if (place) {
      geminiInfo(place);
    }
  }, [place]);



  const openInMaps = () => {
    if (place?.maps_url) {
      window.open(place.maps_url, '_blank');
    }
  };

  if (loading || !place || !placeData) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>


      {place?.photo && (
        <img src={place.photo} alt={place.name} style={styles.image} />
      )}

      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>{place.name}</h1>
          <div style={styles.rating}>
            <FontAwesomeIcon icon={faStar} size="lg" />
            <span style={styles.ratingText}>{place.rating}</span>
          </div>
        </div>

        <div style={styles.info}>
          <p style={styles.description}>{placeData}</p>
          <p style={styles.aiNotice}>Bu yazı yapay zeka ile oluşturulmuştur.</p>
        </div>
      </div>

      <div style={styles.mapButtonContainer}>
        <ButtonFilled
          onClick={openInMaps}
          title="Haritada aç"
          width="90%"
          height="50px"
        />
      </div>
    </div>
  );
};

export default PlaceDetails;
