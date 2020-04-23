import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CatsApi } from '../../../api/cats';

const SEARCH_DELAY = 500;

export function Suggestions({ children, inputValue, inputRef, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const dropdownRef = useRef(null);
  useEffect(initInputActions.bind(null, inputRef, setDropdownActive), []);

  useEffect(() => {
    if (!inputValue) {
      setIsFirstSearch(true);
      return;
    }

    getSuggestions(inputValue)
      .then(({ cats }) => {
        const suggestions = (cats || []).map(({ name }) => name);

        setSuggestions(suggestions);
        setIsFirstSearch(false);
      })
      .catch(() => {
        setSuggestions([]);
      });
  }, [inputValue]);

  return (
    <div
      ref={dropdownRef}
      className={classNames('dropdown', {
        'is-active': dropdownActive && !isFirstSearch,
      })}
      style={{ width: '100%' }}
    >
      {children}
      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <Items
            suggestions={suggestions}
            onClick={suggestion => {
              onSelect(suggestion);
              setDropdownActive(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
Suggestions.propTypes = {
  children: PropTypes.node,
  inputValue: PropTypes.string,
  inputRef: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
};

function Items({ suggestions, onClick }) {
  if (!suggestions || !suggestions.length) {
    return <EmptyItem />;
  }

  return suggestions.map((suggestion, i) => (
    <Item key={i} text={suggestion} onClick={onClick} />
  ));
}
Items.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
};

function Item({ text, onClick }) {
  return (
    <a
      href="#none"
      className="dropdown-item"
      tabIndex="0"
      onClick={e => {
        e.preventDefault();
        onClick(text);
      }}
    >
      {text}
    </a>
  );
}
Item.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

function EmptyItem() {
  return <div className="dropdown-item">Нет совпадений</div>;
}

function initInputActions(inputRef, setDropdownActive) {
  const blurEvent = event => {
    if (event.target && event.target.closest('.dropdown')) return;

    setDropdownActive(false);
  };

  inputRef.current.addEventListener('focus', () => setDropdownActive(true));
  document.addEventListener('click', blurEvent);

  return () => {
    document.removeEventListener('click', blurEvent);
  };
}

function getSuggestions(name) {
  return new Promise(resolve => {
    clearTimeout(getSuggestions._timer);

    getSuggestions._timer = setTimeout(() => {
      resolve(CatsApi.getSuggestions(name));
    }, SEARCH_DELAY);
  });
}
