import React, { Component } from 'react';
import osmtogeojson from 'osmtogeojson';
import leaflet from 'leaflet';
import {get} from 'lodash';

// https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3

class Panel extends Component {
    constructor() {
        super();

        this.submitX = this.submit.bind(this);

        this.state = {
            element: {},
        };
    }

    componentDidMount() {
        //this.fetchOsmElement('n1601837931');
        //this.fetchOsmElement('n1601566699'); brno

    }

    submit() {
        this.fetchOsmElement(this.inp.value);
    }

    render() {
        if (this.state.error) {
            return <p>Sorry! There was an error loading the items {this.state.e}</p>;
        }
        if (this.state.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div id="panel" className="App">
                id: <input type="text" ref={(inp)=>this.inp=inp} onChange={this.submitX} />

                <h2>{get(this, 'state.element.properties.name', 'no-name')}</h2>

                Geojson:
                <pre>
                {JSON.stringify(this.state.element, null, ' ')}
                </pre>
            </div>
        );
    }


    fetchOsmElement(id) {
        const type = { w: 'way', n: 'node', r: 'relation' }[id[0]];
        const idx = id.substr(1);
        const url = `https://www.openstreetmap.org/api/0.6/${type}/${idx}`;


        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.setState({ isLoading: false });
                return response;
            })
            .then((response) => response.text())
            .then(xmlStr => {
                const xmlDom = (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
                return osmtogeojson(xmlDom);
            })
            .then((element) => {
                const feature = element.features[0];

                var lon = feature.geometry.coordinates[0];
                var lat = feature.geometry.coordinates[1];
                this.props.map().setView([lat, lon]);
                leaflet.marker([lat, lon]).addTo(this.props.map());


                console.log("inp", this.inp);
                this.inp.value = feature.id;

                this.setState({ element: feature })
            })
            .catch((e) => {
                console.log("er", e);
                this.setState({ error: e })
            });
    }

}


export default Panel;