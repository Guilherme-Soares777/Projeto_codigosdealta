document.getElementById("buscar").addEventListener("click", () => {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "Carregando...";
  
    fetch("https://api.publicapis.org/entries")
      .then(response => response.json())
      .then(data => {
        resultado.innerHTML = "";
        const apis = data.entries.slice(0, 5); // mostra as 5 primeiras APIs
  
        apis.forEach(api => {
          const div = document.createElement("div");
          div.innerHTML = `
            <h3>${api.API}</h3>
            <p>${api.Description}</p>
            <a href="${api.Link}" target="_blank">Visitar</a>
            <hr>
          `;
          resultado.appendChild(div);
        });
      })
      .catch(error => {
        resultado.innerHTML = "Erro ao buscar dados.";
        console.error(error);
      });
  });
  