import { FiLogIn, FiUser } from 'react-icons/fi';
import logoImg from '../../assets/logo.png'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

export function Header(){
   const {signed, loadingAuth} = useContext(AuthContext)
     
    return(
        <div className='w-full flex items-center justify-center h-16 bg-white drop-shadow md-4'>
             <header className='flex w-full max-w-7xl items-center justify-between px-4 mx-auto' >
                <Link to="/">
                <img 
                        src={logoImg}
                        alt="Logo"
                    />
                </Link>
                
                {!loadingAuth && signed && (
                        <Link to="/dashboard">
                            <div className='border-2 rounded-full p-1 border-gray-900'>
                                <FiUser size={24} color="#000" />
                            </div>
                            
                        </Link>
                     )
                }
                
                {!loadingAuth && !signed && (
                        <Link to="/dashboard">
                            <FiLogIn size={24} color="#000" />
                        </Link>
                     )
                }
            </header>
        </div>
       
    )
}