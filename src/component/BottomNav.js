import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Bottomnavbar = ({ navigation, page }) => {
    // console.log(page)
    return (
        <View style={styles.container}>
            {
                page === 'home' ?
                    <MaterialCommunityIcons name="home-variant" size={24} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('home')} />
                    :
                    <MaterialCommunityIcons name="home-variant" size={24} color="black" style={styles.icons1}

                        onPress={() => navigation.navigate('home')} />
            }

            {
                page === 'QuizScreen' ?
                    <Entypo name="book" size={24} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('QuizScreen')}
                    />
                    :
                    <Entypo name="book" size={24} color="black" style={styles.icons1}

                        onPress={() => navigation.navigate('QuizScreen')}
                    />
            }
            {
                page === 'SearchQuiz' ?
                    <Ionicons name="search" size={24} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('SearchQuiz')}

                    />
                    :
                    <Ionicons name="search" size={24} color="black" style={styles.icons1}

                        onPress={() => navigation.navigate('SearchQuiz')}

                    />
            }
            {
                page === 'CreateQuizScreen' ?
                    <Ionicons name="add" size={24} color="black" style={styles.activeicons1}

                        onPress={() => navigation.navigate('CreateQuizScreen')}

                    />
                    :
                    <Ionicons name="add" size={24} color="black" style={styles.icons1}

                        onPress={() => navigation.navigate('CreateQuizScreen')}

                    />
            }
        </View>
    )
}

export default Bottomnavbar

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: "#252C4A",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 100,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeicons1: {
        backgroundColor: 'black',
        borderRadius: 50,
        fontSize: 30,
        padding: 10,
    },
    icons1: {
        color: '#63FFD1',
        fontSize: 30,
    },
})