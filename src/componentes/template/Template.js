import React from 'react';
import './template.css'

import {
  Routes,
  Route,
  Link
} from 'react-router-dom';

import { useState } from 'react';

import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  LineChartOutlined,
  TeamOutlined,
  HomeOutlined,
  SolutionOutlined
} from '@ant-design/icons';

import Metricas from '../../paginas/metricas/Metricas';
import Ativos from '../../paginas/ativos/Ativos';
import Usuarios from '../../paginas/usuarios/Usuarios';
import Unidades from '../../paginas/unidades/Unidades';
import Empresas from '../../paginas/empresas/Empresas';
import Erro404 from '../../paginas/erro404/Erro404';
import Ativo from '../../paginas/ativos/ativo/Ativo';

const { Header, Sider, Content } = Layout;

function Template() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout>

      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

          <Menu.Item key="1" icon={<SettingOutlined />}>
            <Link to="/">Métricas</Link>
          </Menu.Item>
        
          <Menu.Item key="2" icon={<LineChartOutlined />}>
            <Link to="/ativos">Ativos</Link>
          </Menu.Item>
        
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link to="/usuarios">Usuários</Link>
          </Menu.Item>
        
          <Menu.Item key="4" icon={<HomeOutlined />}>
            <Link to="/unidades">Unidades</Link>
          </Menu.Item>
        
          <Menu.Item key="5" icon={<SolutionOutlined />}>
            <Link to="/empresas">Empresas</Link>
          </Menu.Item>

        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>

        <Content className="site-layout-background conteudo">
          <Routes>
            <Route path="/" element={<Metricas />} />
            <Route path="/ativos" element={<Ativos />} />
            <Route path="/ativos/:id" element={<Ativo />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/unidades" element={<Unidades />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="*" element={<Erro404 />} />
          </Routes>
        </Content>

      </Layout>
    </Layout>
  );
}

export default Template;