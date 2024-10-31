import {Link} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import {auth} from '../../services/firebaseConnection'


export function DashboardHeader(){

   async function handleLogout(){
    await signOut(auth)
   }

    return(
        <div className='w-full mx-auto items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 m-4'>
            <Link to="/dashboard" className=" hover:text-red-950">Dashboard</Link>
            <Link to="/dashboard/new"  className=" hover:text-red-950">Cadastrar Carro</Link>

            <button className='ml-auto hover:text-red-950' onClick={handleLogout}>
                Sair da Conta
            </button>
        </div>
    )
}