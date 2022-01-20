import styled from "@emotion/styled";
import { BounceLoader } from "react-spinners";
import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const useProducts = (order) => {
  //* Spinner block
  const Spinner = styled.div`
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: inherit;
  `;

  //* Spinner state
  const [loading, setLoading] = useState(true);

  const { firebase } = useContext(FirebaseContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const snapshot = await firebase.getProducts(order);
      const data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(data);

      //* Stop loading after 3 sec
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    getProducts();
  }, []);

  return {
    products,
    loading,
    Spinner,
    BounceLoader
  };
};

export default useProducts;
