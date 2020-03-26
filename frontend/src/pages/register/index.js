import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi';

import Api from '../../services/api';

import './styles.css';
import logo from '../../assets/logo.svg'

function RegisterPage() {
    const api = Api;
    const history = useHistory();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        
        try{
            const response = await api.post('ongs', data);
            console.log("ID:" + response.data.id);
            history.push('/login');
        }catch (err) {
            console.log("ERR: " + err);
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Logo BeTheHero" />

                    <h1>Registe-se</h1>
                    <p>Faça o seu registo, entre na plataforma e ajuse pessoas a ecnontrar os casos da sua ONG.</p>

                    <Link className="back-link" to="/login">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para o login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input type="email" placeholder="E-mail"                        
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}                    
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="Código Postal" style={{ width: 170 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button">
                        Registar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
