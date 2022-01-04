import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import { FirebaseContext } from "../../firebase";
import Error404 from "../404";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BounceLoader } from "react-spinners";

const ProductContainer = styled.div`
    @media( min-width: 768px ) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    } 
`;

const Product = () => {
  //* Component state
  const [product, setProduct] = useState({});

  //! Error state
  const [error, setError] = useState(false);

  //* Getting value from URL
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //? Firebase context
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    //* To check id isn't undefined
    if (id) {
      const getProduct = async () => {
        try {
          const productQuery = await firebase.getProduct(id);
            setProduct(productQuery);
            //* Stopping spinner
            setLoading(false);
        } catch (error) {
          setError(true);
        }
      };
      getProduct();
    }
  }, [id]);

  //* Extracting values from product
  const {
    comments,
    createdAt,
    description,
    name,
    company,
    url,
    urlImage,
    votes,
  } = product;

  //* Spinner block
  const Spinner = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  //* Spinner state
  const [loading, setLoading] = useState(true);

  //* Spinner if
  const spin = Object.keys(product).length === 0;

  return (
    <Layout>
      <>
        {error && <Error404 />}

        {spin && (
          <Spinner>
            <BounceLoader loading={loading} size={100} />
          </Spinner>
        )}

        <div className="container">
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >{name}</h1>


          <ProductContainer>
              <div>
                    11
              </div>

              <aside>
                    2
              </aside>
          </ProductContainer>
        </div>
      </>
    </Layout>
  );
};

export default Product;
