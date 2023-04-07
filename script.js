const text=document.getElementById("quote");
const author=document.getElementById("author");
const tweetButton=document.getElementById("tweet");
 let soundBtn=document.getElementById("sound");
 let QuoteForm = document.getElementById("QuoteForm");
 function createNewQuote(e) {
    e.preventDefault();
    let quotename = document.getElementById("Quote");
    let AuthorName = document.getElementById("Author");
const quoteObj = {
    quote: quotename.value,
    author:AuthorName.value,
}
fetch(`http://localhost:3000/quotes`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(quoteObj)
})
.then(res => res.json())
.then(()=>{
    quotename.value=""
    AuthorName.value=""
    fetch(`http://localhost:3000/quotes`)
    .then(res => res.json())
    .then(data => getNewQuote(data))
})
}
QuoteForm.addEventListener("submit", createNewQuote)


 QuoteForm.addEventListener("submit", (e) => {
   e.preventDefault();
 
   
 
   if (quotename.value == "" || AuthorName.value == "") {
     alert("Ensure you input a value in both fields!");
   } else {
     // perform operation with form input
     alert("This Quote has been successfully Added!");
      quotename.value = "";
     AuthorName.value = "";
   }
 })
const getNewQuote = async () =>
{
    //api for quotes
    var url="http://localhost:3000/quotes";
    // fetch data
    const response=await fetch(url);
    console.log(typeof response);
    //convert response to json and store it in quotes array
    const allQuotes = await response.json();
    // Generates a random number between 0 and the length of the quotes array
    const indx = Math.floor(Math.random()*allQuotes.length);
    const quote = allQuotes[indx].quote;
    const authorText = allQuotes[indx].author || "Anonymous";
    text.innerHTML = quote;
    author.innerHTML = "~ " + authorText;
    //tweet the quote
    tweetButton.href = "https://twitter.com/intent/tweet?text=" + quote + " ~ " + authorText;
}
getNewQuote();

soundBtn.addEventListener("click",()=>{
    //speechSyntesisUtterance is aweb speech api  that represents a speech request
    let utterance = new SpeechSynthesisUtterance(`${text.innerHTML}`);
    speechSynthesis.speak(utterance); //speak method of speechSynthesis speaks the utterance
})





