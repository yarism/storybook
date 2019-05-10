import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';

import Slots from './Slots';

export default class Bookings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            days: null
        };
    }

    componentDidMount() {
        // Move this to a datepicker component
        const options = { weekday: 'short', day: 'numeric' };
        let date = new Date();
        const days = [];

        for (let i = 0; i < 30; i++) {
            let _date = {
                localized: date.toLocaleDateString('default', options),
                date: date.toJSON()
            }
            days.push(_date);
            date.setDate(date.getDate() + 1);
        }
        console.log(days);
        this.setState({ days: days });
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.state.days}
                    keyExtractor={item => item.date}
                    renderItem={({item}) => <Text style={{ padding: 10 }}>{item.localized}</Text>}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
                <Slots />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
            </View>
        );
    }
}