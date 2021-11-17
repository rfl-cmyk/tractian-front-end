import { useContext, useState } from 'react';
import Spinner from '../../componentes/spinner/Spinner';
import Label from '../../componentes/label/Label';
import { BotaoRemover, BotaoEditar, BotaoDetalhes } from '../../componentes/botoes/Botoes';
import { Card } from 'antd';
import LightBox from './lightbox/LightBox';

import { GlobalContext } from '../../contexts/Global.Context';

import './ativos.css';

const { Meta } = Card;

const Ativos = () => {

    const { ativos, setAtivos, unidades, empresas } = useContext(GlobalContext);
    const [ modalData, setModalData ] = useState();

    const deletarItem = indice => {
        let i = indice;
        let novoAtivos = ativos;
        novoAtivos.splice(i, 1)
        setAtivos([...novoAtivos]);
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
            !ativos.length ?
            <Spinner /> :
            ativos.map(ativo => {

                const indice = ativos.indexOf(ativo)

                return(
                    <Card
                        key={ativo.id}
                        cover={<img alt={ativo.name} title={ativo.name} src={ativo.image} />}
                        actions={[
                            <BotaoRemover indice={indice} deletarItem={deletarItem} id={ativo.id} url={`assets`} />,
                            <BotaoEditar id={ativo.id} url={`assets`} onclick={() => setModalData(ativo)} />,
                            <BotaoDetalhes url={`/ativos/${ativo.id}`} />
                        ]}
                    >
                        <Meta
                            title={ativo.name}
                            description={`saúde: ${ativo.healthscore}%`}
                        />
                        <Label status={ativo.status} />  
                    </Card>      
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

export default Ativos;