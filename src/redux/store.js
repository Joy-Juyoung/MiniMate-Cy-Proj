import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import categorySlice from "./categorySlice";
import userSlice from "./userSlice";
import itemSlice from "./itemSlice";
import cartSlice from "./cartSlice";
import friendSlice from "./friendSlice";
import historySlice from "./historySlice";
import miniHomeSlice from "./miniHomeSlice";
import miniItemSlice from "./miniItemSlice";
import miniCommentSlice from "./miniCommentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userSlice,
    categories: categorySlice,
    item: itemSlice,
    cart: cartSlice,
    friend: friendSlice,
    history: historySlice,
    miniHome: miniHomeSlice,
    miniItem: miniItemSlice,
    miniComment: miniCommentSlice,
  },
});
