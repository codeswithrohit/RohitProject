import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screen/LoginSignupScreens/WelcomeScreen';
import SignupScreen from './src/screen/LoginSignupScreens/SignupScreen';
import LoginScreen from './src/screen/LoginSignupScreens/LoginScreen';
import HomeScreen from './src/screen/HomeScreen';
import Productpage from './src/screen/Productpage';
import Userprofile from './src/screen/Userprofile';
import QuizScreen from './src/screen/QuizScreen';
import PlayQuizScreen from './src/screen/PlayQuizScreen';
import CreateQuizScreen from './src/screen/CreateQuizScreen';
import SearchQuiz from './src/screen/SearchQuiz';
import AddQuestionScreen from './src/screen/AddQuestionScreen';
import DashBoard from './src/screen/DashBoard';
import PlayWithWord from './src/screen/PlayWithWord';
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcomepage'>
        <Stack.Screen name="welcomepage" component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="signup" component={SignupScreen}
          options={{
            headerShown: false,

          }}
        />
        <Stack.Screen name="login" component={LoginScreen}
          options={{
            headerShown: false,

          }}
        />

        <Stack.Screen name="home" component={HomeScreen}
          options={{
            headerShown: false,

          }}
        />

          <Stack.Screen name="productpage" component={Productpage}
          options={{
            headerShown: false,
          }}
        />

         <Stack.Screen name="userprofile" component={Userprofile}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen name="QuizScreen" component={QuizScreen}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen name="PlayQuizScreen" component={PlayQuizScreen}
          options={{
            headerShown: false,
          }}
        />
      
         <Stack.Screen name="SearchQuiz" component={SearchQuiz}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="CreateQuizScreen" component={CreateQuizScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen name="AddQuestionScreen" component={AddQuestionScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen name="DashBoard" component={DashBoard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="PlayWithWord" component={PlayWithWord}
          options={{
            headerShown: false,
          }}
        />



     
      
       

        
      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});




// Category page
// cart page
// add to cart functionality
// track order page
// order history page
// payment gateway 