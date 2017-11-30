import React, { Component } from 'react';
import leaflet from 'leaflet';
import { get } from 'lodash';
import { fetchElement } from '../services/osmApi';
import { getShortId } from '../services/osmApi';


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
        //TODO sanitize input
        this.fetchOsmElement(this.input.value);
        return false;
    }

    render() {
        if (this.state.error) {
            return <p>Sorry! There was an error loading the items {this.state.e}</p>;
        }
        if (this.state.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div id="panel">
                <form onSubmit={this.submitX}>
                    id: <input type="text" ref={inp => this.input = inp}/>
                </form>
                {/* TODO jak fungují form submit, atd.. */}

                <h2>{get(this, 'state.element.properties.name', 'no-name')}</h2>

                Geojson:
                <pre>
                {JSON.stringify(this.state.element, null, ' ')}
                </pre>
            </div>
        );
    }


    fetchOsmElement(id) {
        fetchElement(id).then((element) => {
            const feature = element.features[0];

            var lon = feature.geometry.coordinates[0];
            var lat = feature.geometry.coordinates[1];
            this.props.map().setView([lat, lon]);
            leaflet.marker([lat, lon]).addTo(this.props.map());

            this.input.value = getShortId(feature.id);

            this.setState({ element: feature });

        }).catch((e) => {
            console.log("er", e);
            this.setState({ error: e })
        });
    }

}


export default Panel;