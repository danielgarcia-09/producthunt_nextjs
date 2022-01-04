export default function validateNewProduct(values) {
    let errors = {};

    //* Validate product's name
    if( !values.name ) {
        errors.name = "Must have a name";
    }

    //* Validate product's company
    if( !values.company ) {
        errors.company = "Must have a company";
    }

    //* Validate product's url
    if( !values.url ) {
        errors.url = "Must have an url";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "Not valid url";
    }

    //* Validate product's description
    if( !values.description ) {
        errors.description = "Add a description";
    }

    return errors;
}