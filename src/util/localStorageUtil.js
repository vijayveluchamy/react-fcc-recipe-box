let localStorageUtil = {
    storeIntoLocalStorage: (recipes) => {
        const strRecipes = JSON.stringify(recipes);
        localStorage.setItem('_vijayveluchamy_recipes', strRecipes);
    },
    retreiveFromLocalStorage: () => {
        const strRecipes = localStorage.getItem('_vijayveluchamy_recipes');
        return strRecipes ? JSON.parse(strRecipes) : [];
    }
};

export default localStorageUtil;