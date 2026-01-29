// Variables
const tableBody = document.querySelector("#tableBody");

// RUTA
const userUrl = "http://localhost:3000/orders";

// Consultar Users
async function getUsers() {
  try {
    const rep = await fetch(userUrl);

    if (!rep.ok) {
      throw new Error("Eror HTTP:" + rep.status);
    }

    const users = await rep.json();
    console.log(users);

    // Renderizar Data
    // Para que no se repitan

    console.log(users.orders);
    tableBody.innerHTML = "";
    users.forEach((e) => {
      tableBody.innerHTML += `
            <tr>
                <td>#${e.id}</td>
                <td>${e.user}</td>
                <td>${e.data}</td>
                <td>${e.status}</td>
                <td>${e.total}</td>
            </tr>
        `;
    });
  } catch (error) {
    console.error("Error", error);
  }
}
getUsers();
