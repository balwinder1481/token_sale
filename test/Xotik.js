var Xotik = artifacts.require("./Xotik.sol");

contract('Xotik', function (accounts) {
    var tokenInstance;
    it('initializes the contract with correct values', function(){
        return Xotik.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name, 'Xotik', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol, 'XOT', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard, 'Xotik v1.0', 'has the correct standard')
        });
    })
    it('Allocates the initial supply upon deployment', function () {
        return Xotik.deployed().then(function (instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function (totalSupply) {
            assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(), 1000000, 'it allocates the initial supply to the admin account');
        });
    });

    it('transfers token ownership', function(){
        return Xotik.deployed().then(function(instance){
            tokenInstance = instance;
            //Test 'require' statement first by transferring something larger than the senders's balance
            return tokenInstance.transfer.call(accounts[1], 9999999999999); 
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>= 0, 'error message must contain revert');
        });
    })








});