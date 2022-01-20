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

const ProductCreator = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  display: inline-block;
  text-align: center;
`;

const Product = () => {
  //* Spinner block
  const Spinner = styled.div`
    margin-top: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  //* Spinner state
  const [loading, setLoading] = useState(true);

  //* Component state
  const [product, setProduct] = useState({});

  //! Error state
  const [error, setError] = useState(false);

  //? Comments state
  const [comment, setComment] = useState({});

  //*  Consult DB state
  const [consultDB, setConsultDB] = useState(true);

  //* Getting value from URL
  const router = useRouter();
  const {
    query: { id },
  } = router;

  //? Firebase context
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    //* To check id isn't undefined
    if (id && consultDB) {
      const getProduct = async () => {
        try {
          const productQuery = await firebase.getProduct(id);

          setProduct(productQuery);
          setConsultDB(false);

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
    } else {
      setError(true);
      setConsultDB(false);
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
    userVotes,
  } = product;

  //* Administrate y validate votes
  const voteProduct = async () => {
    if (!user) {
      return router.push("/login");
    }

    if (userVotes.includes(user.uid)) return;

    //* obtain and add new vote
    const newTotalVotes = votes + 1;

    //* Save user id
    const newUserVotes = [...userVotes, user.uid];

    try {
      //* update in DB
      await firebase.updateVoteProduct(id, { newTotalVotes, newUserVotes });

      //* update state
      setProduct({
        ...product,
        votes: newTotalVotes,
        userVotes: newUserVotes,
      });

      //* there's a new vote, so you have to consult the DB again
      setConsultDB(true);
    } catch (error) {
      console.log(error);
    }
  };

  //* Identify if new comment belongs to the product's creator
  const isCreator = (id) => (creator.id === id ? true : false);

  //* Func to create new comment
  const commentChange = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  //* Func to add new comment to state
  const addComment = async (e) => {
    e.preventDefault();

    if (!user) {
      return router.push("/login");
    }

    if (!comment.message ||comment.message.trim() === "") return;

    //* extra info
    comment.userId = user.uid;
    comment.userName = user.displayName;

    //* add it to comment state
    const newComments = [...comments, comment];

    try {
      //* update DB
      await firebase.addCommentProduct(id, newComments);

      //* update state
      setProduct({
        ...product,
        comments: newComments,
      });

      //* there's a new comment, so you have to consult the DB again
      setConsultDB(true);
    } catch (error) {
      console.log(error);
    }
  };

  //* Func to check if owner can delete project
  const canDeleteProject = () => {
    if (!user) return false;

    if (creator.id === user.uid) {
      return true;
    }
  };

  //! Delete product
  const deleteProduct = async () => {
    if (!user) return router.push("/login");

    if (creator.id !== user.uid) {
      return router.push("/");
    }
    try {
      await firebase.deleteProduct(id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

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

                    <form onSubmit={addComment}>
                      <FormBlock>
                        <input
                          type="text"
                          name="message"
                          onChange={commentChange}
                        />
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
                {comments.length === 0 ? (
                  "No comments"
                ) : (
                  <ul>
                    {comments.map((cmt, i) => (
                      <li
                        key={`${cmt.userId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{cmt.message}</p>
                        <p>
                          Written by:{" "}
                          <span
                            css={css`
                              font-weight: bold;
                            `}
                          >
                            {" "}
                            {cmt.userName}
                          </span>
                        </p>

                        {isCreator(cmt.userId) && (
                          <ProductCreator>Is Owner</ProductCreator>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
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
                    {votes > 9 ? `${votes} Votes` : `${votes} Vote`}
                  </p>

                  {user && <Button onClick={voteProduct}>Vote</Button>}
                </div>
              </aside>
            </ProductContainer>

            {canDeleteProject() && (
              <Button onClick={deleteProduct}>Delete Product</Button>
            )}
          </div>
        )}
      </>
    </Layout>
  );
};

export default Product;
