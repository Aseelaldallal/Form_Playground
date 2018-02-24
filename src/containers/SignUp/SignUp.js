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
      //   fullName: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'text',
      //       placeholder: 'Harry Potter',
      //       label: 'Full Name'
      //     },
      //     value: '',
      //     validation: {
      //       required: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Please enter your full name.'
      //   },
      //   username: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'text',
      //       placeholder: 'harry_762',
      //       label: 'Username'
      //     },
      //     value: '',
      //     validation: {
      //       required: true,
      //       username: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Please enter a username with no white spaces.'
      //   },
      //   email: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'text',
      //       placeholder: 'harrypotter@gmail.com',
      //       label: 'Email Address'
      //     },
      //     value: '',
      //     validation: {
      //       required: true,
      //       email: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Please enter a valid email address'
      //   },
      //   password: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'password',
      //       placeholder: 'Pick a secure password',
      //       label: 'Password'
      //     },
      //     value: '',
      //     validation: {
      //       required: true,
      //       password: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage:
      //       'Your password must be at least 8 characters long and contain no white spaces'
      //   },
      //   major: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'text',
      //       placeholder: 'What are you studying?',
      //       label: 'Major'
      //     },
      //     value: '',
      //     validation: {
      //       required: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Please enter your major.'
      //   },
      //   academicYear: {
      //     elementType: 'select',
      //     elementConfig: {
      //       options: [
      //         { displayName: 1, value: 1 },
      //         { displayName: 2, value: 2 },
      //         { displayName: 3, value: 3 },
      //         { displayName: 4, value: 4 },
      //         { displayName: 5, value: 5 },
      //         { displayName: 6, value: 6 }
      //       ],
      //       label: 'Academic Year',
      //       defaultSelect: 'Select'
      //     },
      //     value: '',
      //     validation: {
      //       required: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Please select your academic year'
      //   },
      //   institution: {
      //     elementType: 'select',
      //     elementConfig: {
      //       options: [
      //         {
      //           displayName: 'University of Waterloo',
      //           value: 'University of Waterloo'
      //         },
      //         {
      //           displayName: 'University of Toronto',
      //           value: 'University of Toronto'
      //         }
      //       ],
      //       label: 'Institution Name',
      //       defaultSelect: 'Select'
      //     },
      //     value: '',
      //     validation: {
      //       required: true
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Please select your institution'
      //   },
      //   bio: {
      //     elementType: 'textarea',
      //     elementConfig: {
      //       placeholder: 'Bio: Tell us something intersting about yourself!',
      //       label: 'Bio'
      //     },
      //     value: '',
      //     validation: {
      //       required: true,
      //       minLength: 100,
      //       maxLength: 400
      //     },
      //     valid: false,
      //     touched: false,
      //     validationMessage: 'Your bio must be between 100-400 characters'
      //   },
      //   facebook: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'text',
      //       placeholder: 'https://www.facebook.com/harrypotter',
      //       label: 'Facebook'
      //     },
      //     value: '',
      //     validation: {
      //       url: true
      //     },
      //     valid: true,
      //     touched: false,
      //     validationMessage: 'Please enter a valid url'
      //   },
      //   instagram: {
      //     elementType: 'input',
      //     elementConfig: {
      //       type: 'text',
      //       placeholder: 'https://www.instagram.com/harrypotter/',
      //       label: 'Instagram'
      //     },
      //     value: '',
      //     validation: {
      //       url: true
      //     },
      //     valid: true,
      //     touched: false,
      //     validationMessage: 'Please enter a valid url'
      //   },
      linkedIn: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'https://www.linkedin.com/in/harrypotter/',
          label: 'LinkedIn'
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
      file: '',
      error: ''
    }
  };

  // This method shows userInput on screen, validates it, and updates state.formIsValid accordingly
  inputHandler = (event, fieldName) => {
    let field = this.state.form[fieldName];
    if (!field.validation.required && event.target.value === '') {
      this.updateField(
        { value: event.target.value, valid: true, touched: false },
        fieldName,
        this.updateFormIsValidState
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
    // Ensure there is an uploaded image
    if (this.state.imageData.file === '') {
      formIsValid = false;
    } else {
      for (let field in this.state.form) {
        formIsValid = this.state.form[field].valid && formIsValid;
      }
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
          changed={event => this.inputHandler(event, fieldName)}
          blurred={event => this.inputHandler(event, fieldName)}
          validationMsg={fieldProperties.validationMessage}
        />
      );
    });
  };

  // Submit form: Create User
  handleSubmit = event => {
    console.log('Submit!');
    event.preventDefault();
    console.log('Submit 1!');
  };

  // Updates state.imageData with incoming parameters
  updateImageField = (imgURL, file, error) => {
    let updatedImageData = updateObject(this.state.imageData, {
      imgURL: imgURL,
      file: file,
      error: error
    });
    this.setState(
      {
        imageData: updatedImageData
      },
      this.updateFormIsValidState
    );
  };

  // Displays image on screen, saves associated file in state
  displayAndSaveImage = file => {
    let reader = new FileReader();
    reader.onloadend = () => {
      this.updateImageField(reader.result, file, '');
    };
    reader.readAsDataURL(file);
  };

  // If user's uploaded file is not an image, or exceeds 500kb, returns an error. Otherwise,
  // displays the uploaded image to the user and stores the file in state
  handleImageChange = e => {
    e.preventDefault();
    let file = e.target.files[0];
    var imageType = /^image\//;
    if (!imageType.test(file.type)) {
      this.updateImageField('', '', 'Invalid File Type. Must upload an image');
    } else if (file.size > 500000) {
      this.updateImageField(
        '',
        '',
        'File too large. Maximum upload size: 500KB.'
      );
    } else {
      this.displayAndSaveImage(file);
    }
  };

  render() {
    return (
      <div className="container">
        <form>
          {this.renderFormElements()}
          <ImageUpload
            label="Upload A Photo"
            changed={e => this.handleImageChange(e)}
            imgURL={this.state.imageData.imgURL}
            error={this.state.imageData.error}
          />
          <button
            disabled={!this.state.formIsValid}
            onClick={this.handleSubmit}
          >
            SIGN UP
          </button>
        </form>
      </div>
    );
  }
}

export default SignUp;
