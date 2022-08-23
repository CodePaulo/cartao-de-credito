const queryOne = e => document.querySelector(e)
const queryAll = e => document.querySelectorAll(e)
const getID = e => document.getElementById(e)

const todosInputs = queryAll('input')
const enviar = queryOne('#confirm')
const parametroNumero = /^[0-9]+$/
const parametroTexto = /^(.*[@!_#$%^&=+-.,;*()/\\0-9])/

const validador = []

todosInputs.forEach((item, indice) => {
    if(item !== enviar){
        const camposReflexo = getID(`${indice}`)

        item.addEventListener('keydown', e => {
            setTimeout(()=>{
                if(item.value == ''){
                    escreverTextoPadrao(item)
                }else if(item.name == 'numero'){
                    formatarNumeroDoCartao(e, item)
                    camposReflexo.innerHTML = item.value
                }else{
                    camposReflexo.innerHTML = item.value
                }
            })
        })

        item.addEventListener('blur', e =>{
            validar(item)
        })

        item.addEventListener('focus', e => {
            textoDeIrregularidade(item, '')
        })
    }
})

enviar.addEventListener('click', e => {
    e.preventDefault()

    validador.splice(0, validador.length)

    todosInputs.forEach(item => {
        validar(item)
    })
    
    const validacaoFinal = validador.reduce((acumulador, resultado) => acumulador && resultado)

    if(validacaoFinal){
        queryOne('form').style.opacity = '0'
        queryOne('form').style.marginLeft = '-10%'
        setTimeout(()=>{
            queryOne('form').style.display = 'none'
            queryOne('.contem--menssagem--sucesso').style.display = 'block'
        }, 350)
    }
})

queryOne('.button--continuar').addEventListener('click', e => {
    location.reload()
})

function escreverTextoPadrao(item){
    if(item.name == 'nome'){
        queryOne('.nome').innerHTML = 'Jane Appleseed'
    }

    if(item.name == 'numero'){
        queryOne('.numero').innerHTML = '0000 0000 0000 0000'
    }

    if(item.name == 'mes'){
        queryOne('.expedicao span:nth-of-type(1)').innerHTML = '00'
    }

    if(item.name == 'ano'){
        queryOne('.expedicao span:nth-of-type(3)').innerHTML = '00'
    }

    if(item.name == 'cvc'){
        queryOne('.cvc').innerHTML = '000'
    }
}

function formatarNumeroDoCartao(e, item){
    const parametro = item.value.replace(/ /g, '')
    
    if(e.key == 'Backspace'){
        if(item.value.length % 5 === 0){
            item.value = item.value.substring(0, item.value.length - 1)
        }
    }else{
        if(parametro.length < 16 && parametro.length % 4 === 0){
            item.value = item.value+' '
        }
    }
}

function textoDeIrregularidade(item, texto){
    if(item.name == 'nome'){
        queryOne('form p:nth-of-type(1)').innerHTML = texto
        item.style.borderColor = 'red'
    }

    if(item.name == 'numero'){
        queryOne('form p:nth-of-type(2)').innerHTML = texto
        item.style.borderColor = 'red'
    }

    if(item.name == 'mes'){
        queryOne('.alinhar .mes p').innerHTML = texto
        item.style.borderColor = 'red'
    }

    if(item.name == 'ano'){
        queryOne('.alinhar .ano p').innerHTML = texto
        item.style.borderColor = 'red'
    }

    if(item.name == 'cvc'){
        queryOne('.codigo--cartao p').innerHTML = texto
        item.style.borderColor = 'red'
    }
}

function validar(item){
    if(item !== enviar){
        if(item.value == ''){
            
            validador.push(false)
            textoDeIrregularidade(item, "Can't be blank")
            
        }else if(item.name == 'nome' && parametroTexto.test(item.value) == true){
            
            validador.push(false)
            textoDeIrregularidade(item, "Wrong format, strings only")
            
        }else if(item.name !== 'nome' && parametroNumero.test(item.value.replace(/ /g,'')) == false){
            
            validador.push(false)
            textoDeIrregularidade(item, "Wrong format, numbers only")
            
        }else if(item.name == 'mes' && parseInt(item.value) < 1 || item.name == 'mes' && parseInt(item.value) > 12){
            
            validador.push(false)
            textoDeIrregularidade(item, "Invalid month")
            
        }else if(item.name == 'ano' && item.value.length < 2){
            
            validador.push(false)
            textoDeIrregularidade(item, "Invalid year")
            
        }else if(item.name == 'numero' && item.value.length < 19){
            
            validador.push(false)
            textoDeIrregularidade(item, "invalid card number")
            
        }else if(item.name == 'cvc' && item.value.length < 3){

            validador.push(false)
            textoDeIrregularidade(item, "Invalid CVC")

        }else{
            
            validador.push(true)
            textoDeIrregularidade(item, '')
            item.style.borderColor = 'rgba(200,200,200)'
            
        }
    }
}
