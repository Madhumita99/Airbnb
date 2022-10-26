import React, { useState, useEffect }  from 'react';
import ReactDOM from 'react-dom';

const PropertiesRow = (props) => {

    const properties = props.properties;
    const name = properties.title ?
    properties.title:
        <span style={{color: 'red'}}>
        {properties.title}
        </span> ;

    return (
        <div className="col-md-6 main-section">
        <img className="acco" src="photos/img2.jpg" />
        <div className="heading">
        <div className="heading-segment">{ name }</div>
          <div className="description">{ properties.description }</div>
          <div className="dates">{ properties.dates }</div>
          <div className="price-per-night"><span className="price">{ properties.nightlyFee }</span></div>
        </div>
      </div>
    );
}
const DetailsRow = (props) => {

    const properties = props.properties;
    const name = properties.title ?
    properties.title:
        <span style={{color: 'red'}}>
        {properties.title}
        </span> ;

    return (
        <div className="col-md-6 main-section">
        <div className="heading">
        <div className="heading-segment">{ name }</div>
          <div className="description">{ properties.description }</div>
          <div className="dates">{ properties.dates }</div>
          <div className="price-per-night"><span className="price">{ properties.nightlyFee }</span></div>
        </div>
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
        const [details, setDetails] = useState(false);
        const Toggle = (details) => {
            setDetails(!details);
        }
        if (details) {
            rows.push(
                <PropertiesRow
                  properties={product}
                  key={product.title}
                />
            );
        } else {
            rows.push(
                <DetailsRow
                  properties={product}
                  key={product.title}
                />
              );
        }
        // rows.push(
        //   <PropertiesRow
        //     properties={product}
        //     key={product.title}
        //   />
        // );
    });
  
    return (
        <div className="card-body">
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