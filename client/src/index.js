import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserAuthProvider } from "./context/user";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new ApolloClient({
  uri: `http://localhost:5000/graphql`,
  cache: new InMemoryCache(),
});
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <UserAuthProvider>
            <App />
        </UserAuthProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
