import React from 'react';
import Photo from './Photo';

const PhotoList = (props) => {
    const results = props.data;
    let photos = results.map(photo => 
        <Photo key={photo.id} url={photo.urls.regular}/>
    );   
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