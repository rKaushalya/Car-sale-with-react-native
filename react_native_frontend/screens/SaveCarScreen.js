import React, { useState } from 'react';
import { Box, HStack, NativeBaseProvider, Text, TextArea, VStack, Input } from 'native-base';
import { StyleSheet, Dimensions, Image, Platform, Alert } from 'react-native';
import { IconButton, MD3Colors, Button } from 'react-native-paper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const windowWidth = Dimensions.get('window').width;

export default function SaveCarScreen({ route, navigation }) {

    const [photo, setPhoto] = useState("");
    const [username, setUsername] = useState(route.props.username);
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false)

    const takePhotoFromCamera = () => {
        const options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: true,
            quality: 1
        };
        launchCamera(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorCode) {
                console.log(res.errorMessage);
            } else {
                setPhoto(res.assets[0]);
            }
        });
    };

    const takePhotoFromGallery = () => {
        const options = {
            mediaType: 'photo'
        };
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.errorCode) {
                console.log(res.errorMessage);
            } else {
                setPhoto(res.assets[0]);
            }
        });
    };

    const createFormData = (photo, body) => {
        const data = new FormData();
        if (photo) {
            data.append('photo', {
                name: photo.fileName,
                type: photo.type,
                uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
            });
        }
        Object.keys(body).forEach(key => {
            data.append(key, body[key]);
        });
        return data;
    };

    const saveCar = async () => {
        if (photo && date && location && description) {
            try {
                const response = await fetch('http://192.168.110.122:8000/cars/save', {
                    method: 'POST',
                    body: createFormData(photo, {
                        username,
                        date,
                        location,
                        description
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const json = await response.json();
                if (json.status === "200") {
                    Alert.alert(json.message);
                    clearTextFields();
                } else {
                    Alert.alert(json.message);
                }
            } catch (error) {
                Alert.alert('Error occurred. Please try again shortly');
            }
        } else {
            Alert.alert("Please fill all the fields.");
        }
    };

    const clearTextFields = () => {
        setPhoto(null);
        setDate("");
        setLocation("");
        setDescription("");
    };

    return (
        <NativeBaseProvider>
            <Text fontSize={'4xl'} style={styles.saveCarHeading}>Add Car Details</Text>
            <HStack space={2} justifyContent={'center'}>
                <IconButton
                    icon="camera"
                    iconColor={MD3Colors.neutral10}
                    size={30}
                    mode={'contained'}
                    style={styles.captureBtn}
                    onPress={takePhotoFromCamera}
                />
                <Button icon="upload" mode="contained-tonal" style={styles.uploadImageBtn} onPress={takePhotoFromGallery}>
                    <Text style={styles.uploadBtnLabel}>UPLOAD IMAGE</Text>
                </Button>
            </HStack>
            {photo && <Image style={styles.uploadImageContainer} source={{ uri: photo.uri }} />}
            <VStack space={4} alignItems="center" mt="5%">
                <Input
                    placeholder='Date'
                    borderColor={'black'}
                    value={date}
                    onChangeText={setDate}
                    style={styles.input}
                    w="80%"
                />
                <Input
                    placeholder='Location'
                    borderColor={'black'}
                    value={location}
                    onChangeText={setLocation}
                    style={styles.input}
                    w="80%"
                />
                <TextArea
                    placeholder="Description"
                    borderColor={'black'}
                    value={description}
                    onChangeText={setDescription}
                    style={styles.textArea}
                    w="80%"
                    h="20"
                    maxW="300"
                    fontSize={15}
                />
            </VStack>
            <HStack space={2} justifyContent={'center'} marginTop={'4%'}>
                <Button icon="car" mode="contained" buttonColor='green' onPress={saveCar}>
                    Save
                </Button>
                <Button icon="delete-sweep" mode="contained" buttonColor='gray' onPress={clearTextFields}>
                    Clear
                </Button>
            </HStack>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    saveCarHeading: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontWeight: '800',
        alignSelf: 'center',
        marginTop: '5%'
    },
    uploadBtnLabel: {
        color: '#04044a',
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 2,
        fontFamily: 'arial'
    },
    uploadImageBtn: {
        width: '60%',
        alignSelf: 'center',
        marginTop: '2.5%',
        borderColor: '#04044a',
        borderWidth: 1,
        borderRadius: 100
    },
    uploadImageContainer: {
        borderColor: 'black',
        borderWidth: 1,
        width: '80%',
        height: '30%',
        marginTop: '2.5%',
        alignSelf: 'center',
        resizeMode: 'cover'
    },
    captureBtn: {
        marginTop: '4%'
    },
    input: {
        fontSize: 20
    },
    textArea: {
        fontSize: 15
    }
});
