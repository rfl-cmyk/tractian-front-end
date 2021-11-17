import { useContext, useState } from 'react';
import { Cartao } from '../../componentes/cartao/Cartao';
import { HomeOutlined } from '@ant-design/icons';

import { GlobalContext } from '../../contexts/Global.Context';
import LightBox from './lightbox/LightBox';

const Unidades = () => {

    const { unidades, setUnidades } = useContext(GlobalContext);
    const [ modalData, setModalData ] = useState();

    const deletarItem = indice => {
        let i = indice;
        let novoUnidades = unidades;
        novoUnidades.splice(i, 1)
        setUnidades([...novoUnidades]);
    }
    
    const resetModal = () => {
        setModalData();
    }

    return(
        <>
            {
            unidades.map(unidade => {

                const indice = unidades.indexOf(unidade)

                return(
                    <div key={unidade.id}>
                        <Cartao
                            key={unidade.id}
                            cover={<HomeOutlined />}
                            indice={indice}
                            deletarItem={deletarItem}
                            id={unidade.id}
                            url={`assets`}
                            onclick={() => setModalData(unidade)}
                        >
                            <ul>
                                <li>{unidade.name}</li>
                                <li>ID: {unidade.id}</li>
                            </ul> 
                        </Cartao>
                    </div>
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

export default Unidades;