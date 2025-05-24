document.getElementById("cadastroForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const cpf = document.getElementById("cpf").value;
    const nascimento = document.getElementById("nascimento").value;
    const mensagem = document.getElementById("mensagem");
  
    if (!email.includes("@") || !email.includes(".")) {
      mensagem.textContent = "E-mail inválido.";
      mensagem.style.color = "red";
      return;
    }
  
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailExistente = usuarios.some(user => user.email === email);
  
    if (emailExistente) {
      mensagem.textContent = "Já existe um cadastro com este e-mail.";
      mensagem.style.color = "red";
      return;
    }
  
    const novoUsuario = { nome, email, senha, cpf, nascimento };
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  
    mensagem.textContent = "Usuário cadastrado com sucesso!";
    mensagem.style.color = "green";
    document.getElementById("cadastroForm").reset();
  });