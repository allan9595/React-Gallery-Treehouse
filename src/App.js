import React, { Component }from 'react';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Search from './components/Search';
import ErrorNotFound from './components/Error';
import API_ACCESS_KEY from './config';
import axios from 'axios';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';


class App extends Component {

  state = {
    photos: [],
    photos_waterfalls:[],
    photos_sunsets:[],
    search_results:[]
  }

  componentDidMount(){
    //make three api requests to all the data I need and store them in the states
    
    axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=1&orientation=squarish&query=dogs`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          photos: response.data.results
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });

      axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=2&orientation=squarish&query=waterfalls`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          photos_waterfalls: response.data.results
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });

      axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=2&orientation=squarish&query=sunsets`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          photos_sunsets: response.data.results
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });
  }

  searchPhotos = (query) => {
    axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=2&orientation=squarish&query=${query}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          search_results: response.data.results
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });
  }

  render(){
    return(
      <BrowserRouter>
        <div className="container">
          <Search title='Search Result' onSearch={this.searchPhotos} />
          <Nav />
          <Switch>  
            <Route exact path="/" render={() => <Redirect to = "/dogs"/>}/> {/** if the app load hit the home route, then redirect to dogs*/} 
            <Route exact path="/dogs" render={(props) => <PhotoList {...props} title='Beautiful Dog' data={this.state.photos} />}/>
            <Route exact path="/waterfalls" render={(props) => <PhotoList {...props} title='Beautiful Waterfalls' data={this.state.photos_waterfalls} />}/>
            <Route exact path="/sunsets" render={(props) => <PhotoList {...props} title='Beautiful Sunsets' data={this.state.photos_sunsets} />}/>
            <Route 
              exact path="/search" 
              render={(props) => <PhotoList {...props} title='Search Result' data={this.state.search_results} />}
            />
            <Route component={ErrorNotFound} />
          </Switch> 
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
