import React, { Component } from 'react';

import {XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from 'recharts';
import { Panel } from 'react-bootstrap';

class ForksVsWatchersChart extends Component {

  render() {

    let forksVsWatchersData = [];

    this.props.repos.map( repo => {

        forksVsWatchersData.push({ forks : repo.forks , watchers : repo.watchers, name : repo.name });

        return repo;

      } );

    return (
      <Panel>

        <Panel.Heading>
          <Panel.Title componentClass="h3">Forks Vs Watchers</Panel.Title>
        </Panel.Heading>

        <Panel.Body>

          <ScatterChart width={800} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
            <CartesianGrid />
            <XAxis dataKey={'forks'} type="number" name='forks'  label={{ value: 'Forks', position: 'bottom' }}/>
            <YAxis dataKey={'watchers'} type="number" name='watchers' label={{ value: 'Watchers', angle: -90, position: 'left' }}/>
            <Scatter name='Forks Vs Watchers' data={forksVsWatchersData} fill='#8884d8'/>
            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
          </ScatterChart>

        </Panel.Body>

      </Panel>
    );
  }
}

export default ForksVsWatchersChart;
