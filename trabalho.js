const express = require ("express")
const { request, response } = require("express")
const app = express()

app.use(express.json())
const produto = [{codigoDoProduto: 145794, nome: "Xbox", quantidade: 130, precoUnit: 220}]
    for(let i in produto){
        produto[i].precoTotal = produto[i].quantidade * produto[i].precoUnit
        produto[i].precoVenda = produto[i].precoUnit + produto[i].precoUnit * 0.20
        produto[i].precoLucro = produto[i].precoVenda - produto[i].precoUnit
        if(produto[i].quantidade < 50) {
                produto[i].situacao = "Estável"
        }   else if (produto[i].quantidade >= 50 && produto[i].quantidade < 100) {
                produto[i].situacao = "Boa"
            }      else if (produto[i].quantidade >= 100) {
                    produto[i].situacao = "Excelente"
                    } 
}
app.use((request, response, next) => {
    console.log("Controle de Estoque ABC")
    return next()
})
const checkProdutoInArray = (request, response, next) => {
const {id} = request.params
    if (!produto[id]) {
        return response
                .status(400)
                .json({error: "Não existe produto com esse id. :"})
    }
    return next()
}
const checkAtributoProduto = (request, response, next) => {
    const {codigoDoProduto, nome, quantidade, precoUnit} = request.body
    if (!codigoDoProduto || !nome || !quantidade  || !precoUnit){
        return response 
            .status(400)
            .json({error: 'O campo id do produto, ou nome do produto, ou quantidade, ou valor unitario, ou complemento não existe no corpo da requisição'
        })
    }
    return next()
}

app.get('/produto', (request, response) => {
    return response.json(produto)
})

app.get('/produto/:id', checkProdutoInArray, (request, response) => {
    const {id} = request.params
    return response.json(produto[id])
})
app.post('/produto', checkAtributoProduto, (request, response) => {

    const {codigoDoProduto, nome, quantidade, precoUnit, complementoDoProduto} = produtoAdicionado = request.body
    produto.push(produtoAdicionado)
    
    produtoAdicionado.precoTotal = produtoAdicionado.quantidade * produtoAdicionado.precoUnit
    produtoAdicionado.precoVenda = produtoAdicionado.precoUnit + produtoAdicionado.precoUnit * 0.20
    produtoAdicionado.precoLucro = produtoAdicionado.precoVenda - produtoAdicionado.precoUnit
    if(produtoAdicionado.quantidade < 50) {
            produtoAdicionado.situacao = "Estável"
    }   else if (produtoAdicionado.quantidade >= 50 && produtoAdicionado.quantidade < 100) {
            produtoAdicionado.situacao = "Boa"
        }      else if (produtoAdicionado.quantidade >= 100) {
                produtoAdicionado.situacao = "Excelente"
                } 
                return response.json(produto)
})

app.put('/produto/:id', checkProdutoInArray, checkAtributoProduto, (request, response) => {
    const {codigoDoProduto, nome, quantidade, precoUnit} = request.body
    const {id} = request.params
    const produtoAlterado = request.body
    produto[id] = produtoAlterado
    produto[id].precoTotal = produto[id].quantidade * produto[id].precoUnit
    produto[id].precoVenda = produto[id].precoUnit + produto[id].precoUnit * 0.20
    produto[id].precoLucro = produto[id].precoVenda - produto[id].precoUnit
    if(produto[id].quantidade < 50) {
            produto[id].situacao = "Estável"
    }   else if (produto[id].quantidade >= 50 && produto[id].quantidade < 100) {
            produto[id].situacao = "Boa"
        }      else if (produto[id].quantidade >= 100) {
                produto[id].situacao = "Excelente"
                } 
    return response.json(produto)
})

app.delete('/produto/:id', checkProdutoInArray, (request, response) =>{
    const {id} = request.params
    produto.splice(id, 1)
    return response.json(produto) 
})

app.listen(3333, () => {
    console.log("Servidor Rodando")
})