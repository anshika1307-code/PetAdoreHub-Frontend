import React from "react";
import Layout from "./../components/Layout/Layout";
import { useFav } from "../context/fav";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
const FavPage = () => {
  const [auth, setAuth] = useAuth();
  const [fav, setFav] = useFav();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      fav?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeFavItem = (pid) => {
    try {
      let myFav = [...fav];
      let index = myFav.findIndex((item) => item._id === pid);
      myFav.splice(index, 1);
      setFav(myFav);
      localStorage.setItem("fav", JSON.stringify(myFav));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {fav?.length
                ? `You Have ${fav.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : " Your Cart Is Empty"}
            </h4>
          </div>
        </div>
        <div>
          <div>
            {fav?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Breed : {p.breed}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFavItem(p._id)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn btn-warning mx-5"
                    
                  >
                    Enquiry
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default FavPage;