// Consulta de endereço via CEP (ViaCEP)
document.getElementById("cepForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const cep = document.getElementById("cep").value.replace(/\D/g, "");

  if (cep.length !== 8) {
    alert("CEP inválido.");
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        document.getElementById("resultadoCEP").innerHTML = "<p>CEP não encontrado.</p>";
      } else {
        document.getElementById("resultadoCEP").innerHTML = `
          <p><strong>Logradouro:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>Estado:</strong> ${data.uf}</p>
        `;
      }
    })
    .catch(() => {
      document.getElementById("resultadoCEP").innerHTML = "<p>Erro ao buscar o CEP.</p>";
    });
});


// Consulta da previsão do tempo via cidade (Open-Meteo)
document.getElementById("tempoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const cidade = document.getElementById("cidade").value.trim();

  if (!cidade) {
    alert("Por favor, digite o nome de uma cidade.");
    return;
  }

  // Passo 1: Buscar coordenadas geográficas da cidade
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`)
    .then(res => res.json())
    .then(geoData => {
      if (!geoData.results || geoData.results.length === 0) {
        document.getElementById("resultadoTempo").innerHTML = "<p>Cidade não encontrada.</p>";
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];

      // Passo 2: Buscar previsão do tempo com base nas coordenadas
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
        .then(res => res.json())
        .then(weatherData => {
          if (!weatherData || !weatherData.current_weather) {
            document.getElementById("resultadoTempo").innerHTML = "<p>Não foi possível obter a previsão do tempo.</p>";
            return;
          }

          const weather = weatherData.current_weather;

          document.getElementById("resultadoTempo").innerHTML = `
            <p><strong>Cidade:</strong> ${name}, ${country}</p>
            <p><strong>Temperatura:</strong> ${weather.temperature} °C</p>
            <p><strong>Vento:</strong> ${weather.windspeed} km/h</p>
            <p><strong>Clima:</strong> ${getWeatherDescription(weather.weathercode)}</p>
          `;
        });
    })
    .catch(() => {
      document.getElementById("resultadoTempo").innerHTML = "<p>Erro ao buscar a previsão do tempo.</p>";
    });
});

// Função auxiliar para traduzir códigos de clima da Open-Meteo
function getWeatherDescription(code) {
  const descriptions = {
    0: "Céu limpo",
    1: "Parcialmente nublado",
    2: "Nublado",
    3: "Encoberto",
    45: "Nevoeiro",
    48: "Nevoeiro com gelo",
    51: "Chuvisco fraco",
    53: "Chuvisco moderado",
    55: "Chuvisco intenso",
    61: "Chuva fraca",
    63: "Chuva moderada",
    65: "Chuva intensa",
    71: "Neve fraca",
    73: "Neve moderada",
    75: "Neve forte",
    95: "Trovoadas",
    96: "Trovoadas com granizo",
    99: "Trovoadas fortes com granizo"
  };
  return descriptions[code] || "Condição desconhecida";
}
