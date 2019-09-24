import React, { Component } from 'react';
import './Jokes.css';
import axios from 'axios';

export default class Jokes extends Component {
    constructor(props){
        super(props);
        this.state = {
            jokes: []
        }
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
            console.log(response.data.joke);
            jokesArr.push(response.data.joke);

            
        }
        this.setState({jokes: jokesArr});
    }
    

    render(){
      
        return(<div>        
            {this.state.jokes.map(j=><p>{j}</p>)}
        </div>);
    }

}