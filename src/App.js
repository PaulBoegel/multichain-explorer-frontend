import "./App.css";
import Explorer from "./components/Explorer";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const serviceUrl = "http://localhost:4000/graphql";

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
          <Explorer serviceUrl={serviceUrl} />
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;
