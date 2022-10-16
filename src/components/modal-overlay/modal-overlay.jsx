import MOStyle from "./modal-overlay.module.css";
import PropTypes from 'prop-types'

function ModalOverlay({ onClick }) {
  return <div className={MOStyle.overlay} onClick={onClick} />;
}

ModalOverlay.propTypes = {
  onclick: PropTypes.func.isRequired
};

export default ModalOverlay;
