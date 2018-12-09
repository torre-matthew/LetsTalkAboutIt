$(document).ready(function(){
    $('.modal').modal();
    getNewArticles();
    getArticlesWithComments();
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

let addArticleToDB = (articleTitle, articleUrl, articleImage, comment) => {

    $.ajax({
        url: "/add",
        method: "POST",
        data: {
            articleTitle: articleTitle,
            articleUrl: articleUrl,
            articleImage: articleImage,
            hasComments: true, 
            comments: [{commbody: comment}]    
        }
    })
    .then(function (data) {
        console.log(data);
    });
    
}

//This function passes the data attributes from the button that initiates the modal to leave a comment
//to the button in the modal that actually submits the form
let passArticleInforStorageInDb = (article, link, image) => {
    $(".start-convo").attr({"data-article": article, "data-link": link, "data-image": image});
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






$("body").on("click", ".comment", function(event){
    let article = $(this).attr("data-article");
    let link = $(this).attr("data-link");
    let image = $(this).attr("data-image");
    passArticleInforStorageInDb(article, link, image);
  });

$("body").on("click", ".start-convo", function(event){
    event.preventDefault();
    let comment = $("#textarea1").val().trim();
    let article = $(this).attr("data-article");
    let link = $(this).attr("data-link");
    let image = $(this).attr("data-image");
    addArticleToDB(article, link, image, comment);
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