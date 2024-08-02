import { StyleSheet, Text, TouchableOpacity, View, FlatList, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { HStack, NativeBaseProvider } from 'native-base';
import { Image } from 'react-native';

import car1 from '../assets/uploads/car1.jpeg'
import FB_IMG_1717938177895 from '../assets/uploads/FB_IMG_1717938177895.jpg'
import IMG_20230903_111118 from '../assets/uploads/IMG_20230903_111118.jpg'

const windowWidth = Dimensions.get('window').width;

const images = {
    'car1.jpeg': car1,
    'FB_IMG_1717938177895.jpg': FB_IMG_1717938177895,
    'IMG_20230903_111118.jpg': IMG_20230903_111118,
};

function LoadCars({ route, navigation }) {
    const [DATA, setDATA] = useState([]);
    const [username, setUsername] = useState("ravi");

    const fetchData = () => {
        fetch(`http://192.168.110.122:8000/cars/loadCars/${username}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((json) => {
                setDATA(json);
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Failed to fetch data. Please try again later.");
            });
    };

    useEffect(() => {
        fetchData();

        const focusHandler = navigation.addListener('focus', fetchData);
        return () => {
            navigation.removeListener('focus', fetchData);
        };
    }, [navigation, username]);

    const deleteCar = (car) => {
        fetch(`http://192.168.110.122:8000/cars/deleteCar/${car.carId}`, {
            method: "DELETE"
        })
            .then((response) => response.json())
            .then((json) => {
                Alert.alert(json.message);
                if (json.status === "200") {
                    fetchData();
                }
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Error occurred. Please try again later.");
            });
    };

    const getImageSource = (imageName) => {
        return images[imageName] || require('../assets/uploads/car1.jpeg');
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
             {/*Uncomment and fix the image URL if needed */}
            <Image source={getImageSource(item.image)} style={styles.img} />
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.location}>Location: {item.location}</Text>
            <Text style={styles.date}>Date: {item.date}</Text>
            <HStack space={4} justifyContent="center">
                <IconButton
                    icon="pencil"
                    iconColor={MD3Colors.primary50}
                    size={20}
                    onPress={() => navigation.navigate("update", { item })}
                />
                <IconButton
                    icon="delete"
                    iconColor={MD3Colors.error50}
                    size={20}
                    onPress={() => {
                        Alert.alert(
                            "Confirmation",
                            "Do you want to delete this car?",
                            [
                                { text: "Yes", onPress: () => deleteCar(item) },
                                { text: "No" }
                            ],
                            { cancelable: true }
                        );
                    }}
                />
            </HStack>
        </View>
    );

    return (
        <NativeBaseProvider>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.carId.toString()}
            />
        </NativeBaseProvider>
    );
}

export default LoadCars;

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 1,
        borderRadius: 20,
        margin: '3%',
        padding: 10
    },
    img: {
        width: '100%',
        height: 200, // Adjust the height as needed
        resizeMode: 'cover'
    },
    description: {
        fontSize: 25,
        color: 'blue',
    },
    location: {
        fontWeight: '500',
        color: 'black',
        fontSize: 17,
        alignSelf: 'center'
    },
    date: {
        fontWeight: '500',
        color: 'black',
        fontSize: 17,
        alignSelf: 'center'
    }
});
