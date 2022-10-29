import React from "react";
import { GridLoader } from "react-spinners";
import styled from "styled-components";
const Loader = () => {
  return (
    <Hold>
      <GridLoader color="#eb2931" />
    </Hold>
  );
};

export default Loader;

const Hold = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;
