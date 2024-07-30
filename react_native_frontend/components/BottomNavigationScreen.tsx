import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import LoadCars from '../screens/LoadCars';
import SaveCarScreen from '../screens/SaveCarScreen';
import Account from '../screens/Account';

interface Props {
    route: {
        params: {
            username: string;
            fullname: string;
        };
    };
    navigation: any;
}

const LoadCarsRoute = (props: any) => <LoadCars {...props} />;
const SaveCarRoute = (props: any) => <SaveCarScreen {...props} />;
const AccountRoute = (props: any) => <Account {...props} />;

const BottomNavigationScreen: React.FC<Props> = (props) => {
    const [index, setIndex] = React.useState<number>(0);
    const [routes] = React.useState([
        {
            key: 'load',
            title: 'Home',
            focusedIcon: 'home',
            unfocusedIcon: 'home-outline',
            props: { username: props.route.params.username },
            navigation: props.navigation
        },
        {
            key: 'savecar',
            title: 'Add Car',
            focusedIcon: 'car',
            unfocusedIcon: 'car-outline',
            props: { username: props.route.params.username }
        },
        {
            key: 'account',
            title: 'Account',
            focusedIcon: 'account',
            unfocusedIcon: 'account-outline',
            props: { username: props.route.params.username, fullName: props.route.params.fullname },
            navigation: props.navigation
        },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        load: LoadCarsRoute,
        savecar: SaveCarRoute,
        account: AccountRoute,
    });

    return (
        <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
}

export default BottomNavigationScreen;
