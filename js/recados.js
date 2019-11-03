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
var couterPresenca = t;

document.getElementById('formulario').addEventListener('submit', (e)=>{
	var nome = document.getElementById('nome').value;
	var email = document.getElementById('email').value
	var mensagem = document.getElementById('mensagem').value;
	
	e.preventDefault();
	criarMensagem(nome, email, mensagem);
	formulario.reset();
});

document.getElementById('formPresenca').addEventListener('submit', (e)=>{
	var nomeConvidado = document.getElementById('nomeConvidadoPresenca').value;
	var emailConvidado  = document.getElementById('emailPresenca').value
	var comparecer = document.getElementById('formPresenca').comparecer.value;
	var companhia = document.getElementById('formPresenca').companhia.value;
	var qtdPessoas = document.getElementById('qtdPessoasPresenca').value;
	var observacao = document.getElementById('observacaoPresenca').value;
	
	e.preventDefault();
	criarPresenca(nomeConvidado, emailConvidado, comparecer, companhia, qtdPessoas, observacao);
	formPresenca.reset();
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
	document.getElementById('containerRecados').innerHTML='';
	lerRecados();
}
function criarPresenca(nomeConvidado, emailConvidado, comparecer, companhia, qtdPessoas, observacao){
	couterPresenca+=1;
	var presenca = {
		id: couter,
		nomeConvidado: nomeConvidado,
		emailConvidado: emailConvidado,
		comparecer: comparecer,
		companhia: companhia,
		qtdPessoas: qtdPessoas,
		observacao: observacao
	}
	let db = banco.ref("presenca/"+couterPresenca);
	db.set(presenca);
	alert("Obrigado pela resposta!");
}
function lerRecados() {
	var mensagens = banco.ref("mensagens/");
	mensagens.on("child_added", function(dados){
		var dadosMensagens = dados.val();
		document.getElementById("containerRecados").innerHTML += `
			<div class="recadoItem">
				<h5>${dadosMensagens.nome}</h5>
				<hr>
				<p>${dadosMensagens.mensagem}</p>
			</div>
		`
	});
}