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


const display = (data) => {

    console.log(data);

    let mealParentDiv = getId("meal-parent-div");
    mealParentDiv.innerHTML = "";
    mealParentDiv = getId("meal-parent-div");

    const mealItems = data.meals;

    mealItems.forEach(mealList => {
        const mealChildDiv = document.createElement("div");
        const mealName = mealList.strMeal;
        const mealImg = mealList.strMealThumb;
        const mealId = mealList.idMeal;

        const mealInfo = `
        <img onclick = "getDataByMealId('${mealId}')" class="img-fluid mb-4" src="${mealImg}" alt="">
        <h5 onclick = "getDataByMealId('${mealId}')" class = "text-danger text-center">${mealName}</h5>
        `;

        mealChildDiv.innerHTML = mealInfo;
        mealParentDiv.appendChild(mealChildDiv);

        mealChildDiv.className = "size m-5 col-md-3";
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
        <h5   class = "text-danger text-center">${mealName}</h5>
        `;

    displayDetails("meal-details",mealTagInfo);

}


displayDetails =(parentId,mealTagInfo)=>{

    let mealParentDiv = getId(parentId);
    mealParentDiv.innerHTML = "";
    mealParentDiv = getId(parentId);

    const mealChildDiv = document.createElement("div");
  
    mealChildDiv.innerHTML = mealTagInfo;
    mealParentDiv.appendChild(mealChildDiv);

    mealChildDiv.className = "size m-5 col-md-3";

}