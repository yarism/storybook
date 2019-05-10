import React, { Component } from 'react';

import Bookings from '../features/bookings/Bookings';


export default class HomeScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Bookings navigation={this.props.navigation} />
        );
    }
}