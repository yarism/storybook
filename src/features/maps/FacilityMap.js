import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Dimensions, Text, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import MapView from "react-native-maps";

const Screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 75
}

export default class FacilityMap extends Component {
    constructor(props) {
        super(props);
        this._deltaY = new Animated.Value(Screen.height-100);
        this.state = {
            facilities: [],
            currentFacility: {},
            region: {
                latitude: 57.708870,
                longitude: 11.974560,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        };
    }

    componentDidMount() {
        this.getFacilities();
        navigator.geolocation.getCurrentPosition(
            position => this.setState({
                region: {
                    ...this.state.region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
            }),
            error => alert(JSON.stringify(error)), {
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000
            }
        );
    }

    // Move to redux/apollo client, whatever we decide upon
    async getFacilities() {
        try {
            let response = await fetch(
                'https://dev.matchi.se/api/mobile/v1/facilities',
            );
            let responseJson = await response.json();
            this.setState({ facilities: responseJson });
        } catch (error) {
            console.error(error);
        }
    }

    _onMarkerPress (facility) {
        this.setState({ currentFacility: facility });
    }

    render() {
        return (
            <View style={{ position: 'relative' }}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.region}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                >
                    {this.state.facilities.map(facility => {
                        return (
                            <MapView.Marker
                                key={facility.id}
                                coordinate={{
                                    latitude: facility.position.latitude,
                                    longitude: facility.position.longitude
                                }}
                                onPress={() => this._onMarkerPress(facility)}
                            />
                        );
                    })}
                </MapView>

                <View style={styles.panelContainer} pointerEvents={'box-none'}>
                    <Animated.View
                        pointerEvents={'box-none'}
                        style={[styles.panelContainer, {
                            backgroundColor: 'black',
                            opacity: this._deltaY.interpolate({
                                inputRange: [0, Screen.height - 100],
                                outputRange: [0.5, 0],
                                extrapolateRight: 'clamp'
                            })
                        }]}/>
                    <Interactable.View
                        verticalOnly={true}
                        snapPoints={[{y: Screen.height - 300}, {y: Screen.height - 100}]}
                        boundaries={{top: 200}}
                        initialPosition={{y: Screen.height - 100}}
                        animatedValueY={this._deltaY}>
                        <View style={styles.panel}>
                            <View style={styles.panelHeader}>
                                <View style={styles.panelHandle}/>
                            </View>
                            {this.state.currentFacility &&
                            <Fragment>
                                <Text style={styles.panelTitle}>{this.state.currentFacility.name}</Text>
                            </Fragment>
                            }
                        </View>
                    </Interactable.View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    panelContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    panel: {
        height: Screen.height + 300,
        padding: 20,
        backgroundColor: '#f7f5eee8',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        shadowOpacity: 0.4
    },
    panelHeader: {
        alignItems: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10
    },
    panelTitle: {
        fontSize: 27,
        height: 35
    },
    map: {
        height: Screen.height,
        width: Screen.width
    }
});