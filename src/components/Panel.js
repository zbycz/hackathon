import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOsmElement } from '../store/actions';


class Panel extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchOsmElement('n1601837931');
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }
        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div className="App">
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOsmElement: (id) => dispatch(fetchOsmElement(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Panel);
