import { FiUpload } from "react-icons/fi";
import { Container } from "../../../components/container";
import { DashboardHeader } from "../../../components/panelheader";
import {useForm} from 'react-hook-form'
import { Input } from "../../../components/input";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import {v4 as uuidV4} from 'uuid';


import{
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage'
import { storage } from "../../../services/firebaseConnection";

const schema = z.object({
    name: z.string().min(4, 'O nome do carro é obrigatório'),
    model: z.string().min(3, 'O modelo é obrigatório'),
    year: z.string().min(4, 'O ano é obrigatório'),
    km: z.string().min(2, 'O KM é obrigatório'),
    price: z.string().min(1, 'O preço é obrigatório'),
    city: z.string().min(4, 'O cidade é obrigatório'),
    whatsapp: z
    .string()
    .min(4, 'O telefone é obrigatório')
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Número de telefone inválido. Insira 11 ou 12 dígitos.",
    }),
    description: z.string().min(4, 'A descrição é obrigatória'),
})

type FormData = z.infer<typeof schema>;

export function New(){
    const { user } = useContext(AuthContext)
    const {register, handleSubmit, formState:{errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];
            
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                await handleUpload(image);
            } else {
                alert("Enviar uma imagem jpeg ou png");
                return;
            }
    
            console.log(image);
        }
    }
    
    async function handleUpload(image: File) {
        if (!user?.uid) { // Corrigido: só retorna se user.uid não existir
            console.error("User ID não encontrado.");
            return;
        }
    
        const currentUid = user.uid;
        const uidImage = uuidV4();
        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);
        
        try {
            const snapshot = await uploadBytes(uploadRef, image);
            const downloadUrl = await getDownloadURL(snapshot.ref);
            console.log("URL de acesso à foto:", downloadUrl);
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
        }
    }
    

    function onSubmit(data: FormData){
        console.log(data)
    }

    return(
        <Container>
            <DashboardHeader/>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000"/>
                    </div>
                    <div className="absolute cursor-pointer">
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="opacity-0 cursor-pointer" 
                            onChange={handleFile}
                        />
                    </div>
                </button>
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form 
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <p className="mb-2 font-medium">Nome do Carro</p>
                        <Input
                            type="text"
                            register={register}
                            name="name"
                            error={errors.name?.message}
                            placeholder="Ex: Onix 1.0...."
                        
                        />
                    </div>
                   

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">Modelo</p>
                            <Input
                                type="text"
                                register={register}
                                name="model"
                                error={errors.model?.message}
                                placeholder="Ex: 1.0 Plus...."
                            
                            />
                        </div>

                        <div className="w-full">
                            <p className="mb-2 font-medium">Ano</p>
                            <Input
                                type="text"
                                register={register}
                                name="year"
                                error={errors.year?.message}
                                placeholder="Ex: 2008...."
                            
                            />
                        </div>


                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">KM Rodados</p>
                            <Input
                                type="text"
                                register={register}
                                name="km"
                                error={errors.km?.message}
                                placeholder="Ex: 39.000...."
                            
                            />
                        </div>

                        <div className="w-full">
                            <p className="mb-2 font-medium">Preço</p>
                            <Input
                                type="text"
                                register={register}
                                name="price"
                                error={errors.price?.message}
                                placeholder="Ex: 30.000...."
                            
                            />
                        </div>
                        
                    </div>

                    <div className="flex w-full mb-3 flex-row items-start gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">Telefone / Whatsapp</p>
                            <Input
                                type="text"
                                register={register}
                                name="whatsapp"
                                error={errors.whatsapp?.message}
                                placeholder="Ex: 00000000000...."
                            
                            />
                        </div>
                        <div className="w-full">
                            <p className="mb-2 font-medium">Cidade</p>
                            <Input
                                type="text"
                                register={register}
                                name="city"
                                error={errors.city?.message}
                                placeholder="Ex: São Paulo...."
                            
                            />
                        </div>
                        
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Descrição</p>
                        <textarea
                            className="border-2 w-full rounded-md h-24 px-2"
                            {...register('description')}
                            name="description"
                            placeholder="Digite a descrição completa sobre o carro..."
                        />
                        {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
                    </div>

                    <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10">
                        Cadastrar
                    </button>

                </form>
            </div>
        </Container>
    )
}