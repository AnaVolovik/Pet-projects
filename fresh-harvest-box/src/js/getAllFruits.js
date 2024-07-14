// GET ALL FRUITS

let allFruitsData = [];

function fetchFruitsData() {
  return fetch('/get-fruits-data')
    .then(response => response.json())
    .then(data => {
      allFruitsData = data;
      return allFruitsData;
    })
    .catch(error => {
      console.error('Error fetching food data:', error);
      return [];
    });
}

export { fetchFruitsData };
export default allFruitsData;