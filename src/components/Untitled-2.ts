// src/components/IndiaMap.js
import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function IndiaMap() {
  useEffect(() => {
    // Set your Mapbox access token here
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmFsdS1hcmphIiwiYSI6ImNscmg5bXEwczA4N3Ayam5jcGYyeHU2d3UifQ.jY1Jjm5rFAvQtuROfACIUw'; // Replace with your Mapbox access token

    // State data with latitude and longitude coordinates
    const stateData = [
        { name: 'Jammu and Kashmir', coordinates: [76.5762, 33.7782] },
        { name: 'Andhra Pradesh', coordinates: [79.73999, 15.9129] },
        { name: 'Arunachal Pradesh', coordinates: [94.7278, 28.2180] },
        { name: 'Assam', coordinates: [92.9376, 26.2006] },
        { name: 'Bihar', coordinates: [85.3131, 25.0961] },
        { name: 'Chhattisgarh', coordinates: [81.8661, 21.2787] },
        { name: 'Goa', coordinates: [74.1240, 15.2993] },
        { name: 'Gujarat', coordinates: [71.1924, 22.2587] },
        { name: 'Haryana', coordinates: [76.0856, 29.0588] },
        { name: 'Himachal Pradesh', coordinates: [77.1734, 31.1048] },
        { name: 'Jharkhand', coordinates: [85.2799, 23.6102] },
        { name: 'Karnataka', coordinates: [75.7139, 15.3173] },
        { name: 'Kerala', coordinates: [76.2711, 10.8505] },
        { name: 'Madhya Pradesh', coordinates: [78.6569, 22.9734] },
        { name: 'Maharashtra', coordinates: [75.7139, 19.7515] },
        { name: 'Manipur', coordinates: [93.9063, 24.6637] },
        { name: 'Meghalaya', coordinates: [91.3662, 25.4670] },
        { name: 'Mizoram', coordinates: [92.9376, 23.1645] },
        { name: 'Nagaland', coordinates: [94.5624, 26.1584] },
        { name: 'Odisha', coordinates: [85.0985, 20.9517] },
        { name: 'Punjab', coordinates: [75.3412, 31.1471] },
        { name: 'Rajasthan', coordinates: [74.2179, 27.0238] },
        { name: 'Sikkim', coordinates: [88.5122, 27.5330] },
        { name: 'Tamil Nadu', coordinates: [78.6569, 11.1271] },
        { name: 'Telangana', coordinates: [79.0193, 18.1124] },
        { name: 'Tripura', coordinates: [91.9882, 23.9408] },
        { name: 'Uttar Pradesh', coordinates: [80.9462, 26.8467] },
        { name: 'Uttarakhand', coordinates: [79.0193, 30.0668] },
        { name: 'West Bengal', coordinates: [87.8550, 22.9868] },
    ];

    // Object to store page URLs for each state
    const statePageUrls = {
      'Jammu and Kashmir': '/jammu-and-kashmir.html',
      'Andhra Pradesh': '/andhra-pradesh.html',
      // Add URLs for other states similarly
    };

    // Create a map instance
    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937], // India's approximate center coordinates [longitude, latitude]
      zoom: 4, // You can adjust the zoom level
    });

    // Add markers for each state
    addMarkers(map, stateData, statePageUrls);

    // Function to add markers for each state
    function addMarkers(map, stateData, statePageUrls) {
      const markerImageUrl = '/Marker.png';

      // Check if the image already exists, and add it only if it doesn't
      if (!map.hasImage('custom-marker')) {
        map.loadImage(markerImageUrl, (error, image) => {
          if (error) throw error;

          map.addImage('custom-marker', image);

          // Create a GeoJSON feature collection for all states
          const features = stateData.map((state) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: state.coordinates,
            },
            properties: {
              name: state.name,
            },
          }));

          // Add a layer for markers
          map.addLayer({
            id: 'state-markers',
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features,
              },
            },
            layout: {
              'icon-image': 'custom-marker',
              'icon-allow-overlap': true,
              'icon-size': 0.03,
            },
          });

          // Add click event listener for each state marker
          map.on('click', 'state-markers', (e) => {
            const features = map.queryRenderedFeatures(e.point, { layers: ['state-markers'] });

            if (!features.length) {
              return;
            }

            const clickedState = features[0].properties.name;
            const statePageUrl = statePageUrls[clickedState];

            if (statePageUrl) {
              window.location.href = statePageUrl;
            } else {
              console.error(`URL not defined for ${clickedState}`);
            }
          });
        });
      }
    }
  }, []);

  return <div id="map-container" style={{ width: '100%', height: '500px' }}></div>;
}

export default IndiaMap;
