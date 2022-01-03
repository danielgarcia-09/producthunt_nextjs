export default function validateSignOn(values) {
    let errors = {};

    //* Validate user's name
    if (!values.name) {
        errors.name = "Must write your name";
    }

    //* Validate user's email
    if (!values.email) {
        errors.email = "Must write your email";
    } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) || !/.com|.es/.test(values.email) ) {
        errors.email = "Email not valid"
    }

     //* Validate user's password
     if (!values.password) {
        errors.password = "Must write your password";
    } else if ( values.password.length < 6 ) {
        errors.password = "Your password must be at least 6 characters long";
    }

    return errors;
}