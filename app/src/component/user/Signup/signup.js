import React from "react";
import { Form, Field } from "react-final-form";
import { useDispatch } from "react-redux";
import { registerAction } from "../../../Redux/action/registerAction";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    dispatch(registerAction(values));

    navigate("/signin");
  };

  const validates = (values) => {
    const errors = {};
    // if (!values.username) {
    //   errors.username = "Required";
    // }
    // if (!values.email) {
    //   errors.email = "Required";
    // }
    if (!values.password) {
      errors.password = "Required";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Required";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "must match";
    }
    return errors;
  };

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };

  return (
    <div className="container signin_main">
      <Row>
        <Col md={2}></Col>
        <Col md={8} className="main_page">
          <Row>
            <Col md={6} className="signup">
              <div className="left_content">
                <h2>Looks Like You're new here!</h2>
                <p>sign up with your mobile number to get started</p>
                <img
                  src="https://freepngimg.com/thumb/categories/1342.png"
                  alt=""
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="right_content">
                <Form
                  onSubmit={onSubmit}
                  validate={validates}
                  initialValues={initialValues}
                  render={({
                    handleSubmit,
                    form,
                    submitting,
                    pristine,
                    values,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Field name="username">
                        {({ input, meta }) => (
                          <div className="mb-4">
                            {/* <label>Your name</label> */}
                            <input
                              className="login_input"
                              {...input}
                              type="text"
                              placeholder="First and last name"
                            />
                            {meta.error && meta.touched && (
                              <p className="star">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="email">
                        {({ input, meta }) => (
                          <div className="mb-4">
                            {/* <label>Email</label> */}
                            <input
                              className="login_input"
                              {...input}
                              type="email"
                              placeholder="Email"
                            />
                            {meta.error && meta.touched && (
                              <p className="star">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="password">
                        {({ input, meta }) => (
                          <div className="mb-4">
                            {/* <label>Password</label> */}
                            <input
                              className="login_input"
                              {...input}
                              type="password"
                              placeholder="Password"
                            />
                            {meta.error && meta.touched && (
                              <p className="star">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>
                      <Field name="confirmpassword">
                        {({ input, meta }) => (
                          <div className="mb-4">
                            {/* <label>Confirm</label> */}
                            <input
                              className="login_input"
                              {...input}
                              type="password"
                              placeholder="Confirm Password"
                            />
                            {meta.error && meta.touched && (
                              <p className="star">{meta.error}</p>
                            )}
                          </div>
                        )}
                      </Field>
                      <div className="button_div">
                        <button className="des-but" type="submit">Submit</button>
                        <Link className="reset_button" to="/signin">
                          Already have an Account
                        </Link>
                      </div>
                    </form>
                  )}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
