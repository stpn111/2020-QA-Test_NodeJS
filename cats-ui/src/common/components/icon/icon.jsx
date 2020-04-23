import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Icon({ icon, className }) {
  return (
    <span className={classNames('icon', classNames(className))}>
      <FontAwesomeIcon icon={icon} />
    </span>
  );
}
Icon.propTypes = {
  icon: PropTypes.any.isRequired,
  className: PropTypes.string,
};
