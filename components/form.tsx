import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

// form  biasa
export const Form = (props: any) => {
    return (
        <View style={style.form}>
            <View>
                <Ionicons name={props.icon} size={18} color="#FAB400" style={style.icon} />
                <TextInput
                    style={[style.formInput, props.styles]}
                    placeholder={props.ph}
                    value={props.value}
                    secureTextEntry={props.secure}
                    onChangeText={props.change}
                    inputMode={props.mode}
                    placeholderTextColor="#FAB400"
                />
            </View>
        </View>
    );
}

// form password
export const FormPass = (props: any) => {
    // variabel toggle
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    // function toggle icon visibility
    const setVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={style.form}>
            <View>
                <Ionicons name={props.icon} size={18} color="#FAB400" style={style.icon} />
                <TextInput
                    style={[style.formInput, props.styles]}
                    placeholder={props.ph}
                    value={props.value}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={props.change}
                    placeholderTextColor="#FAB400"
                    
                />
            </View>
            {/* icon mata untuk pass visible */}
            <TouchableOpacity onPress={setVisibility} style={style.eyeIcon}>
                <Ionicons
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={20}
                    color="black"
                />
            </TouchableOpacity>
        </View>

    );
}

const style = StyleSheet.create({
    form: {
        marginTop: 8,
    },

    icon: {
        top: 43,
        paddingRight: 5,
        opacity: 0.7,
        paddingLeft: 8,
    },

    formInput: {
        borderBottomColor: '#B78503',
        borderBottomWidth: 1,
        width: '100%',
        marginTop: 20,
        paddingLeft: 40,
        fontWeight: 'semibold',
    },

    eyeIcon: {
        alignSelf: 'flex-end',
        bottom: 30,
        right: 10,
        opacity: 0.8,
    },
});
