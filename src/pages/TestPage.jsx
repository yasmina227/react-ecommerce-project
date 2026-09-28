import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart,removeFromCart } from "../features/cart/CartSlice";
const TestPage = () => {

    const cart = useSelector((state) => state.cart)
    
    
    const dispatch = useDispatch()

  const [count,setCount] =useState(0); 
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  
  useEffect(()=>{
    setCount(cart.cartItems.length);
  },[cart.cartItems])


 const fetchedData = async () => {
      try {
        const response = await axios.get("/data.json");
        setData(response.data.products); 
      } catch (e) {
        console.log(e);
        setError("fail in loading data");
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
   fetchedData()

  }, []);


  if (loading) return <p>loading....</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="">
        <Link to="/cart">cart</Link>
        <span className="h5">{count}</span>
        <div className="d-flex">
        
      {data?.map((item) => {
          
          const isInCart = cart.cartItems?.some((product) => product.id === item.id);

          return (
            <div className="card" style={{ width: "18rem" }} key={item.id}>
              <img src={item.thumbnail} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">{item.description}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{item.price}</li>
                <li className="list-group-item">{item.category}</li>
                <li className="list-group-item">{item.rating}</li>
              </ul>
              <div className="card-body">
                {isInCart ? (
                  <button
                    className="btn text-danger border"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    remove from cart
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    add to cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
    </div>
    
  );
 
  
};

export default TestPage;