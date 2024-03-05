import React from "react";
import { Button } from "antd";
import ButtonAuth from "@/components/ButtonAuth";

const HomePage = () => (
  <div className="App">
    <h2>Página de Inicio</h2>
    <Button type="primary">Botón de Ant Design</Button>
    <br />
    <br />
    <ButtonAuth></ButtonAuth>
  </div>
);

export default HomePage;
