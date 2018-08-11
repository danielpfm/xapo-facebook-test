import React, { Component } from 'react';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Panel } from 'react-bootstrap';

class LanguajeChart extends Component {

  render() {

    let languajeData = { };

    this.props.repos.map( repo => {

        if(!languajeData[repo.language])
          languajeData[repo.language] = { totalRepos : 0 , totalWatchers : 0 };

        languajeData[repo.language].totalRepos++;
        languajeData[repo.language].totalWatchers += repo.watchers;

        return repo;

      } );

    let data = [];

    Object.keys(languajeData).forEach((key) => {
      data.push({name: key, 'Total Repos': languajeData[key].totalRepos, 'Total Watchers' : languajeData[key].totalWatchers / 1000 })
    });

    data = data.sort((a, b) => { return b['Total Repos'] - a['Total Repos'] });

    return (
      <Panel>

        <Panel.Heading>
          <Panel.Title componentClass="h3">Languaje Repos & Languaje Watchers</Panel.Title>
        </Panel.Heading>

        <Panel.Body>

          <BarChart width={800} height={400} data={data} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
           <CartesianGrid strokeDasharray="3 3"/>
           <XAxis dataKey="name"/>
           <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
           <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
           <Tooltip/>
           <Legend />
           <Bar yAxisId="left" dataKey="Total Repos" fill="#8884d8" />
           <Bar yAxisId="right" dataKey="Total Watchers" fill="#82ca9d" unit="K" />
          </BarChart>

        </Panel.Body>

      </Panel>
    );
   
  }
}

export default LanguajeChart;
