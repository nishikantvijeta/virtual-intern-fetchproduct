// src/App.js
import React, { useEffect, useState } from "react";
import { fetchProducts } from "./Api";
import ProductTable from "./Table";

const App = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);  
  const [filters, setFilters] = useState({});
  const [options, setOptions] = useState({ brand: [], category: [], price: [], rating: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setAllProducts(data);
        setFilterProduct(data);  
        genOpt(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  // Generating dropdown options 
  const genOpt = (data) => {
    //this is  function unique to create unique anything
    const unique = (key) => [...new Set(data.map((p) => p[key]))].sort((a, b) => (a > b ? 1 : -1));
    //or we can also usse ((a>b)=>a-b)
    //if we directly write sort then it not valid for numbered value only for alphabetical
    setOptions({
      //we are creating option in option list
      brand: unique("brand"),  //call unique to build unique brand
      category: unique("category"),   
      price: unique("price"),
      rating: unique("rating")
    });
  };

  // Apply filters
  const applyFilters = (filterObj) => {
    let data = allProducts.filter((p) => {
      return Object.keys(filterObj).every((key) => {
        return !filterObj[key]?true:String(p[key]) === String(filterObj[key]);
        // filter if to keep or not if not selected keep all and if select that only
      });
    });
    setFilterProduct(data);  
    genOpt(data);  
  };

  const changefilter = (key, value) => {  
    const newFilters = { ...filters, [key]: value };
    //...filters it copies original filters and then adding
    //it add new value to the filter array because last one written and old one of same type
    // due to uniqness property of object
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleDelete = (id) => {
    const newData = allProducts.filter((p) => p.id !== id);
    setAllProducts(newData);
    applyFilters(filters);
  };

  const handleEdit = (id, newTitle) => {
    const updated = allProducts.map((p) =>
      p.id === id ? { ...p, title: newTitle } : p
    );
    setAllProducts(updated);
    applyFilters(filters);
  };

  const resetFilters = () => {
    setFilters({});
    setFilterProduct(allProducts); 
    genOpt(allProducts); 
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <ProductTable
        products={filterProduct} 
        filters={filters}
        changefilter={changefilter}  
        onDelete={handleDelete}
        onEdit={handleEdit}
        onReset={resetFilters}
        options={options}
      />
    </div>
  );
};

export default App;
