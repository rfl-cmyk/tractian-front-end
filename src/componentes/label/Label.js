import { Badge } from 'antd';
import './label.css'

import { tradStatus } from '../../utilitarios/traducoes/traducoes';

const Label = props => {
    return <Badge.Ribbon text={tradStatus(props.status).est} color={tradStatus(props.status).cor} />
}

export default Label;