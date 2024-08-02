import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';
import { HStack, NativeBaseProvider } from 'native-base';

export default function LoadCars({ route, navigation }) {
    const [DATA, setDATA] = useState([]);
    const [imagePath, setImagePath] = useState("");
    const [username, setUsername] = useState(route.props.username);


    useEffect(() => {
        fetchData();

        const focusHandler = navigation.addListener('focus', fetchData);
        return () => navigation.removeListener('focus', fetchData);
    }, [navigation]);

    const fetchData = () => {
        fetch(`http://192.168.1.100:8000/cars/loadCars/${username}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(json => setDATA(json))
            .catch(err => {
                console.error(err);
                Alert.alert("Failed to fetch data. Please try again later.");
            });
    };

    const deleteCar = (car) => {
        fetch(`http://192.168.1.100:8000/cars/deleteCar/${car.carId}`, {
            method: "DELETE"
        })
            .then(response => response.json())
            .then(json => {
                Alert.alert(json.message);
                if (json.status === "200") {
                    fetchData();
                }
            })
            .catch(err => {
                console.error(err);
                Alert.alert("Error occurred. Please try again later.");
            });
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            {/* Uncomment and fix the image URL if needed */}
            {/* <Image source={{ uri: `http://192.168.1.100:8000/${item.image}` }} style={styles.img} alt='Car Image' /> */}
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.location}>Location: {item.location}</Text>
            <Text style={styles.date}>Date: {item.date}</Text>
            <HStack space={4} justifyContent='center'>
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
