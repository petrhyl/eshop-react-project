import Product from "./Product";
import cssClass from "./ProductList.module.css";

const ProductList = props => {
    let products;

    products = <p>We are sorry. Here is problem with loading the products.</p>

    if (props.products.length > 0) {
        products = props.products.map(product => {
            return (
                <div className={cssClass.products} key={product.id}>
                    <Product
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                    />
                </div>
            );
        });
    }

    return (
        <div className={cssClass.productList}>
            {products}
        </div>
    );
}

export default ProductList;