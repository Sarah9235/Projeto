import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import googleLogo from "../assets/google-Logo.svg";

const Cadastro = () => {
    const { createUser, loginComGoogle } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState(''); // Para exibir erros de email
    const [senhaError, setSenhaError] = useState(''); // Para exibir erros de senha
    const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar a exibição da senha


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    // Função de validação de email usando Regex
    const validarEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Função de validação de senha usando Regex
    const validarSenha = (senha) => {
        const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return senhaRegex.test(senha);
    };

    // Função para lidar com o envio do formulário de cadastro
    const lidarComCadastro = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const senha = form.senha.value;

        // Validação de email e senha
        if (!validarEmail(email)) {
            setEmailError('Por favor, insira um email válido.');
            return;
        } else {
            setEmailError('');
        }

        if (!validarSenha(senha)) {
            setSenhaError('A senha deve ter pelo menos 6 caracteres, incluindo letras e números.');
            return;
        } else {
            setSenhaError('');
        }

        // Cadastro com o método createUser
        createUser(email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Cadastro efetuado com sucesso!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const lidarComRegistro = () => {
        loginComGoogle()
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true });
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">Formulário de Cadastro</h1>
                        <div className="divide-y divide-gray-200">
                            <form
                                onSubmit={lidarComCadastro}
                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                            >
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email"
                                        required
                                    />
                                    {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                                </div>

                                <div className="relative">
                                    <input
                                        id="senha"
                                        name="senha"
                                        type={mostrarSenha ? "text" : "password"} // Alterna entre texto e senha
                                        minLength="6"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Senha"
                                        required
                                    />
                                           <button
                                        type="button"
                                        className='text-purple-500'
                                        onClick={() => setMostrarSenha(!mostrarSenha)} // Alterna o estado
                                    >
                                        {mostrarSenha ? '🙈 senha oculta' : '🐵 visualizar senha'}  {/* Ícone básico */}
                                    </button>

                                    {senhaError && <p className="text-red-500 text-sm">{senhaError}</p>}
                                    <p className="text-gray-600 text-sm mt-1">
                                        A senha deve ter no mínimo 6 caracteres, incluindo letras e números.
                                    </p>
                                </div>

                                {error && <p className="text-red-500">{error}</p>}

                                <p>
                                    Já possui uma conta?{' '}
                                    <Link to="/login" className="text-purple-700 underline">
                                        Entre aqui
                                    </Link>
                                </p>

                                <button type="submit" className="bg-purple-500 text-white rounded-md px-6 py-2">
                                    Cadastrar
                                </button>
                            </form>
                        </div>

                        <hr />

                        <div className="flex w-full items-center flex-col mt-5 gap-3">
                            <button onClick={lidarComRegistro} className="block">
                                <img src={googleLogo} alt="" className="w-12 h-12 inline-block" />
                                Login com Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cadastro;
