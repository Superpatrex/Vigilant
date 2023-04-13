import React, { useState } from 'react';
import Map from 'google-map-react';
import googleMapReact from 'google-map-react';
import GoogleMapReact from 'google-map-react';

const app_name = 'cop4331-vigilant'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:4091/' + route;
    }
}


function MapView()
{
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };
    
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '500px', width: '500px', backgroundColor:'#f00' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCivx73GpFHnziVqBrL481EFhBJOW3-tdA" }}
            defaultCenter={defaultProps.center}
            //defaultZoom={defaultProps.zoom}
          >
            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            /> */}
          </GoogleMapReact>
        </div>
      );
    // var card = '';
    // var search = '';

    // const [message, setMessage] = useState('');
    // const [searchResults, setSearchResults] = useState('');
    // const [cardList, setCardList] = useState('');

    // let _ud = localStorage.getItem('user_data');
    // let ud = JSON.parse(_ud);
    // let userId = ud.id;
    // let firstName = ud.firstName;
    // let lastName = ud.lastName;
	
    // const addCard = async event => 
    // {
	//     event.preventDefault();

    //     let obj = {userId:userId,card:card.value};
    //     let js = JSON.stringify(obj);

    //     try
    //     {
    //         const response = await fetch(buildPath('api/addcard'),
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         let txt = await response.text();
    //         let res = JSON.parse(txt);

    //         if( res.error.length > 0 )
    //         {
    //             setMessage( "API Error:" + res.error );
    //         }
    //         else
    //         {
    //             setMessage('Card has been added');
    //         }
    //     }
    //     catch(e)
    //     {
    //         setMessage(e.toString());
    //     }

	// };

    // const searchCard = async event => 
    // {
    //     event.preventDefault();
        		
    //     let obj = {userId:userId,search:search.value};
    //     let js = JSON.stringify(obj);

    //     try
    //     {
    //         const response = await fetch(buildPath('api/searchcards'),
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

    //         let txt = await response.text();
    //         let res = JSON.parse(txt);
    //         let _results = res.results;
    //         let resultText = '';
    //         for( var i=0; i<_results.length; i++ )
    //         {
    //             resultText += _results[i];
    //             if( i < _results.length - 1 )
    //             {
    //                 resultText += ', ';
    //             }
    //         }
    //         setSearchResults('Card(s) have been retrieved');
    //         setCardList(resultText);
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         setSearchResults(e.toString());
    //     }
    // };
    // return(
    //     <div id="cardUIDiv">
    //         <br />
    //         <input type="text" id="searchText" placeholder="Card To Search For" 
    //             ref={(c) => search = c} />
    //         <button type="button" id="searchCardButton" class="buttons" 
    //             onClick={searchCard}> Search Card</button><br />
    //         <span id="cardSearchResult">{searchResults}</span>
    //         <p id="cardList">{cardList}</p><br /><br />
    //         <input type="text" id="cardText" placeholder="Card To Add" 
    //             ref={(c) => card = c} />
    //         <button type="button" id="addCardButton" class="buttons" 
    //             onClick={addCard}> Add Card </button><br />
    //         <span id="cardAddResult">{message}</span>
    //     </div>
    // );

}

export default MapView;