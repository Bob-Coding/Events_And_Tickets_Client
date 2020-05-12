import React, { Component } from "react";
import { connect } from "react-redux";

import { checkValidity } from "../../../Components/CheckValidity/CheckVadility";
import * as actions from "../../store/actions/index";
import Event from "../../Components/Event/Event";
import CreateEventForm from "../../Components/Event/CreateEventForm/CreateEventForm";
import Spinner from "../../Components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import classes from "./Events.module.css";

class Events extends Component {
  state = {
    eventForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      desciption: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Description",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      picture: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "URL Picture",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      startDate: {
        elementType: "input",
        elementConfig: {
          type: "datetime-local",
          placeholder: "BeginDate",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      endDate: {
        elementType: "input",
        elementConfig: {
          type: "datetime-local",
          placeholder: "EndDate",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      formIsValid: false,
    },
  };
  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Event Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (eventForm, token) =>
      dispatch(this.props.onCreateEvent(eventForm, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Events, axios));
