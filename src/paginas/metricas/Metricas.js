import { Divider} from 'antd';

import { GlobalContext } from '../../contexts/Global.Context';
import { useContext } from 'react';
import Spinner from '../../componentes/spinner/Spinner';

import { GraficoCylinder, GraficoCircle } from './graficos/Graficos'
import './metricas.css'

function Metricas() {

    const { ativos, unidades } = useContext(GlobalContext);

    var emOperacao = ativos.filter(el => el.status === "inOperation");
    var emAlerta = ativos.filter(el => el.status === "inAlert");
    var emParada = ativos.filter(el => el.status === "inDowntime");

    var acima75 = ativos.filter(el => el.healthscore >= 75);
    var acima50 = ativos.filter(el => el.healthscore >= 50 && el.healthscore < 75);
    var abaixo50 = ativos.filter(el => el.healthscore < 50);

    var motor = ativos.filter(el => el.model === "motor");

    var unidade1 = ativos.filter(el => el.unitId === 1);

    const transUnit = unitId => {
        var [ unidade ] = unidades.filter(el => el.id === unitId);
        if(unidade) var nomeUnidade = unidade.name;
    
        return nomeUnidade
    }

    return(
        <>
            {
            !ativos ?
            <Spinner /> :
            <div className="metricas">
                <div className="metrica__box">
                    <div>
                        <Divider plain>Situação dos Ativos</Divider>
                        <GraficoCylinder id="situacao" cor1="green" cor2="yellow" cor3="red" valor1={emOperacao.length} valor2={emAlerta.length} valor3={emParada.length} categoria1="Em Operação" categoria2="Em Alerta" categoria3="Em Parada" />
                    </div>
                </div>
                <div className="metrica__box">
                    <div>
                        <Divider plain>Modelos dos Ativos</Divider>
                        <GraficoCircle id="modelos" cor1="#ecab11" cor2="#624b14" nome1="Motor" nome2="Ventilador" valor1={motor.length} total={ativos.length} />
                    </div>
                </div>
                <div className="metrica__box">
                    <div>
                        <Divider plain>Ativos por Unidade</Divider>
                        <GraficoCircle id="unidades" cor1="#1890ff" cor2="#434348" nome1={transUnit(1)} nome2={transUnit(2)} valor1={unidade1.length} total={ativos.length} />
                    </div>
                </div>
                <div className="metrica__box">
                    <div>
                        <Divider plain>Saúde dos Ativos</Divider>
                        <GraficoCylinder id="saude" cor1="#37f237" cor2="#0cac0c" cor3="green" valor1={acima75.length} valor2={acima50.length} valor3={abaixo50.length} categoria1="Acima de 75%" categoria2="Acima de 50%" categoria3="Abaixo de 50%" />
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Metricas;