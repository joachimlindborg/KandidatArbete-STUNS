import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';



const LongButton = (props) => 
    <TouchableOpacity style={ styles(props).button } /* onPress={onPress} */>
        <Text style={ styles(props).text }>
             {props.title}
        </Text>
    </TouchableOpacity>


const styles = (props) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    button: {
        alignItems: "center",
        padding: '11px ',
        backgroundColor: props.buttonColor,
        overflow: 'hidden', 
        borderRadius: '100px',
        position: 'absolute',
        height: '51px',
        left: '16px',
        right: '16px',
        bottom: '342px'
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        color: props.textColor
    },
  });

export default LongButton;