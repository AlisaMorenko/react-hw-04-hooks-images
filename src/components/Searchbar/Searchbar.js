import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleNameChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('No value for request!');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.button}>
          <span className={styles.label}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
