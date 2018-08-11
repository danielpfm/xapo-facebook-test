import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ListGroupItem, Image, ListGroup } from 'react-bootstrap';

import { closeDetailRepo, LOADING_REPO } from '../actions/detailRepoActions';
import LanguageChart from '../components/languageChart';
import ForksVsWatchersChart from '../components/forksVsWatchersChart';


class MainView extends Component {

  render() {

    let panelTitle = "Repos Stats";
    
    if(this.props.detailRepo)
      panelTitle = "Repo Details";

    let contributors = [];

    if( this.props.detailRepo && this.props.detailRepo !== LOADING_REPO ) {

      contributors = this.props.detailRepo.contributors_list.map( contributor => { 

        return ( 
          <ListGroupItem header={ contributor.login } key={contributor.login} className="col-md-3" >
            <Image src={contributor.avatar_url} circle responsive  />
            { contributor.contributions } contributions
          </ListGroupItem>
          );
        } 
      );
    }


    return (
      <div>
        <h2>{panelTitle}</h2>
        
          { this.props.detailRepo && this.props.detailRepo === LOADING_REPO &&
            <h3> Loading Repo ... </h3>
          }

          { this.props.detailRepo && this.props.detailRepo !== LOADING_REPO &&
              <div className="repoInfo">
                <Button bsStyle="danger" className="float-right" onClick={this.props.onCloseRepo}>Close</Button>
                <h3> Name : { this.props.detailRepo.name } </h3>
                <p> Full Name : { this.props.detailRepo.full_name } </p>
                <p> URL : { this.props.detailRepo.html_url } </p>
                <p> Description : { this.props.detailRepo.description } </p>
                <p> Language : { this.props.detailRepo.language } </p>
                <p> Watchers : { this.props.detailRepo.watchers } </p>
                <p> Contributors : { this.props.detailRepo.contributors_list.length } </p>
                <ListGroup className="contributorsList">
                  { contributors }
                </ListGroup>
              </div>
          }

          { !this.props.detailRepo && this.props.repos.length > 0 &&
            <div className="reposCharts">
              <LanguageChart repos={this.props.repos} />
              <ForksVsWatchersChart repos={this.props.repos} />
            </div>
          }
      </div>
    );
  }
}

const mapToStateProps = (state,props) => {
  return {
    detailRepo  : state.detailRepo,
    repos       : state.repos
  }
};

const mapActionsToProps = {
  onCloseRepo : closeDetailRepo,
};

export default connect(mapToStateProps, mapActionsToProps)(MainView);
