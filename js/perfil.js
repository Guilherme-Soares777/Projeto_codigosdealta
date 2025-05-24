const perfilForm = document.getElementById("perfilForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const cpf = document.getElementById("cpf");
const nascimento = document.getElementById("nascimento");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
let indexEdicao = localStorage.getItem("usuarioEditando");

if (indexEdicao !== null) {
  // Editando usuário da listagem
  const usuario = usuarios[indexEdicao];
  nome.value = usuario.nome;
  email.value = usuario.email;
  cpf.value = usuario.cpf;
  nascimento.value = usuario.nascimento;
} else if (usuarioLogado) {
  // Visualizando/atualizando o próprio perfil
  nome.value = usuarioLogado.nome;
  email.value = usuarioLogado.email;
  cpf.value = usuarioLogado.cpf;
  nascimento.value = usuarioLogado.nascimento;
}

perfilForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const novoUsuario = {
    nome: nome.value,
    email: email.value,
    cpf: cpf.value,
    nascimento: nascimento.value
  };

  if (indexEdicao !== null) {
    usuarios[indexEdicao] = novoUsuario;
    localStorage.removeItem("usuarioEditando");
  } else {
    const index = usuarios.findIndex(user => user.email === usuarioLogado.email);
    usuarios[index] = novoUsuario;
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
  }

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  alert("Dados salvos com sucesso!");
  window.location.href = "listagem.html";
});
