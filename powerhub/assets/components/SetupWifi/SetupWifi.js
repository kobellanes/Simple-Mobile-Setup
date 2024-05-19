import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import WifiManager from 'react-native-wifi-reborn';

const SetupWifi = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [ssid, setSsid] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleFindDevice = async () => {
        if (ssid === '' || password === '') {
            Alert.alert('Error', 'Both SSID and password are required');
        } else {
            try {
                // Connect to the Wi-Fi network
                await WifiManager.connectToProtectedSSID(ssid, password, false);
                Alert.alert('Success', 'Connected to Wi-Fi');
                navigation.navigate('Home');
                setSsid('');
                setPassword('');
                setShowPassword(false);
            } catch (error) {
                console.error('Wi-Fi connection error:', error);
                Alert.alert('Error', 'Failed to connect to Wi-Fi. Please check your credentials and try again.');
            }
        }
    };

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
                    <View style={styles.wifiContainer}>
                        <Image
                            source={require('../../../assets/wifi.jpg')}
                            style={styles.wifiImage}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={styles.instructionText}>
                        Turn PowerHub on and input network:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Wi-Fi SSID"
                        value={ssid}
                        onChangeText={setSsid}
                        autoCapitalize="none"
                    />
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Icon name={showPassword ? 'visibility' : 'visibility-off'} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={1}
                        onPress={handleFindDevice}
                    >
                        <Text style={styles.buttonText}>Find Device</Text>
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
        width: '50%',
        height: 70,
        marginTop: -40,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    wifiContainer: {
        width: '50%',
        height: 160,
        marginTop: -20,
    },
    wifiImage: {
        width: '100%',
        height: '100%',
    },
    instructionText: {
        marginTop: -10,
        fontSize: 25,
        textAlign: 'center',
        marginHorizontal: 30,
        marginBottom: 40, // Added margin to space out the elements
        fontWeight: 'bold',
    },
    input: {
        width: '70%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10, // Added margin to space out the elements
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    passwordInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 50,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
});

export default SetupWifi;
