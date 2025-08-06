import { createContext, useContext, useEffect, useState } from "react";

const KitsContext = createContext();

export function KitsProvider ({children}) {
    const [kits, setKits] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch("/api/kits")
            .then((res)=>res.json())
            .then((data)=> {
                setKits(Array.isArray(data) ? data : data.data || []);
                console.log(data);
                setLoading(false);
            })
            .catch((error)=>{
            console.error("Error al cargar Kits:", error);
            setLoading(false);
        });
    }, []);   
       
    return (
        <KitsContext.Provider value={{kits,loading}}>
            {children}
        </KitsContext.Provider>
    )
}

export function useKits(){
    return useContext(KitsContext);
}