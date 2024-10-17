import "./Body.scss";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useQuery } from "react-query";
import axios from "axios";
import { ProductCard } from "../ProductCard/ProductCard";
import { Product } from "../../Interface/Product.interface";
import { IoSearch } from "react-icons/io5";
import React, { useState } from "react";

// Types
type BodyProps = {
  styles: React.CSSProperties;
};

// Functions
const fetchProducts = () => {
  return axios.get("https://your-json-server-app.herokuapp.com/products");
};

//Component
export const Body = ({ styles }: BodyProps) => {
  const navigate = useNavigate();
  const [searchItem, setSearchInput] = useState<string>("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { isLoading, error } = useQuery("products", fetchProducts, {
    onSuccess: (data) => {
      if (data?.data) {
        setAllProducts(data?.data);
        setFilteredProducts(data?.data);
      }
    },
  });

  const handleNavigate = () => {
    navigate("/products");
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error Occur</h1>;
  }

  //Search Function

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredProducts = allProducts.filter((product: Product) => {
      product.name.toLowerCase().includes(searchItem.toLocaleLowerCase());
    });
    setFilteredProducts(filteredProducts);

    // console.log(filteredProducts);
  };

  return (
    <>
      <div className="body">
        {allProducts.length <= 0 ? (
          <div className="body_add">
            <IoMdAddCircleOutline style={styles} onClick={handleNavigate} />
            <h1>Add Product</h1>
          </div>
        ) : (
          <>
            <h1 className="text-center">Products</h1>
            <form className="body_form_input" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Name"
                className="body_form_input_filter"
                value={searchItem}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className="body_form_input_button" type="submit">
                <IoSearch />
              </button>
            </form>

            {filteredProducts.map((product) => (
              <ProductCard data={product} key={product.id} />
            ))}
            <div className="body_add">
              <IoMdAddCircleOutline style={styles} onClick={handleNavigate} />
              <h1>Add Product</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};
