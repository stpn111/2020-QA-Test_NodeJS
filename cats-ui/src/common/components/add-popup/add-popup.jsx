import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../modal';
import history from '../../../utils/history';
import { CatsApi } from '../../../api/cats';
import { Item } from './item';
import { ValidationsContext } from '../../contexts/validations';
import { getErrorValidation } from '../../../utils/validation';
import { notify } from '../../../utils/notifications/notifications';
import { useParams } from 'react-router-dom';
import { Icon } from '../icon/icon';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const newItemData = {
  name: '',
  gender: null,
};

export function AddPopup() {
  return (
    <Modal title="Добавить имена в базу котиков" onClose={onClose}>
      <ValidationsContext.Consumer>
        {validations => <Form validations={validations} />}
      </ValidationsContext.Consumer>
    </Modal>
  );
}

function Form({ validations }) {
  const { name } = useParams();

  const [items, setItems] = useState([{ ...newItemData, name: name || '' }]);

  const buttonActionAdd = (
    <button
      type="button"
      className="button is-light"
      onClick={onAdd.bind(null, items, setItems)}
    >
      <Icon icon={faPlus} />
    </button>
  );

  return (
    <form onSubmit={onSubmit.bind(null, items, setItems)}>
      {items.map((state, i) => (
        <Item
          key={i}
          index={i}
          state={state}
          isSingle={items.length === 1}
          onChange={onChange.bind(null, items, setItems, i, validations)}
          onRemove={onRemove.bind(null, items, setItems, i)}
        />
      ))}
      <div className="has-text-right">{buttonActionAdd}</div>
      <button className="button is-warning">Добавить</button>
    </form>
  );
}
Form.propTypes = {
  validations: PropTypes.arrayOf(PropTypes.object),
};

function onClose() {
  history.push('/');
}

function onRemove(items, setItems, index) {
  const newItems = items.slice();

  newItems.splice(index, 1);

  setItems(newItems);
}

let onAdd = function(items, setItems) {
  setItems([...items, newItemData]);
};

function onChange(items, setItems, index, validations, newState) {
  const error = getErrorValidation(newState.name, validations);

  if (error) {
    notify.warning(error);
    return;
  }

  const newItems = items.slice();

  newState.name = newState.name || '';
  newItems[index] = newState;
  setItems(newItems);
}

function onSubmit(state, setState, event) {
  event.preventDefault();

  if (!isValidState(state)) {
    notify.warning('Заполните всю форму');
    return;
  }

  CatsApi.add(state)
    .then(({ cats }) => {
      const successCatNames = [];
      const errorsCats = [];

      cats.forEach(item => {
        if (item.id) {
          successCatNames.push(item.name);
        } else {
          errorsCats.push(item);
        }
      });

      if (successCatNames.length > 1) {
        notify.success(`Имена: ${successCatNames.join(', ')} добавлены`);
      } else if (successCatNames.length === 1) {
        notify.success(`Имя: ${successCatNames[0]} добавлено`);
      }

      errorsCats.forEach(item => {
        notify.error(`${item.cat.name} - ${item.errorDescription}`);
      });

      removeFormNames(state, setState, successCatNames);

      if (errorsCats.length === 0) {
        onClose();
      }
    })
    .catch(message => {
      notify.error(message || 'Что-то пошло не так');
    });
}

function isValidState(state) {
  return state.every(item => item.name && item.gender);
}

function removeFormNames(state, setState, names) {
  const namesSet = new Set(names.map(name => name.toLowerCase()));

  const result = state.filter(({ name }) => !namesSet.has(name.toLowerCase()));

  setState(result);
}
