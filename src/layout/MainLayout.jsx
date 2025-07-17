import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const MainLayout = () => {
  return (
        <>
        <Helmet style={{ minHeight: "100vh" }}>
            <title>E-Shop 🛍️</title>
            <meta name="description" content="Tienda de tecnología. Comprá tus productos favoritos con confianza." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        <Navbar style={{ minHeight: "10vh" }} />

        <main className="container mt-4 mb-5 " style={{ minHeight: "80vh" }}>
            <Outlet />
        </main>

        <Footer style={{ minHeight: "10vh", background: "rgba(255, 0, 0, 0.8)" }} />

        {/* Notificaciones globales */}
        <ToastContainer
            position="bottom-right"
            autoClose={2500}
            hideProgressBar
            newestOnTop
            closeOnClick
            pauseOnHover
            theme="colored"
        />
        </>
    );
};

export default MainLayout;
