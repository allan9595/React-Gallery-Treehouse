import React, { Component }from 'react';
import PhotoList from './components/PhotoList';
import Nav from './components/Nav';
import Loading from './components/Loading'
import Search from './components/Search';
import ErrorNotFound from './components/Error';
import API_ACCESS_KEY from './config';
import axios from 'axios';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  
  //state declaring
  state = {
    photos: [],
    photos_waterfalls:[],
    photos_sunsets:[],
    search_results:[],
    isLoading: false
  }


  componentDidMount(){
    //make three api requests to all the data I need and store them in the states
    this.setState({
      isLoading: true //set the loading to true when starting loading
    })

    //the following three request are for default topics like dogs, sunsets and waterfall
    axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=1&orientation=squarish&query=dogs`)
      .then((response) => {
        //once the promise back, then set them to state and change the loading to false
        this.setState({
          photos: response.data.results,
          isLoading: false
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });

      axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=2&orientation=squarish&query=waterfalls`)
      .then((response) => {
        this.setState({
          photos_waterfalls: response.data.results,
          isLoading: false
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });

      axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=2&orientation=squarish&query=sunsets`)
      .then((response) => {
        this.setState({
          photos_sunsets: response.data.results,
          isLoading: false
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });
  }

  searchPhotos = (query) => {
    //this function is for the search photo function
    this.setState({
      isLoading: true  //set the loading to true when starting loading
    })
    axios.get(`https://api.unsplash.com/search/photos?client_id=${API_ACCESS_KEY}&per_page=24&page=2&orientation=squarish&query=${query}`)
      .then((response) => {
        //once the promise back, then set them to state and change the loading to false
        this.setState({
          search_results: response.data.results,
          isLoading: false
        })
      })
      .catch(error => {
        console.log('Fetching error, please try again later... ', error);
      });
  }

  render(){
    let loading;
    //loading if the state is true
    if(this.state.isLoading){
      loading = <Loading />
    } 
    //the following code are my routes, and use render methods to pass props to each component
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
              render={(props) => <PhotoList {...props} title='Search Result' data={this.state.search_results} isLoading={this.state.isLoading} />}
            />
            <Route component={ErrorNotFound} />
          </Switch>
          {loading}
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
