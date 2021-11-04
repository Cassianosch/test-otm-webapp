import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { StudentPage } from '../pages/app/student';

const AppRoutes = (): JSX.Element => (
    <Switch>
        <Route exact path="/" component={StudentPage} />
        <Route>
            <Redirect to="/" />
        </Route>
    </Switch>
);

export const Router = (): JSX.Element => (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
);
