import { useMutation, useQueryClient } from "react-query";
import "./Form.scss";
import { Product } from "../../Interface/Product.interface";
import { createProduct } from "../../Interface/Product";
import { v4 as uuidv4 } from "uuid";

export const Form = () => {

  const queryClient = useQueryClient();

  // Mutation Function
  const addMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("product");
      alert("Product added");

    }
  });

  // Form handling Function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const productData = Object.fromEntries(formData);

    const product: Product = {
      id: uuidv4(),
      name: productData.product_name as string,
      category: productData.product_category as string,
      price: parseFloat(productData.price as string),    
      description: productData.product_description as string,
      quantity: parseInt(productData.quantity as string, 10)
    };
    console.log(product);

    addMutation.mutate(product);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <h4>Product Details</h4>
          <label htmlFor="product_name">
            Product Name:
            <input type="text" name="product_name" placeholder="Enter Name" />
          </label>
          <label htmlFor="product_category">
            Product Category:
            <input type="text" name="product_category" placeholder="Enter Category" />
          </label>
          <label htmlFor="price">
            Price:
            <input type="number" name="price" placeholder="Enter Price" />
          </label>
          <label htmlFor="product_description">
            Product Description:
            <input type="text" name="product_description" placeholder="Enter Description" />
          </label>
          <label htmlFor="quantity">
            Quantity:
            <input type="number" name="quantity" placeholder="Enter Quantity" />
          </label>
          <button type="submit">Add Product</button>
        </div>
      </form>
    </>
  );
};
