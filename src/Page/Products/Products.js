import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase } from "../../Redux/CounterSlice";

const Products = () => {
  // Redux
  let Dispatch = useDispatch();
  const { count } = useSelector(({ Counter }) => Counter);

  return (
    <div>
      <h1>Products</h1>
      <button onClick={() => Dispatch(increase(1))}>+ زود</button>
      {count}
      <button onClick={() => Dispatch(decrease(1))}>- ناقص</button>
    </div>
  );
};

export default Products;
