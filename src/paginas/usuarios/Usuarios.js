import { useContext, useState } from 'react';
import { Cartao } from '../../componentes/cartao/Cartao';
import { UserOutlined } from '@ant-design/icons';
import LightBox from './lightbox/LightBox';

import { GlobalContext } from '../../contexts/Global.Context';

const Usuarios = () => {

    const { usuarios, setUsuarios } = useContext(GlobalContext);
    const { unidades } = useContext(GlobalContext);
    const { empresas } = useContext(GlobalContext);
    const [ modalData, setModalData ] = useState();

    const deletarItem = indice => {
        let i = indice;
        let novoUsuarios = usuarios;
        novoUsuarios.splice(i, 1)
        setUsuarios([...novoUsuarios]);
    }

    const resetModal = () => {
        setModalData();
    }

    const transUnit = unitId => {
        var [ unidade ] = unidades.filter(el => el.id === unitId);
        if(unidade) var nomeUnidade = unidade.name;
    
        return nomeUnidade
    }
    
    const transCompany = companyId => {
        var [ empresa ] = empresas.filter(el => el.id === companyId);
        if(empresa) var nomeEmpresa = empresa.name;
    
        return nomeEmpresa
    }

    return(
        <>
            {
            usuarios.map(usuario => {

                const indice = usuarios.indexOf(usuario)

                return(
                    <Cartao
                        key={usuario.id}
                        cover={<UserOutlined />}
                        indice={indice}
                        deletarItem={deletarItem}
                        id={usuario.id}
                        url={`assets`}
                        onclick={() => setModalData(usuario)}
                    >
                        <ul>
                            <li>{usuario.name}</li>
                            <li>{usuario.email}</li>
                            <li>{transUnit(usuario.unitId)}</li>
                            <li>{transCompany(usuario.companyId)}</li>
                        </ul> 
                    </Cartao>
                    )
                })
            }

            {
            modalData ?
            <LightBox resetModal={resetModal} transUnit={transUnit} transCompany={transCompany} data={modalData} />
            : null  
            }
        </>
    )
}

export default Usuarios;