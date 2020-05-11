import React from "react";
import classes from "./CreateEventForm.module.css";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

const CreateEventForm = (props) => {
  return (
    <div className={classes.CreateEventForm}>
      <form onSubmit={props.onSubmit}>
        <label>
          Name:
          <Input
            name="name"
            id="name"
            type="text"
            onChange={props.onChange}
            value={props.values.name}
          />
        </label>
        <label>
          Description:
          <Input
            name="description"
            id="description"
            type="text"
            onChange={props.onChange}
            value={props.values.description}
          />
        </label>
        <label>
          Picture:
          <Input
            name="picture"
            id="picture"
            type="text"
            onChange={props.onChange}
            value={props.values.picture}
          />
        </label>
        <br />
        <label>
          Start date:
          <Input
            name="startDate"
            id="startDate"
            type="datetime-local"
            onChange={props.onChange}
            value={props.values.startDate}
          />
        </label>
        <label>
          End Date:
          <Input
            name="endDate"
            id="endDate"
            type="datetime-local"
            onChange={props.onChange}
            value={props.values.endDate}
          />
        </label>
        <Button type="submit">Create Event</Button>
      </form>
    </div>
  );
};

export default CreateEventForm;
