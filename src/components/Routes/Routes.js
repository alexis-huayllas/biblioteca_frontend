import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <Switch>
        {/* Rutas para las operaciones CRUD de Todo
        <Route path="/todo/create" component={TodoCreate} />
        <Route path="/todo/read/:id" component={TodoRead} />
        <Route path="/todo/update/:id" component={TodoUpdate} />
        <Route path="/todo/delete/:id" component={TodoDelete} /> */}

        {/* Rutas para las operaciones CRUD de User
        <Route path="/user/create" component={UserCreate} />
        <Route path="/user/read/:id" component={UserRead} />
        <Route path="/user/update/:id" component={UserUpdate} />
        <Route path="/user/delete/:id" component={UserDelete} /> */}

        {/* Ruta para NotFound
        <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

export default Routes;
