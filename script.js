const countryNames = {
    au: "Australia",
    ae: "United Arab Emirates",
    bg:"Bulgaria",
    us: "United States",
    uk: "United Kingdom",
    ca: "Canada",
    fr: "France",
    de: "Germany",
    in: "India",

  };
  let title;
const button = document.getElementById("goBtn"); //gets button element using call
button.addEventListener("click", () => { // this way the function only gets called once clicked
    title = document.getElementById("moviename").value; //parses the value in the input text
    const countryCode='us';
    const showType='movie';
    console.log(title)
    
    

    getStreamingInfo(title, countryCode, showType); // runs the api function
  });
  let result;
async function getStreamingInfo(title, countryCode, showType) {
    const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=${countryCode}&title=${title}&series_granularity=show&show_type=${showType}&output_language=en`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '7ce2ef4346msh2dea27a7c806a06p160decjsn47dbdd7f696b',
		    'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
    }; //taken from the rapidAPI code snippets
    try {// most of the code goes here because the code should only run if the json object is returned
        const response = await fetch(url, options); //taken from the rapidAPI code snippets
        result = await response.json(); //taken from the rapidAPI code snippets
        console.log(result)
        const movie= result[0].streamingOptions; //separates the stream object
        const rentDiv = document.getElementById("rent"); //obtains the div in which the info will go
        const buyDiv = document.getElementById("buy"); //obtains the div in which the info will go
        rentDiv.innerHTML=" ";
        buyDiv.innerHTML=" ";
        
        if(movie){ // if the results for the movie actually exist and the object has more than 0 elements
            console.log(result.options);
            movie.us.forEach(element => { // forEach is essentially a for loop that runs through JSON objects
                if(element.type=="rent"){
                    rentDiv.innerHTML+=`<li>${element.service.name}</li>`; //when you are doing string concatenation and have other values to put in, u have to use ` around it and ${} for the variable name
                } 
                else if (element.type=="buy"){
                    buyDiv.innerHTML+=`<li>${element.service.name}</li>`;
                }
            });
              
        } else {

            alert("No options found for this movie in the selected country.");
        }

        console.log(result); //taken from the rapidAPI code snippets
    } catch (error) {
        console.error(error);//taken from the rapidAPI code snippets
    }
}




