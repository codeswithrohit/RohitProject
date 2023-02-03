import { StyleSheet, Text, View, StatusBar, TextInput, FlatList, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../component/HomeHeadNav'
import {useTheme} from 'react-native-paper';
import { colors, veg, nonveg } from '../global/style'
import BottomNav from '../component/BottomNav'
import OfferSlider from '../component/OfferSlider'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../Firebase/firebaseConfig'

const HomeScreen = ({ navigation }) => {


    const screenWidth = Dimensions.get("window").width;
  
    const {colors} = useTheme();
    const [image, setImage] = useState(null);

    const handlePickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
        uploadImage(result.uri);
      }
    };
  
    const uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const ref = firebase.storage().ref().child('images/' + new Date().getTime());
      const snapshot = await ref.put(blob);
  
      const url = await snapshot.ref.getDownloadURL();
      console.log('Image URL:', url);
  
      firebase
        .firestore()
        .collection('users')
        .doc('user1')
        .update({
          profileImage: url,
        });
    };

    
 

  



   
    return (
      <View style={styles.containerout}>
      <StatusBar />

<HomeHeadNav navigation={navigation} />

<View style={styles.bottomnav}>
<BottomNav navigation={navigation} />
</View>
<ScrollView>
<View style={styles.container}>
  <OfferSlider/>


<TouchableOpacity
              onPress={() => {
                navigation.navigate('PlayWithWord')
              }}>
<View style={styles.container4}>
<View style={styles.wrapper}>
    <View style={styles.left_circle}>

    </View>
    <View style={styles.content}>
    <Text style={{color: '#63FFD1' , fontSize: 28 }}>Play With Word</Text>
    </View>
    <View style={styles.right_circle}>
        

    </View>

</View></View>
</TouchableOpacity>







</View>
</ScrollView>
</View>
    )
}


const styles = StyleSheet.create({
  containerout: {
      flex: 1,
      backgroundColor: colors.col1,
      // alignItems: 'center',
      width: '100%',
      // height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  uploadContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  text: {
    fontSize: 18,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '10%'
  },
  nameText: {
    fontSize: 16,
    width: '60%'
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '20%'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '10%'
  },
  nameText: {
    fontSize: 16,
    width: '60%'
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '20%'
  },
  head1: {
      fontSize: 40,
      textAlign: 'center',
      // fontWeight: '200',
      // marginVertical: 20,
      color: colors.text1,
  },
  head2: {
      fontSize: 30,
      textAlign: 'center',
      fontWeight: '200',
      marginVertical: 20,
      elevation: 10,
      backgroundColor: colors.col1,
      width: '90%',
      height: '50%',
      alignSelf: 'center',
      paddingVertical: '25%',
      borderRadius: 10,
  },
  cartcard: {
      flexDirection: 'row',
      backgroundColor: colors.col1,
      marginVertical: 5,
      borderRadius: 10,
      width: '95%',
      alignSelf: 'center',
      elevation: 10,
      alignItems: 'center',
  },
  cartimg: {
      width: 150,
      height: 100,
      borderRadius: 10,
  },
  cartcardin: {
      flexDirection: 'column',
      margin: 5,
      width: '58%',
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: colors.text1,

  },
  cardlist: {
      width: '100%',
  },
  cartout: {
      flex: 1,
      width: '100%',
  },
  btntxt: {
      backgroundColor: colors.text1,
      color: colors.col1,
      paddingHorizontal: 10,
      paddingVertical: 5,
      fontSize: 20,
      borderRadius: 10,
      width: '90%',
      textAlign: 'center',

  },
  btncont: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 0,
      flexDirection: 'row',
      marginBottom: 80,
      borderTopColor: colors.text3,
      borderTopWidth: 0.2,
  },
  bottomnav: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.col1,
      zIndex: 20,
  },
  c1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: colors.col1,
      borderRadius: 10,
      padding: 5,
  },
  txt1: {
      fontSize: 16,
      color: colors.text1,
      width: '60%',
      fontWeight: 'bold',
  },
  txt2: {
      fontSize: 16,
      color: colors.text3,
      fontWeight: 'bold',
  },
  c2: {
      backgroundColor: colors.text1,
      borderRadius: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 5,
      flexDirection: 'row',
  },
  txt3: {
      fontSize: 15,
      color: colors.col1,
  },
  txt5: {
      fontSize: 20,
      color: colors.text3,
      marginHorizontal: 5,
  },
  txt6: {
      fontSize: 25,
      color: colors.text3,
      marginHorizontal: 5,
      fontWeight: 'bold',
  },
  c3: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  c4: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      borderRadius: 10,
      borderColor: colors.text1,
      borderWidth: 1,
      marginVertical: 10,
      padding: 5,
  },
  del: {
      color: colors.text1,
  },
  action: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f2f2',
      paddingBottom: 5,
    },
    actionError: {
      flexDirection: 'row',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#FF0000',
      paddingBottom: 5,
    },
    textInput: {
      flex: 1,
      marginTop: Platform.OS === 'ios' ? 0 : -12,
      paddingLeft: 10,
      color: '#05375a',
    },
    head: {
      color: '#63FFD1',
      fontSize: 25,
      fontWeight: '300',
      margin: 10,
      alignSelf: 'center',
      paddingBottom: 5,
      borderBottomColor: '#63FFD1',
      borderBottomWidth: 1,
  },
  box: {
      backgroundColor: colors.col1,
      elevation: 20,
      margin: 10,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
  },
  myicon: {
      marginRight: 10,
      color: '#63FFD1',
  },
  mytext: {
      color: '#63FFD1',
  },
  wrapper:{
    marginLeft: -30,
    marginRight: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    alignContent:'center'
  },
  left_circle:{
    width: 50,
    height: 50,
     borderRadius: 50,
     backgroundColor: '#F5F5F7'
  },
  right_circle:{
    width: 50,
    height: 50,
     borderRadius: 50,
     backgroundColor: '#F5F5F7'
  },
  container4:{
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: '#252C4A',
    borderRadius: 6,
    justifyContent:'center',
  },
  wrapper1:{
    marginLeft: -30,
    marginRight: -30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    alignContent:'center'
  },
  left_circle1:{
    width: 50,
    height: 50,
     borderRadius: 50,
     backgroundColor: '#F5F5F7'
  },
  right_circle1:{
    width: 50,
    height: 50,
     borderRadius: 50,
     backgroundColor: '#F5F5F7'
  },
  container5:{
    height: 100,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    backgroundColor: '#252C4A',
    borderRadius: 6,
    justifyContent:'center',
  }
})
export default HomeScreen