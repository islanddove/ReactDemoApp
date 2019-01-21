import React, { Component } from 'react';
import './App.css';


function ImageView(props){
    return (
        <div className={props.class}>
            <img src={props.src} onClick={props.onClick} alt="NOT FOUND"/>
            <p>{props.text}</p>
        </div>
    );
}

function Button(props) {
    return (
        <button className={props.class} onClick={props.onClick}>
            {props.text}
        </button>
    );
}

function List(props) {
    const sortedWins = props.sortedWins;
    const listItems = sortedWins.map((sortedWins) =>
        <li key={sortedWins.id} className='li'>
            {sortedWins.name + ": " + sortedWins.wins}
         </li>
    );
    return (
        <ol className='ol'>
            {listItems}
        </ol>
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
        this.updateLeaderboard();
    }

    getNewApples(){
        let thisComponent = this;
        fetch('/getComparisonData').then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                alert('Server Error. Status = ' + res.status);
              }
            })
            .then((data) => {
                console.log('Getting 2 random apples: ', data);
                let ids = [], names = [], pictures = [], wins = [];
                for (let i=0; i<2; i++){
                    ids.push(data[i].id);
                    names.push(data[i].name);
                    pictures.push(data[i].picture);
                    wins.push(data[i].wins);
                }
                thisComponent.setState({
                    ids: ids, names: names, pictures: pictures, wins: wins
                });
            })
            .catch((error) => {
             console.log(error)
        });
    }

    updateLeaderboard(){
        let thisComponent = this;
        fetch('/getSortedWins').then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                  alert('Server Error. Status = ' + res.status);
                }
            })
            .then((data) => {
                console.log('Getting sorted apple data from server: ', data);
                let sortedWins = [];
                for (let i=0; i<data.length; i++){
                    var winObject = {
                        name: data[i].name,
                        wins: data[i].wins,
                        id: data[i].id
                    }
                    sortedWins.push(winObject);
                }
                thisComponent.setState({
                    sortedWins: sortedWins
                });
            })
            .catch((error) => {
             console.log(error)
        });
    }

    doPut(){
        let formData = new FormData();
        formData.append('selected_id', this.state.selected_id);
        console.log('Submitting winning apple', formData);
        return fetch('/putUpdateData',{
            method: 'PUT',
            body: formData
        })
    }

    submitWinner(){
        if (this.state.selected_id === -1){
            alert('Please select an apple!');
            return;
        }
        this.doPut();
        this.getNewApples();
        this.setState({
            selected_id: -1, selectedimage: null
        });
    }

    render() {
        var leftStyle = this.state.selectedimage ==='left' ? 'ImageViewSelected' : 'ImageView';
        var rightStyle = this.state.selectedimage ==='right' ? 'ImageViewSelected' : 'ImageView';
        return (
            <div className='App'>
                <h1>Pick an Apple</h1>
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
                <div className = 'Submit Winner'>
                    <Button
                        class={'Button'}
                        onClick={() => this.submitWinner()}
                        text={'Submit an Apple'}
                    />
                </div>
                <div className = 'Leaderboard'>
                    <Button
                        class={'Button'}
                        onClick={() => this.updateLeaderboard()}
                        text={'Update Leaderboard'}
                    />
                    <List
                        sortedWins={this.state.sortedWins}
                    />
                </div>
            </div>
        );
    }
}

export default App;
