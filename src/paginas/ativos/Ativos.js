import { useContext } from 'react';
import Spinner from '../../componentes/spinner/Spinner';
import Label from '../../componentes/label/Label';
import { BotaoRemover, BotaoEditar, BotaoDetalhes } from '../../componentes/botoes/Botoes';
import { Card } from 'antd';

import { GlobalContext } from '../../contexts/Global.Context';

import './ativos.css';

const { Meta } = Card;

const Ativos = () => {

    const { ativos, setAtivos } = useContext(GlobalContext);

    const deletarItem = indice => {
        let i = indice;
        let novoAtivos = ativos;
        novoAtivos.splice(i, 1)
        setAtivos([...novoAtivos]);
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
                        id="teste"
                        cover={<img alt={ativo.name} title={ativo.name} src={ativo.image} />}
                        actions={[
                            <BotaoRemover indice={indice} deletarItem={deletarItem} id={ativo.id} url={`assets`} />,
                            <BotaoEditar id={ativo.id} url={`assets`} />,
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
        </>
    )
}

export default Ativos;