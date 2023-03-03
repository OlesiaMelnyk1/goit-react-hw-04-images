import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const newSearch = event => {
    const { value } = event.target;
    setQuery(value);
  };

  const onSubmitForm = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return alert('You want to find nothing. Please check your query');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.Form} onSubmit={onSubmitForm}>
        <button type="submit" className={css.FormButton}>
          <span className={css.FormButtonLabel}>Search</span>
        </button>
        <input
          className={css.FormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="text"
          value={query}
          onChange={newSearch}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
