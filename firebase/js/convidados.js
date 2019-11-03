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

function carregarPresenca() {
	let totalAcompanhantes = 0;
	let totalRespostas = 0;
	let totalPresenca = 0;
	var presenca = banco.ref("presenca/");
	presenca.on("child_added", function(dados){
		var dadosPresenca = dados.val();
		let email = "";
		let companhia = "";
		let qtdPessoas = "";
		let observacao = "";

		if(dadosPresenca.emailConvidado != ""){
			email = "<strong>E-mail:</strong> " + dadosPresenca.emailConvidado + "<br>"
		}
		if(dadosPresenca.qtdPessoas != ""){
			qtdPessoas = "<strong>Quantas pessoas vai levar:</strong> " + dadosPresenca.qtdPessoas + "<br>"
			totalAcompanhantes += parseInt(dadosPresenca.qtdPessoas);
		}
		if(dadosPresenca.comparecer == "Sim"){
			totalPresenca++
		}

		if(dadosPresenca.companhia != ""){
			companhia = "<strong>Vai levar alguém:</strong> " + dadosPresenca.companhia + "<br>"
		}
		if(dadosPresenca.observacao != ""){
			observacao = "<strong>Observação:</strong> " + dadosPresenca.observacao + "<br>"
		}

		document.getElementById("containerPresenca").innerHTML += `
		<div class="col border p-4 m-3 mb-4">
				<div class="card-body">
					<h5 class="card-title">${dadosPresenca.nomeConvidado}</h5>
					<p class="card-text">
						${email}
						<strong>Vai Comparecer:</strong> ${dadosPresenca.comparecer}<br>
						${companhia}
						${qtdPessoas}
						${observacao}
					</p>
				</div>
			</div>
		`;
		totalRespostas++;

		document.getElementById("totalRespostas").innerHTML = totalRespostas;
		document.getElementById("totalAcompanhantes").innerHTML = totalAcompanhantes;
		document.getElementById("totalPresenca").innerHTML = totalPresenca;
		document.getElementById("totalGeral").innerHTML = totalPresenca+totalAcompanhantes;
	});
}