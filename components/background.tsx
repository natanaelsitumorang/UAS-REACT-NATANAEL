import { Image, StyleSheet } from "react-native"

export const CornerImg = () => {
    return (
        <Image source={require('../app/assets/images/vector-atas.png')} style={styles.vector} />
    )
}

export const BlurImg = () => {
    return (
        <Image source={require('../app/assets/images/blur2.png')} style={styles.blur} />
    )
}

export const LogoImg = (props: any) => {
    return (
        <Image source={require('../app/assets/images/logo-api.png')} style={props.style} />
    )
}

const styles = StyleSheet.create({
    vector: {
        position: 'absolute',
        zIndex: -1
    },

    blur: {
        position: 'absolute',
        top: '50%',
        zIndex: -1
    },
})