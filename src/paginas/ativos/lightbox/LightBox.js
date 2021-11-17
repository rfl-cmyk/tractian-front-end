import { useState, useContext } from 'react';
import { Modal, message, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import Api from '../../../servicos/Api';
import { tradModel, tradStatus } from '../../../utilitarios/traducoes/traducoes'

import { GlobalContext } from '../../../contexts/Global.Context';

function LightBox(props) {

    const [isModalVisible, setIsModalVisible] = useState(true);
    const { ativos, setAtivos, unidades, empresas } = useContext(GlobalContext);
    const [form] = Form.useForm();
    const { Option } = Select;

    const onOk = (values) => {

        // ----- state
        let novoAtivos = ativos;
        var [ ativo ] = novoAtivos.filter(el => el.id === props.data.id);

        let nome
        values.nome ? nome = values.nome : nome = ativo.name;

        let sensor
        values.sensor ? sensor = values.sensor : sensor = ativo.sensors;

        let modelo
        values.modelo ? modelo = values.modelo : modelo = ativo.model;

        let estado
        values.estado ? estado = values.estado : estado = ativo.status;

        let saude
        values.saude ? saude = values.saude : saude = ativo.healthscore;

        let power
        values.power ? power = values.power : power = ativo.specifications.power;

        let temperatura
        values.temperatura ? temperatura = values.temperatura : temperatura = ativo.specifications.maxTemp;

        let rpm
        values.rpm ? rpm = values.rpm : rpm = ativo.specifications.rpm;

        let tempoDeColeta
        values.tempoDeColeta ? tempoDeColeta = values.tempoDeColeta : tempoDeColeta = ativo.metrics.totalCollectsUptime;

        let unidade
        values.unidade ? unidade = values.unidade : unidade = props.data.unitId;

        let empresa
        values.empresa ? empresa = values.empresa : empresa = props.data.companyId;

        let tempoTotal
        values.tempoTotal ? tempoTotal = values.tempoTotal : tempoTotal = ativo.metrics.totalUptime;

        let ultimaColeta
        values.ultimaColeta ? ultimaColeta = values.ultimaColeta : ultimaColeta = ativo.metrics.lastUptimeAt;

        ativo = {
            id: ativo.id,
            sensors: [ sensor ],
            model: modelo,
            status: estado,
            healthscore: saude,
            name: nome,
            image: ativo.image,
            specifications: { power: power, maxTemp: temperatura, rpm: rpm },
            metrics: { totalCollectsUptime: tempoDeColeta, totalUptime: tempoTotal, lastUptimeAt: ultimaColeta },
            unitId: unidade,
            companyId: empresa
        }
  
        const indice = novoAtivos.indexOf(props.data)
        novoAtivos.splice(indice, 1, ativo)
        setAtivos([...novoAtivos]);

        setIsModalVisible(false);
        props.resetModal();
        message.success('Item editado!');

        // ----- API
        Api.put(`/users/${props.data.id}`, ativo)
    }

    const onCancel = () => {
        setIsModalVisible(false);
        props.resetModal();
        message.error('Ação cancelada!');
    };

    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

    return(
        <Modal title={props.data.name} visible={isModalVisible} onOk={form.submit} onCancel={onCancel}>
            <Form form={form} onFinish={onOk}>
                <Row justify="space-between">
                    <Col span={24}>
                    <Form.Item name="nome" label="Nome">
                        <Input placeholder={props.data.name} />
                    </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="sensor" label="Sensor">
                            <Input placeholder={props.data.sensors} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="modelo" label="Modelo">
                            <Select placeholder={tradModel(props.data.model)}>
                                <Option value="motor">Motor</Option>
                                <Option value="fan">Ventilador</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="estado" label="Estado">
                            <Select placeholder={tradStatus(props.data.status).est}>
                                <Option value="inDowntime">Em Parada</Option>
                                <Option value="inOperation">Em Operação</Option>
                                <Option value="inAlert">Em Alerta</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="saude" label="Saúde">
                            <Input placeholder={props.data.healthscore} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="power" label="Poder">
                            <Input placeholder={props.data.specifications.power} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="temperatura" label="Temperatura Max.">
                            <Input placeholder={props.data.specifications.maxTemp} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="rpm" label="RPM">
                            <Input placeholder={props.data.specifications.rpm} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="tempoDeColeta" label="Tempo de Coleta">
                            <Input placeholder={props.data.metrics.totalCollectsUptime} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="unidade" label="Unidade">
                            <Select placeholder={props.transUnit(props.data.unitId)}>
                                {
                                unidades.map(el => {
                                    return <Option key={el.id} value={el.id}>{el.name}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="empresa" label="Empresa">
                            <Select placeholder={props.transCompany(props.data.companyId)}>
                                {
                                empresas.map(el => {
                                    return <Option key={el.id} value={el.id}>{el.name}</Option>
                                })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="tempoTotal" label="Total de Coleta">
                            <Input placeholder={props.data.metrics.totalUptime} />
                        </Form.Item>
                    </Col>
                    <Col span={11}>
                        <Form.Item name="ultimaColeta" label="Última Coleta">
                            <DatePicker format={dateFormatList} placeholder="Data" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default LightBox;
