/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({
  show,
  onClose,
  actionButtonText,
  handleAction,
  actionButtonDisabled,
  children,
}) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-body">
        <div>
          {children}
          <div className="modal-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="primaryButton"
              onClick={handleAction}
              disabled={actionButtonDisabled}
            >
              {actionButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  actionButtonText: PropTypes.string.isRequired,
  handleAction: PropTypes.func.isRequired,
  actionButtonDisabled: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Modal.defaultProps = {
  actionButtonDisabled: false,
};

export default Modal;
