import { lazy, Suspense } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { MainLayout, BlankLayout } from '@Layouts';

import PagesList from '@Constants/RoutesList.json';
import { BodySpinner } from '@Element/Spinners';

const Routes = ({ Routerhistory }: { Routerhistory: any }) => {
    const blankLayoutPage = PagesList.blankLayout.map((page: { routeName: string; componentName: string }) => {
        return {
            name: page.routeName,
            comoonent: lazy(() => import(`../Pages/${page.componentName}`)),
        };
    });

    const MainLayoutPage = PagesList.MainLayout.map((page: { routeName: string; componentName: string }) => {
        return {
            name: page.routeName,
            comoonent: lazy(() => import(`../Pages/${page.componentName}`)),
        };
    });

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ConnectedRouter history={Routerhistory}>
                <Switch>
                    <Route path={['/auth/:path?']}>
                        <BlankLayout>
                            <Switch>
                                <Suspense fallback={<BodySpinner />}>
                                    {blankLayoutPage.map((item: any, n: any) => {
                                        return (
                                            <Route
                                                path={process.env.PUBLIC_URL + `${item.name}`}
                                                component={item.comoonent}
                                                key={n}
                                            />
                                        );
                                    })}
                                </Suspense>
                            </Switch>
                        </BlankLayout>
                    </Route>
                    <Route path={['/:path?']}>
                        <MainLayout>
                            <Switch>
                                <Suspense fallback={<BodySpinner />}>
                                    {MainLayoutPage.map((item: any, n: any) => {
                                        return (
                                            <Route
                                                path={process.env.PUBLIC_URL + `${item.name}`}
                                                component={item.comoonent}
                                                key={n}
                                                exact
                                            />
                                        );
                                    })}
                                </Suspense>
                            </Switch>
                        </MainLayout>
                    </Route>
                </Switch>
            </ConnectedRouter>
        </BrowserRouter>
    );
};

export default Routes;
