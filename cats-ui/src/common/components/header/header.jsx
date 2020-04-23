import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import history from '../../../utils/history';
import { Icon } from '../icon/icon';
import { getErrorValidation } from '../../../utils/validation';
import { notify } from '../../../utils/notifications/notifications';
import { ValidationsContext } from '../../contexts/validations';
import { Suggestions } from '../suggestions/suggestions';

export function Header({ searchValue }) {
  const validations = useContext(ValidationsContext);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState(searchValue || '');
  const [isButtonDisabled, setButtonDisabled] = useState(!searchQuery);
  const inputRef = React.createRef();

  useEffect(() => {
    setSearchQuery(searchValue || '');
  }, [searchValue]);

  function onChangeSearch({ target: { value } }) {
    const error = getErrorValidation(value, validations);

    if (error) {
      notify.warning(error);

      return;
    }

    setSearchQuery(value || '');
    setButtonDisabled(!value);
  }

  function onSearch(event) {
    event.preventDefault();

    history.push({
      pathname: `/search/${searchQuery}`,
      search: location.search,
    });
  }

  function onSelectSuggestion(suggestion) {
    setSearchQuery(suggestion);
  }

  return (
    <section className="section has-background-light">
      <div className="container">
        <div className="columns">
          <div className="column is-2 has-text-right-desktop">
            <h1 className="is-size-3">
              <Link to="/" className="has-text-black">
                meowle
              </Link>
            </h1>
          </div>
          <div className="column">
            <form className="field has-addons" onSubmit={onSearch}>
              <div className="control is-expanded">
                <Suggestions
                  onSelect={onSelectSuggestion}
                  inputRef={inputRef}
                  inputValue={searchQuery}
                >
                  <input
                    type="text"
                    className="input"
                    ref={inputRef}
                    value={searchQuery}
                    onChange={onChangeSearch}
                  />
                </Suggestions>
              </div>
              <div className="control">
                <button className="button" disabled={isButtonDisabled}>
                  <Icon icon={faSearch} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
Header.propTypes = {
  searchValue: PropTypes.string,
};
