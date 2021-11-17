import { useState, useContext } from 'react';
import { Modal, message, Form, Input, Select } from 'antd';
import Api from '../../../servicos/Api';

import { GlobalContext } from '../../../contexts/Global.Context';

function LightBox(props) {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const { usuarios, setUsuarios, unidades, empresas } = useContext(GlobalContext);
    const [form] = Form.useForm();
    const { Option } = Select;

    const onOk = (values) => {

        // ----- state
        let novoUsuarios = usuarios;
        var [ usuario ] = novoUsuarios.filter(el => el.id === props.data.id);

        let email
        values.email ? email = values.email : email = usuario.email;

        let nome
        values.nome ? nome = values.nome : nome = usuario.name;

        let unidade
        values.unidade ? unidade = values.unidade : unidade = props.data.unitId;

        let empresa
        values.empresa ? empresa = values.empresa : empresa = props.data.companyId;

        usuario = {
            id: usuario.id,
            email: email,
            name: nome,
            unitId: unidade,
            companyId: empresa
        }
  
        const indice = novoUsuarios.indexOf(props.data)
        novoUsuarios.splice(indice, 1, usuario)
        setUsuarios([...novoUsuarios]);

        setIsModalVisible(false);
        props.resetModal();
        message.success('Item editado!');

        // ----- API
        Api.put(`/users/${props.data.id}`, usuario)
    }

    const onCancel = () => {
        setIsModalVisible(false);
        props.resetModal();
        message.error('Ação cancelada!');
    };

    return(
        <Modal title={props.data.name} visible={isModalVisible} onOk={form.submit} onCancel={onCancel}>
            <Form form={form} onFinish={onOk}>
                <Form.Item name="nome" label="Nome">
                    <Input placeholder={props.data.name} />
                </Form.Item>
                <Form.Item name="email" label="E-mail" rules={[{ type: 'email', message: 'Insira um e-mail válido!'}]}>
                    <Input placeholder={props.data.email} />
                </Form.Item>
                <Form.Item name="unidade" label="Unidade">
                    <Select placeholder={props.transUnit(props.data.unitId)}>
                        {
                        unidades.map(el => {
                            return <Option key={el.id} value={el.id}>{el.name}</Option>
                        })
                        }
                    </Select>
                </Form.Item>
                <Form.Item name="empresa" label="Empresa">
                    <Select placeholder={props.transCompany(props.data.companyId)}>
                        {
                        empresas.map(el => {
                            return <Option key={el.id} value={el.id}>{el.name}</Option>
                        })
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default LightBox;
