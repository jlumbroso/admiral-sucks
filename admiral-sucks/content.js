var htmls = Array.from(document.getElementsByTagName("html"));
var bodys = Array.from(document.getElementsByTagName("body"));
var divs = Array.from(document.getElementsByTagName("div"));

var tags = htmls.concat(bodys, divs);

for (var i=0; i < tags.length; i+= 1) {
    var t = tags[i];
    if (t.style.zIndex > 100) {
        t.style = "";
        t.style.display = "none";
    }
    t.style.position = "";
    t.style.overflow = "";
}
