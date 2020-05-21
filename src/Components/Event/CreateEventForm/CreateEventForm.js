import React from "react";
import classes from "./CreateEventForm.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const CreateEventForm = (props) => {
  const formElementsArray = [];
  for (let key in props.values.eventForm) {
    formElementsArray.push({
      id: key,
      config: props.values.eventForm[key],
    });
  }
  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
      changed={(event) => props.changed(event, formElement.id)}
    />
  ));

  return (
    <form className={classes.CreateEventForm} onSubmit={props.onSubmitEvent}>
      {form}
      <Button btnType="Success">CREATE</Button>
    </form>
  );
};

export default CreateEventForm;
