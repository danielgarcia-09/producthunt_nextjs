import styled from "@emotion/styled";
import { useContext, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import { FirebaseContext } from "../firebase";

const Home = () => {
  const { firebase } = useContext(FirebaseContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const snapshot = await firebase.getProducts();
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

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            {loading && (
              <Spinner>
                <BounceLoader loading={loading} size={150} />
              </Spinner>
            )}

            <ul className="bg-white">
              {!loading &&
                products.map((product) => (
                  <ProductDetails key={product.id} product={product} />
                ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
