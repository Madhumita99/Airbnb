import React, { useState } from 'react';
import '../App.css';
import RemoveFavourites from './RemoveFavourites';

const FavouriteProperty = (props) => {
    console.log(props.favourites);
    const stringify = props.favourites.map( (property, id) => (
    <div key={id} className="col-lg-6 col-md-6 col-s-12 col-xs-12 main-section">
        <div onClick={() => props.removeFavouriteProperty(property) }>
            <RemoveFavourites/>
        </div>
        <img className="acco" src={property.photo} />
        <div className="heading">
        <div className="heading-segment">{ property.title }</div>
        <div className="dates">{ property.reviews} ; <u>{property.location}</u></div>
        <div className="dates">{ property.dates }</div>
        <div className="price-per-night">{ property.nightlyFee }</div>
        </div>
    </div>
    ));
    console.log(stringify);
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Favourites</span>
            </nav>
            <div className='row'>
                {stringify}
            </div>
        
        </div>
	);
};
export default FavouriteProperty;