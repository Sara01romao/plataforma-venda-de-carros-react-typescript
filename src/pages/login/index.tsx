import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import { Container } from '../../components/container';
import { Input } from '../../components/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormData = z.infer<typeof schema>
const schema = z.object({
    email: z.string().email("Insira um email válido").min(1, "O campo é obrigatório"),
    password: z.string().min(1, "O campo é obrigatório")
 });
  
function onSubmit(data: FormData){
    console.log(data)
}

export function Login(){
   const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
   })
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
                  
                   
                   <button className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>Acessar</button>
                </form>
                <Link to="/login">
                    Ainda não possui uma conta? Cadastra-se.
                </Link>

            </div>
        </Container>
    )
}