function getRecipe(event) {
    event.preventDefault()
    console.log(searchText.value)
    var ingredientWant = searchText.value
    var ingredientNotWant = searchTextAllergy.value
    var recipeList = document.querySelector("#recipe-list")
    recipeList.innerHTML=""
    // var requestUrl = "https://api.spoonacular.com/recipes/findByIngredients?ingredients="+searchText.value+"&apiKey="+apiKey
    
    var requestUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredientWant}&number=10&intolerances=${ingredientNotWant}&apiKey=${apiKey}`
 
    fetch(requestUrl)
    .then(function (response){
        return response.json();
    }) 
    .then(function(data) {
    console.log(data) 
    data.results.forEach(function(recipe){
        var recipeListCard = document.createElement("div") 
        var recipeListBody = document.createElement("div")
        var recipeListPhoto = document.createElement("img")
        var recipeListTitle = document.createElement("h2") 
        //var recipeListMissingIngTitle = document.createElement("h3") 
        var recipeInstructions = document.createElement("button") 
        var allIngredients = document.createElement("button") 
        // var missedIngredients = recipe.missedIngredients 
    
        recipeListCard.classList = "column is-one-third"
        recipeListBody.classList = "has-background-light pl-6 pr-6" 
        recipeListTitle.classList = "title" 
        recipeInstructions.classList = "button" 
        allIngredients.classList = "button"
        //recipeListMissingIngTitle.classList = "subtitle" 
        recipeListPhoto.classList = "box" 

        recipeListPhoto.setAttribute("src", recipe.image) 
        recipeInstructions.setAttribute("value", recipe.id) 

       
        
        recipeList.appendChild(recipeListCard) 
        recipeListCard.appendChild(recipeListBody) 
        recipeListBody.appendChild(recipeListTitle) 
        recipeListBody.appendChild(recipeListPhoto) 
        recipeListBody.appendChild(recipeInstructions)
        recipeListBody.appendChild(allIngredients)
        //recipeListBody.appendChild(recipeListMissingIngTitle)
         
        console.log('-------', recipe);
        recipeListTitle.textContent = `${recipe.title}`
        //recipeListMissingIngTitle.textContent = "Other Ingredients You Will Need:" 
        recipeInstructions.textContent = "Instructions" 
        allIngredients.textContent = "Ingredients"

        recipeInstructions.addEventListener("click", getRecipeInstructions) 

        allIngredients.addEventListener("click", getAllIngredients ) 

        
        function getRecipeInstructions(){
            var instructionsUrl = "https://api.spoonacular.com/recipes/"+recipe.id+"/information?&apiKey=" + apiKey
            fetch(instructionsUrl) 
            .then(function(response) {
                return response.json()
            }) 
            .then(function(info) {
                console.log(info) 
                var cookingInstructions = document.createElement("h5") 

                cookingInstructions.classList = "is-half" 

                cookingInstructions.textContent = info.instructions

                recipeListBody.appendChild(cookingInstructions) 

                console.log(info.instructions)

                if (info.instructions == "" || info.instructions === null) {
                    alert("We're sorry, instructions are not available for this recipe")
                } 
                if (info.glutenFree === false) {
                    var notGlutenFree = document.createElement("h2")
                    notGlutenFree.classList = "container has-text-danger-dark" 
                    notGlutenFree.textContent = "* Not Gluten Free *" 
                    recipeListBody.appendChild(notGlutenFree)
                } 
                if (info.vegetarian === false) {
                    var notVegetarian = document.createElement("h2")
                    notVegetarian.classList = "container has-text-danger-dark" 
                    notVegetarian.textContent = "* Not Vegetarian *"
                    recipeListBody.appendChild(notVegetarian)
                } 
                if (info.vegan === false) {
                    var notVegan = document.createElement("h2")
                    notVegan.classList = "container has-text-danger-dark" 
                    notVegan.textContent = "* Not Vegan *" 
                    recipeListBody.appendChild(notVegan)
                }
            }) 
        } 

        function getAllIngredients () {
            var ingredientsUrl = "https://api.spoonacular.com/recipes/"+recipe.id+"/information?&apiKey="+ apiKey 
            fetch(ingredientsUrl)
            .then(function (response) {
                return response.json ()
            })
            .then(function(ing) {
                console.log(ing)
                var extendedIng = ing.extendedIngredients
                for (let i = 0; i < extendedIng.length; i++) { 

                    var specificIngredient = document.createElement("p") 
                    var unitMeasureNumber = document.createElement("h6") 
                    var unitMeasure = document.createElement("p")

                    specificIngredient.classList = "container" 
                    unitMeasureNumber.classList = "container" 
                    unitMeasure.classList = "container"

                    specificIngredient.textContent = extendedIng[i].name
                    unitMeasureNumber.textContent = extendedIng[i].measures.us.amount
                    unitMeasure.textContent = extendedIng[i].measures.us.unitLong

                    recipeListBody.appendChild(unitMeasureNumber) 
                    unitMeasureNumber.appendChild(unitMeasure)
                    unitMeasureNumber.appendChild(specificIngredient)
                }
            })
        }
        //console.log(recipe.missedIngredients[0].name)
        // missedIngredients.forEach(function(ingredient){
        //     var recipeListMissedIng = document.createElement("h4") 

        //     recipeListMissedIng.classList = "has-text-primary-dark" 

        //     recipeListMissedIng.textContent = ingredient.name 

        //     recipeListBody.appendChild(recipeListMissedIng)            
        // }
        // )
    }); 
    })
} 

searchButton.addEventListener("click", getRecipe)