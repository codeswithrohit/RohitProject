import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,TextInput,TouchableOpacity } from 'react-native';
import { firebase } from '../../Firebase/firebaseConfig'

const SearchQuiz = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Subscribe to real-time changes in Firestore collection
    const unsubscribe = firebase.firestore()
      .collection('Quiz')
      .onSnapshot((querySnapshot) => {
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({ ...doc.data(), id: doc.id });
        });
        setData(items);
      });

    // Unsubscribe from changes on component unmount
    return () => unsubscribe();
  }, []);

  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(filter.toLowerCase());
  });

  const openProductPage = (quiz) => {
    // console.log('clicked ', item)
    navigation.navigate('productpage', quiz )
}

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={filter}
        onChangeText={(text) => setFilter(text)}
        placeholder='Search'
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: quiz}) => (
          <TouchableOpacity key={quiz.index}
          onPress={() => { openProductPage(quiz) }}>
          <View style={styles.item}>
            <Text style={styles.title}>{quiz.title}</Text>
            <Text style={styles.description}>{quiz.description}-{quiz.subject}</Text>
          </View></TouchableOpacity>
        )}
      />
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
    backgroundColor: '#f9c2ff',
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
});

export default SearchQuiz;