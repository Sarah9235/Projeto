import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider'; // Importa o contexto de autenticação
import googleLogo from "../assets/google-Logo.svg" // Logo do Google para login

const Cadastro = () => {
    // Acesso ao contexto de autenticação e métodos de login
    const { createUser, loginComGoogle } = useContext(AuthContext);
    
    // Estado para armazenar erros de autenticação
    const [error, setError] = useState('');
    
    // Hook para acessar a localização atual (usado para redirecionamento pós-login)
    const location = useLocation();
    
    // Hook para navegação programática entre páginas
    const navigate = useNavigate();
    
    // URL de redirecionamento após login/cadastro, se disponível, ou a página principal ("/")
    const from = location.state?.from?.pathname || "/";

    // Função para lidar com o envio do formulário de cadastro
    const lidarComCadastro = (event) => {
        event.preventDefault(); // Evita o comportamento padrão do formulário
        const form = event.target;
        const email = form.email.value; // Obtém o valor do campo "email"
        const senha = form.senha.value; // Obtém o valor do campo "senha"

        // Chama a função createUser para registrar o usuário com email e senha
        createUser(email, senha)
            .then((userCredential) => {
                // Cadastro bem-sucedido
                const user = userCredential.user;
                alert("Cadastro efetuado com sucesso!"); // Mostra um alerta de sucesso
                navigate(from, { replace: true }); // Redireciona para a página anterior ou para "/"
            })
            .catch((error) => {
                // Em caso de erro
                const errorMessage = error.message;
                setError(errorMessage); // Armazena a mensagem de erro no estado
            });
    };

    // Função para lidar com o login usando a conta do Google
    const lidarComRegistro = () => {
        loginComGoogle()
            .then((result) => {
                const user = result.user;
                navigate(from, { replace: true }); // Redireciona para a página anterior ou "/"
            })
            .catch((error) => {
                // Em caso de erro
                const errorMessage = error.message;
                setError(errorMessage); // Armazena a mensagem de erro no estado
            });
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            {/* Estrutura principal da página, centralizando o formulário com flexbox */}
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                {/* Caixa para o formulário, com um efeito de sombra e inclinação */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Formulário de Cadastro</h1>
                            {/* Título do formulário */}
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form
                                onSubmit={lidarComCadastro} // Chama a função de cadastro ao submeter o formulário
                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                            >
                                {/* Campo de email */}
                                <div className="relative">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Email"
                                        required // Campo obrigatório
                                    />
                                    <label
                                        htmlFor="email"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    />
                                </div>

                                {/* Campo de senha */}
                                <div className="relative">
                                    <input
                                        id="senha"
                                        name="senha"
                                        type="password"
                                        minLength="6" // Define o comprimento mínimo da senha
                                        className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                                        placeholder="Senha"
                                        required // Campo obrigatório
                                    />
                                    <label
                                        htmlFor="senha"
                                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                                    />
                                </div>
                                
                                {/* Mensagem de comprimento mínimo da senha */}
                                <p className="text-gray-600 text-sm mt-1">
                                    A senha deve ter no mínimo 6 caracteres.
                                </p>

                                {/* Mensagem de erro */}
                                {error && <p className="text-red-500">{error}</p>}
                                
                                {/* Link para redirecionar o usuário caso ele já tenha uma conta */}
                                <p>
                                    Já possui uma conta?{' '}
                                    <Link to="/login" className="text-purple-700 underline">
                                        Entre aqui
                                    </Link>
                                </p>

                                {/* Botão de cadastro */}
                                <div className="relative">
                                    <button
                                        type="submit"
                                        className="bg-purple-500 text-white rounded-md px-6 py-2"
                                    >
                                        Cadastrar
                                    </button>
                                </div>
                            </form>
                        </div>

                        <hr />

                        {/* Login com Google */}
                        <div className='flex w-full items-center flex-col mt-5 gap-3'>
                            <button onClick={lidarComRegistro} className='block'>
                                <img src={googleLogo} alt="" className='w-12 h-12 inline-block' />
                                {/* Botão com logo do Google */}
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
