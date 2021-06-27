const form = document.querySelector("#searchForm");
const resultsDiv = document.querySelector("#results");

form.addEventListener("input", async function (e) {
  e.preventDefault(); //PREVENTING THE FORM FROM REQUESTING ACTION
  resultsDiv.innerHTML = ""; // TO CLEAR PREVIOUS SEARCHED RESULT
  document.getElementById("quoteTop").style.display = "none";
  document.getElementById("quoteBottom").style.display = "none";

  // console.dir(form) GIVES ALL ELEMENTS AND DETAILS OF FORM
  // console.dir(form.elements.query.value) WHAT USER SEARCHES FOR
  const searchTerm = form.elements.query.value;

  // API CALL USING AXIOS
  const config = { params: { q: searchTerm } }; // to add multiple things as query string instead of adding it to the url
  // const config = {params: {q: searchTerm, isFunny: 'Kush'}} // to add multiple things as query string instead of adding it to the url
  const res = await axios.get(`http://api.tvmaze.com/search/shows`, config); // config is an axios object
  // const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
  showData(res.data);
  // console.log(res.data);
  // console.log(res.data[0].show.genres);
  // console.log(res.data[0].show.name);
  // console.log(res.data[0].show.network.name);
  // console.log(res.data[0].show.officialSite);
  // console.log(res.data[0].show.rating.average);
  // console.log(res.data[0].show.premiered);
  // console.log(res.data[0].show.schedule);
  // console.log(res.data[0].show.schedule.time);
  // console.log(res.data[0].show.schedule.days);
  // console.log(res.data[0].show.status);
  // console.log(res.data[0].show.summary);
  // console.log(res.data) // SEARCHED SHOW DATA
  // console.log(res.data[0].show.image.medium) // SHOWS SHOW IMAGE
  // form.elements.query.value = ''
});

const showData = (shows) => {
  for (let result of shows) {
    // console.log(result) //testing
    document.getElementById("quoteTop").style.display = "block";
    document.getElementById("quoteBottom").style.display = "block";
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    resultsDiv.append(card);

    const br = document.createElement("br");
    card.append(br);

    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      card.append(img);
    }
    if (!result.show.image) {
      const img = document.createElement("IMG");
      img.src = "https://tinyurl.com/tv-missing";
      card.append(img);
    }
    if (result.show.name) {
      const name = document.createElement("h2");
      name.setAttribute("class", "title");
      name.innerHTML = result.show.name;
      card.append(name);
    }
    if (result.show.genres) {
      const genres = document.createElement("div");
      genres.innerHTML = result.show.genres;
      card.append(genres);
    }
    if (result.show.network.name) {
      const networkName = document.createElement("div");
      networkName.innerHTML = result.show.network.name;
      card.append(networkName);
    }
    if (result.show.officialSite) {
      const site = document.createElement("a");
      site.setAttribute("href", result.show.officialSite);
      site.setAttribute("class", "link");
      site.innerHTML = result.show.officialSite;
      card.append(site);
    }
    if (result.show.rating.average) {
      const ratings = document.createElement("div");
      ratings.innerHTML = result.show.rating.average;
      card.append(ratings);
    }
    if (result.show.premiered) {
      const premiered = document.createElement("div");
      premiered.innerHTML = result.show.premiered;
      card.append(premiered);
    }
    if (result.show.status) {
      const status = document.createElement("div");
      status.innerHTML = result.show.status;
      card.append(status);
    }
    if (result.show.summary) {
      const summary = document.createElement("div");
      summary.setAttribute("class", "summary");
      summary.innerHTML = result.show.summary;
      card.append(summary);
    }
    const b = document.createElement("br");
    resultsDiv.append(b);
  }
};
