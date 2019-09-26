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
            console.log(response.data);
            jokesArr.push({id: response.data.id, joke: response.data.joke, votes: 0});

            
        }
        this.setState({jokes: jokesArr, isLoaded: true});
    }
    
    upVote(id){
        let jokes = this.state.jokes;
        let joke = jokes.find(j => j.id === id);
        let i = jokes.findIndex(j => j.id === id);
        joke.votes++;
        jokes.splice(i,1, joke);
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
        this.setState({jokes: jokes});
      
    }

    render(){
      
        return(<div>
            {this.state.isLoaded ? null : <div className="loader" id="loader-1"></div>}        
            {this.state.jokes.map(j=><Joke key={j.id} id={j.id} votes={j.votes} joke={j.joke} upVote={this.upVote} downVote={this.downVote}/>)}
        </div>);
    }

}