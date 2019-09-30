import React, {Component} from 'react';
import './Joke.css'

export default class Joke extends Component {

    constructor(props){
        super(props);
        this.upVoteHandler = this.upVoteHandler.bind(this);
        this.downVoteHandler = this.downVoteHandler.bind(this);
    }

    upVoteHandler(){
        let { upVote, id } = this.props;
        upVote(id);
    }

    downVoteHandler(){
        let { downVote, id } = this.props;
        downVote(id);
    }

    render(){
        return(<div className="Joke">
            
            <span onClick={this.upVoteHandler}> + </span>{this.props.votes} <span onClick={this.downVoteHandler}> - </span> : {this.props.joke}
            
            </div>)
    };
}