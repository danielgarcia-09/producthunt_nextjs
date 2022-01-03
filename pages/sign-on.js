import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Error, Form, FormBlock, InputSubmit } from "../components/ui/Form";

//* Validate
import useValidate from "../hooks/useValidate";
import validateSignOn from "../validation/validateSignOn";

//! Firebase
import firebase from "../firebase";
import { useRouter } from "next/router";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const SignOn = () => {

  const [ error, setError ] = useState(false)
  const router = useRouter();

  const createAccount = async () => {
    try {
      await firebase.register(name, email, password);

      
      router.push('/');

    } catch (error) {
      console.error('There was an error while creating the user ', error.message);
      setError(error.message);
    }
  };

  const { values, errors, handleChange, handleSubmit, handleBlur } =  useValidate(INITIAL_STATE, validateSignOn, createAccount);

  //* Extracting values
  const { name, email, password } = values;

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-top: 5rem;
          `}
        >
          Create Account
        </h1>
        <Form
          onSubmit={handleSubmit}
          noValidate
        >
          <FormBlock>
            <label htmlFor="name">Name</label>
            <input
              type={"text"}
              id="name"
              placeholder="Your Name"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormBlock>

          {errors.name && <Error>{errors.name}</Error>}

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

          { error && <Error>{error}</Error>}

          <InputSubmit type={"submit"} value={"Create Account"} />
        </Form>
      </>
    </Layout>
  );
};

export default SignOn;
