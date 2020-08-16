import * as React from 'react';
import {
  View,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import { connect } from "react-redux";


const window = Dimensions.get('window');
const styles = StyleSheet.create({
  imageContainer: {
    width: window.width*9.5/10, height: window.height*8/10
  }
});

import Carousel from 'react-native-snap-carousel';


const mapStateToProps = (state) => ({
  photos: state.photos.photos,  
});

const mapDispatchToProps = (dispatch) => ({
  onPhotosUpdate: (photos) => { console.log(photos);
    dispatch({type: UPDATE_PHOTOS, photos:photos });
    console.log(store.getState())
}
});

class PhotoScreen extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:props.route.params.index,
          carouselItems: props.route.params.photos
      }
    }

    _renderItem({item,index}){
        return (
          <View style={{
              backgroundColor:'floralwhite',
              borderRadius: 5,
              height: window.height*8/10,
              width: window.width*9.5/10,
              //padding: 50,
              //marginLeft: 25,
              //marginRight: 25, 
            }}>
            <Image style={styles.imageContainer}
            source={{
              uri: item,
            }}
           
          />    
            
          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'rebeccapurple', paddingTop: 50, }}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.props.photos}
                  sliderWidth={300}
                  itemWidth={window.width* 9.5/10}
                  renderItem={this._renderItem}
                  firstItem={this.props.route.params.index}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
            </View>
          </SafeAreaView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoScreen);

