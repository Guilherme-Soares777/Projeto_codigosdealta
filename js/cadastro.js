const form = document.getElementById("cadastroForm");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const mensagem = document.getElementById("mensagemCadastro");

    if (!mensagem) {
      console.warn("Elemento de mensagem não encontrado.");
      return;
    }

    // Limpa mensagem anterior
    mensagem.textContent = "";
    mensagem.style.color = "red";

    // Validação básica
    if (!nome || !email || !senha) {
      mensagem.textContent = "Preencha todos os campos.";
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      mensagem.textContent = "Digite um e-mail válido.";
      return;
    }

    // Verifica se o email já existe
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailExiste = usuarios.some((u) => u.email === email);

    if (emailExiste) {
      mensagem.textContent = "E-mail já cadastrado.";
      return;
    }

    // Cria novo usuário
    const novoUsuario = {
      nome,
      email,
      senha,
      cpf: "",
      nascimento: "",
      dataRegistro: new Date().toISOString()
    };

    // Salva no localStorage
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mensagem de sucesso
    mensagem.style.color = "green";
    mensagem.textContent = "Cadastro realizado com sucesso!";

    // Reseta o formulário
    form.reset();
  });
} else {
  console.error("Formulário de cadastro não encontrado.");
}
