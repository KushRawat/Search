const form = document.querySelector("#searchForm");
const resultsDiv = document.querySelector("#results");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); //PREVENTING THE FORM FROM REQUESTING ACTION
  resultsDiv.innerHTML = ""; // TO CLEAR PREVIOUS SEARCHED RESULT

  // console.dir(form) GIVES ALL ELEMENTS AND DETAILS OF FORM
  // console.dir(form.elements.query.value) WHAT USER SEARCHES FOR
  const searchTerm = form.elements.query.value;

  // API CALL USING AXIOS
  const config = { params: { q: searchTerm } }; // to add multiple things as query string instead of adding it to the url
  // const config = {params: {q: searchTerm, isFunny: 'Kush'}} // to add multiple things as query string instead of adding it to the url
  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config); // config is an axios object
  // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
  showData(res.data);
  // console.log(res)P
  // console.log(res.data) // SEARCHED SHOW DATA
  // console.log(res.data[0].show.image.medium) // SHOWS SHOW IMAGE
});

const showData = (shows) => {
  for (let result of shows) {
    // console.log(result) //testing
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      resultsDiv.append(img);
    }
  }
};
