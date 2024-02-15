var htmls = Array.from(document.getElementsByTagName("html"));
var bodys = Array.from(document.getElementsByTagName("body"));
var divs = Array.from(document.getElementsByTagName("div"));

var tags = htmls.concat(bodys, divs);

/****************************************************************************************/
/* Helper functions for more aggressive protections */
/****************************************************************************************/

/**
 * Recursively restyles the given element and its children with the specified style.
 * @param {HTMLElement} elt - The element to restyle.
 * @param {string} newStyle - The new style to apply.
 */
function restyleChildren(elt, newStyle) {
    // restyle current node
    elt.style = newStyle;
    
    // iterate over children
    var children = elt.children;
    for (var i = 0; i < children.length; i+=1) {
        var x = children[i];
        restyleChildren(x, newStyle);
    }
}

/**
 * Marks the given element (and its children) as display none.
 * @param {HTMLElement} elt - The element to mark.
 */
function markAsDisplayNone(elt) {
    return restyleChildren(elt, "display: none !important; zIndex: -1 !important; overflow: scroll !important;")
}

/**
 * Marks the given element (and its children) as scrollable.
 * @param {HTMLElement} elt - The element to mark.
 */
function markAsScroll(elt) {
    return restyleChildren(elt, "overflow: scroll !important;")
}

/**
 * Checks if a given CSS property is set with `!important` in an element's inline style.
 * 
 * @param {HTMLElement} element - The DOM element to check.
 * @param {string} propertyName - The CSS property name to check (in camelCase or kebab-case).
 * @returns {boolean} True if the property is set with `!important`, false otherwise.
 */
function isInlineStyleImportant(element, propertyName) {
    // Convert propertyName to kebab-case if it's in camelCase
    const kebabCasePropertyName = propertyName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    // Get the element's inline style CSS text
    const inlineStyle = element.style.cssText;

    // Construct a regex to find the property followed by !important
    const regex = new RegExp(`${kebabCasePropertyName}\\s*:\\s*[^;]+!important`, 'i');

    // Check if the property with !important is found in the inline style
    return regex.test(inlineStyle);
}

/**
 * Checks if a given CSS property is set with `!important` by going through spreadsheets or inline.
 * 
 * @param {HTMLElement} element - The DOM element to check.
 * @param {string} propertyName - The CSS property name to check (in camelCase or kebab-case).
 * @returns {boolean} True if the property is set with `!important`, false otherwise.
 */
function isStyleImportant(element, propertyName) {
    // Convert propertyName to kebab-case if it's in camelCase
    const kebabCasePropertyName = propertyName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    // Check inline style first
    if (element.style.getPropertyPriority(kebabCasePropertyName) === 'important') {
        return true;
    }

    // Check stylesheets
    for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i];
        try {
            const rules = sheet.cssRules || sheet.rules;
            for (let j = 0; j < rules.length; j++) {
                const rule = rules[j];
                if (element.matches(rule.selectorText) && rule.style.getPropertyPriority(kebabCasePropertyName) === 'important') {
                    return true;
                }
            }
        } catch (e) {
            console.warn("Cannot access stylesheet: ", sheet.href);
            // This catch block handles the SecurityError thrown when trying to access rules of a cross-origin stylesheet
        }
    }
    
    // Check inline
    if (isInlineStyleImportant(element, propertyName)) {
        return true;
    }

    // No !important found
    return false;
}

/****************************************************************************************/

var EXTENSION_MAGIC_WORD = 'asx-';

if (!document.getElementById(EXTENSION_MAGIC_WORD)) {
    /* NORMAL MODE: Works for most */

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
            console.log("Can't read the css rules of: " + document.styleSheets[i].href, e);
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

    // apply
    let elem = document.createElement('div');
    elem.id = EXTENSION_MAGIC_WORD;
    document.body.appendChild(elem);
} else {
    /* STEROID MODE: Works for the big bads */
    console.log("Admiral Sucks! already applied. Trying steroid mode!");

    for (var i=0; i < tags.length; i+= 1) {
        var t = tags[i];
        var cs = window.getComputedStyle(t);
        
        // Front boxes
        if (t.style.zIndex > 100 || cs.zIndex > 100 || t.style.zIndex == -1 || cs.zIndex == -1) {
            console.log(t);
            markAsDisplayNone(t);
            console.log(window.getComputedStyle(t).display);
            console.log(t.children);
        }
        
        // Scroll obstacles
        if (t.style.overflow == "hidden" || cs.overflow == "hidden") {
            console.log(t);
            markAsScroll(t);
            console.log(window.getComputedStyle(t).overflow);
            console.log(t.children);
        }
    }
}
