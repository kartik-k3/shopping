import "./styles.css";
import $ from "jquery";
import { useEffect, useState } from "react";
export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cat, setCat] = useState("https://fakestoreapi.com/products");
  function loadProducts() {
    $.ajax({
      method: "get",
      url: cat,
      success: (response) => {
        setProducts(response);
      },
      error: (err) => {
        console.log(err.status);
      }
    });
  }
  function loadcategories() {
    $.ajax({
      method: "get",
      url: "https://fakestoreapi.com/products/categories",
      success: (response) => {
        setCategory(response);
      }
    });
  }
  useEffect(() => {
    loadProducts();
    loadcategories();
  }, [cat]);
  function catchange(e) {
    if (e.target.value === "1") {
      loadProducts();
    } else {
      var str = "https://fakestoreapi.com/products/category/";
      var link = str + e.target.value;
      console.log(link);
      setCat(link);
      loadProducts();
    }
  }
  return (
    <div>
      <center>
        <h1>Shopper</h1>
      </center>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 9fr" }}>
        <div>
          <h2>Filter</h2>
          <select onChange={catchange}>
            <option value="1">All</option>
            {category.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="d-flex flex-wrap">
          {products.map((product, index) => (
            <div style={{ width: "300px" }} className="card m-2 p-2">
              <div key={index} className="card-img-top">
                <img
                  src={product.image}
                  width="150px"
                  height="150px"
                  alt="no"
                />
              </div>
              <div className="card-header">
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>{product.price}</dd>
                  <dt>rating</dt>
                  <dd>{product.rating.rate}</dd>
                </dl>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary">
                  Add to cart<span className="bi bi-cart1"></span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
