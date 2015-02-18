/**
 * Servico do usuário logado.
*/
app.factory('loggedCustomerService', ['storageService', 'globalValues', function (storageService, globalValues) {

    function getCardImagePath(card) {
        
        for(var i = 0; i < globalValues.AVAILABLE_COMPANY_CNPJ.length; i++){
            
            if(card.CompanyCnpj == globalValues.AVAILABLE_COMPANY_CNPJ[i]) {
                return globalValues.CARD_IMG_PATH + card.CompanyCnpj + ".jpg";
            }
        }
        
        return globalValues.CARD_IMG_PATH + "Cartao_Credz.jpg";
    };
    
    
    var loggedCustomerService = {};
    
    /**
     * Dados do usuário logado.
    */
    loggedCustomerService.getLoggedCustomer = function() {
        return storageService.get(globalValues.CUSTOMER_DATA);
    }
    
    /**
     * Salva os dados do usuário logado.
     * @userData(Object): os dados do usuário.
    */
    loggedCustomerService.setLoggedCustomer = function(userData) {
        storageService.add(globalValues.CUSTOMER_DATA, userData);
    }
    
    /**
     * Verifica se o usuário está logado.
     *
     * @return(Boolean): true se estiver logado, false se não.
    */
    loggedCustomerService.isLogged = function() {
            
        if(storageService.get(globalValues.CUSTOMER_DATA)) {
            return true;
        }
        else {
            return false;
        }
    }
    
    /**
     * Busca todos os cartoes do cliente.
    */
    loggedCustomerService.getAllCustomerCards = function() {
        
        var allCards = loggedCustomerService.getLoggedCustomer().Cards;
            
        angular.forEach(allCards, function(value, key) {
           
            value.imagePath = getCardImagePath(value);
        });
        
        return allCards;
    }
    
    /**
     * Define o cartão selecionado do cliente.
     * @idCard(Int): o id do cartão.
    */
    loggedCustomerService.setSelectedCard = function(idCard) {
        
        var selectedCard = "";
        
        var customerCards = loggedCustomerService.getLoggedCustomer().Cards;
        
        if(customerCards.length > 1) {
            
            for(var i = 0; i < customerCards.length; i++) {
                
                var card = customerCards[i];
                
                if(card.Id == idCard) {
                    selectedCard = card;
                    
                    // reordena os cartoes do usuario para que o escolhido seja o primeiro.
                    customerCards.move(i, 0);
                    
                    break;
                }
            }
        }
        else {
            selectedCard = customerCards[0];
        }
        
        selectedCard.imagePath = getCardImagePath(selectedCard);
        
        storageService.add(globalValues.SELECTED_CARD, selectedCard);
        
        var loggedCustomer = loggedCustomerService.getLoggedCustomer();
        loggedCustomer.Cards = customerCards;
        
        loggedCustomerService.setLoggedCustomer(loggedCustomer);
    },
        
    /**
     * Busca o cartão selecionado.
    */
    loggedCustomerService.getSelectedCard = function() {
        return storageService.get(globalValues.SELECTED_CARD);
    }
        
    /**
     * Limpa a sessão do usuário logado.
    */
    loggedCustomerService.clearSession = function() {

        storageService.remove(globalValues.CUSTOMER_DATA);
        storageService.remove(globalValues.SELECTED_CARD);
    }
    
    return loggedCustomerService;
}]);