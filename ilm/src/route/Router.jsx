import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../ui/layouts/MainLayout"
import SearchPage from "../ui/pages/SearchPage"
import { JsonDataProvider } from "../ui/contexts/JsonDataContext"



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