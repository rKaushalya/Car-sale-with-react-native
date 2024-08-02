import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Avatar } from 'native-base';
import { TextInput, Button } from 'react-native-paper';

const styles = StyleSheet.create({
    username: {
        alignSelf: 'center',
        marginTop: '5%',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'blue',
        fontFamily: 'arial',
        textDecorationLine: 'underline'
    },
    fullNameTextField: {
        marginTop: '5%',
        width: '85%',
        alignSelf: 'center'
    },
    logOutBtn: {
        marginTop: '15%',
        width: '85%',
        alignSelf: 'center',
        backgroundColor: '#0984e3'
    }
});
const Account = ({route,navigation} ) => {

    return (
        <NativeBaseProvider>
            <Avatar bg="indigo.50" mt={'25%'} alignSelf="center" size="2xl" source={require('../assets/account.png')}></Avatar>
            <Text style={styles.username}>ravi</Text>
            <TextInput label={'Full Name'} mode={'flat'} editable={false} value="ravi" style={styles.fullNameTextField} />
            <Button icon="logout" mode="contained" style={styles.logOutBtn} onPress={()=>{navigation.navigate("Login")}}>
                LOG OUT
            </Button>
        </NativeBaseProvider>
    )
}

export default Account;
