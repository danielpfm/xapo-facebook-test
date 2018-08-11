import React, { Component } from 'react';
import { Grid, Row, PageHeader, Col } from 'react-bootstrap';

import SideBar from './sideBar';
import MainView from './mainView';

class App extends Component {

  render() {

    return (
      <Grid fluid={true}>
        <Row className="show-grid">
          <PageHeader className="text-center">
            Xapo - Facebook GitHub Repos Test App <small>by Daniel PF</small>
          </PageHeader>
        </Row>
        <Row className="show-grid">

          <Col md={3}>
            <SideBar />
          </Col>

          <Col md={9} >
            <MainView />
          </Col>

        </Row>
      </Grid>
    );
  }
}

export default App;
