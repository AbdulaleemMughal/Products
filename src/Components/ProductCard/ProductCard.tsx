import { deleteProduct, getProduct } from "../../Interface/Product";
import { Product } from "../../Interface/Product.interface";
import "./ProductCard.scss";
import { useMutation, useQueryClient } from "react-query";

type ProductCardProps = {
  data: Product;
};

export const ProductCard = ({ data }: ProductCardProps) => {

  const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: deleteProduct,
  onSuccess: () => {
    console.log("Product deleted");
    queryClient.invalidateQueries("product");
     // If you want to fetch the updated data after deletion, uncomment the following line
    
  }
});

// useEffect(() => {
//   queryClient.fetchQuery("product", getProduct);
//  }, [deleteMutation]);

const handleDeleteProduct = (id: number) => {
  deleteMutation.mutate(id);
  // If you want to fetch the updated data after deletion, uncomment the following line
  queryClient.fetchQuery("product", getProduct);
}

  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-container">
            <h1>{data.name}</h1>
            <div className="row m-0">
              <div className="col-md-6">
                <h5>Description</h5>
                <p>{data.description}</p>
              </div>
              <div className="col-md-2">
                <h5>Price</h5>
                <p>{data.price}</p>
              </div>
              <div className="col-md-2">
                <h5>Quantity</h5>
                <p>{data.quantity}</p>
              </div>
              <div className="col-md-2">
                <h5>Category</h5>
                <p>{data.category}</p>
              </div>
            </div>
          </div>
          <button className="card-button" onClick={() => handleDeleteProduct(data.id)}>Delete Product</button>
        </div>
      </div>
    </>
  );
};
