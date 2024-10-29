import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { Container } from '../../components/container';
import { Input } from '../../components/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {auth} from '../../services/firebaseConnection';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

type FormData = z.infer<typeof schema>
const schema = z.object({
    name:z.string().min(4, "O campo nome é obrigatório"),
    email: z.string().email("Insira um email válido").min(1, "O campo é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
 });
  


export function Register(){
   const {handleInfoUser} = useContext(AuthContext);

   const navigate = useNavigate();
   const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
   })

   useEffect(() => {
        async function handleLogout(){
            await signOut(auth)
        }

        handleLogout();
    }, [])

   async function onSubmit(data: FormData){
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async (user) => {
            await updateProfile(user.user,{
                displayName: data.name
            })
            
            handleInfoUser({
                name: data.name,
                email: data.email,
                uid: user.user.uid
            })
            
            console.log("Cadastrado com sucesso ")
            toast.success("Cadastrado com sucesso!")
            navigate("/dashboard", {replace:true})
        })
        .catch((error) =>{
            console.log("Erro ao cadastrar o usuario")
            toast.error("Erro ao Cadastrar")
            console.log(error)
        })
    }
    return(
        <Container>
            <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
                <Link to="/" className='mb-6 max-w-sm w-full'>
                    <img 
                        src={logoImg} 
                        alt="Logo do Site" 
                        className="w-full"    
                    />
                </Link>

                <form 
                  className="bg-white max-w-xl w-full rounded-lg p-4"
                  onSubmit={handleSubmit(onSubmit)}
                >

                    <div className='mb-3'>
                        <Input 
                        type="name"
                        placeholder="Digite seu nome completo..."
                        name="name"
                        error={errors.name?.message}
                        register={register}
                        
                        />
                    </div>

                    <div className='mb-3'>
                        <Input 
                        type="email"
                        placeholder="Digite seu Email..."
                        name="email"
                        error={errors.email?.message}
                        register={register}
                        
                        />
                    </div>
                   
                    <div className='mb-3'>
                        <Input 
                            type="password"
                            placeholder="Digite seu Senha..."
                            name="password"
                            error={errors.password?.message}
                            register={register}
                            
                            />
                    </div>
                    
                   
                   <button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>Cadastrar</button>
                </form>

                <Link to="/login">
                    Já possui uma conta? Faça o login!
                </Link>

            </div>
        </Container>
    )
}