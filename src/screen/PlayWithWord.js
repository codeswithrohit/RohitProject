import { StyleSheet, Text, View, StatusBar, FlatList, ScrollView, TouchableOpacity } from 'react-native'

import React, { useEffect, useState } from 'react'
import BottomNav from '../component/BottomNav'
import { btn1, btn2, colors } from '../global/style'
import WordBox from '../component/WordBox'
import { WordsArray } from '../component/data1'
import InputBox from '../component/InputBox'
import Keyboard from '../component/Keyboard'
import StatusPopup from '../component/StatusPopup'

const TrackOrders = ({ navigation }) => {
    const [correctLetters, setCorrectLetters] = useState('');
    const [wrongLetters, setWrongLetters] = useState('');
    const [status, setStatus] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const correctWord = WordsArray[currentIndex].answer;
  
    const storeCorrectLetters = (keyInput) => {
      const ans = correctWord.toUpperCase();
      if (ans.includes(keyInput)) {
        const cl = correctLetters + keyInput;
        setCorrectLetters(cl);
        // check win
        updateStatus(cl);
      } else {
        const wl = wrongLetters + keyInput;
        setWrongLetters(wl);
        if (wl.length > 5) {
          // lost
          setStatus('lost')
        }
      }
    }
  
    const updateStatus = (cl) => {
      let status = 'win';
      const correctWordArray = Array.from(correctWord.toUpperCase());
      correctWordArray.forEach(letter => {
        if (!cl.includes(letter)) {
          status = '';
        }
      })
      if (status === 'win' && currentIndex === WordsArray.length - 1) {
        setStatus('completed')
        return
      }
      setStatus(status);
    }
  
    const handlePopupButton = () => {
      if (status === 'win') {
        // go to next word
        setCurrentIndex(i => i + 1)
      }
      // clear all stored data
      setCorrectLetters('')
      setWrongLetters('')
      setStatus('')
      // replay
      if (status === 'completed') {
        setCurrentIndex(0);
      }
    }
    return (
      

<View style={styles.container}>
<StatusBar />
            <View style={styles.bottomnav}>
                <BottomNav navigation={navigation} />
            </View>
<View style={styles.row}>
  <WordBox wordData={WordsArray[currentIndex]} />
</View>
<InputBox correctLetters={correctLetters} answer={correctWord} />
<Keyboard correctLetters={correctLetters} wrongLetters={wrongLetters} onPress={(input) => storeCorrectLetters(input)} />
<StatusPopup status={status} onPress={handlePopupButton} />
</View>


    )
}

export default TrackOrders

const styles = StyleSheet.create({
    container: {
        flex: 1,
         width: '100%',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.col1,
        zIndex: 20,
    },
    containerin: {
        marginTop: 10,
        flex: 1,
        backgroundColor: colors.col1,
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        marginBottom: 100,
    },
    head1: {
        fontSize: 30,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'space-between',
    },
    rowout: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
    },
    row1: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qty: {
        fontSize: 20,
        color: colors.text1,
        marginRight: 10,

    },
    title: {
        fontSize: 17,
        color: colors.text1,
        marginRight: 10,

    },
    price1: {
        fontSize: 17,
        color: colors.text1,
        marginRight: 10,
    },
    totalprice: {
        fontSize: 20,
        // color: colors.text1,
        marginRight: 10,

    },
    total: {
        fontSize: 20,
        color: colors.text3,
        textAlign: 'right',
        marginVertical: 10,
        marginRight: 20,
    },
    order: {
        margin: 10,
        elevation: 10,
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,

    },
    ordertxt1: {
        fontSize: 20,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 10,

    },
    ordertxt2: {
        fontSize: 17,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 5,
        fontWeight: 'bold',
    },
    orderindex: {
        fontSize: 20,
        color: colors.col1,
        backgroundColor: colors.text1,
        textAlign: 'center',
        borderRadius: 30,
        padding: 5,
        width: 30,
        position: 'absolute',
        top: 10,
        left: 10,
    },
    ordertxt3: {
        fontSize: 17,
        color: colors.text3,
        textAlign: 'center',
        marginVertical: 5,
        borderColor: colors.text1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
    },
    cancelbtn: {
        backgroundColor: colors.text1,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignSelf: 'center',

    },
    cencelbtnin: {
        fontSize: 20,
        color: colors.col1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    orderstatus: {
        // fontSize: 20,
    },
    orderstatusin: {},
    orderotw: {
        fontSize: 20,
        backgroundColor: 'orange',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderdelivered: {
        fontSize: 20,
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    ordercancelled: {
        fontSize: 20,
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    },
    orderpending: {
        fontSize: 20,
        backgroundColor: 'yellow',
        color: 'grey',
        textAlign: 'center',
        borderRadius: 10,
        padding: 5,
        marginVertical: 10,
        paddingHorizontal: 20,
        alignSelf: 'center',
    }
})