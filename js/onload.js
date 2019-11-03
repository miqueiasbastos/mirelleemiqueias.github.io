function carregado(){
	document.getElementById("onload-page").style.display = "none";
}
var comparecer = document.getElementById("formPresenca").comparecer;
for(var i = 0; i<comparecer.length; i++){
	comparecer[i].addEventListener('change', ()=>{
		if(comparecer.value == 'Sim' && document.getElementById("formPresenca").companhia.value == "Sim"){
			document.getElementById("companhia").style.display = "flex";
			document.getElementsByName('companhia')[0].required = true;
			document.getElementById("qtdPessoas").style.display = "flex";
			document.getElementById('qtdPessoasPresenca').required = true;
			
		}
		else if(comparecer.value == 'Sim'){
			document.getElementById("companhia").style.display = "flex";
			document.getElementsByName('companhia')[0].required = true;
		}
		if(comparecer.value == 'Não'){
			document.getElementById("companhia").style.display = "none";
			document.getElementsByName('companhia')[0].required = false;
			document.getElementById("qtdPessoas").style.display = "none";
			document.getElementById('qtdPessoasPresenca').required = false;
		}
	})
}
var companhia = document.getElementById("formPresenca").companhia;
for(var i = 0; i<companhia.length; i++){
	companhia[i].addEventListener('change', ()=>{
		if(document.getElementById("formPresenca").comparecer.value == "Sim" && companhia.value == 'Sim'){
			document.getElementById("qtdPessoas").style.display = "flex";
			document.getElementById('qtdPessoasPresenca').required = true;
		}
		if(companhia.value == 'Não'){
			document.getElementById("qtdPessoas").style.display = "none";
			document.getElementById('qtdPessoasPresenca').required = false;
		}
	})
}