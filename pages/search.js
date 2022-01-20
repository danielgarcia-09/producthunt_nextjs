import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

//* Spinner block
const Spinner = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: inherit;
`;

const Search = () => {
  const router = useRouter();
  const {
    query: { s },
  } = router;

  //* All products
  const { products } = useProducts();
  const [result, setResult] = useState([]);
  //* Spinner state
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true);
    const search = s.toLowerCase();

    const filter = products.filter((p) => {
      return (
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      );
    });
    setTimeout(()=>{
        setLoading(false);
        setResult(filter);
    }, 3000);
  }, [s, products]);
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
                result.map((product) => (
                  <ProductDetails key={product.id} product={product} />
                ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Search;
