
export const fetchProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => resolve(data.products))
        .catch((err) => reject(err));
    }, 1000);
  });
};
