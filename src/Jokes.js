import React, { Component } from 'react';
import './Jokes.css';
import Joke from './Joke.js';
import axios from 'axios';


export default class Jokes extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: [],
            isLoaded: false
        }
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.reloadJokes = this.reloadJokes.bind(this);

    }

    async componentDidMount(){
        const URL = 'https://icanhazdadjoke.com/';
       
        let config = {
            headers: {
                'Accept' : 'application/json'
            }
        }
        let jokesArr = [];
        for(let i = 0; i<10; i++){
            let response = await axios.get(
                URL, config
            )            
            
            if(!jokesArr.some(j=> j.id === response.data.id)){
                jokesArr.push({id: response.data.id, joke: response.data.joke, votes: 0});
            } else {
                i--;
            }

            
            
        }
        this.setState({jokes: jokesArr, isLoaded: true});
    }


    
    async reloadJokes(){
        const URL = 'https://icanhazdadjoke.com/';
       
        let config = {
            headers: {
                'Accept' : 'application/json'
            }
        }
        let jokesArr = [];
        for(let i = 0; i<10; i++){
            let response = await axios.get(
                URL, config
            )            
            
            if(!jokesArr.some(j=> j.id === response.data.id)){
                jokesArr.push({id: response.data.id, joke: response.data.joke, votes: 0});
            } else {
                i--;
            }

            
            
        }
        this.setState({jokes: jokesArr, isLoaded: true});
    }
    
    upVote(id){
        let jokes = this.state.jokes;
        let joke = jokes.find(j => j.id === id);
        let i = jokes.findIndex(j => j.id === id);
        joke.votes++;
        jokes.splice(i,1, joke);
        jokes.sort((a, b) => {
            return b.votes - a.votes;
        });
        this.setState({jokes: jokes});
      
    }

    downVote(id){
        let jokes = this.state.jokes;
        let joke = jokes.find(j => j.id === id);
        let i = jokes.findIndex(j => j.id === id);
        if(joke.votes > 0){
            joke.votes--;
        }

        // (joke.votes > 0) ? joke.votes-- : joke;       
        jokes.splice(i,1, joke);
        jokes.sort((a, b) => {
            return b.votes - a.votes;
        });
        this.setState({jokes: jokes});
      
    }

    render(){
        
        let loader = <div className="Loader-container">
            <i className="Loader far fa-grin-squint-tears"></i>
            <p style={{textAlign: 'center'}}>Dad is fetching some jokes...</p>
            </div>;

        let jokeList = <div className="jokeList">
        
        {this.state.jokes.map(j=><Joke key={j.id} id={j.id} votes={j.votes} joke={j.joke} upVote={this.upVote} downVote={this.downVote}/>)}
        
        </div>;

        return(<div className="Jokes">
            <div className="Jokes-button-container">
                <p className="Jokes-text">Dad Jokes!</p>
                <div className="Jokes-button" onClick={()=>{
                    this.setState({isLoaded: false});
                    this.reloadJokes();
                }}>Fetch Jokes</div>
            </div>
            { this.state.isLoaded ? jokeList : loader  }
        
        </div>
                   
            
        );
    }

}