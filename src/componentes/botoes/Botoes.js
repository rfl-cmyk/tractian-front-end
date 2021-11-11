import Api from '../../servicos/Api';
import { Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export function BotaoRemover(props) {

    function confirm(props) {
        Api.delete(`${props.url}/${props.id}`)
        props.deletarItem(props.indice)
        message.success('Item removido!');
    }
      
    function cancel(e) {
        message.error('Ação cancelada!');
    }

    return(
        <Popconfirm
            title="Quer mesmo remover este item?"
            onConfirm={() => confirm(props)}
            onCancel={cancel}
            okText="Sim"
            cancelText="Não"
        >
            <Button title="Remover" shape="circle" danger ><DeleteOutlined /></Button>
        </Popconfirm>
    )
}

export function BotaoEditar(props) {

    function edita(props) {
        Api.delete(`${props.url}/${props.id}`)
    }

    return <Button title="Editar" shape="circle" type="primary" ghost onClick={() => edita(props)}><EditOutlined /></Button>
}

export function BotaoDetalhes(props) {

    var navigate = useNavigate();
    
    const navegar = props => {
        navigate(`${props.url}`)
    }

    return <Button title="Detalhes" shape="circle" onClick={() => navegar(props)}><EyeOutlined /></Button>
}