import React from 'react';
import Photo from './Photo';
import NotFound from './NotFound';
const PhotoList = (props) => {
    const results = props.data; //get the data back and store them in results
    let photos; 
    // if the result is not null, then pass them to Photo component and render images
    if(results.length > 0){
        photos = results.map(photo => 
            <Photo key={photo.id} url={photo.urls.regular}/>
        );   
    } else if(props.isLoading === false ){
        photos = <NotFound /> //if the photo is null then display not found
    }
    
    return (
        <div className="photo-container">
            <h2>{props.title}</h2>
                <ul>
                    {photos}
                </ul>
        </div>
    )
}

export default PhotoList;