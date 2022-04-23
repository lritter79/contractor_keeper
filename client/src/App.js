import React from "react";
import { Layout, Menu } from 'antd';
import Title from "antd/lib/typography/Title";
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import WarrantyForm from "./routes/WarrantyForm/WarrantyForm";
import About from "./routes/About";
import Carousel from "./components/Carousel";
import Faq from "./routes/Faq";
import WarrantyView from "./routes/WarrantyView/WarrantyView";
import useLocalStorage from "../src/customHooks/useLocalStorage";
const { Header, Content, Footer, Sider } = Layout;

const App = () =>{
    const [address, setAddress] = useLocalStorage("contractAddress", null)

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
                                    <img src="writing-sign.svg" className="menuIcon" alt=""></img>
                                    Make A Warranty
                                </Link>
                            </Menu.Item>
                            {address &&
                            <Menu.Item key="view">
                                <Link to={`/warranty/${address}`}>
                                    <img src="writing-sign.svg" className="menuIcon" alt=""></img>
                                    View Your Warranty
                                </Link>
                            </Menu.Item>}
                            <Menu.Item key="about">
                                <Link to="/about">
                                    <img src="info-circle.svg" className="menuIcon" alt=""></img>
                                    About
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="faq">
                                <Link to="/faq">
                                    <img src="question-mark.svg" className="menuIcon" alt="" />
                                    FAQ
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>                   
                    <Layout>     
                        <Content style={{ padding: '0 50px', height:'100%' }}>
                            <Routes>
                                <Route exact path="/" element={<Carousel/>}>
                                </Route>   
                                
                                <Route exact path="/warranty" element={<WarrantyForm/>}>
                                </Route>

                                <Route exact path="/warranty/:address" element={<WarrantyView />}></Route>

     
                                <Route exact path="/about" element={<About/>}>
                                </Route>

                                <Route exact path="/faq" element={<Faq/>}>
                                </Route>

                                <Route path="*" element={
                                    <div>
                                        <h3>404 - Not Found!</h3>
                                        <Link to="/">Go Home</Link>
                                    </div>} />
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