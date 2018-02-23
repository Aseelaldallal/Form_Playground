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
    signUpForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          email: true
        },
        validationErrors: [],
        touched: false
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
          label: 'Select Institution'
        },
        value: '',
        validation: {
          required: true
        },
        validationErrors: [],
        touched: false
      },
      bio: {
        elementType: 'textarea',
        elementConfig: {
          placeholder: 'Bio: Tell us something intersting about yourself!'
        },
        value: '',
        validation: {
          required: true,
          minLength: 50,
          maxLength: 300
        },
        validationErrors: [],
        touched: false
      },
      facebook: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Facebook'
        },
        value: '',
        validation: {},
        validationErrors: [],
        touched: false
      }
    },
    formIsValid: false
  };

  // This method transforms the signUpForm object in state into an actual form with jsx
  renderFormElements = () => {
    return Object.entries(this.state.signUpForm).map(element => {
      let elementIdentifier = element[0]; // FullName, Email, Password
      let elementFields = element[1]; // The fields in each identifier object
      return (
        <Input
          key={elementIdentifier}
          elementType={elementFields.elementType}
          elementConfig={elementFields.elementConfig}
          value={elementFields.value}
          touched={elementFields.touched}
          //   changed={event => this.inputChangedHandler(event, elementIdentifier)}
          //   blurred={event => this.inputBlurredHandler(event, elementIdentifier)}
          validationErrors={elementFields.validationErrors}
        />
      );
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <h3> Sign Up </h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderFormElements()}
          <button disabled={!this.state.signUpForm.formIsValid}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
