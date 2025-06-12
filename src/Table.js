import React from "react";
import ProductRow from "./Row";
const optionarray = [
  { key: "brand", label: "Brand" },
  { key: "category", label: "Category" },
  { key: "price", label: "Price" },
  { key: "rating", label: "Rating" }
];
const ProductTable = ({
  products,
  filters,
  changefilter,
  onDelete,
  onEdit,
  onReset,
  options
}) => {
  return (
    <div className="bg-blue-100 p-10 ">
      <h2 className="text-2xl font-bold text-gray-900 mb-5 text-center"> Product Table</h2>
     <div className="flex flex-wrap gap-16 mb-4">{optionarray.map(({ key, label }) => (
        <select
          key={key}
          value={filters[key] || ""}
          onChange={(e) => changefilter(key, e.target.value)}
        >
          <option value="">{`All ${label}`}</option>

  
          {options[key].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
        ))}
        </select>
  ))}
</div> 
      <button className=" bg-blue-400 text-red-600 font-bold rounded-lg px-5 py-2 block  mx-auto"onClick={onReset}>Reset Filters</button>
      {products.length > 0 ? (
        <table border="1" cellPadding="10" style={{ marginTop: "2rem" }}>
          <thead>
            <tr>
              <th className="px-4 bg-slate-500 py-2 border">Brand</th>
              <th className="px-4  bg-slate-500  py-2 border">Title</th>
              <th className="px-4  bg-slate-500  py-2 border">Category</th>
              <th className="px-4  bg-slate-500  py-2 border">Price</th>
              <th className="px-4  bg-slate-500  py-2 border">Rating</th>
             <th className="px-4  bg-slate-500  py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
             onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ProductTable;
