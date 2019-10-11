const firebaseConfig = {
  apiKey: "AIzaSyD4Y1FLUmzG1sqaoIeedGNkIvQFlj_hIa0",
  authDomain: "casamento-6f725.firebaseapp.com",
  databaseURL: "https://casamento-6f725.firebaseio.com",
  projectId: "casamento-6f725",
  storageBucket: "",
  messagingSenderId: "8069635249",
  appId: "1:8069635249:web:75be24b28255aaf4621690",
  measurementId: "G-MQ2ZJ6X3EJ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const banco = firebase.database();

var d = new Date();
var t = d.getTime();
var couter = t;

document.getElementById('formulario').addEventListener('submit', (e)=>{
	var nome = document.getElementById('nome').value;
	var email = document.getElementById('email').value
	var mensagem = document.getElementById('mensagem').value;
	
	e.preventDefault();
	criarMensagem(nome, email, mensagem);
	formulario.reset();
});

function criarMensagem(nome, email, mensagem){
	couter+=1;
	var mensagem = {
		id: couter,
		nome: nome,
		email: email,
		mensagem: mensagem,
	}
	let db = banco.ref("mensagens/"+couter);
	db.set(mensagem);
	document.getElementById('containerMensagens').innerHTML='';
	carregarMensagens();
}
function carregarMensagens() {
	var mensagens = banco.ref("mensagens/");
	mensagens.on("child_added", function(dados){
		var dadosMensagens = dados.val();
		document.getElementById("containerMensagens").innerHTML += `
			<div class="card mb-3">
				<div class="card-body">
					<h5 class="card-title">${dadosMensagens.nome}</h5>
					<p class="card-text text-muted">${dadosMensagens.email}</p>
					<p class="card-text">${dadosMensagens.mensagem}</p>
					
					<button type="submit" style="color: white" class="btn btn-warning" onclick="editarMensagem(${dadosMensagens.id}, '${dadosMensagens.nome}', '${dadosMensagens.email}', '${dadosMensagens.mensagem}')"><i class="fas fa-pencil-alt"></i> Editar</button>
					<button type="submit" style="color: white" class="btn btn-danger" onclick="apagarMensagem(${dadosMensagens.id})"><i class="fas fa-trash-alt"></i> Apagar</button>
				</div>
			</div>
		`
	});
}

function reset(){
	document.getElementById("containerFormulario").innerHTML = `
		<form class="border p-4 mb-4" id="formulario">
			<div class="form-group">
				<label>Nome</label>
				<input type="text" class="form-control" id="nome" placeholder="Digite seu nome">
			</div>
			<div class="form-group">
				<label>E-mail</label>
				<input type="text" class="form-control" id="email" placeholder="Digite seu e-mail">
			</div>
			<div class="form-group">
				<label>Mensagem</label>
				<textarea class="form-control" id="mensagem" rows="3" placeholder="Digite aqui sua mensagem..."></textarea>
			</div>
			<button type="submit" id="btnEnviar" class="btn btn-primary">Enviar</button>
			<button style="display: none;" id="btnSalvar" class="btn btn-success"><i class="fas fa-check"></i>Salvar</button>
			<button style="display: none;" id="btnCancelar" class="btn btn-danger"><i class="fas fa-times"></i>Cancelar</button>
		</form>
	`;
	document.getElementById('formulario').addEventListener('submit', (e)=>{
		var nome = document.getElementById('nome').value;
		var email = document.getElementById('email').value;
		var mensagem = document.getElementById('mensagem').value;
		e.preventDefault();
		criarMensagem(nome, email, mensagem);
		formulario.reset();
	});
}

function editarMensagem(id, nome, email, mensagem) {
	document.getElementById("containerFormulario").innerHTML=`
		<form class="border p-4 mb-4" id="formulario2">
			<div class="form-group">
				<label>Nome</label>
				<input type="text" class="form-control" id="nome" placeholder="Digite seu nome">
			</div>
			<div class="form-group">
				<label>E-mail</label>
				<input type="text" class="form-control" id="email" placeholder="Digite seu e-mail">
			</div>
			<div class="form-group">
				<label>Mensagem</label>
				<textarea class="form-control" id="mensagem" rows="3" placeholder="Digite aqui sua mensagem..."></textarea>
			</div>
			<button style="display: none;" type="submit" id="btnEnviar" class="btn btn-primary">Enviar</button>
			<button style="display: inline-block;" id="btnSalvar" class="btn btn-success"><i class="fas fa-check"></i> Salvar</button>
			<button style="display: inline-block;" id="btnCancelar" class="btn btn-danger"><i class="fas fa-times"></i> Cancelar</button>
		</form>
	`;
	document.getElementById("formulario2").addEventListener("submit", (e)=>{
		e.preventDefault();
		
	});

	document.getElementById("btnCancelar").addEventListener("click", (e) => {
		reset();
	});
	document.getElementById("btnSalvar").addEventListener("click", (e) => {
		editarMensagem2(id, document.getElementById("nome").value,document.getElementById("email").value,document.getElementById("mensagem").value);
	});
	document.getElementById("nome"). value = nome;
	document.getElementById("email"). value = email;
	document.getElementById("mensagem"). value = mensagem;

}

function editarMensagem2(id, nome, email, mensagem){
	var mensagemSalvar = {
		nome: nome,
		id: id,
		email: email,
		mensagem: mensagem
	}
	let db = banco.ref("mensagens/"+id);
	db.set(mensagemSalvar);

	document.getElementById("containerMensagens").innerHTML = '';
	carregarMensagens();
	reset();
}

function apagarMensagem(id){
	var mensagem = banco.ref("mensagens/"+id);
	mensagem.remove();
	reset();
	document.getElementById("containerMensagens").innerHTML = '';
	carregarMensagens();
}