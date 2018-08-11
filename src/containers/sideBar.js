import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroupItem, ListGroup, FormGroup, InputGroup, FormControl, Glyphicon } from 'react-bootstrap';

import { getDetailRepo } from '../actions/detailRepoActions';
import { getRepos } from '../actions/reposActions';
import LoadErrorModal from '../components/loadErrorModal';


class SideBar extends Component {

  constructor(props) {
    super(props);

    this.onGetRepo = this.onGetRepo.bind(this);

    this.state = {
      searchString : ""
    }

    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    this.props.onGetRepos();
  }

  onGetRepo(repo) {
    this.props.onGetRepo(repo);
  }

  onSearchChange(e)
  {
    let searchString = e.target.value;

    let updateState = {
      searchString  : searchString
    }

    this.setState(updateState);

  }

  render() {
    
    let repos = this.props.repos.filter( repo => {
        if(this.state.searchString && repo.name.indexOf(this.state.searchString) === -1)
          return false;

        return true;
      }

    ).map( repo => { 

      return ( 
        <ListGroupItem header={ repo.name } key={repo.name} onClick={(e)=>this.onGetRepo(repo)}>
          { repo.watchers } Watchers
        </ListGroupItem>
        );
      } 
    );


    return (
        <div>

          { this.props.loadError && 
              <LoadErrorModal />
          }

          <h2> Repos List </h2>
          <FormGroup>
            <InputGroup onChange={this.onSearchChange}>
              <FormControl type="text" />
              <InputGroup.Addon>
                <Glyphicon glyph="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
          {  this.props.repos.length !== 0 && repos.length === 0 && 
          <p>No repo found </p>
          }

          { this.props.repos.length === 0 && 
          <p>Loading Facebook repos ... </p>
          }

          { repos.length !== 0 && 
          <ListGroup className="reposList">
            { repos }
          </ListGroup>
          }
        </div>

    );
  }
}

const mapToStateProps = (state,props) => {
  return {
    repos : state.repos,
    loadError : state.loadError
  }
};

const mapActionsToProps = {
  onGetRepo : getDetailRepo,
  onGetRepos : getRepos
};

export default connect(mapToStateProps, mapActionsToProps)(SideBar);
