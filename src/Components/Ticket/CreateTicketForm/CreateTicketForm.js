import React from "react";
import classes from "./CreateTicketForm.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const CreateTicketForm = (props) => {
  const formElementsArray = [];
  for (let key in props.values.ticketForm) {
    formElementsArray.push({
      id: key,
      config: props.values.ticketForm[key],
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
    <form className={classes.CreateTicketForm} onSubmit={props.onSubmitTicket}>
      {form}
      <Button btnType="Success">CREATE</Button>
    </form>
  );
};

export default CreateTicketForm;
