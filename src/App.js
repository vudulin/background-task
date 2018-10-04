import React, { Component } from "react";
import { FormErrors } from "./FormErrors";
import "./style.css";

const testColorInputPattern = /^#[0-9A-F]{6}$/i;

export default class App extends Component {
  state = {
    inputColorFrom: "",
    inputColorTo: "",
    background: "linear-gradient(to bottom right, #e9e960, #2b9de9)",
    formValid: false,
    inputColorToValid: false,
    inputColorFromValid: false,
    formErrors: 
    { 
      inputColorFrom: "", 
      inputColorTo: "" 
    }
  }
  
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = `#${e.target.value}`;
    this.setState({
      [name]: value
    }, 
      () => { 
        this.validateField(name, value) 
      }
    );
  }

  handleClickGradient = (e) => {
    e.preventDefault();
    const inputColorFrom = this.state.inputColorFrom;
    const inputColorTo = this.state.inputColorTo;

    this.setState({
      background: `linear-gradient(to top left, ${inputColorFrom}, ${inputColorTo})`
    });
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let inputColorToValid = this.state.inputColorToValid;
    let inputColorFromValid = this.state.inputColorFromValid;

    switch(fieldName) {
      case "inputColorFrom":
        inputColorFromValid = testColorInputPattern.test(value);
        fieldValidationErrors.inputColorFrom = inputColorFromValid ? "" : " is incorrect";
        break;
      case "inputColorTo":
        inputColorToValid = testColorInputPattern.test(value);
        fieldValidationErrors.inputColorTo = inputColorToValid ? "" : " is incorrect";
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      inputColorFromValid,
      inputColorToValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.inputColorToValid && this.state.inputColorFromValid});

  }

  render() {
    return (
      <div className="wrapper" style={{ background: this.state.background}}>
        <h1 >Gradient Color Background</h1>
        <div className="error-validation">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <form className="form">
          <label>
            FROM
            <input 
              className="input"
              type="text" name="inputColorFrom" 
              placeholder="e9e960"
              onChange={this.handleUserInput} 
            />
          </label>
          <label>
            <input 
              className="input"
              type="text" name="inputColorTo" 
              placeholder="2b9de9"
              onChange={this.handleUserInput} 
            />
            TO
          </label>
          </form>
          <button 
            className={`input button ${this.state.formValid ? "" : "button-invalid"}`} 
            disabled={!this.state.formValid}
            onClick={this.handleClickGradient} 
          >
            GO
          </button>
      </div>
    );
  }
}
