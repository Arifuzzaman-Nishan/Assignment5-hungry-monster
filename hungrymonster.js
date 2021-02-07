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


const display = (data)=>{

    console.log(data);
   
    let mealParentDiv = getId("meal-parent-div");
    mealParentDiv.innerHTML = "";
    mealParentDiv = getId("meal-parent-div");
   
    
    const mealItems = data.meals;
    mealItems.forEach(mealList => {
        const mealChildDiv = document.createElement("div");
        const mealName = mealList.strMeal;
        const mealImg = mealList.strMealThumb;
       
        const mealInfo = `
        <img onclick = "displayMealDetail('${data}')" class="img-fluid mb-4" src="${mealImg}" alt="">

        <h5 onclick = "displayMealDetail('${data}')" class = "text-danger text-center">${mealName}</h5>
        `;

         mealChildDiv.innerHTML = mealInfo;
         mealParentDiv.appendChild(mealChildDiv);
        
         mealChildDiv.className = "size m-5 col-md-3";
    });
   
}

const displayMealDetail = (m)=>{
    console.log(m);
}