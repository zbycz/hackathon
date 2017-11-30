import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';

import registerServiceWorker from './registerServiceWorker';
import Panel from './components/Panel'
import leaflet from 'leaflet';




ReactDOM.render(
    <div>
        <Panel map={()=>mymap} />
        <div id="map" />
    </div>,
    document.getElementById('root'));


var mymap = leaflet.map('map').setView([49.1945, 16.6113], 15);
// leaflet.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
//     attribution: '&copy; CC-BY-SA <a href="https://openstreetmap.org/copyright">OSM</a>, imagery <a href="http://maps.stamen.com">Stamen Design</a>',
//     maxZoom: 18,
//     code: 's'
// }).addTo(mymap);

var mapboxAPIkey = "pk.eyJ1IjoiemJ5Y3oiLCJhIjoiY2owa3hrYjF3MDAwejMzbGM4aDNybnhtdyJ9.8CIw6X6Jvmk2GwCE8Zx8SA";
var mapbox = leaflet.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.streets-basic/{z}/{x}/{y}.png?access_token=' + mapboxAPIkey, {
    maxZoom: 24,
    attribution: " <a href='https://www.mapbox.com/about/maps/'>Mapbox</a>",
    code: 'x',
    osmczDefaultLayer: true,
    basic: true
}).addTo(mymap);




registerServiceWorker();



