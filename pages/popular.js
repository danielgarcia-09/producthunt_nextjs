import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

const Popular = () => {

  //* Custom hook
  const { products, loading, Spinner, BounceLoader } = useProducts('votes');

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

export default Popular;
