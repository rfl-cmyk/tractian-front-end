import { useContext, useState } from 'react';
import { tradStatus, tradModel } from '../../../utilitarios/traducoes/traducoes';
import { GlobalContext } from '../../../contexts/Global.Context';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Breadcrumb, Divider, Button } from 'antd';
import moment from 'moment';
import 'moment/locale/pt-br'
import Responsavel from '../responsavel/Responsavel';
import { GraficoTemp, GraficoSaude, GraficoMetricas } from './graficos/Graficos';

import './ativo.css';

const Ativo = () => {

    const { id } = useParams();
    const idInt = parseInt(id);
    const { ativos, unidades, empresas } = useContext(GlobalContext);
    var navigate = useNavigate();
    const [ modalData, setModalData ] = useState();
    var [ oAtivo ] = ativos.filter(el => el.id === idInt)
    var [ ativo, setAtivo ] = useState(oAtivo);
    
    const atualizaResponsavel = responsavel => {
        var novoAtivo = { ...ativo, responsavel}
        return setAtivo(novoAtivo)
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
        !ativo ?
        navigate("*") :
        <>
            <Breadcrumb separator=">">
                <Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/ativos">Ativos</Link></Breadcrumb.Item>
                <Breadcrumb.Item>{ativo.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="ativo">
                <div className="ativo__img" style={{backgroundImage: `url("${ativo.image}")`}}></div>
                <div className="ativo__box">
                    <div>
                        <Divider plain>Informações</Divider>
                        <ul>
                            <li>Nome: <span>{ativo.name}</span></li>
                            <li>Estado: <span style={{backgroundColor: `${tradStatus(ativo.status).cor}`, color: 'white'}}>&nbsp;{tradStatus(ativo.status).est}&nbsp;</span></li>
                            {ativo.model ? <li>Modelo: <span>{tradModel(ativo.model)}</span></li> : null}
                            {ativo.sensors ? <li>Sensor: <span>{ativo.sensors}</span></li> : null}
                            {ativo.unitId ? <li>Unidade: <span>{transUnit(ativo.unitId)}</span></li> : null}
                            {ativo.companyId ? <li>Empresa: <span>{transCompany(ativo.companyId)}</span></li> : null}
                        </ul>
                        <Button type="primary" onClick={() => setModalData(ativo)}>Delegar Responsável</Button>
                        {ativo.responsavel ?
                        <p className="responsavel">responsável: <strong>{ativo.responsavel}</strong></p>
                        : null}
                    </div>
                </div>
                {ativo.specifications.maxTemp ?
                <div className="ativo__box">
                    <div>
                        <Divider plain>Temperatura Máxima</Divider>
                            <GraficoTemp temperatura={ativo.specifications.maxTemp} />
                    </div>
                </div>
                : null }
                {ativo.healthscore ?
                <div className="ativo__box">
                    <div>
                        <Divider plain>Saúde do Ativo</Divider>
                        <GraficoSaude saude={ativo.healthscore} />
                    </div>
                </div>
                : null }
                <div className="ativo__box">
                    <div>
                        <Divider plain>Métricas</Divider>
                        {ativo.metrics.lastUptimeAt ?
                        <p>- Última coleta: <span>{moment(ativo.metrics.lastUptimeAt).locale('pt-br').format('DD [de] MMMM [de] YYYY [às] HH:mm:ss')}</span></p>
                        : null }
                        {/*{ativo.metrics.totalCollectsUptime ?
                        <p>Total de Horas Coletadas: {ativo.metrics.totalCollectsUptime}hs</p>
                        : null }
                        {ativo.metrics.totalUptime ?
                        <p>Total de Tempo Trabalhado: {ativo.metrics.totalUptime}hs</p>
                        : null }*/}
                        <GraficoMetricas totalHoras={ativo.metrics.totalCollectsUptime} totalTempo={ativo.metrics.totalUptime}/>
                    </div>
                </div>
            </div>
        </>
        }

        {
        modalData ?
        <Responsavel ativo={ativo} resetModal={resetModal} data={modalData} atualizaResponsavel={atualizaResponsavel} />
        : null
        }
        </>
    )
};

export default Ativo;