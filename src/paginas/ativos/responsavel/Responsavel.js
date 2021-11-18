import { useState, useContext } from 'react';
import { Modal, message, Form, Select } from 'antd';
import Api from '../../../servicos/Api';

import { GlobalContext } from '../../../contexts/Global.Context';

function Responsavel(props) {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const { usuarios } = useContext(GlobalContext);
    const [form] = Form.useForm();
    const { Option } = Select;

    const onOk = (values) => {

        if(values.responsavel) {
            // ----- state
            var responsavel = values.responsavel;
            setIsModalVisible(false);
            props.resetModal();
            message.success('Responsável atribuido!');

            // ----- API
            var novoAtivo = { ...props.ativo, responsavel}
            Api.put(`/users/${props.data.id}`, novoAtivo)

            return props.atualizaResponsavel(responsavel)
        }
    }

    const onCancel = () => {
        setIsModalVisible(false);
        props.resetModal();
        message.error('Ação cancelada!');
    };

    return(
            <Modal title={props.data.name} visible={isModalVisible} onOk={form.submit} onCancel={onCancel}>
                <Form form={form} onFinish={onOk}>
                    <Form.Item name="responsavel" label="Responsável" rules={[{ required: true, message: 'Campo obrigatório!'}]}>
                        <Select placeholder="selecione">
                            {
                            usuarios.map(el => {
                                return <Option key={el.id} value={el.name}>{el.name}</Option>
                            })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
    )
}

export default Responsavel;
