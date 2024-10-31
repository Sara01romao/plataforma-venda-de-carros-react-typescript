import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {getDoc, doc} from 'firebase/firestore';
import { db} from "../../services/firebaseConnection";
import { Container } from "../../components/container";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FaWhatsapp } from "react-icons/fa";


interface CarProps{
    id: string;
    name: string;
    year: string;
    price: string | number;
    city: string;
    km: string;
    images: ImageCarProps[];
    uid: string;
    description: string;
    owner: string;
    model:string;
    whatsapp:string;
    created:string;
    
}

interface ImageCarProps{
    uid: string;
    name: string;
    url: string;
}

export function Car(){
    const {id} = useParams();
    const [car, setCar] = useState<CarProps>();
    const [sliderPerView, setSliderPerView] = useState<number>(2);
    const navegate = useNavigate();

    useEffect(()=>{
         async function loadCar(){
            if(!id){return}

            const docRef = doc(db, "cars", id)
            getDoc(docRef)
            .then((snapshot)=>{
                
                if(!snapshot.data()){
                   navegate('/')
                }

                setCar({
                    id: snapshot.id,
                    name: snapshot.data()?.name,
                    year: snapshot.data()?.year,
                    city: snapshot.data()?.city,
                    model: snapshot.data()?.model,
                    uid: snapshot.data()?.uid,
                    description: snapshot.data()?.description,
                    created: snapshot.data()?.created,
                    whatsapp: snapshot.data()?.whatsapp,
                    price: snapshot.data()?.price,
                    km: snapshot.data()?.km,
                    owner: snapshot.data()?.owner,
                    images: snapshot.data()?.images
                })
                
            })
         }
       
        loadCar()

    }, [id])

    useEffect(() => {

       function handleResize(){
            if(window.innerWidth < 720){
                setSliderPerView(1);
            }else{
                setSliderPerView(2);
            }
       }
       
       handleResize()

       window.addEventListener("resize", handleResize);

       return() => {
        window.addEventListener("resize", handleResize);
       }
       
    }, [])

    return(
        <Container>
              {car && (
                <Swiper
                    slidesPerView={sliderPerView}
                    pagination={{clickable:true}}
                    navigation
                >
                    {car?.images.map(image => (
                        <SwiperSlide>
                            <img
                                src={image.url}
                                className="w-full h-96 object-cover"
                                alt="Imagem Carro"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
              )}

              {car && (
                <main className="w-full bg-white rounded-lg p-6 my-4">
                    <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                        <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
                        <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
                    </div>
                    <p>Modelo: {car?.model}</p>

                    <div className="flex w-full gap-6 my-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <p>Cidade: </p>
                                <strong>{car?.city}</strong>
                            </div>
                            <div className="flex items-center gap-2">
                                <p>Ano</p>
                                <strong>{car?.year}</strong>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2">
                                <p>KM</p>
                                <strong>{car?.km}</strong>
                            </div>
                            
                        </div>

                    </div>

                    <strong>Telefone / Whatsapp</strong>
                    <p>{car?.whatsapp}</p>

                    <p className="mt-5"><strong>Descrição: </strong> </p>
                    <div className=" mt-1 p-2 w-full border-solid border-2 border-grey-200 rounded-lg ">
                        
                        <p className="mb-4">{car?.description}</p>
                    </div>

                    <a 
                        href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi esse ${car?.name} e fiquei interessado.`}
                        target="_blank"
                        className=" mt-5  cursor-pointer bg-green-500 w-full text-white flex items-center justify-center gap-2 h-11 text-xl rounded-lg font-medium"
                    >
                        <FaWhatsapp size={24}/>
                        Conversar com Vendedor
                    </a>

                </main>
              )}
        </Container>
      
    )
}