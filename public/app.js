document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById("registerForm"); //get form
    form.addEventListener("submit", async function(event){  //Προσθήκη βιβλίου
        event.preventDefault();

        const author = document.getElementById("author").value; // παίρνουμε τις τιμές
        const title = document.getElementById("title").value;
        const genre = document.getElementById("genre").value;
        const price = document.getElementById("price").value;

        // input check
        if(parseFloat(price) < 0){
            alert("The price cannot be negative.");
            return;
        }
        if(parseFloat(price) > 10000){
            alert("The price cannot be over 9999.99");
            return;
        }

        if(author.length > 100){
            alert("The Author name cannot be longer than 100 characters.");
            return;
        }

        if(title.length > 100){
            alert("The Title name cannot be longer than 100 characters.");
            return;
        }

        // create object
        const bookData={
            author: author,
            title: title,
            genre: genre,
            price: parseFloat(price)
        };

        const URL ="http://localhost:3000/books";
        try{
            const result = await fetch(URL,{
                method:"POST",
                mode:"cors",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(bookData),
            });

            const response = await result.json();
            if (result.status === 201){
                alert(response.message);
                document.getElementById("author").value = ""; //clear inputs
                document.getElementById("title").value = "";
                document.getElementById("genre").value = "";
                document.getElementById("price").value = "";
            }
            else{
                alert("Failed to add the book.");
            }
        }
        catch(error){
            console.error("Error:", error);
            alert("Error adding book.");
        }
    });

    const searchForm = document.getElementById("SearchForm");
    searchForm.addEventListener("submit", async function (event){
        event.preventDefault();
        const keyword = document.getElementById("search").value; // get search input

        const URL = `http://localhost:3000/books/${keyword}`;
        try{
            const result = await fetch(URL);
            if(!result.ok){
                throw new Error(`HTTP error! Status: ${result.status}`);
            }
            const books = await result.json();
            const resultsDiv = document.getElementById("scrollContainer");
            resultsDiv.innerHTML = "";  // Εκκαθαρηση προηγουμενων αποτελεσμάυων
            if(books.length === 0){
                resultsDiv.innerHTML = "<p>No results found</p>";
            }
            else{
                books.forEach((book) =>{
                    const bookInfo = document.createElement("p");
                    bookInfo.textContent =`Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}, Price: ${book.price}`;
                    resultsDiv.appendChild(bookInfo);
                });
            }
        }
        catch(error){
            console.error("Error:", error);
            alert("Error fetching search results.");
        }
    });

    document.getElementById("clearResults").addEventListener("click",function(){
        document.getElementById("scrollContainer").innerHTML = "";
        document.getElementById("search").value = "";
    });
});
