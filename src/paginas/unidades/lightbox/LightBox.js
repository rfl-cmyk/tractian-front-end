import { useState, useContext } from 'react';
import { Modal, message, Form, Input } from 'antd';
import Api from '../../../servicos/Api';

import { GlobalContext } from '../../../contexts/Global.Context';

function LightBox(props) {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const { unidades, setUnidades } = useContext(GlobalContext);
    const [form] = Form.useForm();

    const onOk = (values) => {

        // ----- state
        let novoUnidades = unidades;
        var [ unidade ] = novoUnidades.filter(el => el.id === props.data.id);
        unidade = {
            id: unidade.id,
            name: values.unidade,
            companyId: unidade.companyId
        }
        const indice = novoUnidades.indexOf(props.data)
        novoUnidades.splice(indice, 1, unidade)
        setUnidades([...novoUnidades]);

        setIsModalVisible(false);
        props.resetModal();
        message.success('Item editado!');

        // ----- API
        Api.put(`/units/${props.data.id}`, unidade)
    }

    const onCancel = () => {
        setIsModalVisible(false);
        props.resetModal();
        message.error('Ação cancelada!');
    };

    return(
        <Modal title={props.data.name} visible={isModalVisible} onOk={form.submit} onCancel={onCancel}>
            <Form form={form} onFinish={onOk}>
                <Form.Item name="unidade" label="Nome" rules={[{ required: true, message: 'Campo obrigatório!'}]}>
                    <Input placeholder={props.data.name} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LightBox;
