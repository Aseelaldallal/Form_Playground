// React
import React, { Component } from 'react';
// Components and Containers
import Input from '../../components/UI/Input/Input';
import ImageUpload from '../../components/UI/ImageUpload/ImageUpload';
//Utility
import { updateObject, checkValidity } from '../../utility/utility';
// Styles
import './styles.css';

class SignUp extends Component {
  state = {
    form: {
      fullName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Harry Potter',
          label: 'Full Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter your full name.'
      },
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'harry_762',
          label: 'Username'
        },
        value: '',
        validation: {
          required: true,
          username: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter a username with no white spaces.'
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'harrypotter@gmail.com',
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Pick a secure password',
          label: 'Password'
        },
        value: '',
        validation: {
          required: true,
          password: true
        },
        valid: false,
        touched: false,
        validationMessage:
          'Your password must be at least 8 characters long and contain no white spaces'
      },
      major: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'What are you studying?',
          label: 'Major'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please enter your major.'
      },
      academicYear: {
        elementType: 'select',
        elementConfig: {
          options: [
            { displayName: 1, value: 1 },
            { displayName: 2, value: 2 },
            { displayName: 3, value: 3 },
            { displayName: 4, value: 4 },
            { displayName: 5, value: 5 },
            { displayName: 6, value: 6 }
          ],
          label: 'Academic Year',
          defaultSelect: 'Select'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: 'Please select your academic year'
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
        validationMessage: 'Your bio must be between 100-400 characters'
      },
      facebook: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'https://www.facebook.com/harrypotter',
          label: 'Facebook'
        },
        value: '',
        validation: {
          url: true
        },
        valid: true,
        touched: false,
        validationMessage: 'Please enter a valid url'
      }
    },
    formIsValid: false,
    imageData: {
      url: '',
      file: ''
    }
  };

  // This method shows userInput on screen, validates it, and updates state.formIsValid accordingly
  inputChangedHandler = (event, fieldName) => {
    this.updateFormFieldAndValidate(
      event.target.value,
      fieldName,
      this.updateFormIsValidState
    );
  };

  // This method shows userInput on screen, validates it, and updates state.formIsValid accordingly
  inputBlurredHandler = (event, fieldName) => {
    let field = this.state.form[fieldName];
    // If field isn't required, and it's empty, don't validate
    if (!field.validation.required && event.target.value === '') {
      this.updateField(
        { value: event.target.value, valid: false, touched: false },
        fieldName
      );
    } else {
      this.updateFormFieldAndValidate(
        event.target.value,
        fieldName,
        this.updateFormIsValidState
      );
    }
  };

  //This method updates the form.fieldName with updates
  updateField = (updates, fieldName, callback) => {
    const updatedField = updateObject(this.state.form[fieldName], updates);
    const updatedForm = updateObject(this.state.form, {
      [fieldName]: updatedField
    });
    this.setState({ form: updatedForm }, callback);
  };

  // This method updates the form stored in state. It sets the value of fieldName to userInput, checks
  // the validity of userInput, and updates fieldName's valid status to the result of this validation check.
  // After updating the state, it calls callback
  updateFormFieldAndValidate = (userInput, fieldName, callback) => {
    let form = this.state.form;
    let field = form[fieldName];
    const isValid = checkValidity(userInput.trim(), field.validation); // Check if user input is valid
    this.updateField(
      { value: userInput, valid: isValid, touched: true },
      fieldName,
      callback
    );
  };

  //   Goes through each form field and checks that it is valid. If all are valid, sets state.formIsValid to true.
  //   False otherwise.
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
          blurred={event => this.inputBlurredHandler(event, fieldName)}
          validationMsg={fieldProperties.validationMessage}
        />
      );
    });
  };

  // Submit form: Create User
  handleSubmit = event => {
    event.preventDefault();
    console.log('Submit!');
  };

  handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      let updatedImageData = updateObject(this.state.imageData, {
        imgURL: reader.result,
        file: file
      });
      this.setState({
        imageData: updatedImageData
      });
    };
    reader.readAsDataURL(file);
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.renderFormElements()}
          <ImageUpload
            changed={e => this.handleImageChange(e)}
            imgURL={this.state.imageData.imgURL}
          />
          <button disabled={!this.state.formIsValid}>SIGN UP</button>
        </form>
      </div>
    );
  }
}

export default SignUp;
