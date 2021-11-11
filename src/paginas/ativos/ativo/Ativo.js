import { useContext } from 'react';
import { tradStatus, tradModel } from '../../../utilitarios/traducoes/traducoes';
import { GlobalContext } from '../../../contexts/Global.Context';
import { useParams, useNavigate } from 'react-router-dom';

import './ativo.css';

const Ativo = () => {

    const { id } = useParams();
    const idInt = parseInt(id);
    const { ativos } = useContext(GlobalContext);
    var navigate = useNavigate();

    var [ ativo ] = ativos.filter(el => el.id === idInt);

    return(
        <>
        {
        !ativo ?
        navigate("*") :
        <div className="ativo">
            <div className="ativo__img" style={{backgroundImage: `url("${ativo.image}")`}}></div>
            <div>
                <ul>
                    <li>{tradStatus(ativo.status).est}</li>
                    {ativo.sensors ? <li>{ativo.sensors}</li> : null}
                    {ativo.model ? <li>{tradModel(ativo.model)}</li> : null}
                </ul>
            </div>
            <div>
                {ativo.name ? <p>{ativo.name}</p> : null}
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
            <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
            </div>
        </div>
        }
        </>
    )
};

export default Ativo;