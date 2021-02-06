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

display = (data)=>{
    console.log(data);
    const mealItems = data.meals;
    const mealParentDiv = getId("meal-parent-div");

    mealItems.forEach(mealList => {
        const mealChildDiv = document.createElement("div");
        const mealName = mealList.strMeal;
        const mealImg = mealList.strMealThumb;
       
        const mealInfo = `
        <img class="img-fluid img-thumbnail" src="${mealImg}" alt="">
        <h4 class = "text-danger">${mealName}</h4>
        `;

         mealChildDiv.innerHTML = mealInfo;
         mealParentDiv.appendChild(mealChildDiv);
        
         

    });
   
}
