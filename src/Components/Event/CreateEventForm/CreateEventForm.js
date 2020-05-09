import React from "react";

CreateEventForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <label>
          Name:
          <input
            name="name"
            id="name"
            type="text"
            onChange={props.onChange}
            value={props.values.name}
          />
        </label>
        <label>
          Description:
          <input
            name="description"
            id="description"
            type="text"
            onChange={props.onChange}
            value={props.values.description}
          ></input>
        </label>
        <label>
          Picture:
          <input
            name="picture"
            id="picture"
            type="text"
            onChange={props.onChange}
            value={props.values.picture}
          ></input>
        </label>
        <br />
        <label>
          Start date:
          <input
            name="startDate"
            id="startDate"
            input
            type="datetime-local"
            onChange={props.onChange}
            value={props.values.startDate}
          ></input>
        </label>
        <label>
          End Date:
          <input
            name="endDate"
            id="endDate"
            input
            type="datetime-local"
            onChange={props.onChange}
            value={props.values.endDate}
          ></input>
        </label>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEventForm;
