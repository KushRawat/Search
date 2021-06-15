const form = document.querySelector('#searchForm')
form.addEventListener('submit', async function(e) {
    e.preventDefault() //PREVENTING THE FORM FROM REQUESTING ACTION
    // console.dir(form) GIVES ALL ELEMENTS AND DETAILS OF FORM 
    // console.dir(form.elements.query.value) WHAT USER SEARCHES FOR
    const searchTerm = form.elements.query.value
    
    // API CALL USING AXIOS
    const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchTerm}`)
    searchData(res.data) 
    // console.log(res)
    // console.log(res.data) // SEARCHED SHOW DATA
    // console.log(res.data[0].show.image.medium) // SHOWS SHOW IMAGE    
})

 const searchData = shows => {
    for(let result of shows) {
        // console.log(result) //testing
        if(result.show.image) {
            const img = document.createElement('IMG')
            img.src = result.show.image.medium
            document.body.append(img)
        }
    }
 } 
