import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Error, Form, FormBlock, InputSubmit } from "../components/ui/Form";

//* Validate
import useValidate from "../hooks/useValidate";
import validateLogin from "../validation/validateLogin";

//! Firebase
import firebase from "../firebase";
import { useRouter } from "next/router";

const INITIAL_STATE = {
  email: "",
  password: ""
};

const Login = () => {

  const [error, setError] = useState(false);
  const router = useRouter();

  const LogIn = async () => {
    try {
      
      await firebase.login(email, password);
      router.push("/");

    } catch (error) {
      console.error(
        "There was an error while logging in ",
        error.message
      );
      setError(error.message);
    }
  };

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidate(INITIAL_STATE, validateLogin, LogIn);

  //* Extracting values
  const { email, password } = values;

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Login
        </h1>
        <Form onSubmit={handleSubmit} noValidate>
          <FormBlock>
            <label htmlFor="email">Email</label>
            <input
              type={"email"}
              id="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormBlock>

          {errors.email && <Error>{errors.email}</Error>}

          <FormBlock>
            <label htmlFor="password">Password</label>
            <input
              type={"password"}
              id="password"
              placeholder="Your Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormBlock>

          {errors.password && <Error>{errors.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type={"submit"} value={"Login"} />
        </Form>
      </>
    </Layout>
  );
};

export default Login;
