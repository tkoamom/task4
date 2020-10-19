import React from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import {TablePage} from './pages/table'
import {AuthPage} from "./pages/authPage";


export const useRoutes = isAuth =>{
    if(isAuth){
        return(
            <Switch>
                <Route path= "/table" exact>
                    <TablePage />
                </Route>
                <Redirect to="/table" />

            </Switch>
        )
    }

    return (
        <Switch>
            <Route path= "/">
                <AuthPage />
            </Route>

            <Redirect to="/"/>
        </Switch>
    )

}