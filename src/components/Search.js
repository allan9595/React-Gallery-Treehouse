import React , { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Search extends Component {

    state = {
        inputText: ''
    }

    handleChange = (e) => {
        this.setState({
            inputText: e.target.value //get the input field in real time and set them to the state
        })
    }
  
    handleSubmit = (e) => {
        e.preventDefault(); //prevent default refresh
        this.props.onSearch(this.state.inputText); //pass the search input to the onSearch props func
        e.currentTarget.reset();
    }
   
    redirectToSearch = () => {
        if(this.props.redirect){
            return <Redirect to="/search" /> //set the redirect to search page after the button clicked, it is used for display images on the search route
        }
    }

    //The redirect func inspired from this article https://medium.com/@anneeb/redirecting-in-react-4de5e517354a
    render(){
        return (
            <form className="search-form" onSubmit={this.handleSubmit}>
                <input 
                    type="search" 
                    name="search" 
                    placeholder="Search" 
                    onChange={this.handleChange}
                    required
                />
                
                {this.props.redirect()}
                <button 
                    type="submit" 
                    className="search-button"
                    onClick= {this.props.onRedirect}
                >
                <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    <path d="M0 0h24v24H0z" fill="none"/>
                </svg>
                </button>
            </form>
            
        )
    }
}

export default Search;