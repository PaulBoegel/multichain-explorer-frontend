import "./App.css";

import ExplorerInitializer from "./components/ExplorerInitializer";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const { SERVERPORT } = process.env;
const serviceUrl = `http://localhost:${SERVERPORT}/graphql`;

//Initializing Apollo Client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: serviceUrl,
  }),
  credentials: "same-origin",
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ApolloProvider client={client}>
          <ExplorerInitializer serviceUrl={serviceUrl} />
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;
