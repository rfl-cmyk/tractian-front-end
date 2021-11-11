import './erro404.css'

import { useNavigate } from 'react-router-dom';

function Erro404() {

    var navigate = useNavigate();

    const redireciona = () => {
        navigate("/");
    }

    setTimeout(redireciona, 4000);

    return(
        <div className="erro404">
            <div className="erro404__conteudo">
                <h1>ERRO 404!</h1>
                <h3>Ops <strong>página não encontrada</strong>,
                <br/>
                você será redirecionado..</h3>
                <div className="erro404__img404" />
            </div>
        </div>
    )
}

export default Erro404;