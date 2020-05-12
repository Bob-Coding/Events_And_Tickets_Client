import React from "react";
import classes from "./CreateEventForm.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const CreateEventForm = (props) => {
  return (
    <div className={classes.CreateEventForm}>
      <form onSubmit={props.onSubmit}>
        <label>
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Your Name"
            onChange={props.onChange}
            value={props.values.name}
          />
          <Input
            name="description"
            id="description"
            type="text"
            onChange={props.onChange}
            value={props.values.description}
          />
          <Input
            name="picture"
            id="picture"
            type="text"
            onChange={props.onChange}
            value={props.values.picture}
          />
          <Input
            name="startDate"
            id="startDate"
            type="datetime-local"
            onChange={props.onChange}
            value={props.values.startDate}
          />
          <Input
            name="endDate"
            id="endDate"
            type="datetime-local"
            onChange={props.onChange}
            value={props.values.endDate}
          />
        </label>
        <Button btnType="Success" type="submit">
          CREATE EVENT
        </Button>
      </form>
    </div>
  );
};

export default CreateEventForm;
