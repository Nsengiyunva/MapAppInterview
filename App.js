import React from 'react';
import MapView,{ PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapDirections from './app/MapDirections';

const KEY ='AIzaSyDUEQtEP2uyop5B-OmrdKffPgyMVJiEp2Q';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
 container: {
   ...StyleSheet.absoluteFillObject,
   height: 400,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE
    }
  }
  componentDidMount(){
    console.log('set latitude')
  }
  render(){
    return  (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          {!!this.state.latitude && this.state.longitude && <MapView.Marker 
              coordinate={{'latitude': this.state.latitude, 'longitude': this.state.longitude}}
              title='Your location'
              />}
        </MapView>
      </View>
   );
   
  }
}

