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
        return(
        <div className="Joke">
            <div className="Joke-votes-container">

                <div onClick={this.upVoteHandler}> 
                <i className="Joke-vote-up fas fa-angle-double-up"></i>
                </div>

                <div className="Joke-votes">{this.props.votes}
                </div>
                
                <div onClick={this.downVoteHandler}> 
                <i className="Joke-vote-down fas fa-angle-double-down"></i>
                </div>

            </div>
            <div className="Joke-text">
                {this.props.joke}
            </div>
            
            
        </div>
        )
    };
}