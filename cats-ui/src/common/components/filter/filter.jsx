import React from 'react';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './filter.module.css';
import { Icon } from '../icon/icon';

export function Filter({ count, filter, order, onChange }) {
  const changeFilter = filter => {
    onChange(filter, order);
  };
  const changeOrder = order => {
    onChange(filter, order);
  };

  return (
    <>
      <div className="column">
        <form>
          <FilterComponent value={filter} onChange={changeFilter} />
          <OrderComponent value={order} onChange={changeOrder} />
        </form>
      </div>
      <div className="column has-text-right">
        {count > 0 ? <p className="is-size-7">Найдено имён: {count}</p> : null}
      </div>
    </>
  );
}
Filter.propTypes = {
  count: PropTypes.number,
  filter: PropTypes.oneOf([null, 'male', 'female', 'unisex']),
  order: PropTypes.oneOf([null, 'asc', 'desc']),
  onChange: PropTypes.func.isRequired,
};

function FilterComponent({ value, onChange }) {
  return (
    <div
      className={classNames(style['filter-item'], 'field', 'is-pulled-left')}
    >
      <label className="label is-small has-text-weight-normal">Пол</label>
      <div className="control has-icons-left">
        <div className="select is-small">
          <select
            value={value || ''}
            onChange={({ target: { value } }) => onChange(value || null)}
          >
            <option value="" defaultValue>
              Все
            </option>
            <option value="male">Муж.</option>
            <option value="female">Жен.</option>
            <option value="unisex">Универс.</option>
          </select>
        </div>
        <Icon icon={faSort} className="icon is-small is-left" />
      </div>
    </div>
  );
}
FilterComponent.propTypes = {
  value: PropTypes.oneOf([null, 'male', 'female', 'unisex']),
  onChange: PropTypes.func.isRequired,
};

function OrderComponent({ value, onChange }) {
  return (
    <div
      className={classNames(style['filter-item'], 'field', 'is-pulled-left')}
    >
      <label className="label is-small has-text-weight-normal">
        Сортировка групп
      </label>
      <div className="control has-icons-left">
        <div className="select is-small">
          <select
            value={value || ''}
            onChange={({ target: { value } }) => onChange(value || null)}
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>
        <Icon icon={faSort} className="icon is-small is-left" />
      </div>
    </div>
  );
}
OrderComponent.propTypes = {
  value: PropTypes.oneOf([null, 'asc', 'desc']),
  onChange: PropTypes.func.isRequired,
};
