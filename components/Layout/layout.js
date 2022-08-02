import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children, catalogMenu }) {
    return (
        <>
            <Header catalogMenu={catalogMenu} />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <>
                {children}
            </>
            <Footer catalogMenu={catalogMenu} />
        </>
    )
};