$(document).ready(function(){
    $('.modal').modal();
  });

let getNewArticles = () => {
    $.ajax({
        url: "/scrape",
        method: "GET"
    })
    .then(function (data) {
        renderHandlebarsTemplate("#new-articles-template", ".article-display-area", data);
    });
}

let getArticlesWithComments = () => {
    $.ajax({
        url: "/allarticles",
        method: "GET"
    })
    .then(function (data) {
        renderHandlebarsTemplate("#arts-with-comms-template", ".display-area", data);
    });
}

let addArticleToDB = (articleTitle, articleUrl, comment) => {

    $.ajax({
        url: "/add",
        method: "POST",
        data: {
            articleTitle: articleTitle,
            articleUrl: articleUrl,
            hasComments: true, 
            comments: [
                { 
                    commbody: comment 
                }
            ]
        }
    })
    .then(function (data) {
        console.log(data);
    });
    
}

let passArticleInforStorageInDb = (article, link) => {
    $(".start-convo").attr({"data-article": article, "data-link": link});
}



let renderHandlebarsTemplate = (templateID, displayClass, data) => {
    let source = $(templateID).text();
    let template = Handlebars.compile(source);
    let html = template({articles: data});
    $(displayClass).html(html);
}

getNewArticles();
getArticlesWithComments();


$("body").on("click", ".comment", function(event){
    let article = $(this).attr("data-article");
    let link = $(this).attr("data-link");
    passArticleInforStorageInDb(article, link);
  });

$("body").on("click", ".start-convo", function(event){
    event.preventDefault();
    let comment = $("#textarea1").val().trim();
    let article = $(this).attr("data-article");
    let link = $(this).attr("data-link");
    addArticleToDB(article, link, comment);
    console.log(article);
    console.log(link);
    console.log(comment);
    $("#textarea1").val("");
});