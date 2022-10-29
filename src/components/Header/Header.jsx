import React from "react";
import styled from "styled-components";
// import logo from "../../logo.svg";

const Header = () => {
  return (
    <Box>
      <img
        src="/assets/msa-logo.svg"
        alt="my-service-agent-logo"
        style={{ width: "165px" }}
      />
    </Box>
  );
};

export default Header;

const Box = styled.div`
  padding: 20px 30px;
  width: 100%;
`;
