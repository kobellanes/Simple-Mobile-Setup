import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

const GetStarted = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../../assets/PowerHub.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={1}
                        onPress={() => navigation.navigate('SetupWifi')}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        margin: 0,
        padding: 0,
    },
    imageContainer: {
        width: '80%',
        height: 150,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default GetStarted;
