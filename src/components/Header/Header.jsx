import React from 'react';
import {Link} from 'react-router-dom';
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export const Header = ({isAuth, login, logout}) => {

    const {Header} = Layout

    return (
        <Header className='header'>
            <Row>
                <Col span={18}>
                    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
                        <Menu.Item key='1'><Link to='/developers'>Developers</Link></Menu.Item>
                    </Menu>
                </Col>

                {isAuth
                    ? <>
                        <Col span={1}>
                            <Avatar alt={login || ''} style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                        </Col>
                        <Col span={5}>
                            <Button onClick={logout}>Log out</Button>
                        </Col>
                    </>
                    : <Col span={6}>
                        <Button>
                            <Link to={'/login'}>Login</Link>
                        </Button>
                    </Col>
                }
            </Row>
        </Header>
    )
}