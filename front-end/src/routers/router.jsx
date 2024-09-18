import {
  createBrowserRouter
} from "react-router-dom";
import App from "../App";
import SobreNos from "../components/SobreNos";
import Home from "../home/Home";
import Catálogo from "../catalogo/Catálogo";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadLivros from "../dashboard/UploadLivros";
import ControleLivros from "../dashboard/ControleLivros";
import EditarLivros from "../dashboard/EditarLivros";
import MinhaBiblioteca from "../biblioteca/MinhaBiblioteca";
import Login from "../components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/minha-biblioteca",
        element: <MinhaBiblioteca />
      },
      {
        path: "/SobreNos",
        element: <SobreNos />
      },
      {
        path: "/catalogo",
        element: <Catálogo />
      },
      // Resenhas do livro
      {
        path: "/livro/:id",
        element: <ResenhaLivro />,
        loader: ({ params }) => fetch(`http://localhost:5000/livro/${params.id}`),
      }
    ]
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element:  <Dashboard />  
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadLivros />
      },
      {
        path: "/admin/dashboard/controle",
        element: <ControleLivros />
      },
      {
        path: "/admin/dashboard/editLivros/:id",
        element: <EditarLivros />,
        loader: ({ params }) => fetch(`http://localhost:5000/livro/${params.id}`)
      }
    ]
  },
  {
    path: "/cadastro",
    element: <Cadastro />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default router

