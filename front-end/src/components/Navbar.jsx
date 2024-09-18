import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '/logo.png';
import { FaBarsStaggered, FaXmark, FaUser } from "react-icons/fa6";
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    // Estado para controlar a visibilidade do menu em dispositivos móveis
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Estado para definir se a barra de navegação deve ser fixa (sticky) ou não
    const [isSticky, setIsSticky] = useState(false);

    // Contexto para obter informações sobre o usuário
    const { user } = useContext(AuthContext);

    // Função para alternar o menu em dispositivos móveis
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    // Hook para adicionar/retirar a classe "sticky" com base na rolagem da página
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        }
        window.addEventListener('scroll', handleScroll);

        // Limpeza do evento de rolagem quando o componente é desmontado
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    // Itens de navegação com base no estado de autenticação do usuário
    const navItens = [
        { link: "Home", path: "/" },
        { link: "Sobre", path: "/SobreNos" },
        { link: "Minha Biblioteca", path: "/minha-biblioteca" },
        { link: "Catálogo", path: "/catalogo" },
        user && { link: "Admin", path: "/admin/dashboard/upload" }, // Mostrar "Admin" apenas se o usuário estiver logado
    ].filter(Boolean);

    return (
        <header className='w-full bg-transparent fixed top-0 right-0  transition-all ease-in duration-300 z-10'>
            <nav className={`py-4 lg:px-24 px-4 ${isSticky ? "sticky top-0 left-0 right-0 bg-purple-300" : ""}`}>
                <div className='flex justify-between items-center text-base gap-8'>
                    {/* Logo e link para a página inicial */}
                    <NavLink to="/" className='text-2xl font-bold text-purple-950 flex items-center gap-2'>
                        <img src={logo} alt="BookSide Logo" className='w-10 h-10' />
                        BookSide
                    </NavLink>

                    {/* Itens de navegação visíveis em telas maiores */}
                    <ul className='md:flex space-x-12 hidden'>
                        {navItens.map(({ link, path }) => (
                            <NavLink
                                key={path}
                                to={path}
                                className={({ isActive }) =>
                                    `block text-base uppercase cursor-pointer ${isActive ? 'text-purple-700 border-b-2 border-purple-700' : 'text-pink-700 hover:text-purple-700'}`
                                }
                            >
                                {link}
                            </NavLink>
                        ))}
                    </ul>

                    {/* Seção para o usuário em telas maiores */}
                    <div className='space-x-12 hidden lg:flex items-center'>
                        {user ? (
                            <span className='text-base text-purple-700 flex items-center gap-2'>
                                {user.email}
                                <FaUser className='text-purple-700' />
                            </span>
                        ) : (
                            <NavLink to="/login" className="text-base text-pink-800 hover:text-purple-700 flex items-center gap-2">
                                <FaUser className='text-purple-900' />
                                Login
                            </NavLink>
                        )}
                    </div>

                    {/* Botão para abrir/fechar o menu em dispositivos móveis */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-black focus:outline-none'>
                            {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBarsStaggered className='h-5 w-5 text-black' />}
                        </button>
                    </div>
                </div>

                {/* Itens de navegação e botão de login para dispositivos móveis */}
                <div className={`space-y-4 px-4 mt-16 py-7 bg-purple-700 ${isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"}`}>
                    {navItens.map(({ link, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) =>
                                `block text-base uppercase cursor-pointer ${isActive ? 'text-purple-300 border-b-2 border-purple-300' : 'text-white'}`
                            }
                        >
                            {link}
                        </NavLink>
                    ))}
                    <NavLink to="/login" className="text-base text-white flex items-center gap-2 mt-4">
                        <FaUser className='text-white' />
                        Login
                    </NavLink>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
