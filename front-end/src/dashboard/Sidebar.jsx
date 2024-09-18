import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaHome, FaBookOpen, FaSignOutAlt } from 'react-icons/fa';
import logo from '/logo.png';

const SideBar = () => {
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
                        as={Link} 
                        to="/logout" 
                        icon={FaSignOutAlt} 
                        className="hover:bg-purple-200 rounded-md flex items-center gap-2 px-4 py-2"
                    >
                        Log Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SideBar;
