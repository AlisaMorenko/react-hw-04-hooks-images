import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Loader from 'react-loader-spinner';

import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import imgAPI from './components/services/image-finder-api';

import 'react-toastify/dist/ReactToastify.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus('pending');
    imgAPI
      .fetchImg(searchQuery, page)
      .then(responseHits => {
        setHits(prevHits => [...prevHits, ...responseHits]);
        setStatus('resolved');
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })

      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => setStatus('resolved'));
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    resetState();
    setSearchQuery(searchQuery);
  };

  const resetState = () => {
    setPage(1);
    setHits([]);
    setError(null);
  };

  const handleClickButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = (src, alt) => {
    setShowModal(true);
    setSelectedImage({ src, alt });
  };

  const closeModal = () => setShowModal(false);

  if (status === 'idle') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />;
        <ToastContainer position="top-center" autoClose={3000} />
      </>
    );
  }

  if (status === 'pending') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery hits={hits} onOpen={openModal} />
        <Loader type="ThreeDots" color="#393d53" height={80} width={80} />
      </>
    );
  }

  if (status === 'rejected') {
    return <h1>{error.message}</h1>;
  }

  if (status === 'resolved') {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery hits={hits} onOpen={openModal} />
        {showModal && <Modal image={selectedImage} onClose={closeModal} />}
        {hits.length > 0 && <Button onClick={handleClickButton} />}
      </>
    );
  }
}
