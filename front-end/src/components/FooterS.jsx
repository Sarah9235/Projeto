import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

const FooterS = () => {
    return (
        <div className="bg-purple-950 text-white py-8">
            <footer className="container px-6 md:px-36 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                    <div className="text-center md:text-left">
                        <p className="text-sm mb-2">&copy; 2024 <a href="#" className="text-blue-400 hover:underline">BookSide</a>. Todos os direitos reservados.</p>
                        <p className="text-xs">Primeiro projeto desenvolvido por Sarah.</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold mb-2">Contato</p>
                        <p className="text-xs flex items-center space-x-2">
                            <FaEnvelope className="w-4 h-4" />
                            <span>bookside@gmail.com</span>
                        </p>
                        <p className="text-xs flex items-center space-x-2">
                            <FaPhone className="w-4 h-4" />
                            <span>(32) 1234-5678</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                    <Link to="/SobreNos" className="text-sm hover:underline">Sobre nós</Link>
                    <Link to="/PoliticaPrivacidade" className="text-sm hover:underline">Política de Privacidade</Link>
                    <Link to="/TermosUso" className="text-sm hover:underline">Termos de Uso</Link>
                </div>
                <div className="flex space-x-4">
                    <a href="https://www.instagram.com/sarahttpw/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/in/sarah-barcaro-de-freitas-18a18abc/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                        <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com/Sarah9235" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                        <FaGithub className="w-6 h-6" />
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default FooterS;
