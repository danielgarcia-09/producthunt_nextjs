import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import { FormBlock, InputSubmit } from "../../components/ui/Form";
import Button from "../../components/ui/Button";
import { FirebaseContext } from "../../firebase";
import Error404 from "../404";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { BounceLoader } from "react-spinners";
import { formatDistanceToNow } from "date-fns";

const ProductContainer = styled.div`
  @media (min-width: 768px) {
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
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    //* To check id isn't undefined
    if (id) {
      const getProduct = async () => {
        try {
          const productQuery = await firebase.getProduct(id);
          setProduct(productQuery);

          //* Stopping spinner 3 secs after getting product
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } catch (error) {
          setError(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
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
    creator,
  } = product;

  //* Spinner block
  const Spinner = styled.div`
    margin-top: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  //* Spinner state
  const [loading, setLoading] = useState(true);

  return (
    <Layout>
      <>
        {loading && (
          <Spinner>
            <BounceLoader loading={loading} size={150} />
          </Spinner>
        )}

        {error && !loading && <Error404 />}

        {!error && !loading && (
          <div className="container">
            <h1
              css={css`
                text-align: center;
                margin-top: 5rem;
              `}
            >
              {name}
            </h1>

            <ProductContainer>
              <div>
                <p>Published {formatDistanceToNow(createdAt, "es")} ago</p>

                <p>
                  By: {creator.name} from {company}
                </p>

                <img src={urlImage} />

                <p>{description}</p>

                {user && (
                  <>
                    <h2>Add your comment</h2>

                    <form>
                      <FormBlock>
                        <input type="text" name="message" />
                      </FormBlock>

                      <InputSubmit type="submit" value="Add Comment" />
                    </form>
                  </>
                )}

                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comments
                </h2>

                {comments.map((comment) => {
                  <li>
                    <p>{comment.name}</p>
                    <p>Written by: {comment.userName}</p>
                  </li>;
                })}
              </div>

              <aside>
                <Button target={"_blank"} bgColor href={url}>
                  Visit Page
                </Button>

                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votes} Votes
                  </p>

                  { user && (
                    <Button>Vote</Button>
                  )}
                </div>
              </aside>
            </ProductContainer>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Product;
