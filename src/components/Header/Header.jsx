import React from "react";
import styled from "styled-components";
import logo from "../../logo.svg";

const Header = () => {
  return (
    <Box>
      <img src={logo} alt="logo" style={{ width: "70px" }} />
    </Box>
  );
};

export default Header;

const Box = styled.div`
  padding: 10px 20px;
  width: 100%;
`;
