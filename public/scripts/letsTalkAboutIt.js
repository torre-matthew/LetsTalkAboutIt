$(document).ready(function(){
    $('.modal').modal();
  });


////////////Globals//////////////////////////////
let articleTitleForAddingCommToDocInDb;

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
            comments: [{commbody: comment}]    
        }
    })
    .then(function (data) {
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

let getCommentsForArticle = (articleTitle) => {


    $.ajax({
        url: "/comments/" + articleTitle,
        method: "GET"
    })
    .then(function (data) {
        let allCommentsForThisArticle = data[0].comments;
        renderHandlebarsTemplate("#comments-display-template", ".comment-display-area", allCommentsForThisArticle);
    });

}


let addNewComment = (articleTitle, comment) => {

    $.ajax({
        url: "/addcomment",
        method: "PUT",
        data: {
            articleTitle: articleTitle,
            comments: comment    
        }
    })
    .then(function (data) {
    });

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
    $("#textarea1").val("");
});

$("body").on("click", ".see-comments", function(event){
    articleTitleForAddingCommToDocInDb = $(this).attr("data-article");
//Pass the article title to this function so that only comments from the selected article is presented.
    getCommentsForArticle(articleTitleForAddingCommToDocInDb);
  });

$("body").on("click", ".add-comment", function(event){
    event.preventDefault();
    let comment = $("#add-comment-textarea").val().trim();
    addNewComment(articleTitleForAddingCommToDocInDb, comment);
    getCommentsForArticle(articleTitleForAddingCommToDocInDb);
    $("#add-comment-textarea").val("")
});