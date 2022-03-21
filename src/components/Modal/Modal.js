/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ show, onClose, actionButton, children }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-body">
        <div>
          {children}
          <div className="modal-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              Close
            </button>
            {actionButton}
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actionButton: PropTypes.element,
  children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
  actionButton: null,
};

export default Modal;
