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
    // Define the signup form
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

  inputChangedHandler = (event, inputIdentifier) => {
    console.log('Input changed handler: ', inputIdentifier);
    const updatedFormElement = updateObject(this.state.form[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.form[inputIdentifier].validation
      ),
      touched: true
    });
    console.log('updated form element: ', updatedFormElement);
    const updatedForm = updateObject(this.state.form, {
      [inputIdentifier]: updatedFormElement
    });
    console.log('updated form:', updatedForm);
    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({
      form: updatedForm,
      formIsValid: formIsValid
    });
  };

  renderFormElements = () => {
    return Object.entries(this.state.form).map(element => {
      return (
        <Input
          key={element[0]}
          elementType={element[1].elementType}
          elementConfig={element[1].elementConfig}
          value={element[1].value}
          invalid={!element[1].valid}
          shouldValidate={element[1].validation}
          touched={element[1].touched}
          changed={event => this.inputChangedHandler(event, element[0])}
          validationMsg={element[1].validationMessage}
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
