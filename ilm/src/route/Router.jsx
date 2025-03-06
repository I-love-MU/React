import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import SearchPage from "../pages/SearchPage"
import { JsonDataProvider } from "../contexts/JsonDataContext"


const routes = [
    {
        path: '/',
        element: <MainLayout/>,
        loader: () => 'I love mu',
        children: [
            {
                path:'search',
                element:( 
                <JsonDataProvider>
                    <SearchPage/>
                </JsonDataProvider>    
            ),
                loader: () => 'SEARCH'
            },
        ]
    },
]

const router = createBrowserRouter(routes)

export {router, routes}