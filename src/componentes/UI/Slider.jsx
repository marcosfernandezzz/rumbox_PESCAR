import SliderContainer from "react-cards-slider";
import kit1 from '../../assets/imagenes/SliderImgs/AntiparraSnowboard.png'
import kit2 from '../../assets/imagenes/SliderImgs/AlmohadaInteligente.png'
import kit3 from '../../assets/imagenes/SliderImgs/BotasSnowboard.png'
import kit4 from '../../assets/imagenes/SliderImgs/CamperaNieve.png'
import kit5 from '../../assets/imagenes/SliderImgs/GafasSol.png'
import kit6 from '../../assets/imagenes/SliderImgs/GuantesNievepng.png'
import kit7 from '../../assets/imagenes/SliderImgs/SombrillaPlaya.png'



function Slider() {
    const cards = [
        {
            id: 1,
            title: "Antiparra Gadic Ski Snowboard",
            description: "$106,400",
            image: kit1
        },
        {
            id: 2,
            title: "Almohada Inteligente de cuello",
            description: "49,998",
            image: kit2
        },
        {
            id: 3,
            title: "Botas de SnowBoard Ski",
            description: "$480,000",
            image: kit3
        },
        {
            id: 4,
            title: "Campera Nieve Impermeable",
            description: "$147,990",
            image: kit4
        },
        {
            id: 5,
            title: "Gafas de Sol polarizadas",
            description: "$117,000",
            image: kit5
        },
        {
            id: 6,
            title: "Guantes impermeables Nieve",
            description: "$$12,600",
            image: kit6
        },
        {
            id: 7,
            title: "Sombrilla de playa con funda",
            description: "$73.875",
            image: kit7
        },
    ];

    const buttonClasses = ` w-12 h-12 flex justify-center items-center rounded-full 
          bg-gradient-to-r from-slate-300 to-blue-100 shadow-md disabled:cursor-not-allowed
          active:scale-95 disabled:opacity-50`

    return (
        <section className="m-10 bg-gray-100 shadow-md h-[450px] rounded-xl md:h-94">
            <div>
                <h3 className="text-2xl text-center font-bold m-12" >Productos Destacados.</h3>
            </div>
            <div className='w-3/4 h-[400px] m-auto mt-10'>
                <SliderContainer
                    containerClasses='flex justify-center items-center  bg-gray-100  '
                    leftButtonClasses={`${buttonClasses} mr-3`}
                    rightButtonClasses={`${buttonClasses} ml-3`}
                    cardsWrapperClasses='gap-4'
                    
                >
                    {
                        cards.map((card) => (
                            <div key={card.id} className="bg-white text-center p-4 h-70 w-52 border border-gray-300 rounded-xl shrink-0 shadow" >
                                <img src={card.image} alt={card.title} className="h-24 w-full object-contain rounded bg-gray-50" />
                                <h3 className="text-lg font-semibold mt-2">{card.title}</h3>
                                <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                                <div className="flex justify-center items-end m-4 ">
                                    <button className="mt-3 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                                        Ver más
                                    </button>
                                </div>

                            </div>
                        ))
                    }

                </SliderContainer>
            </div>
        </section>
    )
}

export default Slider