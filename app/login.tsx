import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity,ToastAndroid } from "react-native";
import { Button, CornerImg, BlurImg, LogoImg, Form, FormPass } from '@/components';
import { router, Link } from "expo-router";
import Fontisto from '@expo/vector-icons/Fontisto';
import CApi from "@/lib/CApi";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // variabel tombol remember me
    const [toggleCheck, setToggleCheck] = React.useState(false);
    // function tombol remember me
    const toggleRemember = () => {
        setToggleCheck(!toggleCheck);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
            return;
        }

        try {
            const request = {
                email: email,
                password: password,
            };

            const { data } = await CApi.post('/login', request, {
                headers: { 'Content-Type': 'text/plain' }
            });

            console.log('Login berhasil:', data);
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userEmail', data.data.email);
            await AsyncStorage.setItem('userName', data.data.name);

            router.push('/homepg');
        } catch (err) {
            console.log('Login gagal:', err);
            const msg = err?.response?.data?.message || 'Terjadi kesalahan';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };

    const home = () => {
        router.push('/')
    }
    return (
        <SafeAreaView style={styles.screen} >
            <CornerImg />
            <LogoImg style={styles.logo} />
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <Form
                    ph='Email'
                    icon='mail'
                    value={email}
                    change={setEmail}
                    mode='email'
                />
                <FormPass
                    ph='Password'
                    icon='lock-closed'
                    value={password}
                    change={setPassword}
                />
                <View style={styles.option}>
                    <TouchableOpacity onPress={toggleRemember}>
                        <Fontisto
                            name={toggleCheck ? 'checkbox-active' : 'checkbox-passive'}
                            size={13}
                            color="#FAB400" />
                    </TouchableOpacity>
                    <Text style={styles.remember}>Remember Me</Text>
                    <Text style={styles.text}>Forgot Password?</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Button
                        text='Login'
                        onPress={handleLogin}
                    />
                    <View style={styles.option}>
                        <Text>Don't have an account?</Text>
                        <Link href={'/Register'} style={styles.link}>SIGN UP</Link>
                      
                    </View>

                </View>
            </View>
            <BlurImg />
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 30,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },

    title: {
        fontSize: 32,
        fontWeight: 'bold',
        width: 90,
        height:39,
    },

    logo: {
        width: 27,
        height: 44,
        left: 20,
        top: 20,
    },

    welcome: {
        fontSize: 24,
        marginTop: 12,
    },

    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },

    remember: {
        fontSize: 12,
        flex: 1,
        marginLeft: 5,
    },

    text: {
        fontSize: 12,
    },

    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

    link: {
        marginLeft: 5,
        color: '#FFC122',
        fontWeight: 'bold',
    }
})