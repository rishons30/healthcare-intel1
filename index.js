let map;


function getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            resolve({ latitude, longitude }); // Return an object with both values
          },
          error => {
            reject(new Error('Error occured while fetching location:', error)); // Provide more context in the error message
          }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }





export async function initMap(type) {
  console.log("fn called");
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const location = await getUserLocation();
  const { latitude, longitude } = location;
  let center = new google.maps.LatLng(latitude,longitude);

  map = new Map(document.getElementById("map"), {
    center: center,
    zoom: 11,
    mapId: "DEMO_MAP_ID",
  });
 
 nearbySearch(type);
}

async function nearbySearch(type) {
  //@ts-ignore
  console.log('Search started for:', type); 
  const location = await getUserLocation();
  const { latitude, longitude } = location;
  const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary(
    "places",
  );
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  // Restrict within the map viewport.
  let center = new google.maps.LatLng(latitude,longitude);
  const request = {
    // required parameters
    fields: ["displayName", "location", "businessStatus"],
    locationRestriction: {
      center: center,
      radius: 400,
    },
    // optional parameters
    includedPrimaryTypes: [type],
    maxResultCount: 20,
    rankPreference: SearchNearbyRankPreference.POPULARITY,
    language: "en-US",
    //region: "me",
  };
  //@ts-ignore
  const { places } = await Place.searchNearby(request);

  if (places.length) {
    console.log(places);

    const { LatLngBounds } = await google.maps.importLibrary("core");
    const bounds = new LatLngBounds();

    // Loop through and get all the results.
    places.forEach((place) => {
      const markerView = new AdvancedMarkerElement({
        map,
        position: place.location,
        title: place.displayName,
      });

      bounds.extend(place.location);
      console.log(place);
    });
    map.fitBounds(bounds);
  } else {
    console.log("No results");
  }
}



// const labsbtn = document.getElementById('labs');
// const pharmaciesbtn=document.getElementById('pharmacies');
// // const button1 = document.getElementById('pharmacies');
    
// // Add click event listener
// labsbtn.addEventListener('click', function() {
//     initMap('hospital');
//     // Add any other actions you want to perform on button click
// });
// pharmaciesbtn.addEventListener('click', function() {
//   console.log('clicked');
//   initMap('pharmacy');
//   // Add any other actions you want to perform on button click
// });

//  initMap('hospital');



// document.addEventListener('DOMContentLoaded', function() {
//   const labsbtn = document.getElementById('labs');
//   const pharmaciesbtn = document.getElementById('pharmacies1');
// const doctorbtn=document.getElementById('doctor');
// const hospitalbtn=document.getElementById('hospital');

//   // Add click event listener to the labs button
//   labsbtn.addEventListener('click', function() {
//       initMap('lab');
//       // Add any other actions you want to perform on button click
//   });

//   // Add click event listener to the pharmacies button
//   pharmaciesbtn.addEventListener('click', function() {
//       console.log('Pharmacies button clicked');
//       initMap('pharmacy');
//       // Add any other actions you want to perform on button click
//   });

//   doctorbtn.addEventListener('click', function() {
//     console.log('Pharmacies button clicked');
//     initMap('doctor');
//     // Add any other actions you want to perform on button click
// });


// hospitalbtn.addEventListener('click', function() {
//   console.log('Pharmacies button clicked');
//   initMap('hospital');
//   // Add any other actions you want to perform on button click
// });








document.addEventListener('DOMContentLoaded', function() {
  const labsbtn = document.getElementById('labs');
  const pharmaciesbtn = document.getElementById('pharmacies1');
  const doctorbtn = document.getElementById('doctor');
  const hospitalbtn = document.getElementById('hospital');

  // Add click event listener to the labs button
  if (labsbtn) {
    labsbtn.addEventListener('click', function() {
      initMap('lab');
      // Add any other actions you want to perform on button click
    });
  }

  // Add click event listener to the pharmacies button
  if (pharmaciesbtn) {
    pharmaciesbtn.addEventListener('click', function() {
      console.log('Pharmacies button clicked');
      initMap('pharmacy');
      // Add any other actions you want to perform on button click
    });
  }

  // Add click event listener to the doctor button
  if (doctorbtn) {
    doctorbtn.addEventListener('click', function() {
      console.log('Doctor button clicked');
      initMap('doctor');
      // Add any other actions you want to perform on button click
    });
  }

  // Add click event listener to the hospital button
  if (hospitalbtn) {
    hospitalbtn.addEventListener('click', function() {
      console.log('Hospital button clicked');
      initMap('hospital');
      // Add any other actions you want to perform on button click
    });
  }
});

