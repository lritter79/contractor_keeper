import React from "react";
import { Layout, Menu } from 'antd';
import Title from "antd/lib/typography/Title";
import './App.css'
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import WarrantyForm from "./routes/WarrantyForm/WarrantyForm";
import About from "./routes/About";
import Carousel from "./components/Carousel";
import Faq from "./routes/Faq";
import WarrantyView from "./routes/WarrantyView/WarrantyView";
import useLocalStorage from "../src/customHooks/useLocalStorage";
import getWeb3 from "../src/eth/web3";

const { Header, Content, Footer, Sider } = Layout;


const App = () =>{
    const [address, setAddress] = useLocalStorage("contractAddress", null)
    const navigate = useNavigate();

    async function connect() {
        if (await getWeb3()) await window.ethereum.request({method:"eth_requestAccounts"});
        else navigate('/norpc');
    }
    return (
        <>
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
                            <Menu.Item key="connect">
                                <p onClick={()=> connect()}>Connect To Web3 Provider</p>
                            </Menu.Item>
                            <Menu.Item key="warranty">
                                <Link to="/warranty">
                                    <img src="writing-sign.svg" className="menuIcon" alt=""></img>
                                    Make A Warranty
                                </Link>
                            </Menu.Item>
                            {address &&
                            <Menu.Item key="view">
                                <Link to='/view'>
                                    <img src="file.svg" className="menuIcon" alt=""></img>
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
                                <Route exact path="/" element={<div><Carousel/></div>}>
                                </Route>   
                                
                                <Route exact path="/warranty" element={<WarrantyForm/>}>
                                </Route>

                                <Route exact path="/view" element={<WarrantyView />}></Route>

     
                                <Route exact path="/about" element={<About/>}>
                                </Route>

                                <Route exact path="/faq" element={<Faq/>}>
                                </Route>
                                <Route exact path="/norpc" element={<div><p>Uh oh you dont have a web3 RPC provider</p></div>}></Route>

                                <Route path="*" element={
                                    <div>
                                        <h3>404 - Not Found!</h3>
                                        <Link to="/">Go Home</Link>
                                    </div>} />
                                </Routes>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            Made With <span style={{color: 'red'}}>❤</span> By Levon Ritter
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        </>
    )
}

export default App