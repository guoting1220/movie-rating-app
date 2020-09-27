const savedMoviesArr = (localStorage.getItem("movies")) ?
    JSON.parse(localStorage.getItem("movies")) : [];

for (let movie of savedMoviesArr) {
    addMovie(movie[0], movie[1]);
}    

//function to add movie with rating and remove button
function addMovie(titleVal, ratingVal) {
    $("#displayTable").append("<tr></tr>");
    $("#displayTable tr").last().append(`<td>${titleVal}</td>`)
        .append(`<td>${ratingVal}</td>`)
        .append(`<td><button>Remove</button></td>`);    
}

// add event listener for submit button to add new movie to the DOM
$("form").on("submit", function(e){
    e.preventDefault();
    addMovie($("#title").val(), $("#rating").val());  
    savedMoviesArr.push([$("#title").val(), $("#rating").val()]); 
    //update localStorage 
    localStorage.setItem("movies", JSON.stringify(savedMoviesArr));
    $("input").val("");
})

// add event listener for remove button (delegatioin)
$("#displayTable").on("click", "button", function(e){
    let clickedLiIndex = $("#displayTable button").index(e.target);
    savedMoviesArr.splice(clickedLiIndex, 1);
    localStorage.setItem("movies", JSON.stringify(savedMoviesArr));
    $(e.target).parent().parent().remove();
})

// add event listener for the sort select options 
$("#sort").on("click", function(e){
    if ($(e.target).val() === "titleA-Z") {
        $("#tHead").siblings().sort(function(a,b){
            let $a = $(a).children("td:first").text();
            let $b = $(b).children("td:first").text();
            return ($a > $b) ? 1 : (($a < $b) ? -1 : 0); 
        }).appendTo("#displayTable");
        // sort savedMoviesArr to update the localStorage
        savedMoviesArr.sort((x, y) => (x[0] > y[0]) ? 1 : (x[0] < y[0]) ? -1 : 0);
    }
    else if ($(e.target).val() === "titleZ-A") {
        $("#tHead").siblings().sort(function (a, b) {
            let $a = $(a).children("td:first").text();
            let $b = $(b).children("td:first").text();
            return ($a < $b) ? 1 : (($a > $b) ? -1 : 0);
        }).appendTo("#displayTable");
        savedMoviesArr.sort((x, y) => (x[0] < y[0]) ? 1 : (x[0] > y[0]) ? -1 : 0);
    }
    else if ($(e.target).val() === "ratingL-H") {
        $("#tHead").siblings().sort(function (a, b) {
            let $a = $(a).children("td:nth-child(2)").text();
            let $b = $(b).children("td:nth-child(2)").text();
            return ($a > $b) ? 1 : (($a < $b) ? -1 : 0);
        }).appendTo("#displayTable");
        savedMoviesArr.sort((x, y) => x[1] - y[1]);
    }
    else if($(e.target).val() === "ratingH-L") {
        $("#tHead").siblings().sort(function (a, b) {
            let $a = $(a).children("td:nth-child(2)").text();
            let $b = $(b).children("td:nth-child(2)").text();
            return ($a < $b) ? 1 : (($a > $b) ? -1 : 0);
        }).appendTo("#displayTable");
        savedMoviesArr.sort((x, y) => y[1] - x[1]);
    }

    localStorage.setItem("movies", JSON.stringify(savedMoviesArr));
})

