import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const LocationModal = ({ show, handleClose, location }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Coordenadas de la ubicación</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: '#e0f7fa' }}>
        <p><i className="bi bi-geo-alt-fill"></i> Latitud: {location.lat}</p>
        <p><i className="bi bi-geo-alt-fill"></i> Longitud: {location.lng}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LocationModal;
//