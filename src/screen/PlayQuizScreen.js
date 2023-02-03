import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../global/theme';
import {getQuestionsByQuizId, getQuizById} from '../../utils/database';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FormButton from '../component/FormButton';
import { firebase } from '../../Firebase/firebaseConfig';

const PlayQuizScreen = ({navigation, route}) => {
  const [currentQuizId, setCurrentQuizId] = useState(route.params.quizId);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [unattemted, setUnattemted] = useState(0);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [userdata, setUserdata] = useState(null);
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

// console.log(userloggeduid);

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

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate random number
      let j = Math.floor(Math.random() * (i + 1));

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  const getQuizAndQuestionDetails = async () => {
    // Get Quiz
    let currentQuiz = await getQuizById(currentQuizId);
    currentQuiz = currentQuiz.data();
    setTitle(currentQuiz.title);

    // Get Questions for current quiz
    const questions = await getQuestionsByQuizId(currentQuizId);

    // Transform and shuffle options
    let tempQuestions = [];
    await questions.docs.forEach(async res => {
      let question = res.data();

      // Create Single array of all options and shuffle it
      question.allOptions = shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]);
      await tempQuestions.push(question);
    });

    setQuestions([...tempQuestions]);
  };
  

  useEffect(() => {
    getQuizAndQuestionDetails();
  }, []);
 // console.log(questions.allOptions)

  const getOptionBgColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        if (currentOption == currentQuestion.correct_answer) {
          return COLORS.success;
        } else {
          return COLORS.error;
        }
      } else {
        return COLORS.white;
      }
    } else {
      return COLORS.white;
    }
  };
   

  const getOptionTextColor = (currentQuestion, currentOption) => {
    if (currentQuestion.selectedOption) {
      if (currentOption == currentQuestion.selectedOption) {
        return COLORS.white;
      } else {
        return COLORS.black;
      }
    } else {
      return COLORS.black;
    }
  };

  const placenow = () => {
    const docRef = firebase.firestore().collection('QuizScore').doc(new Date().getTime().toString());
    docRef.set({
        quizid: docRef.id,
        quizdate: firebase.firestore.FieldValue.serverTimestamp(),
        studentphone: userdata.phone,
        studentname: userdata.name,
        currentQuizId:currentQuizId,
        studentuseruid: userloggeduid,
        qusestions:questions,
        correctCount:correctCount,
        incorrectCount:incorrectCount,
        totalCount:questions.length,
        unattemted:questions.length - (incorrectCount + correctCount)
    })
    // navigation.navigate('home');
    alert('Quiz Submitted');
    navigation.navigate('DashBoard', { myquizdata,currentQuizId,userloggeduid });
}



  

  const placeow = () => {
    const docRef = firebase.firestore().collection('QuizResults').doc(currentQuizId);

    const data1 = {            studentphone: userdata.phone,
        studentname: userdata.name,
        studentuseruid: userloggeduid,
        qusestions:questions,
        correctCount:correctCount,
        incorrectCount:incorrectCount,
        totalCount:questions.length,
        unattemted:questions.length - (incorrectCount + correctCount)
       }
   

    docRef.get().then((doc) => {
        if (doc.exists) {
            docRef.update({
                cart: firebase.firestore.FieldValue.arrayUnion(data1)
            })
            console.log('Updated')
        } else {
            docRef.set({
                cart: [data1]
            })
            console.log('Added')
        }
        navigation.navigate('DashBoard', { myquizdata,currentQuizId,userloggeduid });
    })

}









const myquizdata = JSON.stringify({ quiz: [{currentQuizId,questions:questions,correctCount:correctCount,incorrectCount:incorrectCount,totalCount:questions.length,unattemted:questions.length - (incorrectCount + correctCount) }] });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: 'relative',
      }}>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      {/* Top Bar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: COLORS.white,
          elevation: 4,
        }}>
        {/* Back Icon */}
        <MaterialIcons
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
        />

        {/* Title */}
        <Text style={{fontSize: 16, marginLeft: 10}}>{title}</Text>

        {/* Correct and incorrect count */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* Correct */}
          <View
            style={{
              backgroundColor: COLORS.success,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}>
            <MaterialIcons
              name="check"
              size={14}
              style={{color: COLORS.white}}
            />
            <Text style={{color: COLORS.white, marginLeft: 6}}>
              {correctCount}
            </Text>
          </View>

          {/* Incorrect */}
          <View
            style={{
              backgroundColor: COLORS.error,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <MaterialIcons
              name="close"
              size={14}
              style={{color: COLORS.white}}
            />
            <Text style={{color: COLORS.white, marginLeft: 6}}>
              {incorrectCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Questions and Options list */}
      <FlatList
        data={questions}
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
                    borderColor: COLORS.border,
                    backgroundColor: getOptionBgColor(item, option),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                  }}
                  onPress={() => {
                    if (item.selectedOption) {
                      return null;
                    }
                    // Increase correct/incorrect count
                    if (option == item.correct_answer) {
                      setCorrectCount(correctCount + 1);
                    } else {
                      setIncorrectCount(incorrectCount + 1);
                    }

                    let tempQuestions = [...questions];
                    tempQuestions[index].selectedOption = option;
                    setQuestions([...tempQuestions]);
                  }}>
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
                      color: getOptionTextColor(item, option),
                    }}>
                    {optionIndex + 1}
                  </Text>
                  <Text style={{color: getOptionTextColor(item, option)}}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        ListFooterComponent={() => (
          <FormButton
            labelText="Submit"
            style={{margin: 10}}
            onPress={() => placenow()}
          />
        )}
      />

      {/* Result Modal */}
     
      
    </SafeAreaView>
  );
};

export default PlayQuizScreen;