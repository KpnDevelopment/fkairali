const Validation = (values) => {
  let errors = {};
  // name
  if (!values.name) {
    errors.name = "name is required";
  }
  // email
  if (!values.email) {
    errors.email = "email is required";
  } else if (!/\S+@\S+.\S+/.test(values.email)) {
    errors.email = "Enter Valid Email";
  }
  // password

  if (!values.password) {
    errors.password = "password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password Must be More Then 6 Characters";
  }

  //   password 2
  if (values.password2 !== values.password) {
    errors.password2 = "Two password must be same";
  }

  return errors;
};

export default Validation;
