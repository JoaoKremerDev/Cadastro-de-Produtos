import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";

const url = "http://localhost:3000/products";

function App() {

  const { data: items, httpConfig, loading, error } = useFetch(url);

  const [name, setName] = useState([]);
  const [price, setPrice] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = {
      name,
      price,
    };

    httpConfig(products, "POST");
    setName("");
    setPrice("");
  };

  const handleRemove = (id) => {
    httpConfig(id, "DELETE");
  };



  return (
    <div className="App">
      <div className="product-list">
        <h1>Cadastro de produtos</h1>
        <ol>
          {loading && <p>Carregando produtos...</p>}
          {error && <p>{error}</p>}
          {!error &&
            items &&
            items.map((product) => (
              <li key={product.id}>
                {product.name} - R${product.price}
                <button className="buttonRemove" onClick={() => handleRemove(product.id)}>Excluir</button>
              </li>
            ))}
        </ol>
      </div>

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome do Produto
            <input
              type="text"
              placeholder="Digite o produto"
              value={name}
              name="name"
              onChange={({ target }) => setName(target.value)}
            />
          </label>
          <label>
            Valor do Produto
            <input
              type="text"
              placeholder="Digite o preço"
              value={price}
              name="price"
              onChange={({ target }) => setPrice(target.value)}
            />
          </label>

          {!loading && <input type="submit" value="Criar Produto" />}
          {loading && <input type="submit" value="Aguarde" disabled />}
        </form>
      </div>
    </div>
  );
}

export default App;
