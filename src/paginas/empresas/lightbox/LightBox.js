import { useState, useContext } from 'react';
import { Modal, message, Form, Input } from 'antd';
import Api from '../../../servicos/Api';

import { GlobalContext } from '../../../contexts/Global.Context';

function LightBox(props) {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const { empresas, setEmpresas } = useContext(GlobalContext);
    const [form] = Form.useForm();

    const onOk = (values) => {

        // ----- state
        let novoEmpresas = empresas;
        var [ empresa ] = novoEmpresas.filter(el => el.id === props.data.id);
        empresa = {
            id: empresa.id,
            name: values.empresa,
            companyId: empresa.companyId
        }
        const indice = novoEmpresas.indexOf(props.data)
        novoEmpresas.splice(indice, 1, empresa)
        setEmpresas([...novoEmpresas]);

        setIsModalVisible(false);
        props.resetModal();
        message.success('Item editado!');

        // ----- API
        Api.put(`/units/${props.data.id}`, empresa)
    }

    const onCancel = () => {
        setIsModalVisible(false);
        props.resetModal();
        message.error('Ação cancelada!');
    };

    return(
        <Modal title={props.data.name} visible={isModalVisible} onOk={form.submit} onCancel={onCancel}>
            <Form form={form} onFinish={onOk}>
                <Form.Item name="empresa" label="Nome" rules={[{ required: true, message: 'Campo obrigatório!'}]}>
                    <Input placeholder={props.data.name} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LightBox;
