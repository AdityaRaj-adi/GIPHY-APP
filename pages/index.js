
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import GifGallery from '../components/GifGallery';
import firebase from '../firebase';
import styles from '../styles/Home.module.css';
const Home = () => {
  const [user, setUser] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });


    const { searchKeyword: querySearchKeyword } = router.query;


    if (querySearchKeyword && querySearchKeyword !== searchKeyword) {
      setSearchKeyword(querySearchKeyword);
    }

    return () => {
      authListener();
    };
  }, [searchKeyword, router.query.searchKeyword]);

  const handleSearch = async () => {
    try {
      console.log('Searching for:', searchKeyword);
      
      const giphyEndpoint = `https://api.giphy.com/v1/gifs/search?q=${searchKeyword}&api_key=wXEJqmpcRr37XoTQ3oqZduZPYnN8J7y4=10`;

      
      const response = await fetch(giphyEndpoint);
      const data = await response.json();


      const gifResults = data.data.map((gif) => ({
        id: gif.id,
        url: gif.images.fixed_height.url,

      }));


      setSearchResults(gifResults);
    } catch (error) {
      console.error('Error fetching GIFs:', error);
    }
  };

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <h1><i>Graphics Interchange Format <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-filetype-gif" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2H9v-1h3a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM3.278 13.124a1.403 1.403 0 0 0-.14-.492 1.317 1.317 0 0 0-.314-.407 1.447 1.447 0 0 0-.48-.275 1.88 1.88 0 0 0-.636-.1c-.361 0-.67.076-.926.229a1.48 1.48 0 0 0-.583.632 2.136 2.136 0 0 0-.199.95v.506c0 .272.035.52.105.745.07.224.177.417.32.58.142.162.32.288.533.377.215.088.466.132.753.132.268 0 .5-.037.697-.111a1.29 1.29 0 0 0 .788-.77c.065-.174.097-.358.097-.551v-.797H1.717v.589h.823v.255c0 .132-.03.254-.09.363a.67.67 0 0 1-.273.264.967.967 0 0 1-.457.096.87.87 0 0 1-.519-.146.881.881 0 0 1-.305-.413 1.785 1.785 0 0 1-.096-.615v-.499c0-.365.078-.648.234-.85.158-.2.38-.301.665-.301a.96.96 0 0 1 .3.044c.09.03.17.071.236.126a.689.689 0 0 1 .17.19.797.797 0 0 1 .097.25h.776Zm1.353 2.801v-3.999H3.84v4h.79Zm1.493-1.59v1.59h-.791v-3.999H7.88v.653H6.124v1.117h1.605v.638H6.124Z"/>
</svg></i></h1>
        {user ? (
          <button onClick={() => firebase.auth().signOut()} className={styles['search-button']}>
            Sign Out
          </button>
        ) : (
          <div>
            <Link href="/login">
              Login
            </Link>{' '}
            |{' '}
            <Link href="/signup">
              Signup
            </Link>
          </div>
        )}
      </header>
      <main className={styles.mainContent}>
        <div className={styles['search-container']}>
          <input
            type="text"
            placeholder="Search GIFs..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className={styles['search-input']}
          />
          <button type="button" onClick={handleSearch} className={styles['search-button']}>
            Search <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          </button>
        </div>

        <GifGallery searchKeyword={searchKeyword} />
      </main>
    </div>
  );
};

export default Home;
