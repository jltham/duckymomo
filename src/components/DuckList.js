import React from 'react';
import { View, Image, StyleSheet} from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/ducklist.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        transform: [{scale: 0.7}],
    }
})