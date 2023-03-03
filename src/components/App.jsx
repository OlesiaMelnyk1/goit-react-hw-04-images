import React, { useState, useEffect } from 'react';
import { fetchImages } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  useEffect(() => {
    if (!query) return;

    const getImages = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchImages(query, page);
        if (hits.length === 0) {
          return alert('Nothing found for your request. Please, try again');
        }
        setImages(prevState => [...prevState, ...hits]);
        setShowLoadMoreButton(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImages();
  }, [query, page]);

  const searchImages = text => {
    setQuery(text);
    setPage(1);
    setImages([]);
    setError(false);
    setIsLoading(false);
    setShowLoadMoreButton(false);
  };

  const loadMorePictures = () => {
    setPage(prevState => prevState.page + 1);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onItemClick = largeImage => {
    setLargeImage(largeImage);
    handleModal();
  };

  return (
    <>
      <Searchbar onSubmit={searchImages} />
      {error === true
        ? alert('Sorry, an error occurred! Please try again later')
        : images.length > 0 && (
            <ImageGallery pictures={images} onItemClick={onItemClick} />
          )}
      {isLoading === true ? (
        <Loader />
      ) : (
        showLoadMoreButton && (
          <Button
            type="button"
            text="Load more"
            onLoadMorePics={loadMorePictures}
          />
        )
      )}
      {isModalOpen && (
        <Modal largeImage={largeImage} handleModal={handleModal} />
      )}
    </>
  );
}
