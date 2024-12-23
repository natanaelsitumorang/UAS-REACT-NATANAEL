import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";
import { Button, CornerImg, BlurImg, LogoImg } from '@/components';
import { router } from "expo-router";

export default function Index() {
  const loginRoute = () => {
    router.push('/login')
  }
  return (
    <SafeAreaView style={styles.screen} >
      <CornerImg />
      <View style={styles.container}>
        <LogoImg />
        <Text style={styles.welcome}>Welcome to our app</Text>
        <Button
          text='Start Your Journey'
          onPress={loginRoute}
          style={styles.button}
        />
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
    top: 30,
    alignItems: 'center',
  },

  welcome: {
    fontSize: 24,
    marginTop: 12,
  },
  button: {
    width: '55%',
    marginTop: 56,
    
  }
})