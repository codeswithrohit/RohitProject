import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { firebase } from '../../Firebase/firebaseConfig'
import {Picker} from '@react-native-picker/picker';
import {COLORS} from '../global/theme';


const QuizScreen = ({navigation}) => {
  const [classValue, setClassValue] = useState('');
  const [subjectValue, setSubjectValue] = useState('');
  const [chapterValue, setChapterValue] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = firebase.firestore().collection('Quiz');
      const query = dataRef.where('title', '==', classValue)
        .where('description', '==', subjectValue);

      const querySnapshot = await query.get();
      const filteredData = [];
      querySnapshot.forEach(doc => {
        filteredData.push({ ...doc.data(), id: doc.id });
      });
      setData(filteredData);
    };

    fetchData();
  }, [classValue, subjectValue]);
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  
  function close() {
    pickerRef.current.blur();
  }

  const openProductPage = (item) => {
    // console.log('clicked ', item)
    navigation.navigate('productpage', item )
}
  return (
    <View>
       <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          marginVertical: 20,
          fontWeight: 'bold',
          color: COLORS.black,
        }}>
        Select Your Class & Subject
      </Text>
      <Picker
       ref={pickerRef}
        selectedValue={classValue}
        onValueChange={value => setClassValue(value)}
      >
        <Picker.Item label="Class" value="" />
        <Picker.Item label="Class 1" value="Class 1" />
        <Picker.Item label="Class 2" value="Class 2" />
        <Picker.Item label="Class 3" value="Class 3" />
        <Picker.Item label="Class 4" value="Class 4" />
        <Picker.Item label="Class 5" value="Class 5" />
        <Picker.Item label="Class 6" value="Class 6" />
        <Picker.Item label="Class 7" value="Class 7" />
        <Picker.Item label="Class 8" value="Class 8" />
        <Picker.Item label="Class 9" value="Class 9" />
        <Picker.Item label="Class 10" value="Class 10" />
        <Picker.Item label="Class 11" value="Class 11" />
        <Picker.Item label="Class 12" value="Class 12" />
      </Picker>
      <Picker
       ref={pickerRef}
        selectedValue={subjectValue}
        onValueChange={value => setSubjectValue(value)}
      >
        <Picker.Item label="Subject" value="" />
        <Picker.Item label="Math" value="Math" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Physics" value="Physics" />
        <Picker.Item label="Science" value="Science" />
        <Picker.Item label="English" value="English" />
        <Picker.Item label="Chemistry" value="Chemistry" />
        <Picker.Item label="Social Science" value="Social Science" />
      </Picker>
      {data.map(item => (
        <TouchableOpacity key={item.id}
        onPress={() => { openProductPage(item) }}>
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}-{item.subject}</Text>
        </View></TouchableOpacity>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  input: {
    height: 40,
    backgroundColor: '#f2f2f2',
    padding: 8,
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#252C4A',
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#63FFD1'
  },
  description: {
    fontSize: 14,
    color:'#63FFD1'
  },
});


export default QuizScreen;