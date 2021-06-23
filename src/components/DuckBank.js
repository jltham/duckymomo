import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/duckbank.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        transform: [{scale: 0.55}],
    }
})