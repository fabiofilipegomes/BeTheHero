import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';

import Api from '../../services/api'

import './styles.css';
import logo from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

function LoginPage() {
    const api = Api;
    const history = useHistory();

    const [id, setId] = useState('');

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/');
        }catch(err){
            alert("Falha no login, tente novamente");
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Logo BeTheHero" />

                <form onSubmit={handleLogin}>
                    <h1>Inicie Sessão</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho conta
                    </Link>
                </form>
            </section>
            <img src={heroesImg}  alt="Heroes"/>
        </div>        
    );
}

export default LoginPage;