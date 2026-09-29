import React from 'react';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import {  useSelector } from 'react-redux';
const CartPage = () => {
    const cart =useSelector((state)=>state.cart);
    return (
        <div className="container pt-5" >
            
         <div className="row ">
            <div className="border rounded p-1 m-3 col-md shadow-sm " style={{height:"70vh",overflowY:"scroll"}}>
              <h3 className="" style={{marginLeft:"1.5rem"}}>My Products</h3>
              {
                cart.cartItems.length?
                
                cart.cartItems.map((item)=>
                    <CartItem key={item.id} item={item}/>
                )
              :
              <div className="" >
                <img src="https://th.bing.com/th/id/R.1757c162a6c410257ff60acefd40da9d?rik=CkJZ5Byy6hzjIA&pid=ImgRaw&r=0" alt="emptycard" className="" width="90%"  />
              </div>
              }
            </div>
            <div className="col-md" >
                <OrderSummary/>
                </div>
            
        </div>
       </div>
       
    );
};

export default CartPage;