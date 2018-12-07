$(document).ready(function(){
    $('.modal').modal();
  });

let getNewArticles = () => {
    $.ajax({
        url: "/scrape",
        method: "GET"
    })
    .then(function (data) {
        // console.log(data);
        renderHandlebarsTemplate(data)
    });
}

let addArticleToDB = (title, link) => {
    
}

let passArticleInforStorageInDb = (article, link) => {
    $(".start-convo").attr({"data-article": article, "data-link": link});
}



let renderHandlebarsTemplate = (data) => {
    let source = $("#new-articles-template").text();
    let template = Handlebars.compile(source);
    let html = template({articles: data});
    $(".article-display-area").html(html);
}

getNewArticles();


$("body").on("click", ".comment", function(event){
    let article = $(this).attr("data-article");
    let link = $(this).attr("data-link");
    passArticleInforStorageInDb(article, link);
  });

$("body").on("click", ".start-convo", function(event){
    event.prevetDefault();
    $("#textarea1").val("");
let article = $(this).attr("data-article");
let link = $(this).attr("data-link");
console.log(article);
console.log(link);
});