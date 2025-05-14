import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login } from "../pages/Login/ui/Login";
import { useAppSelector } from "../store/store";

const Stack = createNativeStackNavigator();

export const Navigator = () => {
    const isAuth = useAppSelector((store) => store.user.isAuth);
    return (
        <Stack.Navigator>
            {isAuth ? 
                <Stack.Screen name="Feed" component={() => (<></>)}/>
            :
                <Stack.Screen name="Login" component={Login}/>}
        </Stack.Navigator>
    );
};
