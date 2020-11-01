
var qtdItensCarrinho = 0;
var contNumber = document.getElementById('cont');

var carrinhoList = [];
var cardapioList = [];



const request = new Request ("../model/dog.json");
var containerProdutos = document.getElementById('card-list');

//Pega os dados de um JSON externo "request"
async function getData(){
    try{
        const response = await fetch(request)
        const data = await response.json();
        cardapio.create(data);
    }catch(error){
        console.log(error)
    }

}

getData();
const cardapio = {
    create(list){        
        list.map((item) =>{
            cardapioList.push(item);
            let pos = cardapioList.indexOf(item);
            containerProdutos.innerHTML += `       
                <li class="card"">
                    <div id="img-container">
                        <img src="${item.imgProduto}" alt="hotdog" class="img-produto">
                    </div>
                    <p class="nome-produto">${item.nome}</p>    
                    <div class="card-avalicao"> 
                        <img src="${item.imgStar}" alt="hotdog"> 
                        <p>${item.avaliacao}</p> 
                    </div>
                    <p class="preco">R$ ${item.preco}</p> 
                    <button key="${pos}" onClick="carrinho.create(this)" class="btn-comprar">Comprar</button> 
                </li>`;
        })
    },  
}


function showDropDown(){
    let click = document.getElementById('drop-content');
    if(click.style.display == "none"){
        click.style.display = "block";
        carrinho.update();
    }else {
        click.style.display = "none";
        carrinho.update();   
    }

}

const carrinho = {
    create(pos) {
        let key = pos.getAttribute('key');

        if(!carrinhoList.includes(cardapioList[key])){
            carrinhoList.push(cardapioList[key]);
        }else {
            carrinhoList[key].qtd++;
        }
        qtdItensCarrinho++;
       contNumber.innerHTML = qtdItensCarrinho;
       this.update(); 
    },
    delete(pos) {
        let key = pos.getAttribute('key');

        if(carrinhoList[key].qtd > 1){
            carrinhoList[key].qtd--;
        }else {
            carrinhoList.splice(key,1);
        }
        qtdItensCarrinho--;
        contNumber.innerHTML = qtdItensCarrinho;
        this.update();
    },
    update(){
        let list = "";
    
        if(qtdItensCarrinho == 0){
           list = `<p> Carrinho vazio </p>`;
        }else {
            let total = 0;
            carrinhoList.forEach(val => {       
                let pos = carrinhoList.indexOf(val);
                total += val.preco * val.qtd;
                list +=  ` 
                      <li class="li-cardapio">
                          <img class="img-carrinho" src="${val.imgProduto}">
                          <div>
                              <p id="val-nome">${val.nome}</p> 
                              <p id="val-preco">R$ ${val.preco}</p> 
                              <p id="val-qtd">X ${val.qtd}</p> 
                              <button key="${pos}" class="btn-remover" onClick="carrinho.delete(this)">Remover</button>
                          </div>
                      </li>`
              })
              list += `
              <p>Preço total: ${total}</p>`
                    
        }
        document.getElementById('drop-content').innerHTML = list;
    },
}




