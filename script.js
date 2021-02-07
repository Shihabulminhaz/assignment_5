// get meals after search

function findMeal(){
    const mealName = document.getElementById('input-meal').value;
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s='+ mealName +'')
    .then(response => response.json())
    .then(data => {
        if(data.meals === null){        //check meals array is empty or not
            document.getElementById('message-notFound').style.display = "block";
            document.getElementById('message-notFound').innerText = "No Meals Found";
            document.getElementById('ingredients').style.display = "none";
            clearAllMeals();
        }
        else{
            document.getElementById('message-notFound').style.display = "none";
            document.getElementById('ingredients').style.display = "none";
            clearAllMeals();
            clearAllIngredients();
            displayMeals(data);
        }
    });
}

// display all meals after search

const displayMeals = mealsOb => {
    const mealArray = mealsOb.meals;
    const mealContainer = document.getElementById('container');
    mealArray.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'col-md-3';
        const mealInfo = `
            <button onclick="getIngredients('${meal.idMeal}')" class="btn mt-4">
                <div class="meal text-center">
                    <img class="w-100 rounded" src="${meal.strMealThumb}">
                    <h3 class="p-3">${meal.strMeal}</h3>
                </div>
            </button>
        `;
        mealDiv.innerHTML = mealInfo;
        mealContainer.appendChild(mealDiv);
    });
}

// get all ingredients after select any meal

const getIngredients = mealId => {
    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+ mealId +'')
    .then(response => response.json())
    .then(data => displayIngredients(data));
}

// For displaying all ingredients after select any meal

const displayIngredients = meal => {
    const mealArray = meal.meals[0];
    document.getElementById('ingredients').style.display = "block";
    document.getElementById('meal-image').src = mealArray.strMealThumb;
    document.getElementById('meal-name').innerText = mealArray.strMeal;
    
    clearAllIngredients();
    const ul = document.getElementById('list');
    for(let i = 1; i <= 20; i++){
        let ingredients = "strIngredient" + i;
        if(mealArray[ingredients].length == 0){
            continue;
        }
        else{
            let li = document.createElement("li");
            li.innerText = mealArray[ingredients];
            ul.appendChild(li);
        }
    }
}

// clear all existing meal

function clearAllMeals(){
    document.getElementById("container").innerText = "";
}

// clear all existing ingredients

function clearAllIngredients(){
    document.getElementById('list').innerText = "";
}