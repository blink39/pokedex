import './App.css'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import PokemonContainer from './containers/PokemonContainer'
import PokemonDetailContainer from './containers/PokemonDetailContainer'
import MyPokemonContainer from './containers/MyPokemonContainer'

function App() {
  
  const client = new ApolloClient({
    uri : 'https://graphql-pokeapi.vercel.app/api/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={PokemonContainer}/>
                    <Route path="/detail/:name" component={PokemonDetailContainer}/>
                    <Route path="/pokemon-list/" component={MyPokemonContainer}/>
                </Switch>
            </div>
        </Router>
    </ApolloProvider>
  );
}

export default App;
