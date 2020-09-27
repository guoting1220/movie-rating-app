const savedMovies = (localStorage.getItem("movies")) ?
    JSON.parse(localStorage.getItem("movies")) : [];

for (let movie of savedMovies) {
    makeList(todo.text);
    if (todo.crossed) {
        ul.lastChild.style.textDecoration = "line-through";
    }
}    


$("form").on("submit", function(e){
    e.preventDefault();
    $("#displayTable").append(`<tr></tr>`);
    $("#displayTable tr").last().append(`<td>${$("#title").val()}</td>`)
                                .append(`<td>${$("#rating").val()}</td>`)
                                .append(`<td><button>Remove</button></td>`);
    $("input").val("");
})

$("#displayTable").on("click", "button", function(e){
    $(e.target).parent().parent().remove();
})

$("#sort").on("click", function(e){
    if ($(e.target).val() === "titleA-Z") {
        $("#tHead").siblings().sort(function(a,b){
            let $a = $(a).children("td:first").text();
            let $b = $(b).children("td:first").text();
            return ($a > $b) ? 1 : (($a < $b) ? -1 : 0); 
        }).appendTo("#displayTable");
    }
    else if ($(e.target).val() === "titleZ-A") {
        $("#tHead").siblings().sort(function (a, b) {
            let $a = $(a).children("td:first").text();
            let $b = $(b).children("td:first").text();
            return ($a < $b) ? 1 : (($a > $b) ? -1 : 0);
        }).appendTo("#displayTable");
    }
    else if ($(e.target).val() === "ratingL-H") {
        $("#tHead").siblings().sort(function (a, b) {
            let $a = $(a).children("td:nth-child(2)").text();
            let $b = $(b).children("td:nth-child(2)").text();
            return ($a > $b) ? 1 : (($a < $b) ? -1 : 0);
        }).appendTo("#displayTable");
    }
    else if($(e.target).val() === "ratingH-L") {
        $("#tHead").siblings().sort(function (a, b) {
            let $a = $(a).children("td:nth-child(2)").text();
            let $b = $(b).children("td:nth-child(2)").text();
            return ($a < $b) ? 1 : (($a > $b) ? -1 : 0);
        }).appendTo("#displayTable");
    }
})

