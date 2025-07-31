import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { faUser, faChevronLeft, faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '../contexts/userContext';
import SearchBar from '../components/searchBar';
import IconWithBadge from '../components/iconWithBadge';
import PlaceCard from '../components/PlaceCard';
import usePlacesViewModel from '../viewmodels/placesViewModel';
import axios from 'axios';
import Search from '../components/Search';

const styles = {
  container: {
    padding: '0',
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#FFFFF8',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    gap: '16px',
    padding: '20px 24px'
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '0 16px',
    height: '36px',
    borderRadius: '50px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  },
  username: {
    fontSize: '0.95rem',
    color: '#495057',
    fontWeight: '500',
    letterSpacing: '0.3px'
  },
  profileIcon: {
    width: '28px',
    height: '28px',
    backgroundColor: '#ED1C24',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: 'all 0.3s ease'
  },
  icon: {
    width: '14px',
    height: '14px'
  },
  placesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#212529',
    margin: 0
  },
  listContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '0 16px'
  },
  list: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  scrollButton: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#2D2D74',
    boxShadow: '0 4px 8px rgba(45, 45, 116, 0.2)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    transition: 'all 0.3s ease',
    position: 'absolute',
    zIndex: 2,
    '&:hover': {
      backgroundColor: '#1f1f4f',
      transform: 'scale(1.05)',
      boxShadow: '0 6px 12px rgba(45, 45, 116, 0.3)'
    },
    '&:active': {
      transform: 'scale(0.95)'
    }
  },
  leftButton: {
    left: '8px'
  },
  rightButton: {
    right: '8px'
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%'
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #ED1C24',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  searchResults: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    marginTop: '8px',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 1000
  },
  searchResultItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #e9ecef',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: '#f8f9fa'
    },
    '&:last-child': {
      borderBottom: 'none'
    }
  },
  searchResultImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '12px'
  },
  searchResultInfo: {
    flex: 1
  },
  searchResultName: {
    fontSize: '0.95rem',
    fontWeight: '500',
    color: '#333',
    margin: 0
  },
  searchResultUsername: {
    fontSize: '0.85rem',
    color: '#666',
    margin: '2px 0 0'
  },
  noResults: {
    padding: '16px',
    textAlign: 'center',
    color: '#666',
    fontSize: '0.9rem'
  },
  searchContainer: {
    flex: 1,
    padding: '16px'
  }
};

const Home = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { getNearbyPlaces } = usePlacesViewModel();
  const [places, setPlaces] = useState({ hotels: [], foods: [], places: [] });
  const [searchText, setSearchText] = useState('');
  const [friendsRequest, setFriendsRequest] = useState(null);
  const [onSearch, setOnSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const placesListRef = useRef(null);
  const foodsListRef = useRef(null);
  const hotelsListRef = useRef(null);
  
  const scrollList = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      const currentScroll = ref.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      ref.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (user?.friendRequests) {
      setFriendsRequest(user.friendRequests.length);
    }
  }, [user]);

  useEffect(() => {
    const getLocationAndFetch = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              console.log('Konum alındı:', { latitude, longitude });
              
              if (isNaN(latitude) || isNaN(longitude)) {
                throw new Error('Geçersiz konum bilgisi');
              }

              const response = await getNearbyPlaces(latitude, longitude);
              if (response) {
                console.log('Yakındaki yerler:', response);
                setPlaces(response);
              }
            } catch (error) {
              console.error('Yerler yüklenirken hata:', error);
              setPlaces({ places: [], foods: [], hotels: [] });
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error('Konum hatası:', error.message);
            setPlaces({ places: [], foods: [], hotels: [] });
            setLoading(false);
          },
          { 
            enableHighAccuracy: true, 
            timeout: 15000, 
            maximumAge: 0 
          }
        );
      } else {
        console.error('Geolocation desteklenmiyor');
        setPlaces({ places: [], foods: [], hotels: [] });
        setLoading(false);
      }
    };

    getLocationAndFetch();
  }, []);

  const handleSearch = async (text) => {
    setSearchText(text);
    if (text.trim()) {
      setIsSearching(true);
      try {
        const response = await axios.get(`http://localhost:5002/api/users/search?query=${text}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Arama hatası:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (user) => {
    navigate(`/profile/${user._id}`);
    setSearchText('');
    setSearchResults([]);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <SearchBar
          value={searchText}
          setValue={setSearchText}
          onFocus={() => setOnSearch(true)}
          setOnSearch={setOnSearch}
        />
        <div 
          style={styles.profileSection}
          onClick={() => navigate(`/profile/${user._id}`)}
        >
          <span style={styles.username}>
            {user?.username}
          </span>
          <div style={styles.profileIcon}>
            <FontAwesomeIcon icon={faUser} style={styles.icon} />
          </div>
        </div>
      </div>

      {searchText ? (
        <div style={styles.searchContainer}>
          <Search 
            searchValue={searchText} 
            setSearchValue={setSearchText}
            onSearch={onSearch} 
            setOnSearch={setOnSearch}
          />
        </div>
      ) : (
        <div style={styles.placesContainer}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Yakınızdaki Gezilecek Yerler</h2>
            <div style={styles.listContainer}>
              <button 
                style={{...styles.scrollButton, ...styles.leftButton}}
                onClick={() => scrollList(placesListRef, 'left')}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div style={styles.list} ref={placesListRef}>
                {places.places.map(place => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
              <button 
                style={{...styles.scrollButton, ...styles.rightButton}}
                onClick={() => scrollList(placesListRef, 'right')}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Yakınızdaki Restoranlar</h2>
            <div style={styles.listContainer}>
              <button 
                style={{...styles.scrollButton, ...styles.leftButton}}
                onClick={() => scrollList(foodsListRef, 'left')}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div style={styles.list} ref={foodsListRef}>
                {places.foods.map(place => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
              <button 
                style={{...styles.scrollButton, ...styles.rightButton}}
                onClick={() => scrollList(foodsListRef, 'right')}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Yakınızdaki Oteller</h2>
            <div style={styles.listContainer}>
              <button 
                style={{...styles.scrollButton, ...styles.leftButton}}
                onClick={() => scrollList(hotelsListRef, 'left')}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div style={styles.list} ref={hotelsListRef}>
                {places.hotels.map(place => (
                  <PlaceCard key={place._id} place={place} />
                ))}
              </div>
              <button 
                style={{...styles.scrollButton, ...styles.rightButton}}
                onClick={() => scrollList(hotelsListRef, 'right')}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

