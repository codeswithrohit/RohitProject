
import React, { useEffect, useState } from 'react'
import {View, Modal, TouchableOpacity,ScrollView,FlatList,StyleSheet,Text} from 'react-native';
import {COLORS} from '../global/theme';
import { firebase } from '../../Firebase/firebaseConfig'
import { btn1, btn2, colors, hr80, navbtn, navbtnin, navbtnout, nonveg, veg } from '../global/style';
import { AntDesign } from '@expo/vector-icons';
import {

  Title,
  Caption,
 
} from 'react-native-paper';

const ResultModal = ({
  route,
  navigation,
}) => {

 
    const [userdata, setUserdata] = useState(null);
    const [resultdata, setResultdata] = useState([]);
    const [cartdata, setCartdata] = useState(null);
    const [alldata, setAlldata] = useState();
    const [cart, setCart] = useState(null);
    const [all, setAll] = useState();
    const [index, setIndex] = React.useState(0);
    const { myquizdata } = route.params;
    useEffect(() => {
        setResultdata(JSON.parse(myquizdata));
    }, [myquizdata])
    const { currentQuizId } = route.params;
   
   
    const [userloggeduid, setUserloggeduid] = useState(null);
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


    useEffect(() => {
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
        getuserdata();
    }, [userloggeduid]);

    const getcartdata = async () => {
      const docRef = firebase.firestore().collection('QuizResults').doc(currentQuizId);

      docRef.get().then((doc) => {
          if (doc.exists) { 
              const data = JSON.stringify(doc.data());
              setCartdata(data)
          } else {
              console.log('No such document!');
          }
      })
  }



  const [scores, setScores] = useState([])

  const getscores = async () => {
      const ordersRef = firebase.firestore().collection('QuizScore').where('currentQuizId', '==', currentQuizId);
      ordersRef.onSnapshot(snapshot => {
          setScores(snapshot.docs.map(doc => doc.data()))
      })
  }

  useEffect(() => {
      getscores()
  }, [])

   console.log(scores)


  useEffect(() => {

      getcartdata();
  }, [])
  useEffect(() => {
      setAlldata(JSON.parse(cartdata));
  }, [cartdata])
  
  const [selectedTab, setSelectedTab] = useState(0);

  const onTabPress = (tabIndex) => {
    setSelectedTab(tabIndex);
  };



  return (


       
        <>
                <TouchableOpacity onPress={() => navigation.navigate('home')}>
            <View style={navbtn}>
                <AntDesign name="back" size={24} color="#252C4A" style={navbtnin} />
            </View>
        </TouchableOpacity>
        <Text style={{fontSize: 28, fontWeight: 'bold', marginTop:10,color:'#63FFD1'}}>Hey {userdata?.name},</Text>
         <Text style={{fontSize: 24, color: '#61688B', marginTop: 10}}>
           Now Turn, see Your Result
         </Text>

         <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={selectedTab === 0 ? styles.selectedTab : styles.tab} 
          onPress={() => onTabPress(0)}
        >
          <Text style={styles.tabText}>DashBoard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={selectedTab === 1 ? styles.selectedTab : styles.tab} 
          onPress={() => onTabPress(1)}
        >
          <Text style={styles.tabText}>Questions & Answer</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {selectedTab === 0 && (
           <><ScrollView>
           <FlatList style={styles.c1} data={resultdata.quiz} renderItem={({ item }) => {
              return (

                <View>
                  <View style={styles.infoBoxWrapper}>
                    <View style={[styles.infoBox, {
                      backgroundColor: '#42FF00',
                      borderRightColor: '#dddddd',
                      borderRightWidth: 1
                    }]}>
                      <Title>{item.correctCount}</Title>
                      <Caption>Corect</Caption>
                    </View>
                    <View style={[styles.infoBox, {
                      backgroundColor: colors.text1,
                      borderRightColor: '#dddddd',
                      borderRightWidth: 1
                    }]}>
                      <Title>{item.incorrectCount}</Title>
                      <Caption>Incorrect</Caption>
                    </View>
                    <View style={[styles.infoBox, {
                      backgroundColor: '#26C8F9',
                      borderRightColor: '#dddddd',
                      borderRightWidth: 1
                    }]}>
                      <Title>{item.unattemted}</Title>
                      <Caption>Unattempted</Caption>
                    </View>
                    <View style={[styles.infoBox, {
                      backgroundColor: '#F9A826',
                      borderRightColor: '#dddddd',
                      borderRightWidth: 1
                    }]}>
                      <Title>{item.totalCount}</Title>
                      <Caption>Total</Caption>
                    </View>
                  </View>


                  <View style={styles.infoBoxWrapper1}>
                    <View style={[styles.infoBox1, {
                      borderRightColor: '#dddddd',
                      borderRightWidth: 1
                    }]}>
                      <Title style={{color:'#63FFD1'}}>{item.correctCount}</Title>
                      <Caption style={{color:'#63FFD1'}}>You Score</Caption>
                    </View>
                    <View style={styles.infoBox}>
                      <Title style={{color:'#63FFD1'}}>{item.totalCount}</Title>
                      <Caption style={{color:'#63FFD1'}}>Full Marks</Caption>
                    </View>
                  </View>

               

                






                </View>
              );
            } } />
            <View style={styles.container}>
                <Text style={styles.headerText}>Quiz Ranking Board</Text>
                {scores.sort(
                        (a, b) => b.correctCount - a.correctCount
                    ).map((score, index) => {
                        return (
                      <View>
                        <TouchableOpacity style={styles.itemContainer}>
                          <Text style={styles.rankText}>{index + 1}</Text>
                          <Text style={styles.nameText}>{score.studentname}</Text>
                          <Text style={styles.scoreText}>{score.correctCount}</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </View></ScrollView></>
        )}
        {selectedTab === 1 && (
         <FlatList style={styles.c1} data={resultdata.quiz} renderItem={
          ({ item }) => {
              return (
                
                  <View >
                           

    <FlatList
data={item.questions}
style={{
flex: 1,
backgroundColor: COLORS.background,
}}
showsVerticalScrollIndicator={false}
keyExtractor={item => item.question}
renderItem={({item, index}) => (
<View
  style={{
    marginTop: 14,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    elevation: 2,
    borderRadius: 2,
  }}>
  <View style={{padding: 20}}>
    <Text style={{fontSize: 16}}>
      {index + 1}. {item.question}
    </Text>
    <Text style={{fontSize: 16}}>
       Correct Answer :{item.correct_answer}
    </Text>
    <Text style={{fontSize: 16, color:'#63FFD1'}}>
       Selected Answer: {item.selectedOption}
    </Text>
    
  </View>
  {/* Options */}
  {item.allOptions.map((option, optionIndex) => {
    return (
      <TouchableOpacity
        key={optionIndex}
        style={{
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderTopWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        >
        <Text
          style={{
            width: 25,
            height: 25,
            padding: 2,
            borderWidth: 1,
            borderColor: COLORS.border,
            textAlign: 'center',
            marginRight: 16,
            borderRadius: 25,
          }}>
          {optionIndex + 1}
        </Text>
        <Text >
          {option}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>
)}

/>
   
            
                     

                     
                  </View>
              )
          }
      } />
        )}
      </View>
    </View>
   
         
  </>
       
  );
};

export default ResultModal;

const styles = StyleSheet.create({
    containerout: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 10,
      backgroundColor: '#252C4A',
    },
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: 50,
      backgroundColor: 'lightgray',
    },
    tab: {
      width: '50%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedTab: {
      width: '50%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#252C4A',
    },
    tabText: {
      fontSize: 18,
      fontWeight:'bold',
      color:'#63FFD1',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'#63FFD1',
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
      width: '10%',
      color:'#63FFD1',
    },
    nameText: {
      fontSize: 16,
      width: '60%',
      color:'#63FFD1',
    },
    scoreText: {
      fontSize: 16,
      fontWeight: 'bold',
      width: '20%',
      color:'#63FFD1',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'#63FFD1',
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
      width: '10%',
      color:'#63FFD1',

    },
    nameText: {
      fontSize: 16,
      width: '60%',
      color:'#63FFD1',
    },
    scoreText: {
      fontSize: 16,
      fontWeight: 'bold',
      width: '20%',
      color:'#63FFD1',
    },
  head1: {
      fontSize: 18,
      fontWeight: '200',
      color: colors.text1,
      margin: 10,
      textAlign: 'center'
  },
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
      justifyContent: 'space-between',
  },
  container1: {
    backgroundColor: colors.col1,
    width: '100%',
    // height: 100,
    // alignItems: 'center',
    margin:10,
    elevation: 10,
    borderRadius: 10,
},
head: {
    color: colors.text1,
    fontSize: 25,
    fontWeight: '300',
    margin: 10,
    alignSelf: 'center',
    paddingBottom: 5,
    borderBottomColor: colors.text1,
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
    color: colors.text3,
},
mytext: {
    color: colors.text3,
},
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    margin:10,
    elevation: 10,
    borderRadius: 40,
  },
  infoBoxWrapper1: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    margin:10,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
    margin:10,
    elevation: 10,
    borderRadius: 40,
  },
  infoBoxWrapper2: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 50,
    margin:2,
    elevation: 10,
    borderRadius: 10,
  },
  infoBox: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBox1: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowout: {
      flexDirection: 'column',
      margin: 10,
      elevation: 10,
      backgroundColor: colors.col1,
      padding: 10,
      borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 14
  },
  group: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FF7657",
    justifyContent: "space-between"
  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: "center",
    alignItems: "center" 
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500"
  },
  active: {
    backgroundColor: "#FF7657"
  },
  activeText: {
    color: "#FFF"
  },
  first: {
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13
  },
  last: {
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13
  },
  option: {
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  qty: {
      width: 40,
      height: 30,
      backgroundColor: colors.text1,
      borderRadius: 10,
      textAlign: 'center',
      textAlignVertical: 'center',
      marginRight: 10,
      color: colors.col1,
      fontSize: 17,
      fontWeight: 'bold',
  },
  title: {
      fontSize: 17,
      fontWeight: 'bold',
      marginRight: 10,
  },
  price1: {
      fontSize: 17,
      fontWeight: 'bold',
      marginRight: 10,
      color: colors.text1,
  },
  left: {
      flexDirection: 'row',
  },
  right: {
      flexDirection: 'row',
  },
  totalprice: {
      fontSize: 17,
      fontWeight: 'bold',
      borderColor: colors.text1,
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
  },
  btntext: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.col1,
      margin: 10,
  }
})