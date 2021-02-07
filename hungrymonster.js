//global variable
let mealParentDiv;
let mealChildDiv;


//to get html tag by id
getId = (id) => {
    return document.getElementById(id);
}


//here to get data from API
getDataFromApi = (foodName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            if(data.meals === null){
                getId("not-found").innerText = "Sorry! This Meal is not Available";
            }
            else mealImageAndName(data);
        })
}


//here the even handler for search button
getId("search-btn").addEventListener("click", () => {

    catchHtmlTagById("meal-details");
    catchHtmlTagById("meal-parent-div");

    getId("not-found").innerText="";

    const searchInputText = getId("search-input-text").value;
    
    (searchInputText === "")?   getId("not-found").innerText = "Sorry! Please Enter a meal Name" : getDataFromApi(searchInputText);

})


//to store the HTML tag by ID
catchHtmlTagById = (parentId) => {
    mealParentDiv = getId(parentId);
    mealParentDiv.innerHTML = "";
    mealParentDiv = getId(parentId);
}


// here it store the all meal image and name from the api data
const mealImageAndName = (data) => {

    console.log(data);

    catchHtmlTagById("meal-parent-div");

    const mealItems = data.meals;

    mealItems.forEach(mealList => {

        const mealName = mealList.strMeal;
        const mealImg = mealList.strMealThumb;
        const mealId = mealList.idMeal;

        mealTagInfo = `
        <img onclick = "getDataByMealId('${mealId}')" class="img-fluid mb-4" src="${mealImg}" alt="">
        <h5 onclick = "getDataByMealId('${mealId}')" class = "text-danger text-center">${mealName}</h5>
        `;

        ///it display to the user to show the information
        display(mealTagInfo);
        
    });

}


getDataByMealId = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => specificMealDetails(data.meals[0]))
}


let mealTagInfo ;


//it store the all specific meal details
specificMealDetails = (mealItem) => {
    const mealName = mealItem.strMeal;
    const mealImg = mealItem.strMealThumb;

     mealTagInfo = `
        <img  class="img-fluid mb-4" src="${mealImg}" alt="">
        <h2   class = "text-danger text-center">${mealName}</h2>
        <h4>Ingredients</h4>
        <ul class="list-group">
            <li class="list">${mealItem.strIngredient1}</li>
            <li class="list">${mealItem.strIngredient2}</li>
            <li class="list">${mealItem.strIngredient3}</li>
            <li class="list">${mealItem.strIngredient4}</li>
            <li class="list">${mealItem.strIngredient5}</li>
            <li class="list">${mealItem.strIngredient6}</li>
            <li class="list">${mealItem.strIngredient7}</li>
            <li class="list">${mealItem.strIngredient8}</li>
            <li class="list">${mealItem.strIngredient9}</li>
            <li class="list">${mealItem.strIngredient10}</li>
        </ul>
        `;

    catchHtmlTagById("meal-details");

    display(mealTagInfo);
   

}



//it display the meal information to user
display = (mealTagInfo) => {
    mealChildDiv = document.createElement("div");

    mealChildDiv.innerHTML = mealTagInfo;
    mealParentDiv.appendChild(mealChildDiv);

    mealChildDiv.className = "m-5 col-md-3";
}