import React, {useState} from 'react';
import {View, Text, SafeAreaView, ToastAndroid, StatusBar} from 'react-native';
import {COLORS} from '../global/theme';
import FormInput from '../component/FormInput';
import FormButton from '../component/FormButton';
import {createQuiz} from '../../utils/database';
import { SelectList } from 'react-native-dropdown-select-list'
const CreateQuizScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState('');
  const [theory, setTheory] = useState('');

  const type = [
    {key:'1', value:'Physics'},
    {key:'2', value:'Chemistry'},
    {key:'3', value:'Science'},
    {key:'1', value:'Hindi'},
    {key:'2', value:'Math'},
    {key:'3', value:'English'},
    {key:'1', value:'Social Science'},
    {key:'2', value:'Genral Knowledge'},
]
 
  const data = [
      {key:'1', value:'Class 1'},
      {key:'2', value:'Class 2'},
      {key:'3', value:'Class 3'},
      {key:'4', value:'Class 4'},
      {key:'5', value:'Class 5'},
      {key:'6', value:'Class 6'},
      {key:'7', value:'Class 7'},
      {key:'8', value:'Class 8'},
      {key:'9', value:'Class 9'},
      {key:'10', value:'Class 10'},
      {key:'11', value:'Class 11'},
      {key:'12', value:'Class 12'},
  ]

  const handleQuizSave = async () => {
    const currentQuizId = Math.floor(100000 + Math.random() * 9000).toString();
    // Save to firestore
    await createQuiz(currentQuizId, title,subject, description, theory);

    // Navigate to Add Question string
    navigation.navigate('AddQuestionScreen', {
      currentQuizId: currentQuizId,
      currentQuisTitle: title,
    });

    // Reset
    setTitle('');
    setSubject('');
    setDescription('');
    setTheory('');
    ToastAndroid.show('Quiz Saved', ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
        margin:10,
      }}>
        <StatusBar />


      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          marginVertical: 10,
          fontWeight: 'bold',
          color: COLORS.black,
        }}>
        Create Your Quiz
      </Text>
      <View style={{margin:20}}>

      <SelectList 
      
      
        setSelected={(val) => setTitle(val)} 
        data={data} 
        save="value"
        value={title}
    /></View>


<View style={{margin:20}}>
<SelectList 

      
      setSelected={(val) => setDescription(val)} 
      data={type} 
      save="value"
      value={description}
  /></View>

<FormInput
        placeholderText="Enter Chapter Name"
        onChangeText={val => setSubject(val)}
        value={subject}
      />


      <FormInput
        placeholderText="Enter Description"
        onChangeText={val => setTheory(val)}
        value={theory}
      />

      <FormButton labelText="Save Quiz" handleOnPress={handleQuizSave} />

      {/* Temporary button - navigate without saving quiz*/}
      {/* <FormButton
        labelText="Navigate to AddQuestionScreen"
        style={{
          marginVertical: 20,
        }}
        handleOnPress={() => {
          navigation.navigate('AddQuestionScreen', {
            currentQuizId: '103404',
            currentQuizTitle: 'Demo quiz',
          });
        }}
      /> */}
    </SafeAreaView>
  );
};

export default CreateQuizScreen;