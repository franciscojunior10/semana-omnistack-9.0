import React, { useState } from 'react';

// import { ToastContainer, toast } from 'react-t 
import 'react-toastify/dist/ReactToastify.css';

import api from '../../services/api';

export default ({ history }) => {
    
    const [email, setEmail] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();

        const response = await api.post('/sessions', { email });

        const { _id } = response.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard');
    }

    // function notify (env) {
    //   env.preventDefault()
    //   toast.success('Aguarde seu login');
    // }
    
    return(
        <>
            <p>
                Oferaça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    required
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button className="btn" type="submit">Entrar</button>
                {/* <ToastContainer /> */}
            </form>
        </>
    );
}