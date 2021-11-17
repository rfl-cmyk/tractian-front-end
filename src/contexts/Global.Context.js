import { useState, createContext, useEffect } from "react";
import Api from '../servicos/Api';

export const GlobalContext = createContext()

export function GlobalContextProvider({ children }) {

    const [ativos, setAtivos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [unidades, setUnidades] = useState([]);

    useEffect(() => {
        Api.get(`db`)
        .then((resposta) => {
          setAtivos(resposta.data.assets);
          setUsuarios(resposta.data.users);
          setEmpresas(resposta.data.companies);
          setUnidades(resposta.data.units);
        });
    }, []);

    return(
        <GlobalContext.Provider value={{
            ativos, setAtivos,
            usuarios, setUsuarios,
            empresas, setEmpresas,
            unidades, setUnidades
        }}>
            { children }
        </GlobalContext.Provider>
    )
}