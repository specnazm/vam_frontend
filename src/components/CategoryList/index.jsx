import ProductList from "../ProductList";

const CategoryList = ({ categories }) => {
    console.log('==== RENDER CATEGORY LIST COMPONENT =======')

    return (
        <div>
            {categories.map(cat => (
                <div key={cat.id} id={cat.id}>
                    <h1>{cat.name}</h1>
                        <ProductList data={cat.products}/>
                </div>
            ))}
        </div>
    )
}

export default CategoryList;