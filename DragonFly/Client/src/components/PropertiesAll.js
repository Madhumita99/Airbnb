import React, { useState, useEffect }  from 'react';
import './external.css';
import {Link} from 'react-router-dom';
import AddFavourites from './AddFavourites';
import FavouriteProperty from './FavouriteProperty';

const PropertiesRow = (props) => {

    const properties = props.properties;
    
    const name = properties.title ?
    properties.title:
        <span style={{color: 'red'}}>
        {properties.title}
        </span> ;
    const [showResults, setShowResults] = React.useState(false)
    console.log(props.favourites)
    const onClick = (showResults) => setShowResults(true)
    return (
        <div className="col-lg-6 col-md-6 col-s-12 col-xs-12 main-section" onClick={onClick}>
        <div onClick={() => props.addFavouriteProperty(properties)} style={{paddingTop: '15px'}}>
          <AddFavourites/>
        </div>
        <img className="acco" src={properties.photo} alt="photos/img5.jpg" />
        <div className="heading">
        <div className="heading-segment">{ name }</div>
        <div className="dates">{ properties.reviews} reviews; <u>{properties.location}</u></div>
          <div className="price-per-night">${ properties.nightlyFee } per night</div>
          {showResults ? <DetailsRow properties={properties}/> : null}
        </div>
      </div>
    );
}
const DetailsRow = (props) => {

    const properties = props.properties;
    const [rating, setRating] = useState([]);
    const [comment, setComment] = useState();

    const storeTheComment = (e) => {
      setComment(e.target.value);
    }

    const updateRating = (e)=>{
        setRating(e.target.value);
    }
    const submitData = (e) => {
      e.preventDefault();
      properties.rating = ((parseFloat(properties.rating) * parseFloat(properties.ratingCount)) + parseFloat(rating)) / (parseFloat(properties.ratingCount) + parseFloat(1));
      properties.ratingCount = parseFloat(properties.ratingCount) + parseFloat(1);
      properties.comments = properties.comments.concat(comment);
      properties.reviews = properties.reviews+1;
      console.log(properties);
      
      fetch("http://localhost:3000/properties/"+properties._id, {
          method:'PATCH',
          headers : { 
              'Content-Type': 'application/json',
               'Accept': 'application/json'
            },
          body:JSON.stringify(properties)
      })
      window.alert("Rated successfully");
  }
    return (
      <div>
        <div className="description">{ properties.description }</div>
        <div className="description"><span className="makeBold">Amenities: </span>{ properties.amenities }</div>
        <div className="price"><span className="makeBold">Bedrooms: </span><span className="dates">{ properties.bedrooms }</span><span className="makeBold">Guests: </span><span className="dates">{ properties.bedrooms }</span></div>
        <div className="price"><span className="makeBold">Cleaning fee: </span><span className="dates">${ properties.cleaningFee }</span></div>
        <div className="price"><span className="makeBold">Service fee: </span><span className="dates">${ properties.serviceFee }</span></div>
        <div className="description"><span className="makeBold">Additional: </span>{ properties.additional }</div>
        <Link to={`/addReservation/${properties._id}`}><button className="btn btn-primary" style={{marginTop: '15px', marginBottom: '15px'}}>Add a new Reservation</button></Link>
        <div>
        <select onChange={updateRating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>&nbsp;
        <input type="text" placeholder="Comment..." onChange={storeTheComment} style={{marginLeft: '10px'}} />
        </div>
        <button className='btn btn-primary' onClick={submitData} style={{marginTop: '15px', marginBottom: '15px'}}>Rate a Property</button>
      </div>
    );
}

const PropertiesTable = (props) => {

    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const addFavouriteProperty = props.addFavouriteProperty
    const rows = [];

    props.properties.forEach((product) => {
        if (product.title.indexOf(filterText) === -1) {
          if (product.city.indexOf(filterText) === -1) {
            if(product.type.indexOf(filterText) === -1){
              return;
            }
          }
        }
        if (inStockOnly && !product.available) {
          return;
        }
        
        rows.push(
          <PropertiesRow
            properties={product}
            key={product.title}
            favourites={props.favourites}
            addFavouriteProperty={addFavouriteProperty}
          />
        );
    });
  
    return (
        <div className="row">
          {rows}
        </div>
    );
}
const SearchBar = (props) => {
  
    const handleFilterTextChange = (e) => {
      props.onFilterTextChange(e.target.value);
    }
     
    const handleInStockChange = (e) => {
      props.onInStockChange(e.target.checked);
    }
    
    return (
        <form>
          <input type="text" placeholder="Search..." value={props.filterText} onChange={handleFilterTextChange} style={{marginBottom: '10px', backgroundColor: '#f0dc82', boxShadow: 'none'}}/>
          <br></br>
          <input type="checkbox" checked={props.inStockOnly} onChange={handleInStockChange} style={{boxShadow: 'none'}}/>
            {' '}
            <div style={{overflow: 'hidden'}}>
             Show available properties
            </div>
          <hr ></hr>
        </form>
      );
}
export const PropertiesList = (props) => {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
    const [favourites, setFavourites] = useState([]);
    const addFavouriteProperty = (properties) => {
      const newFavouriteList = [...favourites, properties];
      setFavourites(newFavouriteList);
    }
    const removeFavouriteProperty = (property) => {
      const newFavouriteList = favourites.filter(
        (favourite) => favourite._id !== property._id
      );
  
      setFavourites(newFavouriteList);
    };
    const handleFilterTextChange = (filterText) => {
            setFilterText(filterText);
    }
    
    const handleInStockChange = (inStockOnly) => {
            setInStockOnly(inStockOnly);
    }

    return (
        <div>
            <SearchBar 
            filterText={filterText}
            inStockOnly={inStockOnly}
            onFilterTextChange={handleFilterTextChange}
            onInStockChange={handleInStockChange}
            />
            <PropertiesTable 
            properties={props.properties}
            filterText={filterText}
            inStockOnly={inStockOnly} 
            favourites={favourites}
            addFavouriteProperty={addFavouriteProperty}
            removeFavouriteProperty={removeFavouriteProperty}
            />
            <FavouriteProperty favourites={favourites} removeFavouriteProperty={removeFavouriteProperty} />
        </div>
    );
}
function PropertiesAll () {
    const [properties, setProperties] = useState([]); 
    useEffect( () => {
    const url = "http://localhost:3000/properties"; 
    fetch(url, {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then( res => res.json() )
    .then( data => setProperties(data))
    .catch( err => console.error(err));
    },[]);
    return(
        <PropertiesList properties={properties} />
    );
}
export default PropertiesAll;