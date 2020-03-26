import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash } from 'react-icons/fi';

import Api from '../../services/api'

import './styles.css';
import logo from '../../assets/logo.svg'

function HomePage() {
    const api = Api;
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('incidents/GetByOngID/' + ongId)
        .then(response => {
            setIncidents(response.data);
        });
    }, [ongId])

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter(i => i.id != id));
        } catch (err) {
            alert("Erro, tente novamente");
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/login');
    }

    return (
        <div className="home-container">
            <header>
                <img src={logo} alt="Logo BeTheHero"/>
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/add">
                    Registar novo caso
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"></FiPower>
                </button>
            </header>

            <h1>Casos Registados</h1>

            <ul>
                {incidents.map(incident => (
                    <li>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR'})
                            .format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash size={20} color="#a8a8b3"></FiTrash>
                        </button>
                    </li>                    
                ))}
            </ul>
        </div>
    );
}

export default HomePage;