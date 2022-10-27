import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';
import './external.css';

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
        <img className="acco" src={properties.photo} />
        <div className="heading">
        
        <div className="heading-segment">{ name }</div>
        <div className="dates">{ properties.reviews} ; <u>{properties.location}</u></div>
          <div className="description">{ properties.description }</div>
          <div className="dates">{ properties.dates }</div>
          <div className="price-per-night">{ properties.nightlyFee }</div>
          {showResults ? <DetailsRow properties={properties}/> : null}
        </div>
      </div>
    );
}
const DetailsRow = (props) => {

    const properties = props.properties;

    return (
      <div>
        <div className="description"><span className="makeBold">Amenities: </span>{ properties.amenities }</div>
        <div className="price"><span className="makeBold">Bedrooms: </span><span className="dates">{ properties.bedrooms }</span><span className="makeBold">Guests: </span><span className="dates">{ properties.bedrooms }</span></div>
        <div className="price"><span className="makeBold">Cleaning fee: </span><span className="dates">{ properties.cleaningFee }</span></div>
        <div className="price"><span className="makeBold">Service fee: </span><span className="dates">{ properties.serviceFee }</span></div>
        <div className="description"><span className="makeBold">Additional: </span>{ properties.additional }</div>
      </div>
    );
}

const PropertiesTable = (props) => {

    const filterText = props.filterText;
    const inStockOnly = props.inStockOnly;
    const rows = [];

    props.properties.forEach((product) => {
        if (product.title.indexOf(filterText) === -1) {
          return;
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
          <input type="text" placeholder="Search..." value={props.filterText} onChange={handleFilterTextChange}/>
          <br></br>
          <input type="checkbox" checked={props.inStockOnly} onChange={handleInStockChange}/>
            {' '}
            Only show available video list
          
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
function App () {
    const [properties, setProperties] = useState([]); 
    useEffect( () => {
    const url = "properties.json"; 
    fetch(url)
    .then( res => res.json() )
    .then( data => setProperties(data))
    .catch( err => console.error(err));
    },[]);
    return(
        <PropertiesList properties={properties} />
    );
}
ReactDOM.render(
    <App />
    ,
    document.getElementById('root')
);
