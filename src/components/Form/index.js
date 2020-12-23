import React, {useState, useEffect} from 'react'; 
import './index.css';

export default function Form() {
    const [name, setName]=useState('');//useState Hook for Name field
    const [email, setEmail]=useState('');//useState Hook for e-mail field
    const [successfullAuthorized, setSuccessfullAuthorized]=useState('');//useState Hook for "successfully authorized" text <p> field
    const [validationErrorName, setValidationErrorName]=useState('');//useState Hook for "invalid name" text <p> field
    const [validationErrorEmail, setValidationErrorEmail]=useState('');//useState Hook for "invalid e-mail" text <p> field
    const [sendingAjax, setSendingAjax]=useState('');//useState Hook for "sending the data to server" text <p> field

    const ValidateForm = () => {
        //Function for validating the form fields - name and e-mail
        //Validating the name field
        if( name.length<4 && name!=='' ) {
            setValidationErrorName(1);
        }
        else {
            setValidationErrorName('');
        }

        //Validating the e-mail field
        if ( /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email) || email === '' ) {
            setValidationErrorEmail('');
        }
        else {
            setValidationErrorEmail(1);
        }
    }

    useEffect(() => {//Here we are validating the form and, if successfully authorized, sending data to server
        if ( !sendingAjax ) {
            ValidateForm();
            if ( successfullAuthorized ) {
                AjaxSendUserData();
                setSendingAjax(1);
            }
        }

        return () => {
            // 
            ValidateForm();
          };
    }, [sendingAjax, ValidateForm, successfullAuthorized])

    const handleChangeName = (e) => {//Function for onChange of name input
        setName(e.target.value);
    }

    const handleChangeEmail = (e) => {//Function for onChange of name input
        setEmail(e.target.value);
    }

    const submitForm = (e) => {//Function for onSubmit of our Form
        e.preventDefault();
        if ( !validationErrorName && !validationErrorEmail && name!=='' && email!=='' ) {
            /*Here we proccess successfull authorization if the fields are not empty
            and if the useStates hooks for validation errors of name and e-mail fields are false
            (So, it means that the inputes values passed the validations)*/
            setSuccessfullAuthorized(1);
        }
    }

    const AjaxSendUserData = () => {
        //Function for sending the data of form to API, and, of course, it will not really send data to any API, but it will try        
        fetch("https://api.site.com/send_form_data", {
            method: "POST",
            body: new FormData()
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('Successfully sent data to API')
                console.log(result)
            },
            (error) => {
                console.log('Error with sending data to API')
                console.log(error)
            }
        );
    }    

    return (
        <div className="FormDiv">
            {!successfullAuthorized && <form id="TestTaskForm" className="Form" onSubmit={submitForm}>
                <div className="FormElementDiv">
                    {validationErrorName && <p className="InvalidField">Invalid name. Try longer Name (More than 3 symbols)</p>}
                    <input className="FormInput" id="name" type="text" placeholder="Type your name" onChange={handleChangeName}></input>
                </div>
                <div className="FormElementDiv">
                    {validationErrorEmail && <p className="InvalidField">Invalid email. Try in format example@example.com</p>}
                    <input className="FormInput" id ="e-mail" type="text" placeholder="Type your email" onChange={handleChangeEmail}></input>
                </div>
                <div className="FormElementDiv">
                    <button className="FormSubmit">Submit</button>
                    {(validationErrorName || validationErrorEmail) && <p className="InvalidFieldSubmit">Fill in the fields correctly</p>}
                </div>
            </form>}
            <div className="SuccessfullAuth">
                {successfullAuthorized && <p className="SuccessfullAuthP" >Successfully authorized</p>}
                {sendingAjax && <p className="SendingDataP" >Sending the data to server</p>}
            </div>
        </div>
    );
}