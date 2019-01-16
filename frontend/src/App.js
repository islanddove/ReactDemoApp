import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
		super()
		this.state = {
      ids: [],
      names: [],
      pictures: [],
      wins: [],
      selected_id: 4
		}
	}

  componentDidMount() {
    let thisComponent = this;
    fetch('/data')
      .then(res => res.json())
      .then(function(data){
        console.log(data);
        var ids = []; var names = []; var pictures = []; var wins = [];
        for (var i=0; i<data.length; i++){
          ids.push(data[i].id); names.push(data[i].name);
          pictures.push(data[i].picture); wins.push(data[i].wins);
        }
        thisComponent.setState({
          ids: ids, names: names, pictures: pictures, wins: wins
        });
      });
  }

  doPut(){
    let formData = new FormData();
    formData.append('selected_id', this.state.selected_id);
    return fetch('/updatedata',{
      method: 'PUT',
      body: formData
    })
  }

  render() {
    console.log(this.state);
    this.doPut();
    return (
      <div className="App">
        <h1>Data</h1>
        <ul>{this.state.ids.toString()}</ul>
        <ul>{this.state.names.toString()}</ul>
        <ul>{this.state.pictures.toString()}</ul>
        <ul>{this.state.wins.toString()}</ul>
      </div>
    );
  }
}

export default App;
