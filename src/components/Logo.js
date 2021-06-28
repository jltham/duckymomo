import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default () => {
    return (
        <View>
            <Image style={styles.logo} source={require('../../assets/duckymomo.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        resizeMode: 'center',
        alignSelf: 'center',
        //paddingTop: 10,
        
        //maxWidth: '90%'
    },
})