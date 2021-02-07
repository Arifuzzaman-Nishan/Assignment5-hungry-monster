//global variable
let mealParentDiv;
let mealChildDiv;


//to get html tag by id
getId = (id) => {
    return document.getElementById(id);
}


//here to get data from API by meal name
getDataFromApi = (foodName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => {
            //here check if the input meal is available or not in api
            if(data.meals === null){
                getId("not-found").innerText = "Sorry! This Meal is not Available";
            }
            else mealImageAndName(data);
        })
}


//here the even handler for search button
getId("search-btn").addEventListener("click", () => {

    //here clear the previous inner html and store the html tag
    catchHtmlTagById("meal-details");
    catchHtmlTagById("meal-name-image");

    //its clear the innerText
    getId("not-found").innerText="";

    const searchInputText = getId("search-input-text").value;
    
    //here check if the search box is empty or not
    (searchInputText === "")?   getId("not-found").innerText = "Sorry! Please Enter a meal Name" : getDataFromApi(searchInputText);

})


//to store the HTML tag by ID and clear the previous html
catchHtmlTagById = (parentId) => {
    mealParentDiv = getId(parentId);
    mealParentDiv.innerHTML = "";
    mealParentDiv = getId(parentId);
}


//it display the meal information to user
display = (mealTagInfo) => {

    //create child div
    mealChildDiv = document.createElement("div");
    
    //set the html template into child div
    mealChildDiv.innerHTML = mealTagInfo;

    //set the child div into the parent div
    mealParentDiv.appendChild(mealChildDiv);

    //here set the class name into child div
    mealChildDiv.className = "m-5 col-md-3";

}


// here it store the all meal image and name from the api data
mealImageAndName = (data) => {

    //here clear the previous inner html and store the html tag
    catchHtmlTagById("meal-name-image");

    //it store the object of api data
    const mealItems = data.meals;

    mealItems.forEach(mealList => {

         //gives the meal name
        const mealName = mealList.strMeal;

         //gives the meal image link
        const mealImg = mealList.strMealThumb;

        //gives the meal id
        const mealId = mealList.idMeal;

        //template of html tags
        const mealTagInfo = `
        <img onclick = "getDataByMealId('${mealId}')" class="img-fluid mb-4" src="${mealImg}" alt="">
        <h5 onclick = "getDataByMealId('${mealId}')" class = "text-danger text-center">${mealName}</h5>
        `;

        ///it display to the user to show the information
        display(mealTagInfo);

    });

}


//get data form API by mealId
getDataByMealId = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => specificMealDetails(data.meals[0]))
}


//it store the all specific meal details
specificMealDetails = (mealItem) => {

    //gives the meal name
    const mealName = mealItem.strMeal;

     //gives the meal image link
    const mealImg = mealItem.strMealThumb;

    //template of html tags for specific meal
     const mealTagInfo = 
     `
        <img class="img-fluid mb-4" src="${mealImg}" alt="">
        <h2 class = "text-danger text-center mb-5">${mealName}</h2>
        <h4 class="text-color">Ingredients</h4>
        <ul class="list-group mt-4">
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

    //it store the html tag by id and clear the previous inner html
    catchHtmlTagById("meal-details");

    //it display the information to user
    display(mealTagInfo);

}



