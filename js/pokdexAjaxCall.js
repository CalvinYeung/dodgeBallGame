
$(function(){
    $('#pokedexSubmitButton').on('click',function(event){
    event.preventDefault();

    var pokemonToSearchFor = $('#pokedexInputText').val()
    var pokemon            = event.currentTarget.dataset.poke

    var pokemonName        = $('#pokemonName')
    var pokemonATTK        = $('#pokemonATTK')
    var pokemonDEF         = $('#pokemonDEF')
    var pokemonHeight      = $('#pokemonHeight')
    var pokemonHP          = $('#pokemonHP')
    var pokemonWeight          = $('#pokemonWeight')
    $.ajax({
        url: "http://pokeapi.co/api/v1/pokemon/"+ pokemonToSearchFor,
        method: 'GET',
        data: {poke: pokemon },
        success: function(data,status){
            if(typeof(pokemonToSearchFor) === "number")
            console.log(data,data.name,data.defense, data.attack, data.weight, data.species)
            pokemonName.text("Pokemon #"+pokemonToSearchFor +" in the Pokedex is "+ data.name )
            pokemonATTK.text("ATTACK: "+data.attack)
            pokemonDEF.text("DEFENSE: "+data.defense)
            pokemonHeight.text("Height: "+data.height)
            pokemonHP.text("HP: "+data.hp)
            pokemonWeight.text("Weight: "+data.weight)
        },
        error: function(error){
            console.log(error)
        }
        
    })
    })
});
