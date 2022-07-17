import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserAuthProvider } from "./context/user";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new ApolloClient({
  uri: `/graphql`,
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
