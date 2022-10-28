import { render } from "@testing-library/react";
import React from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import axios from "axios";

class Demo extends React.Component {
  state = {
    value: "",
    numbers: [],
    template: "",
  };

  handleChange = (evt) => {
    this.setState({
      value: evt.target.value,
    });
    // console.log(this.state.value);
  };

  handleMessage = (evt) => {
    this.setState({
      template: evt.target.value,
    });
  };

  handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      var number = this.state.value.trim();

      if (number) {
        this.setState({
          numbers: [...this.state.numbers, number],
          value: "",
        });
      }
    }
  };

  handleDelete = (toBeRemoved) => {
    this.setState({
      numbers: this.state.numbers.filter((number) => number !== toBeRemoved),
    });
  };

  sendBroadcast = async () => {
    console.log("number", this.state.numbers, "Template", this.state.template);
    const url = `https://api.myserviceagent.net/api/v1/whatsapp`;
    const json = JSON.stringify({
      msisdns: this.state.numbers[0],
      template: this.state.template,
    });
    await axios
      .post(url, {
        msisdns: this.state.numbers[0],
        template: this.state.template,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <Box>
        <Header />
        <h1>Send WhatsApp Broadcast</h1>

        <FormHold>
          <div style={{ width: "100%" }}>
            {this.state.numbers.map((number) => (
              <Num key={number}>
                {number}
                <button
                  type="button"
                  onClick={() => this.handleDelete(number)}
                  style={{ background: "none", border: 0, outline: "none" }}
                >
                  &times;
                </button>
              </Num>
            ))}
          </div>
          <input
            placeholder="234XXXXXXXXXX...`Enter`"
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <textarea
            placeholder="Enter your broadcast message here"
            onChange={this.handleMessage}
          />

          <Btn onClick={this.sendBroadcast}>Send</Btn>
        </FormHold>
      </Box>
    );
  }
}

export default Demo;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-family: poppins;
    font-weight: 800;
  }
`;

const FormHold = styled.div`
  width: 350px;

  @media screen and (max-width: 425px) {
    width: 90%;
  }
  input {
    width: 100%;
    outline: none;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    padding: 0 10px;
    height: 40px;
    margin: 10px 0;
  }

  textarea {
    width: 100%;
    outline: none;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    margin: 10px 0;
    min-height: 80px;
    padding: 10px;
  }
`;

const Num = styled.div`
  background-color: #f8f8ff;
  display: inline-block;
  font-size: 13px;
  color: grey;
  border-radius: 10px;
  padding: 5px;
  text-align: center;
  margin: 5px;
`;

const Btn = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  outline: none;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;
