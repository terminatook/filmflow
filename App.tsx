import { StyleSheet, } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { usePushNotifications } from "./usePushNotifications";
import { useEffect, useState } from "react";
import { firebaseDB } from "./firebaseConfig"
import { collection, getDocs } from "firebase/firestore"; 
import { MovieInterface } from "./src/interfaces/MovieInterface"
import Movie from "./src/screens/Movie";
import Dashboard from "./src/screens/Dashboard";

const Stack = createNativeStackNavigator();

export default function App() {
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          name="Movie"
          component={Movie}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
