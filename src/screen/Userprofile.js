import { View, TouchableOpacity, StyleSheet,Button, TextInput, SafeAreaView, ScrollView,Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { colors, btn2, titles,navbtn, navbtnin  } from '../global/style';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple, 
  } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import {useTheme} from 'react-native-paper';
import { firebase } from '../../Firebase/firebaseConfig';
const Userprofile = ({ navigation }) => {
  const [userloggeduid, setUserloggeduid] = useState(null);
    const [userdata, setUserdata] = useState(null);
    const {colors} = useTheme();
   

    const getuserdata = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserdata(doc.data());
            })
        }
        else {
            console.log('no user data');
        }
    }

    useEffect(() => {

        getuserdata();
    }, [userloggeduid]);

    // console.log(userdata);



    const [edit, setEdit] = useState(false);
    const [newname, setNewName] = useState('');
    const [newaddress, setNewAddress] = useState('');


    const updateuser = async () => {
        const docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
        const doc = await docRef.get();
        if (!doc.empty) {
            if (newname !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newname
                    })
                })
            }
            if (newaddress !== '') {
                doc.forEach((doc) => {
                    doc.ref.update({
                        address: newaddress
                    })
                })
            }
            alert('your user data is updated');
            getuserdata();
            setEdit(false);
            setPasswordedit(false);
        }
        else {
            console.log('no user data');
        }
    }


    const [Passwordedit, setPasswordedit] = useState(false);
    const [oldpassword, setOldPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
   


    const updatepassword = async () => {
      const reauthenticate = (oldpassword) => {
          var user = firebase.auth().currentUser;
          var cred = firebase.auth.EmailAuthProvider.credential(
              user.email, oldpassword);
          return user.reauthenticateWithCredential(cred);
      }
      let docRef = firebase.firestore().collection('UserData').where('uid', '==', userloggeduid)
      let doc = await docRef.get();
      reauthenticate(oldpassword).then(() => {
          var user = firebase.auth().currentUser;
          user.updatePassword(newpassword).then(() => {
              // alert("Password updated!");

              if (!doc.empty) {
                  doc.forEach((doc) => {
                      doc.ref.update({
                          password: newpassword
                      })
                  })
                  alert('your password is updated');
              }
          }).catch((error) => { alert('Server Issue'); });
      }).catch((error) => { alert('Wrong Password'); });
  }


    const logoutuser = () => {
      firebase.auth().signOut().then(() => {
          // Sign-out successful.
          alert('you are logged out');
          navigation.navigate('login');
      }).catch((error) => {
          // An error happened.
          alert('Server Issue');
      });
  }




  useEffect(() => {
    const checklogin = () => {
        firebase.auth().onAuthStateChanged((user) => {
            // console.log(user);
            if (user) {
                // navigation.navigate('home');
                setUserloggeduid(user.uid);
            } else {
                // No user is signed in.
                console.log('no user');
            }
        });
    }
    checklogin();
}, [])

    
    const [loading,setLoading] = useState(false)
    
    return (
        <View style={styles.containerout}>
            <TouchableOpacity onPress={() => navigation.navigate('home')}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>
            {edit == false && Passwordedit == false   && <View style={styles.container}>
                
                

                <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
      
          
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userdata ? <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{userdata.name}</Title>: 'loading'}</Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userdata ? <Text style={{color:"#777777", marginLeft: 20}}>{userdata.address}</Text>: 'loading'}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userdata ? <Text style={{color:"#777777", marginLeft: 20}}>{userdata.phone}</Text>: 'loading'}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userdata ? <Text style={{color:"#777777", marginLeft: 20}}>{userdata.email}</Text>: 'loading'}</Text>
         
        </View>
      </View>


      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {
                    setEdit(!edit)
                    setPasswordedit(false)
                }}>
          <View style={styles.menuItem}>
            <Icon name="account-edit" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Edit Details</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {
                    setPasswordedit(!Passwordedit)
                    setEdit(false)
                }}>
          <View style={styles.menuItem}>
            <Icon name="circle-edit-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => logoutuser()}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
      </ScrollView>
    </SafeAreaView>


               

               
            </View>
            }







            {edit == true &&
   <View style={{flex:1, margin:20}}>
    
        <View style={{alignItems: 'center'}}>
           
                
          <Text style={{marginTop: 10, fontSize: 24, fontWeight: 'bold'}}>
            Edit Profile
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onChangeText={(e) => setNewName(e)}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="Address"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
             onChangeText={(e) => setNewAddress(e)} 
          />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => updateuser()}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
      
    </View>
            }

            {Passwordedit == true &&
   <View style={{flex:1, margin:20}}>
    
   <View style={{alignItems: 'center'}}>
      
           
     <Text style={{marginTop: 10, fontSize: 24, fontWeight: 'bold'}}>
       Change Your Password
     </Text>
   </View>

   <View style={styles.action}>
     <FontAwesome name="user-o" color={colors.text} size={20} />
     <TextInput
       placeholder="Old Password"
       placeholderTextColor="#666666"
       autoCorrect={false}
       style={[
         styles.textInput,
         {
           color: colors.text,
         },
       ]}
        onChangeText={(e) => setOldPassword(e)} 
     />
   </View>
   <View style={styles.action}>
     <Icon name="map-marker-outline" color={colors.text} size={20} />
     <TextInput
       placeholder="New Password"
       placeholderTextColor="#666666"
       autoCorrect={false}
       style={[
         styles.textInput,
         {
           color: colors.text,
         },
       ]}
 onChangeText={(e) => setNewPassword(e)} 
     />
   </View>
   <TouchableOpacity style={styles.commandButton} onPress={() => updatepassword()}>
     <Text style={styles.panelButtonTitle}>Submit</Text>
   </TouchableOpacity>
 
</View>
            }




        </View>
    )
}

export default Userprofile

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
    },
    head1: {
        fontSize: 40,
        fontWeight: '200',
        marginVertical: 20,
        color: colors.text1,
    },
    containerin: {
        width: '90%',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.text1,
        borderRadius: 10,
        padding: 20,
        marginTop: 20,
    },
    head2: {
        fontSize: 20,
        fontWeight: '200',
        marginTop: 20,

    },
    head2in: {
        fontSize: 20,
        fontWeight: '300',
    },
    inputout: {
        flexDirection: 'row',
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // alignSelf: 'center',
        elevation: 20,
    },
    btntxt: {
        fontSize: 20,
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        padding: 10
    },
    input: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    container: {
        flex: 1,
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
      commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
      },
      panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
      },
      header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        // elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHeader: {
        alignItems: 'center',
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      panelTitle: {
        fontSize: 27,
        height: 35,
      },
      panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
      },
      panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
      },
      panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
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
})