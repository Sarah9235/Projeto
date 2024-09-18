import { Sidebar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';
import logo from '/logo.png';
import { getAuth, signOut } from "firebase/auth"; // Importe o Firebase Auth

const SideBar = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Faz o logout no Firebase
            navigate("/login");  // Redireciona o usuário para a página de login
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
        }
    };

    return (
        <Sidebar aria-label="Sidebar with logo branding example" className="bg-gray-50 text-white">
            <Link to="/" className='flex items-center gap-2 px-4 py-2 text-xl font-bold rounded-md'>
                <img src={logo} alt="BookSide Logo" className='w-10 h-10  rounded-full border-2 border-purple-700' />
                <span className="text-purple-900" >BookSide</span>
            </Link>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item 
                        as={Link} 
                        to="/admin/dashboard/upload" 
                        icon={FaHome} 
                        className="hover:bg-purple-200 rounded-md flex items-center gap-2 px-4 py-2"
                    >
                        Inserir livros
                    </Sidebar.Item>

                    <Sidebar.Item 
                        as={Link} 
                        to="/admin/dashboard/controle" 
                        icon={FaBookOpen} 
                        className="hover:bg-purple-200 rounded-md flex items-center gap-2 px-4 py-2"
                    >
                        Controle de livros
                    </Sidebar.Item>

                    <Sidebar.Item 
                        as="button" 
                        onClick={handleLogout}  // Chama a função de logout
                        icon={FaSignOutAlt} 
                        className="hover:bg-purple-200 rounded-md flex items-center gap-2 px-4 py-2"
                    >
                        Log Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default SideBar;
