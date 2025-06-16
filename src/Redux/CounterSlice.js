import { createSlice } from "@reduxjs/toolkit";

let counterSlice = createSlice({
  name: "Count",
  initialState: {
    count: 0,
    username: "",
  },
  reducers: {
    increase: (state, action) => {
    state.count += action.payload;
    },
    decrease: (state, action) => {
      state.count -= action.payload;
    },
  },
});

// CounterReducer = counterSlice.reducer
// : <دة يعود على اى على البيانات نفسها >
// اى بينات بظبط : الاجابة دى
//  initialState: {
//   count: 0,
//   username: "",
//   },
export let initialStateDataCount = counterSlice.reducer;

// { increase, decrease } = counterSlice.actions
// : <دة يعود على الفنكشن الى عايز استخدمها عشان ااثر على البيانات الى عندى >
//  طب اهنى فنكشن بظبط ؟ : الاجابة ال reducers : increase و decrease
export let { increase, decrease } = counterSlice.actions;

// مثال فى استخدام البيانات دى فى كمبونان
// import { useDispatch, useSelector } from "react-redux";
// import { decrease, increase } from "../../Redux/CounterSlice";
// const Products = () => {
//   let Dispatch = useDispatch();
//   const { count } = useSelector(({ Counter }) => Counter);
//   return (
//     <div>
//       <h1>Products</h1>
//       <button onClick={() => Dispatch(increase(1))}>+ زود</button>
//       {count}
//       <button onClick={() =>  Dispatch(decrease(1))}>- ناقص</button>
//     </div>
//   );
// };
// export default Products;
