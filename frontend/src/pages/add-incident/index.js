import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import Api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg'

function AddIncidentPage() {
    const api = Api;
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);

    async function handleAddIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('/incidents', data, {
                headers: {
                    authorization: ongId
                }
            });

            history.push('/');
        }catch(err) {
            alert("Erro ao registar caso, tente novamente.");
        }

    }

    return (
        <div className="add-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Logo BeTheHero" />

                    <h1>Register novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Cancelar
                    </Link>
                </section>
                <form onSubmit={handleAddIncident}>
                    <input placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input placeholder="Valor"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button">
                        Registar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddIncidentPage;