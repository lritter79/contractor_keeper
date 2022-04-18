import React from "react";
import { Layout, Menu } from 'antd';
import Title from "antd/lib/typography/Title";
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import WarrantyScreen from "./routes/WarrantyScreen/WarrantyScreen";
import About from "./routes/About";
import Carousel from "./components/Carousel";
const { Header, Content, Footer, Sider } = Layout;

const App = () =>{
    return (
        <Router>
            <Layout style={{minHeight:'100vh'}}>        
                <Header mode="horizontal">
                    <Link to="/">
                        <Title style={{color:'white'}} level={3}>Contractor Keeper</Title>                   
                    </Link>
                </Header>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                    >
                        <Menu mode="vertical">
                            <Menu.Item key="warranty">
                                <Link to="/warranty">
                                    Make A Warranty
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="about">
                                <Link to="/about">
                                    About
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>                   
                    <Layout>     
                        <Content style={{ padding: '0 50px', height:'100%' }}>
                            <Routes>
                                <Route path="/" element={<Carousel/>}>
                                </Route>   
                                
                                <Route path="/warranty" element={<WarrantyScreen/>}>
                                </Route>
     
                                <Route path="/about" element={<About/>}>
                                </Route>

                            </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Made With <span style={{color: 'rgb(255, 255, 255)'}}>❤</span> By Levon Ritter
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    )
}

export default App