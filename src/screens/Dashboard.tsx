import { StyleSheet, Text, TouchableOpacity, ScrollView, View, Image, Dimensions } from "react-native";
import { usePushNotifications } from "../../usePushNotifications";
import { useEffect, useState } from "react";
import { firebaseDB } from "../../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"; 
import { MovieInterface } from "../interfaces/MovieInterface";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';

const screenDimensions = Dimensions.get('screen');

export default function Dashboard() {
  const navigation = useNavigation();
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  const [movies, setMovies] = useState<MovieInterface[] | undefined>(undefined);


  const getData = async () => {
    const moviesFirebase: MovieInterface[] = [];
    const querySnapshot = await getDocs(collection(firebaseDB, "movies"));
      querySnapshot.forEach((doc) => {
        const movieData: MovieInterface = doc.data() as MovieInterface;
        moviesFirebase.push(movieData);
    });
    setMovies(moviesFirebase);
  }

  useEffect(() => {
    if (!movies) getData();
  }, []);

  const onPress = (data: MovieInterface) => {
    navigation.navigate('Movie', data);
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Películas</Text>
        </View>
        {movies?.map((movie) => (
          <View style={styles.imageIconsContainer}>
            <Icon name="trash" size={32} color="white" />
            <TouchableOpacity onPress={() => onPress(movie)} key={`movie_${movie.title}`} style={styles.imageWrapper}>
              <Image
                  source={{
                    uri: movie.poster,
                  }}
                  style={styles.image}
                />
            </TouchableOpacity>
            <Icon name="heart" size={32} color="white" />
          </View>
        ))}
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#04893f',
    flex: 1,
  },
  header: {
    flex: 1,
    width: '100%',
    backgroundColor: '#078a40',
    paddingLeft: 10,
    marginBottom: 20,
  },
  title: {
    color: '#030406',
    fontSize: 20,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    backgroundColor: '#030406',
    alignItems: "center",
    justifyContent: "center",
  },
  imageIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    backgroundColor: '#078a40',
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  image: {
    width: screenDimensions.width - (screenDimensions.width / 4),
    height: screenDimensions.width,
  },
});
