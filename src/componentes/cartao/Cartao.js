import { BotaoRemover, BotaoEditar } from '../../componentes/botoes/Botoes';
import { Card } from 'antd';

import './cartao.css'

export function Cartao(props) {
    return(
        <Card
            className="cartao"
            cover={props.cover}
            actions={[
                <BotaoRemover
                    indice={props.indice}
                    deletarItem={props.deletarItem}
                    id={props.id} url={props.url}
                />,
                <BotaoEditar id={props.id} url={props.url} onclick={props.onclick} />
            ]}
        >
            {props.children}
        </Card>
    )
}