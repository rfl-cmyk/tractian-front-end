import { useState, createContext, useEffect } from "react";
import Api from '../servicos/Api';

export const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {

    const [ativos, setAtivos] = useState([]);

    useEffect(() => {
        Api.get(`assets`)
        .then((responsta) => {
          setAtivos(responsta.data);
        });
    }, [setAtivos]);

    return(
        <GlobalContext.Provider value={{ ativos, setAtivos }}>
            { children }
        </GlobalContext.Provider>
    )
}