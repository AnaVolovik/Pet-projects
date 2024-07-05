// GET ALL FOOD DATA

let allFoodData = [];

function fetchFoodData() {
  return fetch('/get-food-data')
    .then(response => response.json())
    .then(data => {
      allFoodData = data;
      return allFoodData;
    })
    .catch(error => {
      console.error('Error fetching food data:', error);
      return [];
    });
}

export { fetchFoodData };
export default allFoodData;