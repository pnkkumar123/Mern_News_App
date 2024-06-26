import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../services/UserSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { newsApi, cryptonewsApi, forexNewsApi } from "../services/NewsSlice";
import { ArticleApi } from "../services/ArticleSlice";

// Combine reducers from both stores
const rootReducer = combineReducers({
  user: userSlice,
[ArticleApi.reducerPath]:ArticleApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [cryptonewsApi.reducerPath]: cryptonewsApi.reducer,
  [forexNewsApi.reducerPath]: forexNewsApi.reducer,
});

// Configure redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Merge middleware from both stores
const store = configureStore({
  reducer: persistedReducer,
  [ArticleApi.reducerPath]:ArticleApi.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      newsApi.middleware,
      ArticleApi.middleware,
      cryptonewsApi.middleware,
      forexNewsApi.middleware
    ),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export const {useGetArticleQuery} = ArticleApi

export default store;