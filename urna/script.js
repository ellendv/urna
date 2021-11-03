let seuVotoPara = document.querySelector('.d-1-1 span')

let cargo = document.querySelector('.d-1-2 span')

let descricao = document.querySelector('.d-1-4')

let aviso = document.querySelector('.d-2')

let lateral = document.querySelector('.d-1-right')

let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0

let userNumero = ''

let branco = true

function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    numeroHtml = ''
    userNumero = ''
    branco = false

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0) {
        numeroHtml += '<div class="numero pisca"></div>'
        }else {
            numeroHtml += '<div class="numero "></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === userNumero){
            return true;
        }else{
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        descricao.innerHTML = `nome: ${candidato.name} </br> partido: ${candidato.partido}`
        aviso.style.display = 'block'

        let fotosHtml = ''
        for(let i in candidato.fotos){
            fotosHtml += `<div class="d-1-image">
            <img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}
        </div>`
        }
        lateral.innerHTML = fotosHtml

    }else{
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO <div>'
    }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero != null){
        elNumero.innerHTML = n
        userNumero = `${userNumero}${n}`

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
    }
}

function white() {
    if (userNumero === ''){
        branco = true
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO <div>'
    }else{
        alert('para votar em BRANCO, não pode haver números,tente novamente')
        comecarEtapa()
    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    let etapa = etapas[etapaAtual]
    let votoconfirmado = false

    if (branco === true) {
        votoconfirmado = true
        console.log("confirmando como branco")

    }else if( userNumero.length === etapa.numeros){
        votoconfirmado = true
        console.log(`confirmando como ${userNumero}`)
    }

    if (votoconfirmado){
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector('.tela').innerHTML='<div class="fim">FIM<div>'
        }

    }
}

comecarEtapa()