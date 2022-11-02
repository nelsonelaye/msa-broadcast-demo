import React, { useState } from "react";
import styled from "styled-components";
import Header from "../Header/Header";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader/Loader";

class Demo extends React.Component {
  state = {
    value: "",
    numbers: [],
    template: "",
    loading: false,
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
        const code = number.slice(0, 3);

        if (code !== "234") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Each number must start with '234' `,
          });
        } else if (number.length !== 11) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: `Each number must be 11 digits `,
          });
        } else {
          this.setState({
            numbers: [...this.state.numbers, number],
            value: "",
          });
        }
      }
    }
  };

  handleDelete = (toBeRemoved) => {
    this.setState({
      numbers: this.state.numbers.filter((number) => number !== toBeRemoved),
    });
  };

  //this function calls the api
  sendBroadcast = async () => {
    // console.log("number", this.state.numbers, "Template", this.state.template);

    const url = `https://api.myserviceagent.net/api/v1/whatsapp`;

    this.setState({ loading: true });
    await axios
      .post(url, {
        msisdns: this.state.numbers[0],
        template: this.state.template,
      })
      .then((res) => {
        this.setState({ loading: false });
        console.log(res);

        //show success pop-up message
        Swal.fire({
          icon: "success",
          title: "Successful",
          text: `${res.data.data} `,
        });

        this.setState({ numbers: [], template: "" });
      })
      .catch((err) => {
        if (err.response) {
          this.setState({ loading: false });
          Swal.fire({
            icon: "error",
            title: "Oops..",
            text: "An error occured. Try again",
          });
          console.log(err);
        }
      });
  };

  render() {
    return (
      <Box>
        {this.state.loading ? <Loader /> : null}
        <Header />
        <h3>Intelligent Broadcast</h3>

        <FormHold>
          <label htmlFor="number">
            Phone Numbers <br />
            <span style={{ color: "#ccc", fontWeight: "400" }}>
              (click Enter, Tab or ',' after each number entry)
            </span>
          </label>
          <HoldInputs>
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
            <input
              placeholder="234XXXXXXXXXX,"
              id="number"
              value={this.state.value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
              style={{ border: "none", margin: 0, padding: "10px 0" }}
            />
          </HoldInputs>

          <label htmlFor="template">Template</label>
          <input
            type="text"
            id="template"
            placeholder="Enter a message template"
            onChange={this.handleMessage}
            style={{ height: "70px" }}
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

  h3 {
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 40px;
  }
`;

const FormHold = styled.div`
  width: 520px;
  padding: 20px;

  @media screen and (max-width: 425px) {
    width: 100%;
  }

  label {
    font-weight: 700;
    margin: 8px 0;
  }

  input {
    width: 100%;
    outline: none;
    border: 1px solid var(--grey);
    border-radius: 5px;
    margin: 10px 0 20px;
    background: var(--bg);
    color: fieldtext;
    font-size: 14px;
    padding: 1rem;
  }
`;

const HoldInputs = styled.div`
  width: 100%;
  outline: none;
  border: 1px solid var(--grey);
  border-radius: 5px;
  margin: 10px 0 20px;
  background: var(--bg);
  color: fieldtext;
  font-size: 14px;
  padding: 1rem;
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
  height: 54px;
  background-color: var(--msa-red);
  border-radius: 6px;
  box-shadow: 0 0 0 0 #eb2931;
  padding: 12px 32px;
  outline: none;
  border: 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
`;
