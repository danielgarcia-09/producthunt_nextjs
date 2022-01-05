import React, { useContext, useState } from "react";
import Layout from "../components/layout/Layout";
import { css } from "@emotion/react";
import { Error, Form, FormBlock, InputSubmit } from "../components/ui/Form";

//* Validate
import useValidate from "../hooks/useValidate";
import validateNewProduct from "../validation/validateNewProduct";

//! Firebase
import firebase, { FirebaseContext } from "../firebase";
import { useRouter } from "next/router";
import Error404 from "./404";

const INITIAL_STATE = {
  name: "",
  company: "",
  url: "",
  description: "",
};

export default function NewProduct() {
  const [error, setError] = useState(false);

  const [image, setImage] = useState(undefined);

  //* Routing hook for redirecting
  const router = useRouter();

  //* Context with Firebase's CRUD methods
  const { user, firebase } = useContext(FirebaseContext);

  const createProduct = async () => {
    //* Checking user auth
    if (!user) {
      return router.push("/login");
    }

    //* Create new product object
    const product = {
      ...values,
      image: image.name,
      votes: 0,
      comments: [],
      createdAt: Date.now(),
      creator: {
        id: user.uid,
        name: user.displayName,
      },
    };

    //* Inserting in DB
    try {
      await firebase.createProduct(product, image);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  //* Extracting validations from hook
  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidate(INITIAL_STATE, validateNewProduct, createProduct);

  //* Extracting values
  const { name, company, url, description } = values;

  return (
    <Layout>
      {/* Verificate if user active */}
      {!user ? (
        <Error404 message={"No se puede mostrar"} />
      ) : (
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            New Product
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend>General Info</legend>

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
                <label htmlFor="company">Company</label>
                <input
                  type={"text"}
                  id="company"
                  placeholder="Company's Name"
                  name="company"
                  value={company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormBlock>

              {errors.company && <Error>{errors.company}</Error>}

              <FormBlock>
                <label htmlFor="image">Company</label>
                <input
                  type={"file"}
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </FormBlock>

              {errors.image && <Error>{errors.image}</Error>}

              <FormBlock>
                <label htmlFor="url">URL</label>
                <input
                  type={"url"}
                  id="url"
                  name="url"
                  value={url}
                  placeholder="Product's URL"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormBlock>

              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>

            <fieldset>
              <legend>About Product</legend>

              <FormBlock>
                <label htmlFor="description">Description</label>
                <textarea
                  type={"text"}
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormBlock>

              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>

            {error && <Error>{error}</Error>}

            <InputSubmit type={"submit"} value={"Create Product"} />
          </Form>
        </>
      )}
    </Layout>
  );
}
