import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class LoadErrorModal extends Component {

  render() {

    return (
     <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Loading Error</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>There was an error while loading data from GitHub: API rate limit exceeded for your IP </p>
          <p>Please try again later </p>
        </Modal.Body>

      </Modal>
    );
  }
}

export default LoadErrorModal;
