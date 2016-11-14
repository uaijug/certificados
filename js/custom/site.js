function init (){


	var listaDeEventos = eventosJsonObject;

	var eventosSelect = $("#eventos");


	$.each(listaDeEventos, function( index, value ) {
		

		eventosSelect.append("<li><a onclick = 'selecionaEvento("+value.id+")' href='#'>"+value.nome+"</a></li>");
  		
	});



 	//var nomeEvento = sitefunctions.getparam("nome-evento");
 	 	
 	//var decodedString = Base64.decode(getCertificado());
 	//var container = document.getElementById("container");
	//container.innerHTML = decodedString;
}

function selecionaEvento (nomeEvento){
	$('#evento-selecionado').val(nomeEvento);
}

function validarCertificado () {

	var camposCertificado = $('#camposCertificado').val();
	var campsCertificadosArray = camposCertificado.split('-');
	
	var participante = buscaParticipantePorId(campsCertificadosArray[0], campsCertificadosArray[1]);

	gerarCertificado(participante,campsCertificadosArray[0]);

}

function gerarCertificado (dadosParticipante,idEvento){

	var decodedString = Base64.decode(getCertificado());
	var dadosEvento = buscaEventoPorId (idEvento);
	decodedString = decodedString.replace("NOME_DO_PARTICIPANTE", dadosParticipante.nome);
	decodedString = decodedString.replace("NOME_DO_EVENTO", dadosEvento.nome);
	decodedString = decodedString.replace("NUMERO_DE_HORAS", dadosEvento.duracao);
	decodedString = decodedString.replace("DATA_INICIO_EVENTO", dadosEvento.data);
	decodedString = decodedString.replace("URL_VALIDACAO", "www.uaijug.com.br");
	decodedString = decodedString.replace("ID_CERTIFICADO", idEvento + '-' + dadosParticipante.id );

	var container = document.getElementById("container-certificado");

	var w = window.open();

    $(w.document.body).html(decodedString);

}

function buscarCertificado () {

	var emailParticipante = md5($('#email-participante').val());
	var eventoSelecionado = $('#evento-selecionado').val();
	var dadosParticipante = participantes[''+eventoSelecionado][emailParticipante];

	gerarCertificado(dadosParticipante,eventoSelecionado);
	
};

function buscaParticipantePorId (idEvento,idParticipante) {

	var listaDeParticipantes = Object.keys(participantes[idEvento]);	

	for (var i = 0 ; i < listaDeParticipantes.length ; i++){
		if (participantes[idEvento][listaDeParticipantes[i]].id == idParticipante){
			return participantes[idEvento][listaDeParticipantes[i]];
		}
	}
};


function buscaEventoPorId (idEvento) {

	for (var i = 0 ; i < eventosJsonObject.length ; i++){
		if (eventosJsonObject[i].id == idEvento){
			return eventosJsonObject[i];
		}
	}
}