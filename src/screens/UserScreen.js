import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";

import agent from "../agent";
import { connect } from "react-redux";
import { UPDATE_PHOTOS } from "../constants/actionTypes";
import { store } from "../store";
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  coverBio: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "600",
  },
  coverContainer: {
    marginBottom: 55,
    position: "relative",
  },
  coverImage: {
    height: Dimensions.get("window").height * (2 / 4),
    width: Dimensions.get("window").width,
  },
  coverMetaContainer: {
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: "#FFF",
    fontSize: 28,
    fontWeight: "bold",
    paddingBottom: 2,
  },
  coverTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  coverTitleContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 45,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  indicatorTab: {
    backgroundColor: "transparent",
  },
  mansonryContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginLeft: 0,
    marginRight: 0,
  },
  profileImage: {
    borderColor: "#FFF",
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: "absolute",
  },
  sceneContainer: {
    marginTop: 10,
  },
  scroll: {
    backgroundColor: "#FFF",
  },
  tabBar: {
    backgroundColor: "transparent",
    marginBottom: 20,
    marginLeft: 130,
    marginRight: 15,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -55,
    position: "relative",
    zIndex: 10,
  },
  tabRow: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  tabLabelNumber: {
    color: "black",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 2,
  },
  tabLabelText: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
  },
  imageContainer: {
    margin: 5,
    width: window.width/3.5,
    height: window.width/3,
  },
});

const mapStateToProps = (state) => ({
  photos: state.photos.photos,
});

const mapDispatchToProps = (dispatch) => ({
  onPhotosUpdate: (photos) => {
    console.log(photos);
    dispatch({ type: UPDATE_PHOTOS, photos: photos });
    console.log(store.getState());
  },
});

class UserScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let urlsmall = [];

    agent.User.photos(this.props.route.params.user.username).then(
      (responseJson) => {
        console.log(responseJson);
        responseJson.map((item) => urlsmall.push(item.urls.small));
        this.props.onPhotosUpdate(urlsmall);
      }
    );
  }

  openPhotoScreen = (index) => {
    this.props.navigation.navigate("Photos", {
      index,
    });
  };

  render() {
    return (
      <View>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container]}>
            <View style={styles.cardContainer}>
              <View style={styles.headerContainer}>
                <View style={styles.coverContainer}>
                  <ImageBackground
                    source={{
                      uri: this.props.route.params.user.photos[0]
                        ? this.props.route.params.user.photos[0].urls.full
                        : null,
                    }}
                    style={styles.coverImage}
                  >
                    <View style={styles.coverTitleContainer}>
                      <Text style={styles.coverTitle} />
                    </View>
                    <View style={styles.coverMetaContainer}>
                      <Text style={styles.coverName}>
                        {this.props.route.params.user.name}
                      </Text>
                      <Text style={styles.coverBio}>
                        {this.props.route.params.user.bio}
                      </Text>
                    </View>
                  </ImageBackground>
                </View>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={{
                      uri: this.props.route.params.user.profile_image.large,
                    }}
                    style={styles.profileImage}
                  />
                </View>
              </View>
            </View>
            <ScrollView>
              {this.props.photos.length ? (
                <View style={styles.mansonryContainer}>
                  {this.props.photos.map((image, index) => (
                    <TouchableOpacity key={index}
                      onPress={() => this.openPhotoScreen(index)}
                    >
                      <Image 
                        style={styles.imageContainer}                        
                        source={{uri : image}}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text style={{ flex: 1, padding: 20 }}>
                  No Photos are available
                </Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
