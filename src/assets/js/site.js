
var blogPostTemplate =
    '<article class="post">\
        <header class="post-header">\
            <span class="post-meta">\
                <time datetime="{{posted}}">{{view.posted-formatted}}</time>\
            </span>\
            <h2 class="post-title"><a href="{{url}}">{{view.title}}</a></h2>\
        </header>\
        <section class="post-excerpt">\
            <p>\
            {{{view.content}}}\
            </p>\
        </section>\
    </article>';

$(function() {
    fitVids();
    mailto();
    blog();
});

function fitVids() {
    $(".post-content").fitVids();
}

function mailto() {
    var em1 = "ed";
    var em2 = "@";
    var em3 = "edsilv.com";
    var em4 = em1 + em2 + em3;

    $(".mailto").prop('href', 'mailto:' + em4).prop('title', em4);
}

function blog() {

    if (!$('body').hasClass('home-template') && !$('body').hasClass('post-template')){
        return;
    }

    $.get("/data/posts.json", function(data){
        $.each(data, function(index, post){

            var blogPostView = Ember.View.create(post);

            Ember.run(this, function(){
                blogPostView.set('template', Ember.Handlebars.compile(blogPostTemplate));
                blogPostView.appendTo('main');
            });
        });
    });
}