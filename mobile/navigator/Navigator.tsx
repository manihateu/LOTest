import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Login } from "../pages/Login/ui/Login";
import { useAppSelector } from "../store/store";
import Feed from "../pages/Feed/ui/Feed";

const Stack = createNativeStackNavigator();

export const Navigator = () => {
    const isAuth = useAppSelector((store) => store.user.isAuth);
    return (
        <Stack.Navigator>
            {isAuth ? 
                <Stack.Screen name="Feed" component={Feed}/>
            :
                <Stack.Screen name="Login" component={Login}/>}
        </Stack.Navigator>
    );
};
