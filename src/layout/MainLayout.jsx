import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

const MainLayout = () => {
  return (
        <>
        <Helmet>
            <title>E-Shop 🛍️</title>
            <meta name="description" content="Tienda de tecnología. Comprá tus productos favoritos con confianza." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        <Navbar />

        <main className="container mt-4 mb-5">
            <Outlet />
        </main>

        <Footer />

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
