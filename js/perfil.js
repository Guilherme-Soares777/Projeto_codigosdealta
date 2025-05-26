const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

if (!usuarioLogado) {
  window.location.href = "login.html";
}

// Preenche os campos do perfil
document.getElementById("nome").value = usuarioLogado.nome;
document.getElementById("email").value = usuarioLogado.email;
document.getElementById("cpf").value = usuarioLogado.cpf || "";
document.getElementById("nascimento").value = usuarioLogado.nascimento || "";

// Atualiza informações do perfil
document.getElementById("perfilForm").addEventListener("submit", function (e) {
  e.preventDefault();

  usuarioLogado.nome = document.getElementById("nome").value.trim();
  usuarioLogado.cpf = document.getElementById("cpf").value.trim();
  usuarioLogado.nascimento = document.getElementById("nascimento").value;

  const index = usuarios.findIndex(u => u.email === usuarioLogado.email);
  if (index !== -1) {
    usuarios[index] = usuarioLogado;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    alert("Dados atualizados com sucesso!");
  }
});

// Troca de senha
document.getElementById("formSenha").addEventListener("submit", function (e) {
  e.preventDefault();

  const senhaAtual = document.getElementById("senhaAtual").value;
  const novaSenha = document.getElementById("novaSenha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const msg = document.getElementById("mensagemSenha");

  if (senhaAtual !== usuarioLogado.senha) {
    msg.textContent = "Senha atual incorreta.";
    msg.style.color = "red";
    return;
  }

  if (novaSenha !== confirmarSenha) {
    msg.textContent = "As senhas não coincidem.";
    msg.style.color = "red";
    return;
  }

  usuarioLogado.senha = novaSenha;
  const index = usuarios.findIndex(u => u.email === usuarioLogado.email);
  usuarios[index] = usuarioLogado;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

  msg.textContent = "Senha alterada com sucesso!";
  msg.style.color = "green";
  document.getElementById("formSenha").reset();
});
