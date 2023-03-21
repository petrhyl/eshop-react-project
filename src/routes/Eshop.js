import ProductList from '../components/products/ProductList';
import { json, useLoaderData } from 'react-router-dom';

export const fetchProducts = async () => {
    let loadedProducts = [];

    const response = await fetch('http://localhost:8008/api/controllers/products/getAll.php');

    const data = await response.json();

    if (!response.ok) {
        // * je treba prevest objekt do jsonu nez se vyhodi jako vyjimka - k tomu slouzi funkce json z balicku react-router-dom
        throw json({message: data.error.message},{status: response.status}); 
    }

    for (let index = 0; index < data.products.length; index++) {
        const element = {
            id: data.products[index].id_product,
            image: data.products[index].pictures[0].file_path,
            name: data.products[index].name,
            price: data.products[index].price
        };

        loadedProducts.push(element);
    }

    return {
        isError: false,
        errMessage: '',
        products: loadedProducts
    };

}

const Eshop = () => {
    const data = useLoaderData();

    return (
        <ProductList products={data.products} />
    );
}

export default Eshop;