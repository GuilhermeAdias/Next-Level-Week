import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { Feather as Icon } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

interface IbgeCityResponse {
    nome: string;
};

interface IbgeUfResponse {
    sigla: string;
};

const Home = () => {
    const navigation = useNavigation();

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    useEffect(() => {
        axios
            .get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla);

                setUfs(ufInitials);
            })
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }

        axios.get<IbgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);

            setCities(cityNames);
        })
    }, [selectedUf]);

    function handleNavigateToPoints() {
        navigation.navigate('Points', {
            selectedUf,
            selectedCity
        });
    };

    function handleSelectUf(event: string) {
        const uf = event;

        setSelectedUf(uf);
    };

    function handleSelectCity(event: string) {
        const city = event;

        setSelectedCity(city);
    };

    return (
        <KeyboardAvoidingView style={{ 
            flex: 1, 
            marginBottom: 10, 
            marginTop: 29 
        }}
        >
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de residuos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione seu estado (UF)...',
                            value: null,
                            color: '#2FB86E',
                        }}
                        onValueChange={(value) => handleSelectUf(value)}
                        items={ufs.map((uf) => ({
                            label: uf,
                            value: uf,
                        }))}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        Icon={() => {
                            return (
                                <Icon name='corner-right-down' color='#2FB86E' size={24} />
                            );
                        }}
                    />
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione sua cidade...',
                            value: null,
                            color: '#2FB86E',
                        }}
                        onValueChange={(value) => handleSelectCity(value)}
                        items={cities.map((city) => ({
                            label: city,
                            value: city,
                        }))}
                        useNativeAndroidPickerStyle={false}
                        style={pickerSelectStyles}
                        Icon={() => {
                            return (
                                <Icon name='corner-right-down' color='#2FB86E' size={24} />
                            );
                        }}
                    />
                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

export default Home;

const pickerSelectStyles = StyleSheet.create({
    iconContainer: {
        top: 24,
        right: 16,
    },
    inputIOS: {
        height: 74,
        fontSize: 16,
        borderRadius: 10,
        marginBottom: 16,
        paddingRight: 30,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#322153',
        backgroundColor: '#FFF',
    },
    inputAndroid: {
        height: 74,
        fontSize: 16,
        borderRadius: 10,
        marginBottom: 16,
        paddingRight: 30,
        paddingVertical: 8,
        paddingHorizontal: 10,
        color: '#322153',
        backgroundColor: '#FFF',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {
        marginBottom: 10,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});
