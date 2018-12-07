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



let renderHandlebarsTemplate = (data) => {
    let source = $("#new-articles-template").text();
    let template = Handlebars.compile(source);
    let html = template({articles: data});
    $(".article-display-area").html(html);
}

getNewArticles();