import { useEffect, useState } from "react";
import { Container } from "../../components/container";

import {
    collection,
    query, 
    getDocs,
    orderBy,
    where
} from 'firebase/firestore';
import { db } from "../../services/firebaseConnection";
import { Link } from "react-router-dom";

interface CarsProps{
    id: string;
    name: string;
    year: string;
    uid: string;
    price: string | number;
    city: string;
    km: string;
    images: CarImageProps[];
    url: string;
}

interface CarImageProps{
    name: string;
    uid: string;
    url: string;

}

export function Home(){

    const [cars, setCars] = useState<CarsProps[]>([]);
    const [loadImages, setLoadImages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    useEffect(() =>{
        loadCars()
    },[input])

    function loadCars(){
        const carsRef = collection(db, "cars");
        const queryRef = query(carsRef, orderBy('created', 'desc'));

        getDocs(queryRef)
        .then((snapshot)=>{
           let listcars = [] as CarsProps[];

           snapshot.forEach(doc =>{
            listcars.push({
                id: doc.id,
                name: doc.data().name,
                year: doc.data().year,
                km: doc.data().km,
                city: doc.data().city,
                price: doc.data().price,
                images: doc.data().images,
                uid: doc.data().uid,
                url: doc.data().url
               
                
            })
           })

           setCars(listcars);
        })
    }

    function handleImageLoad(id:string){
        setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);

    }

    async function handleSearchCar(){
        if(input === ''){
            loadCars();
            return;
        }

        setCars([]);
        setLoadImages([]);

        const q = query(collection(db, 'cars'),
            where("name", ">=", input.toLocaleUpperCase()),
            where("name","<=", input.toLocaleUpperCase() + "\uf8ff")
        )

        const querySnapshot = await getDocs(q);
       
        let listcars = [] as CarsProps[];

        querySnapshot.forEach((doc) =>{
           
            listcars.push({
                id: doc.id,
                name: doc.data().name,
                year: doc.data().year,
                km: doc.data().km,
                city: doc.data().city,
                price: doc.data().price,
                images: doc.data().images,
                uid: doc.data().uid,
                url: doc.data().url
            })
        })

        setCars(listcars)
    }


    return(
        <Container>
            <section className="bg-white mt-3 p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
                <input type="text"
                 className="w-full border-2 rounded-lg h-9 px-3 outline-none"
                 placeholder="Digite o nome do carro..."
                 onChange={(e) => setInput(e.target.value)}
                
                />
                <button
                    className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg"
                    onClick={handleSearchCar}
                >
                    Buscar
                </button>
            </section>

            <h1 className="font-bold text-center mt-6 text-2xl mb-4">
                Carros novos e usados em todo o Brasil
            </h1>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cars.map(car => (
                    <Link key={car.id} to={`/car/${car.id}`} >
                        <section className="w-full bg-white rounded-lg">
                            <div 
                                className="w-full h-72 rounded-lg bg-slate-200"
                                style={{display: loadImages.includes(car.id) ? "none" : "block"}}
                            ></div>
                            <img 
                                className="w-full rounded-lg mb-2 mx-h-72 hover:scale-105 transition-all"
                                src={car.images[0].url}
                                alt="Carro" 
                                onLoad={() => handleImageLoad(car.id)}
                                style={{display: loadImages.includes(car.id) ? "block" : "none"}}
                            />
                            <p className="font-bold mt-l px-2" >{car.name}</p>
                            <div className="px-2  mb-2">
                                <small className="text-sm font-medium">
                                    {car.city}
                                </small>
                            </div>
                            <div className="flex flex-col px-2">
                                <span className="text-zinc-700 mb-4">Ano {car.year} | {car.km} km</span>
                                <strong className="text-black font-medium text-xl mb-3">R$ {car.price}</strong>
                            </div>

                        </section>
                    </Link>
                ))}
                
            </main>
       
        </Container>
        
    )
}