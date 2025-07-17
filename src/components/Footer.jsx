const Footer = ({style={}}) => {
    return (
        <footer className="bg-dark text-white text-center py-3 " style={style}>
        <small>&copy; {new Date().getFullYear()} E-Shop | Desarrollado por Kevin</small>
        </footer>
    );
};

export default Footer;
