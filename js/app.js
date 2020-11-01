app = angular.module('store', [])
 app.controller('StoreController', function($http) {
    var carrinho = [];
    var store = this;
    $http.get('./dog.json')
    .then(function(response) {
      store.todo = response.data;
    })
    store.dropdown = false;
    store.totalItems = 0;
    store.totalPrice = 0;

    store.addItem = function (item){
      store.totalItems +=1;
      if(!carrinho.includes(item)){
        carrinho.push(item);
        store.carrinho = carrinho;
      }else {
        item.qtd++;
      }
      store.totalPrice += item.preco;
 
    };
    store.removeItem = function (item){
      let index =carrinho.indexOf(item);
      store.totalItems--;
      if(item.qtd > 1){
        item.qtd--;
      }else if(item.qtd == 1) {
        carrinho.splice(index,1)
        store.carrinho = carrinho;
        
      }
      if(store.totalItems == 0){
        store.show();
      }
      store.totalPrice -= item.preco;
    }
    store.show= function (){
      store.dropdown = !store.dropdown;
    }
  })


