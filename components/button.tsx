import { TouchableHighlight, Text, StyleSheet } from "react-native"

export const Button = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'#ffcf55'}
            onPress={props.onPress}
            style={[style.button, props.style] }>
            <Text style={style.text}> {props.text} </Text>
        </TouchableHighlight>
    )
}


const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#FFC122',
        padding :8,
        width: '100%',
        borderRadius: 6,
        marginTop: 18,
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})