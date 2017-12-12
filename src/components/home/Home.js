import React, { Component, PropTypes } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dataList: [],
    searchText: '',
    currentData: {}
  }

  searchPlanet = (evt) => {
    this.setState({
      currentData: {}
    });
    axios.get(`https://swapi.co/api/planets/?search=${evt.target.value}`)
    .then((response) => {
      console.log(response.data.results);
      this.setState({
        dataList: response.data.results
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getPlanetDetail = (currentData) => {
    this.setState({
      currentData
    });
  }

  doLogout = () => {
    this.context.router.goBack();
  }
  render() {
    const currentData = this.state.currentData;
    return (
      <div>
        <div className="logoffContainer"><button onClick={this.doLogout}>LogOff</button></div>
        <div>
          <div className="searchBox">
            <label>Search Planet: </label>
            <input type="text" onChange={(evt) => {this.searchPlanet(evt);}}/>
          </div>
          {this.state.dataList.map((planet, index) => {
            return (
              <div className="list-group">
                <div className="list-group-item" key={index} onClick={() => {this.getPlanetDetail(planet);}}>{planet.name}</div>
              </div>);
            })}
          {Object.keys(currentData).length > 0 && <div className="details">
            <div className="detailText">Planet Details</div>
            <div>Name: {currentData.name}</div>
            <div>Rotation Period: {currentData.rotation_period}</div>
            <div>Orbital Period: {currentData.orbital_period}</div>
            <div>Diameter: {currentData.diameter}</div>
            <div>Climate: {currentData.climate}</div>
            <div>Gravity: {currentData.gravity}</div>
            <div>Terrain: {currentData.terrain}</div>
            <div>Surface Water: {currentData.surface_water}</div>
            <div>Population: {currentData.population}</div>
          </div>}
        </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
};