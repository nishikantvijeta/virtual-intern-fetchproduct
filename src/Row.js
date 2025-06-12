// src/ProductRow.js
import React, { useState } from "react";

const ProductRow = ({ product, onDelete, onEdit }) => {
  const [editTitle, setEditTitle] = useState(product.title);

  return (
    <tr  className="hover:bg-gray-100 ">
      <td  className="bg-blue-200 px-4 py-2">
        <input className="px-2 py-1 bg-cyan-500 w-100 border rounded"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
            onEdit(product.id, e.target.value);
          }}
        />
      </td>
      <td className="bg-blue-300 px-4 py-2">{product.brand}</td>
      <td className="bg-blue-200 px-4 py-2">{product.category}</td>
      <td className="bg-blue-300 px-4 py-2">{product.price}</td>
      <td className="bg-blue-200 px-4 py-2">{product.rating}</td>
      <td className="bg-blue-300 px-4 py-2">
        <button className=" bg-red-500 px-5 py-2 rounded" onClick={() => onDelete(product.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default ProductRow;
