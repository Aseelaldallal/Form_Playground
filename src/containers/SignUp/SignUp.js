// React
import React, { Component } from 'react';
// Components and Containers
import Input from '../../components/Input/Input';
//Utility
import { updateObject, checkValidity } from '../../utility/utility';
// Styles
import './styles.css';

class SignUp extends Component {
  state = {
    form: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email Address',
          label: 'Email Address'
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter a valid email address'
      },
      institution: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              displayName: 'University of Waterloo',
              value: 'University of Waterloo'
            },
            {
              displayName: 'University of Toronto',
              value: 'University of Toronto'
            }
          ],
          label: 'Institution Name',
          defaultSelect: 'Select'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please select your institution'
      },
      bio: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Bio: Tell us something intersting about yourself!',
          label: 'Bio'
        },
        value: '',
        validation: {
          required: true,
          minLength: 100,
          maxLength: 400
        },
        valid: false,
        touched: false,
        validationMessage: 'Your bio must be between 100-400 characters.'
      }
    },
    formIsValid: false
  };

  // This method shows userInput on screen, validates it, and updates state.formIsValid accordingly
  inputChangedHandler = (event, fieldName) => {
    this.updateFormField(event.target.value, fieldName);
    this.updateFormIsValidState();
  };

  // This method updates the form stored in state. It sets the value of fieldName to userInput, checks
  // the validity of userInput, and updates fieldName's valid status to the result of this validation check
  updateFormField = (userInput, fieldName) => {
    let form = this.state.form;
    let field = form[fieldName];
    const isValid = checkValidity(userInput, field.validation); // Check if user input is valid
    const updatedField = updateObject(field, {
      value: userInput,
      valid: isValid,
      touched: true // To show errors accordingly
    });
    const updatedForm = updateObject(form, { [fieldName]: updatedField });
    this.setState({ form: updatedForm });
  };

  // Goes through each form field and checks that it is valid. If all are valid, sets state.formIsValid to true.
  // False otherwise.
  updateFormIsValidState = () => {
    let formIsValid = true;
    for (let field in this.state.form) {
      formIsValid = this.state.form[field].valid && formIsValid;
    }
    this.setState({ formIsValid: formIsValid });
  };

  renderFormElements = () => {
    return Object.entries(this.state.form).map(field => {
      let fieldName = field[0];
      let fieldProperties = field[1];
      return (
        <Input
          key={fieldName}
          elementType={fieldProperties.elementType}
          elementConfig={fieldProperties.elementConfig}
          value={fieldProperties.value}
          invalid={!fieldProperties.valid}
          shouldValidate={fieldProperties.validation}
          touched={fieldProperties.touched}
          changed={event => this.inputChangedHandler(event, fieldName)}
          //   onClick={event => this.inputClickedHandler(event, fieldName)}
          validationMsg={fieldProperties.validationMessage}
        />
      );
    });
  };

  render() {
    let form = (
      <form>
        {this.renderFormElements()}
        <button disabled={!this.state.formIsValid}>SIGN UP</button>
      </form>
    );

    return <div className="container">{form}</div>;
  }
}

export default SignUp;
