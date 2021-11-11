import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './spinner.css';

const Spinner = () => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return(
    <div className="spinner">
      <Spin indicator={antIcon} />
    </div>
  )
}

export default Spinner;