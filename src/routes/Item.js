import { json, Link, useLoaderData } from "react-router-dom";
import Carousel from "../components/carousel/Carousel";
import QuantityForm from "../components/quntityForm/QuantityForm";
import cssClass from "./Item.module.css";

export const fetchItem = async ({ request, params }) => {
    const response = await fetch(`http://localhost:8008/api/controllers/products/getOne.php?id=${params.productId}`);

    const data = await response.json();

    if (!response.ok) {
        throw json({ message: data.error.message }, { status: response.status });
    }

    const product = {
        id: data.product.id_product,
        name: data.product.name,
        price: data.product.price,
        description: data.product.description,
        images: data.product.pictures.map(pic => {
            const picture = {
                pictureId: pic.id_picture,
                fileName: pic.file_path
            }
            return picture;
        })
    };

    return product;
}

const Item = () => {
    const product = useLoaderData();

    const price = Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'CZK',
    }).format(product.price);

    return (
        <div className={cssClass.itemGrid}>
            <div className={cssClass.backDiv}>
                <Link to={'..'} className={cssClass.linkBack}>
                    <p>&#8678; All</p>
                </Link>
            </div>
            <div className={cssClass.image}>
                <Carousel images={product.images} />
            </div>
            <div className={cssClass.info}>
                <h1>{product.name}</h1>
                <p>{price}</p>
                <QuantityForm
                    styles={cssClass}
                    id={product.id}
                    price={product.price}
                    image={product.images[0].fileName}
                    productName={product.name}
                />
            </div>
            <div className={cssClass.desc}>
                <p>{product.description}</p>
            </div>
        </div>
    )
}

export default Item;