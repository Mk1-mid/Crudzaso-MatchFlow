// URl
const urlProducts = "http://localhost:3000/products";

// Variables

const renderProduct = document.querySelector(".renderProducts");
const renderOrder = document.querySelector(".renderOrders");

async function renderProducts() {
  try {
    const rep = await fetch(urlProducts);

    if (!rep.ok) {
      throw new Error("Eror HTTP:" + rep.status);
    }

    const products = await rep.json();

    products.forEach((p) => {
      renderProduct.innerHTML += `
                  <div class="col-md-4 ">
                    <div class="card mb-2 mt-2">
                      <!-- Imagen del producto -->
                      <img
                        src="../img/imgs/${p.img}"
                        class="card-img-top"
                        alt="Pizza Margarita"
                      />

                      <!-- Contenido de la card -->
                      <div class="card-body">
                        <!-- Nombre del producto -->
                        <h5 class="card-title">${p.name}</h5>

                        <!-- Descripción -->
                        <p class="card-text">
                         ${p.description}
                        </p>

                        <!-- Precio y botón -->
                        <div
                          class="d-flex justify-content-between align-items-center mt-3"
                        >
                          <span class="price">$ ${p.price}</span>
                          <button onClick="add(${p.id})" class="btn btn-primary">Agregar</button>
                        </div>
                      </div>
                    </div>
                  </div>

        `;
    });

    window.add = function (id) {
      let product = products.find((p) => p.id === id);
      renderOrder.innerHTML += `
                 <div class="row h-25 mt-5 mb-5 order">
                  <div class="col-md-4">
                    <img
                      class="img-thumbnail"
                      src="../img/imgs/${product.img}"
                      alt=""
                    />
                  </div>
                  <div class="col-md-4">
                    <div class="container align-items-center">
                      <h6>${product.name}</h6>
                      <p>No option</p>
                      <div class="form-group">
                        <input
                          type="number"
                          id="cantidad"
                          name="cantidad"
                          min="1"
                          max="50"
                          step="1"
                          value="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <p>$ ${product.price}</p>
                    <a href="#" onclick="removeOrder(this)">Remove</a>
                  </div>
                </div>
      `;
      
    };
    window.removeOrder = function (e) {
      e.closest(".order").remove();
    };
  } catch (error) {
    console.error(error);
  }
}

renderProducts();
