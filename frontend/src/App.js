import React, { Component } from 'react';
import './App.css';


function ImageView(props){
    return (
      <div class={props.class}>
          <img src={props.src} onClick={props.onClick} />
          <p>{props.text}</p>
      </div>
    );
}

function Button(props) {
  return (
    <button class={props.class} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

class App extends Component {

  constructor() {
		super()
		this.state = {
      ids: [], names: [], pictures: [], wins: [],
      sortedWins:[],
      selected_id: -1,
      selectedimage: null
		}
	}

  componentDidMount() {
    this.getNewApples();
  }

  getNewApples(){
    let thisComponent = this;
    fetch('/data')
      .then(res => res.json())
      .then(function(data){
        console.log(data);
        let ids = [], names = [], pictures = [], wins = [];
        for (let i=0; i<data.length; i++){
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

  submitWinner(){
    if (this.state.selected_id === -1){
      return;
    }
    this.doPut();
    this.getNewApples();
    this.setState({
      selected_id: -1, selectedimage: null
    });
  }

  updateLeaderboard(){
    let thisComponent = this;
    fetch('/fulldata')
      .then(res => res.json())
      .then(function(data){
        console.log(data);
        let sortedWins:[];
        for (var i=0; i<data.length; i++){
          var winObject = {
            name: data[i].name,
            wins: data[i].wins
          }
          sortedWins.push(winObject);
        }
        sortedWins.sort(function (a, b) {
          if (a.wins < b.wins) return 1;
          if (a.wins > b.wins) return -1;
          return 0;
        });
        thisComponent.setState({
          sortedWins: sortedWins
        });
      });
  }

  render() {
    var leftStyle = this.state.selectedimage ==='left' ? 'ImageViewSelected' : 'ImageView';
    var rightStyle = this.state.selectedimage ==='right' ? 'ImageViewSelected' : 'ImageView';
    return (
      <div className='App'>
        <h1>Pick an Apple</h1>
        <ul>{this.state.ids.toString()}</ul>
        <ul>{this.state.names.toString()}</ul>
        <ul>{this.state.pictures.toString()}</ul>
        <ul>{this.state.wins.toString()}</ul>

        <div className = 'Images'>
          <ImageView
              src={this.state.pictures[0]}
              class={leftStyle}
              onClick={() => this.setState({selectedimage: 'left', selected_id: this.state.ids[0]})}
              text={this.state.names[0]}
          />
          <ImageView
              src={this.state.pictures[1]}
              class={rightStyle}
              onClick={() => this.setState({selectedimage: 'right', selected_id: this.state.ids[1]})}
              text={this.state.names[1]}
          />
        </div>

        <div className = 'Buttons'>
          <Button
              class={'Button'}
              onClick={() => this.submitWinner()}
              text={'Submit Apple'}
          />
        </div>
        <div className = 'Leaderboard'>
          <Button
              class={'Button'}
              onClick={() => this.updateLeaderboard()}
              text={'Update Leaderboard'}
          />
        </div>
      </div>
    );
  }
}

export default App;
