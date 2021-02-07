getId = (id) => {
    return document.getElementById(id);
}


getDataFromApi = (foodName) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
        .then(res => res.json())
        .then(data => display(data))
}


//search btn
getId("search-btn").addEventListener("click", () => {
    const searchInputText = getId("search-input-text").value;
    getDataFromApi(searchInputText);
})

let mealParentDiv;

catchHtmlTagById = (parentId) => {
    mealParentDiv = getId(parentId);
    mealParentDiv.innerHTML = "";
    mealParentDiv = getId(parentId);
}

const display = (data) => {

    console.log(data);

    catchHtmlTagById("meal-parent-div");

    const mealItems = data.meals;

    mealItems.forEach(mealList => {
        const mealName = mealList.strMeal;
        const mealImg = mealList.strMealThumb;
        const mealId = mealList.idMeal;

        const mealTagInfo = `
        <img onclick = "getDataByMealId('${mealId}')" class="img-fluid mb-4" src="${mealImg}" alt="">
        <h5 onclick = "getDataByMealId('${mealId}')" class = "text-danger text-center">${mealName}</h5>
        `;

        displayDetails(mealTagInfo);

    });

}


getDataByMealId = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => displayMealDetails(data.meals[0]))
}



displayMealDetails = (mealItem) => {

    const mealName = mealItem.strMeal;
    const mealImg = mealItem.strMealThumb;

    const mealTagInfo = `
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

    displayDetails(mealTagInfo);

}


displayDetails = (mealTagInfo) => {

    const mealChildDiv = document.createElement("div");

    mealChildDiv.innerHTML = mealTagInfo;
    mealParentDiv.appendChild(mealChildDiv);

    mealChildDiv.className = "m-5 col-md-3";

}