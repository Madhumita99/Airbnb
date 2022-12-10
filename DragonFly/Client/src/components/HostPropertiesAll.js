import React, { useState, useEffect }  from 'react';
import './external.css';
import {Link} from 'react-router-dom';

const PropertiesRow = (props) => {

    const properties = props.properties;
    
    const name = properties.title ?
    properties.title:
        <span style={{color: 'red'}}>
        {properties.title}
        </span> ;
    const [showResults, setShowResults] = React.useState(false)
    const onClick = (showResults) => setShowResults(true)
    return (
        <div className="col-lg-6 col-md-6 col-s-12 col-xs-12 main-section" onClick={onClick}>
        <img className="acco" src={properties.photo} alt="./photos.img5.jpg"/>
        <div className="heading">
        <div className="heading-segment">{ properties.title }</div>
        <div className="dates">{ properties.reviews} reviews; <u>{properties.location}</u></div>
          <div className="price-per-night">${ properties.nightlyFee } per night</div>
          {showResults ? <DetailsRow properties={properties}/> : null}
        </div>
      </div>
    );
}
const DetailsRow = (props) => {
    const deleteProperty = () => {
      fetch("http://localhost:3000/properties/"+properties._id,{
            method:'DELETE'
        })
        .then(response => response.json())
        .then(window.alert("Property deleted successfully"))
        .catch(e => {
            console.log("e",e)
        })
    }
    const properties = props.properties;
    return (
      <div>
        <div className="description">{ properties.description }</div>
        <div className="description"><span className="makeBold">Amenities: </span>{ properties.amenities }</div>
        <div className="price"><span className="makeBold">Bedrooms: </span><span className="dates">{ properties.bedrooms }</span><span className="makeBold">Guests: </span><span className="dates">{ properties.bedrooms }</span></div>
        <div className="price"><span className="makeBold">Cleaning fee: </span><span className="dates">${ properties.cleaningFee }</span></div>
        <div className="price"><span className="makeBold">Service fee: </span><span className="dates">${ properties.serviceFee }</span></div>
        <div className="description"><span className="makeBold">Additional: </span>{ properties.additional }</div>
        <Link to={`/updateProperty/${properties._id}`}><button type='button' style={{marginTop: '15px', marginBottom: '15px', width: '110px', height: '60px'}}>Update property</button></Link>
        <button type='button' onClick = {deleteProperty} style={{marginLeft: '10px', marginTop: '15px', marginBottom: '15px', width: '110px', height: '60px'}}>Delete property</button>
      </div>
    );
}

const PropertiesTable = (props) => {

    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const rows = [];

    props.properties.forEach((product) => {
        if (product.title.indexOf(filterText) === -1) {
          if (product.location.indexOf(filterText) === -1) {
            return;
          }
        }
        if (inStockOnly && !product.available) {
          return;
        }
        
        rows.push(
          <PropertiesRow
            properties={product}
            key={product.title}
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
            />
        </div>
    );
}
function PropertiesAll () {
    const [properties, setProperties] = useState([]); 
    useEffect( () => {
    const url = "http://localhost:3000/properties/"; 
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