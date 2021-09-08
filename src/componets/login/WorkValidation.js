const workValidation = (values) => {
  let errors = {};

  //   name
  if (!values.name) {
    errors.name = "name is required";
  }

  if (!values.mob) {
    errors.mob = "mobile is required";
  } else if (values.mob.trim().length < 10) {
    errors.mob = "enter valid mobile";
  }

  if (!values.service) {
    errors.service = "service is required";
  }
  if (!values.price) {
    errors.price = "price is required";
  }

  return errors;
};
export default workValidation;
