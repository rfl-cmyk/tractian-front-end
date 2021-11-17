import { useContext, useState } from 'react';
import { Cartao } from '../../componentes/cartao/Cartao';
import { SolutionOutlined } from '@ant-design/icons';

import { GlobalContext } from '../../contexts/Global.Context';
import LightBox from './lightbox/LightBox';

const Empresas = () => {

    const { empresas, setEmpresas } = useContext(GlobalContext);
    const [ modalData, setModalData ] = useState();

    const deletarItem = indice => {
        let i = indice;
        let novoEmpresas = empresas;
        novoEmpresas.splice(i, 1)
        setEmpresas([...novoEmpresas]);
    }

    const resetModal = () => {
        setModalData();
    }

    return(
        <>
            {
            empresas.map(empresa => {

                const indice = empresas.indexOf(empresa)

                return(
                    <Cartao
                        key={empresa.id}
                        cover={<SolutionOutlined />}
                        indice={indice}
                        deletarItem={deletarItem}
                        id={empresa.id}
                        url={`assets`}
                        onclick={() => setModalData(empresa)}
                    >
                        <ul>
                            <li>{empresa.name}</li>
                            <li>ID: {empresa.id}</li>
                        </ul> 
                    </Cartao>
                )
            })
            }

            {
            modalData ?
            <LightBox resetModal={resetModal} data={modalData} />
            : null  
            }
        </>
    )
}

export default Empresas;