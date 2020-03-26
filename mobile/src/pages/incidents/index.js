import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

import Api from '../../services/api';

import logo from '../../assets/logo.png';

import styles from './styles';

function IncidentsPage() {
    const api = Api;
    const navigation = useNavigation();

    const [incidents, setIncidents] = useState([]);
    const [totalIncidents, setTotalIncidents] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('DetailPage', { incident });
    }

    async function loadIncidents(){
        if(loading) {
            return;
        }

        if(totalIncidents > 0 & incidents.length == totalIncidents){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents/GetAll', {
            params: { page }
        });

        setIncidents([ ...incidents, ...response.data ]);
        setTotalIncidents(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(() =>{
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{totalIncidents} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>

            <FlatList 
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                <Text style={styles.incidentProperty}>Caso: #{incident.id}</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Value:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton}
                        onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View> // CONTAINER-END
    );
}

export default IncidentsPage;