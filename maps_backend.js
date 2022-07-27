/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
 var map;
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
   map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
     center: { lat: 17.38, lng: 78.48 },
  });
  directionsRenderer.setMap(map);
  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);

 /*   const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
      const icons = {
    parking: {
      icon: iconBase + "beachflag.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
      };
      const features = [
    {
      position: new google.maps.LatLng(17.4883539, 78.3935925),
      title: "Accident zone!",
      type: "info",
    }
      ]; */

      // Create markers.
    /*   for (let i = 0; i < features.length; i++) {
          const marker = new google.maps.Marker({
      position: features[i].position,
      icon: icons[features[i].type].icon,
      title: features[i].title,
      map: map,
          });
      }  */

       const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Danger</h1>' +
    '<div id="bodyContent">' +
    "<p>Accident prone zone</p>" +
    "</div>";
      const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

   marker = new google.maps.Marker({
    map,
    draggable: true,
    title: "Accident zone",
    animation: google.maps.Animation.DROP,
    position: { lat: 17.4883539, lng: 78.3935925 },
  });
  marker.addListener("click", toggleBounce);
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: true,
    });
  });

}
function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService
    .route({
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: 'DRIVING',
      provideRouteAlternatives: true


    })
    .then((response) => {
        console.log(response);
      directionsRenderer.setDirections(response);
       var summaryPanel = document.getElementById('directions-panel');
      summaryPanel.innerHTML = '';
      for (var x = 0; x < response.routes.length; x++) {
        new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          routeIndex: x
        });
        summaryPanel.innerHTML += '<hr><br><b> Route ' + (x + 1) + ':<br>';
        var route = response.routes[x];
        for (var y = 0; y < route.legs.length; y++) {
          var routeSegment = y + 1;
          summaryPanel.innerHTML += route.legs[y].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[y].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[y].distance.text + '<br><br>';
          var steps = route.legs[y].steps;
          for (var z = 0; z < steps.length; z++) {
            var nextSegment = steps[z].path;
            summaryPanel.innerHTML += "<li>" + steps[z].instructions;
            var dist_dur = "";
            if (steps[z].distance && steps[z].distance.text) dist_dur += steps[z].distance.text;
            if (steps[z].duration && steps[z].duration.text) dist_dur += "&nbsp;" + steps[z].duration.text;
            if (dist_dur != "") {
              summaryPanel.innerHTML += "(" + dist_dur + ")<br /></li>";
            } else {
              summaryPanel.innerHTML += "</li>";
            }
          }
          summaryPanel.innerHTML += "<br>";
        }

      }
    })
    .catch((e) => window.alert("Directions request failed due to " + status));
}
window.initMap = initMap;
/* google.maps.event.addDomListener(window, 'load', initMap); */