var htmls = Array.from(document.getElementsByTagName("html"));
var bodys = Array.from(document.getElementsByTagName("body"));
var divs = Array.from(document.getElementsByTagName("div"));

var tags = htmls.concat(bodys, divs);

for (var i=0; i < tags.length; i+= 1) {
    var t = tags[i];
    var cs = window.getComputedStyle(t);
    if (t.style.zIndex > 100 || cs.zIndex > 100) {
        t.style = "";
        t.style.display = "none";
    }
    
    t.style.position = "";

    if (cs.overflow == "hidden") 
        t.style.overflow = "scroll";
}


// for hard-core scroll blockers

for(var i = 0; i < document.styleSheets.length; i++) {
    var classes = null;
    try {
        classes = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
    } catch (e) {
        console.warn("Can't read the css rules of: " + document.styleSheets[i].href, e);
        continue;
    }
    for(var j = 0; j < document.styleSheets[i].rules.length; j++) {
        if (document.styleSheets[i].rules[j].style) {
            if (document.styleSheets[i].rules[j].style.overflow == "hidden") {
                var selectorText = document.styleSheets[i].rules[j].selectorText;
                //console.log(i + " " + j);
                //console.log(document.styleSheets[i].rules[j].selectorText);
                document.styleSheets[i].rules[j].style.overflow = "scroll";
            }
        }
    }
}
