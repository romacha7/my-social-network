import React, {Component} from 'react';
import './App.css';
import {HashRouter, Link, Redirect, Route, Switch, withRouter} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./components/hoc/withSuspense";
import {Breadcrumb, Layout, Menu} from "antd";
import 'antd/dist/antd.css';
import {LaptopOutlined, UserOutlined} from '@ant-design/icons';
import HeaderContainer from "./components/Header/HeaderContainer";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"));

class App extends Component {

    catchAllUnhandledErrors = (reason, promise) => {
        alert(`Some error occurred`);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <Layout>
                <HeaderContainer/>
                <Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{height: '100%'}}
                            >
                                <SubMenu key="sub1" icon={<UserOutlined/>} title="My profile">
                                    <Menu.Item key="1"> <Link to="/profile">Profile</Link></Menu.Item>
                                    <Menu.Item key="2"><Link to="/dialogs">Messages</Link></Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Developers">
                                    <Menu.Item key="5"> <Link to="/developers">Developers</Link></Menu.Item>
                                    {/*<Menu.Item key="6">option6</Menu.Item>*/}
                                    {/*<Menu.Item key="7">option7</Menu.Item>*/}
                                    {/*<Menu.Item key="8">option8</Menu.Item>*/}
                                </SubMenu>
                                {/*<SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">*/}
                                {/*    <Menu.Item key="9">option9</Menu.Item>*/}
                                {/*    <Menu.Item key="10">option10</Menu.Item>*/}
                                {/*    <Menu.Item key="11">option11</Menu.Item>*/}
                                {/*    <Menu.Item key="12">option12</Menu.Item>*/}
                                {/*</SubMenu>*/}
                            </Menu>
                        </Sider>
                        <Content style={{padding: '0 24px', minHeight: 280}}>
                            <Switch>
                                <Route exact path='/'
                                       render={() => <Redirect to={'/profile'}/>}/>

                                <Route path='/dialogs'
                                       render={withSuspense(DialogsContainer)}/>

                                <Route path='/profile/:userId?'
                                       render={() => <ProfileContainer/>}/>

                                <Route path='/developers'
                                       render={withSuspense(UsersContainer)}/>


                                <Route path='/login'
                                       render={() => <Login/>}/>

                                <Route path='*'
                                       render={() => <div>404 NOT FOUND </div>}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}> A small social network </Footer>
            </Layout>

            // <div className='app-wrapper'>
            //     <HeaderContainer/>
            //     <Navbar/>
            //     <div className='app-wrapper-content'>
            //         <Switch>
            //             <Route exact path='/'
            //                    render={() => <Redirect to={'/profile'}/>}/>
            //
            //             <Route path='/dialogs'
            //                    render={withSuspense(DialogsContainer)}/>
            //
            //             <Route path='/profile/:userId?'
            //                    render={() => <ProfileContainer/>}/>
            //
            //             <Route path='/users'
            //                    render={withSuspense(UsersContainer)}/>
            //
            //
            //             <Route path='/login'
            //                    render={() => <Login/>}/>
            //
            //             <Route path='*'
            //                    render={() => <div>404 NOT FOUND </div>}/>
            //         </Switch>
            //     </div>
            // </div>

        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props) => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </HashRouter>
    )
}
export default MainApp;