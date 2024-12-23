import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ToastAndroid } from "react-native";
import { Button, CornerImg, BlurImg, LogoImg, Form, FormPass } from '@/components';
import { router, Link } from "expo-router";
import React from "react";
import CApi from '../lib/CApi';
import { useSelector, useDispatch } from 'react-redux';
import Fontisto from '@expo/vector-icons/Fontisto';
import { setData, resetData } from '../store/reducer/Goreducer';


export default function Register() {
    const registerForm = useSelector((state) => state.login.loginInput);
    const dispatch = useDispatch();

    const onChangeValue = (payload: any) => {
        dispatch(setData({ ...registerForm, ...payload }));
    };

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [toggleCheck, setToggleCheck] = React.useState(false);

    const toggleRemember = () => {
        setToggleCheck(!toggleCheck);
    };

    const home = () => {
        router.push('/Register') 
    }

    const onSaveData = async () => {
        try {
            if (registerForm.password !== registerForm.confirm_password) {
                ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
                return;
            }

            const { data } = await CApi.post('/register', registerForm, {
                headers: { 'Content-Type': 'text/plain' }
            });

            ToastAndroid.show("Register Success", ToastAndroid.SHORT);

            dispatch(resetData());
            router.push('/login')
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };

    return (
        <SafeAreaView style={styles.screen}>
            <CornerImg />
            <LogoImg style={styles.logo} />
            <View style={styles.container}>
                <Text style={styles.title}>Create an account</Text>

                <Form
                    ph='Name'
                    icon='person'
                    change={(val: any) => onChangeValue({ name: val })}
                    value={registerForm.name}
                    mode='text'
                    style={styles.inputField} // Added styles
                />

                <Form
                    ph='Email'
                    icon='mail'
                    change={(val: any) => onChangeValue({ email: val })}
                    value={registerForm.email}
                    mode='email'
                    style={styles.inputField} // Added styles
                />

                <FormPass
                    ph='Password'
                    icon='lock-closed'
                    change={(val: any) => onChangeValue({ password: val })}
                    value={registerForm.password}
                    style={styles.inputField} // Added styles
                />

                <FormPass
                    ph='Confirm Password'
                    icon='lock-closed'
                    change={(val: any) => onChangeValue({ confirm_password: val })}
                    value={registerForm.confirm_password}
                    style={styles.inputField} // Added styles
                />

                <View style={styles.option}>
                    <TouchableOpacity onPress={toggleRemember}>
                        <Fontisto
                            name={toggleCheck ? 'checkbox-active' : 'checkbox-passive'}
                            size={13}
                            color="#FAB400" />
                    </TouchableOpacity>
                    <Text style={styles.remember}>Remember me</Text>
                    <Text style={styles.text}>Forgot password?</Text>
                </View>

                <View style={styles.bottomContainer}>
                  <Button 
                    text='sign up'
                    onPress={onSaveData}
                  />
                  
                    <View style={styles.option}>
                        <Text>Already have an account?</Text>
                        <Link href={'/login'} style={styles.link}>Login Up</Link>
                    </View>
                </View>
            </View>
            <BlurImg />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFF7E4', // Background similar to the image with light gradient-like color
        padding: 30,
    },
    
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },

    logo: {
        width: 27.33,
        height: 44.9,
        paddingRight: 30,
        left: 40,
        marginTop: 20,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000', // Black text for title
        marginBottom: 1,
        textAlign: 'left',
    },

    inputField: {
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10, // Rounded corners for input fields
        backgroundColor: '#FFF', // White background for inputs
        fontSize: 16,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },

    remember: {
        fontSize: 12,
        color: '#000',
        marginLeft: 5,
    },

    text: {
        fontSize: 12,
        color: '#000',
        marginLeft: 'auto',
    },

    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    signUpButton: {
        backgroundColor: '#FFBF00', // Button color similar to the yellow-orange theme
        paddingVertical: 15,
        paddingHorizontal: 100,
        borderRadius: 30, // Rounded button
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, // Drop shadow for a 3D effect
        marginBottom: 20,
    },

    signUpText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'arial',
    },

    link: {
        marginLeft: 5,
        color: '#FFBF00', // Yellow-orange color for the "Login Up" link
        fontWeight: 'bold',
    },
});
