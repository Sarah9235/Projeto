import React, { createContext, useState, useEffect } from 'react';
import app from '../firebase/firebase.config'; // Importa a configuração do Firebase
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// Importa as funções de autenticação do Firebase

// Cria um contexto para compartilhar o estado de autenticação globalmente
export const AuthContext = createContext();

// Inicializa o serviço de autenticação do Firebase
const auth = getAuth(app);

// Configura o provedor de autenticação do Google
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    // Define o estado local para o usuário autenticado e o estado de carregamento
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Função para criar um novo usuário com email e senha
    const createUser = (email, password) => {
        setLoading(true); // Define o estado de carregamento como verdadeiro durante a criação do usuário
        return createUserWithEmailAndPassword(auth, email, password); 
        // Chama a função do Firebase para criar o usuário
    };

    // Função para fazer login com o Google via popup
    const loginComGoogle = () => {
        setLoading(true); // Inicia o estado de carregamento
        return signInWithPopup(auth, googleProvider); 
        // Chama o Firebase para fazer login usando o Google
    };

    // Função para fazer login com email e senha
    const login = (email, senha) => {
        setLoading(true); // Define o estado de carregamento enquanto realiza o login
        return signInWithEmailAndPassword(auth, email, senha); 
        // Autentica o usuário com email e senha
    }

    // Monitora mudanças no estado de autenticação (ex: login/logout)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // Atualiza o estado de 'user' com o usuário atual quando ele faz login
            setUser(currentUser);
            setLoading(false); // Para o carregamento quando a autenticação é resolvida
        });

        // Retorna uma função que limpa a subscrição ao desmontar o componente, prevenindo vazamentos de memória
        return () => unsubscribe();
    }, []);

    // Objeto contendo o estado e funções de autenticação que serão passados para os componentes filhos
    const authInfo = {
        user, // O usuário autenticado (ou null se não houver)
        createUser, // Função para criar um novo usuário
        loginComGoogle, // Função para login com Google
        loading, // Estado de carregamento
        login // Função para login com email e senha
    };

    return (
        // O AuthContext.Provider envolve todos os componentes filhos e fornece o valor de authInfo para eles
        <AuthContext.Provider value={authInfo}>
            {children} {/* Renderiza os componentes filhos que consomem o contexto */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
