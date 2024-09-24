import { StyleSheet, Text, Image, View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { useNavigation } from "@react-navigation/native";

import skyshowtime from "../assets/streaming/skyshowtime.png";
import hbo from "../assets/streaming/hbo.png";
import primevideo from "../assets/streaming/primevideo.png";
import disneyplus from "../assets/streaming/disneyplus.png";
import netflix from "../assets/streaming/netflix.png";

const PLATFORMS_FAVICONS = {
  skyshowtime,
  hbo,
  primevideo,
  disneyplus,
  netflix,
}

const screenDimensions = Dimensions.get('screen');

export default function Movie({ route }: { data: MovieInterface, route: any }) {
  const navigation = useNavigation();

  const {
      title,
      sinopsis,
      trailer,
      platforms,
      poster,
  } = route.params;

  const onPress = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container} key={`movie-${title}`}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
        <TouchableOpacity onPress={onPress}>
          <Image
            source={{
              uri: poster,
            }}
            style={{ width: screenDimensions.width - 100, height: 500, }}
          />
          <View style={styles.titlePlatforms}>
            {platforms.map((platform: 'disneyplus' | 'hbo' | 'netflix' | 'skyshowtime' | 'primevideo') => {
              return (
                <Image
                  key={`platform-${platform}`}
                  source={PLATFORMS_FAVICONS[platform]}
                  style={styles.platformMargin}
                />
              );
            })}
        </View>
        </TouchableOpacity>
        <Text style={styles.sinopsis}>{sinopsis}</Text>
        <YoutubePlayer videoId={trailer} height={300} width="100%" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#04893f',
  },
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: '#078a40',
    paddingLeft: 10,
    marginBottom: 20,
  },
  container: {
    // flex: 1,
    alignItems: "center",
    backgroundColor: '#030406',
  
    justifyContent: "center",
    marginBottom: 35,
  },
  title: {
    color: '#030406',
    fontSize: 20,
    fontWeight: "700",
  },
  sinopsis: {
    color: '#6b7d75',
    marginVertical: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 350,
    height: 350,
  },
  titlePlatforms: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  platformMargin: {
    marginLeft: 5,
    height: 32,
    width: 32,
  },
  youtube: {
    alignSelf: 'stretch',
    borderRadius: 25,
  }
});
