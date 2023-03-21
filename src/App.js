import Eshop, { fetchProducts } from './routes/Eshop';
import Item, { fetchItem } from './routes/Item';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StaticPage from './routes/StaticPage';
import ErrorPage from './routes/ErrorPage';
import Cart from './routes/Cart';
import Order from './routes/Order';
import Confirmation from './routes/Confirmation';

const routes = createBrowserRouter([
  {
    path: '/eshop',
    element: <StaticPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Eshop />,
        loader: fetchProducts
      },
      {
        path: 'item/:productId',
        element: <Item />,
        loader: fetchItem
      },
      {
        path: 'cart',
        element: <Cart />
      },{
        path:'order',
        element:<Order />
      },{
        path:'confirm',
        element:<Confirmation />
      }
    ]
  }
]);


function App() {
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
