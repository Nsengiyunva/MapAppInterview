// import React from 'react';
// import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps';
// import { View, Text, StyleSheet, Dimensions } from 'react-native';
// import MapDirections from './app/MapDirections';

// const KEY ='AIzaSyDUEQtEP2uyop5B-OmrdKffPgyMVJiEp2Q';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE = 37.771707;
// const LONGITUDE = -122.4053769;
// const LATITUDE_DELTA = 0.0922;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// const styles = StyleSheet.create({
//  container: {
//    ...StyleSheet.absoluteFillObject,
//    height: 400,
//    width: 400,
//    justifyContent: 'flex-end',
//    alignItems: 'center',
//  },
//  map: {
//    ...StyleSheet.absoluteFillObject,
//  },
// });

// export default class  App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       latitude: LATITUDE,
//       longitude: LONGITUDE
//     }
//   }
//   componentDidMount(){
//     console.log('set latitude')
//   }
//   render(){
//     return  (
//       <View style={styles.container}>
//         <Text>Map directions</Text>
//         {/* <MapView
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           region={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.015,
//             longitudeDelta: 0.0121,
//           }}
//         >
//           {!!this.state.latitude && this.state.longitude && <MapView.Marker 
//               coordinate={{'latitude': this.state.latitude, 'longitude': this.state.longitude}}
//               title='Your location'
//               />}
//         </MapView> */}
//       </View>
//    );
   
//   }
// }
import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDUEQtEP2uyop5B-OmrdKffPgyMVJiEp2Q';

import { NativeModules } from 'react-native';
const reactNativeVersion = NativeModules.PlatformConstants.reactNativeVersion;
const reactNativeVersionString = reactNativeVersion ? `${reactNativeVersion.major}.${reactNativeVersion.minor}.${reactNativeVersion.patch}${reactNativeVersion.prerelease ? ' pre-release' : ''}` : '';

const reactNativeMapsVersion = require('./node_modules/react-native-maps/package.json').version;
const reactNativeMapsDirectionsVersion = require('./node_modules/react-native-maps-directions/package.json').version;

const styles = StyleSheet.create({
  versionBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  versionText: {
    padding: 4,
    backgroundColor: '#FFF',
    color: '#000',
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: [
        "Twitter HQ, Market Street, San Francisco, CA, USA",
        "Apple Park Visitor Center",
      ],
    };

    this.mapView = null;
  }

  onMapPress = (e) => {
    this.setState({
      coordinates: [
        ...this.state.coordinates,
        e.nativeEvent.coordinate,
      ],
    });
  }

  onReady = (result) => {
    this.mapView.fitToCoordinates(result.coordinates, {
      edgePadding: {
        right: (width / 10),
        bottom: (height / 10),
        left: (width / 10),
        top: (height / 10),
      },
    });
  }

  onError = (errorMessage) => {
    console.log(errorMessage); // eslint-disable-line no-console
  }

  setDistance(distance, duration_in_traffic) {
    // console.log('setDistance');
    this.setState({
      distance: parseFloat(distance),
      durationInTraffic: parseInt(duration_in_traffic)
    });
  }

  render() {
    return (
      <View style={StyleSheet.absoluteFill}>
        <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          style={StyleSheet.absoluteFill}
          ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
          onPress={this.onMapPress}
        >
          <MapViewDirections
            origin={this.state.coordinates[0]}
            destination={this.state.coordinates[this.state.coordinates.length-1]}
            waypoints={this.state.coordinates.slice(1,-1)}
            mode='DRIVING'
            apikey={GOOGLE_MAPS_APIKEY}
            language='en'
            strokeWidth={4}
            strokeColor="red"
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={this.onReady}
            onError={(errorMessage) => {
              console.log(errorMessage);
            }}
            resetOnChange={false}
          />
        </MapView>
        <View style={styles.versionBox}>
          <Text style={styles.versionText}>RN {reactNativeVersionString}, RNM: {reactNativeMapsVersion}, RNMD: {reactNativeMapsDirectionsVersion}</Text>
        </View>
      </View>
    );
  }
}

export default App;