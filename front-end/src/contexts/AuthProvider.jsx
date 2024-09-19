import React, { createContext, useState, useEffect } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export const AuthContext = createContext(); // Cria o contexto de autenticação

const auth = getAuth(app); // Inicializa o serviço de autenticação do Firebase
const googleProvider = new GoogleAuthProvider(); // Configura o login com Google

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Estado para o usuário autenticado
    const [loading, setLoading] = useState(true); // Estado de carregamento

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password); // Cria um novo usuário
    };

    const loginComGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider); // Faz login com Google
    };

    const login = (email, senha) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, senha); // Login com email e senha
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Monitora mudanças no estado de autenticação
            setLoading(false);
        });
        return () => unsubscribe(); // Limpa a subscrição para evitar vazamentos
    }, []);

    const authInfo = {
        user, createUser, loginComGoogle, loading, login // Funções e estado de autenticação
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children} {/* Renderiza os componentes filhos */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
