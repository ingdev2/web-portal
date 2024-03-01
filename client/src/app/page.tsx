import React from "react";
import { Button } from "antd";
import ButtonAuth from "@/components/ButtonAuth";

const Home = () => (
  <div className="App">
    <Button type="primary">Botón de Ant Design</Button>
    <br />
    <ButtonAuth></ButtonAuth>
  </div>
);

export default Home;
