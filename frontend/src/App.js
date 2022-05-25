import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListProduct from "./components/ListProduct";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Switch>
              <Route exact path="/">
                <Navbar />
                <ListProduct />
              </Route>
              <Route path="/addProduct">
                <Navbar />
                <AddProduct />
              </Route>
              <Route path="/editProduct/:id">
                <Navbar />
                <EditProduct />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
