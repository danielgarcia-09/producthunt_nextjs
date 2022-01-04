import { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import ProductDetails from "../components/layout/ProductDetails";
import { FirebaseContext } from "../firebase";

const Home = () => {

  const { firebase } = useContext(FirebaseContext);

  const [ products, setProducts ] = useState([]);

  useEffect(()=>{
    const getProducts = async () => {
      const snapshot = await firebase.getProducts();
      const data = snapshot.docs.map( doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
      setProducts(data);
    }
    getProducts();
  }, []);

  return (
    <div>
      <Layout>
        <div className="list-products">
          <div className="container">
            <ul className="bg-white">
              { products.map( product => (
                <ProductDetails
                  key={product.id}
                  product={product}
                />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  )
}
 
export default Home;