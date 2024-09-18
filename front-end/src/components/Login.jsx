import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import googleLogo from "../assets/google-Logo.svg";

const Login = () => {
    const { login, loginComGoogle } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || "/";

    const lidarComLogin = (event) => {
        event.preventDefault();
        setLoading(true);  // Inicia o estado de carregamento
        const form = event.target;
        const email = form.email.value;
        const senha = form.senha.value;

        login(email, senha)
            .then((userCredential) => {
                // Login bem-sucedido
                alert("Login efetuado com sucesso!");
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = getCustomErrorMessage(error.code);
                setError(errorMessage);
            })
            .finally(() => {
                setLoading(false);  // Garante que o carregamento seja desativado
            });
    };

    // Mapeamento de mensagens de erro
    const getCustomErrorMessage = (code) => {
        switch (code) {
            case 'auth/user-not-found':
                return 'Usuário não encontrado';
            case 'auth/wrong-password':
                return 'Senha incorreta';
            case 'auth/invalid-email':
                return 'Email inválido';
            default:
                return 'Erro ao efetuar login. Tente novamente.';
        }
    };

    const lidarComRegistro = () => {
        setLoading(true);  // Inicia o estado de carregamento
        loginComGoogle()
            .then((result) => {
                navigate(from, { replace: true });
            })
            .catch((error) => {
                const errorMessage = getCustomErrorMessage(error.code);
                setError(errorMessage);
            })
            .finally(() => {
                setLoading(false);  // Garante que o carregamento seja desativado
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
                ></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Formulário de Login</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form
                                onSubmit={lidarComLogin}
                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                            >
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email"
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        id="senha"
                                        name="senha"
                                        type="password"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Senha"
                                        required
                                        minLength={6} // Define o comprimento mínimo da senha
                                    />

                                </div>
                                {error && <p className="text-red-500">{error}</p>}
                                <p>
                                    Não tem uma conta?{' '}
                                    <Link to="/cadastro" className="text-purple-700 underline">
                                        Cadastre-se aqui
                                    </Link>
                                </p>
                                <div className="relative">
                                    <button
                                        type="submit"
                                        className="bg-purple-500 text-white rounded-md px-6 py-2"
                                        disabled={loading}
                                    >
                                        {loading ? "Carregando..." : "Fazer login"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <hr />
                        <div className='flex w-full items-center flex-col mt-5 gap-3'>
                            <button
                                onClick={lidarComRegistro}
                                className='flex items-center justify-center bg-white border border-gray-300 rounded-md px-6 py-2 shadow-sm hover:bg-gray-100'
                                disabled={loading}
                            >
                                <img src={googleLogo} alt="Google Logo" className='w-6 h-6 mr-2' />
                                {loading ? "Carregando..." : "Login com Google"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
