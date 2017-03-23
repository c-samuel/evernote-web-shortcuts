// ==UserScript==
// @name         Evernote Shortcuts
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       You
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @require      http://code.jquery.com/jquery-3.1.1.min.js
// @match        https://www.evernote.com/Home.action*
// ==/UserScript==

/*
* Supported shortcuts: 
* Numbered list: alt + o
* Bullet list: alt + u
* Insert code block: alt + \
*/

function simulate(element, eventName) {
    var options = extend(defaultOptions, arguments[2] || {});
    var oEvent, eventType = null;

    for (var name in eventMatchers) {
        if (eventMatchers[name].test(eventName)) {
            eventType = name;
            break;
        }
    }

    if (!eventType)
        throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

    if (document.createEvent) {
        oEvent = document.createEvent(eventType);
        if (eventType == 'HTMLEvents')
        {
            oEvent.initEvent(eventName, options.bubbles, options.cancelable);
        }
        else {
            oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
                options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
                options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
        }
        element.dispatchEvent(oEvent);
    }
    else {
        options.clientX = options.pointerX;
        options.clientY = options.pointerY;
        var evt = document.createEventObject();
        oEvent = extend(evt, options);
        element.fireEvent('on' + eventName, oEvent);
    }
    return element;
}

function extend(destination, source) {
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

var eventMatchers = {
    'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
    'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
};

var defaultOptions = {
    pointerX: 0,
    pointerY: 0,
    button: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    bubbles: true,
    cancelable: true
};

var mainEditorId = "en-common-editor-iframe";

var selectNotebookBtn = "gwt-debug-NotebookSelectMenu-root";
var addTagBtn = "gwt-debug-MetaBarView-tagIcon";

// Note Formatting
var codeBlockBtn = "gwt-debug-FormattingBar-codeBlockButton";
var checkboxBtn = "gwt-debug-FormattingBar-checkboxButton";
var bulletBtn = "gwt-debug-FormattingBar-bulletButton";
var listBtn = "gwt-debug-FormattingBar-listButton";

// Side buttons
var newNoteBtn = "gwt-debug-Sidebar-newNoteButton-container";
var noteSearchBtn = "gwt-debug-Sidebar-searchButton-container";

var shortcutsBtn = "gwt-debug-Sidebar-shortcutsButton-container";
var allNotesBtn = "gwt-debug-Sidebar-notesButton";
var noteBooksBtn = "gwt-debug-Sidebar-notebooksButton";
var tagsBtn = "gwt-debug-Sidebar-tagsButton";

// "#gwt-debug-FormattingBar-attachmentButton"
// "#gwt-debug-FormattingBar-attachmentButton"
// "#gwt-debug-FormattingBar-horizontalRuleButton"
// "gwt-debug-FormattingBar-indentButton"

setTimeout(bindShortcuts, 3000);

function bindShortcuts() {
    console.log("Bind Shortcuts");
    $(document).keydown(function(e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 27: // Escapte
                simulate(document.getElementById(allNotesBtn), "click");
                break;

            case 76: // Alt + L
                if (e.altKey) {
                    $('#gwt-debug-NoteTitleView-textBox').click();
                }
                break;

            case 78: // Alt + N
                if (e.altKey) {
                    simulate(document.getElementById(newNoteBtn), "click");
                }
                break;

            case 70: // Alt + F
                if (e.altKey) {
                    simulate(document.getElementById(noteSearchBtn), "click");
                }
                break;

            case 49: // Alt + 1
                if (e.altKey) {
                    simulate(document.getElementById(shortcutsBtn), "click");
                }
                break;

            case 50: // Alt + 2
                if (e.altKey) {
                    simulate(document.getElementById(allNotesBtn), "click");
                }
                break;

            case 51: // Alt + 3
                if (e.altKey) {
                    simulate(document.getElementById(noteBooksBtn), "click");
                }
                break;

            case 52: // Alt + 4
                if (e.altKey) {
                    simulate(document.getElementById(tagsBtn), "click");
                    $('.focus-drawer-Filter-input').focus();
                }
                break;
        }
    });

    $(document.getElementById(mainEditorId).contentWindow.document).keydown(function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case 220: // Alt + \
                if (e.altKey) {
                    simulate(document.getElementById(codeBlockBtn), "click");
                }
                break;

            case 77: // Ctrl + Alt + m key
                if (e.altKey && e.ctrlKey) {
                    simulate(document.getElementById(notebookBtn), "click");
                }
                break;

            case 85: // Alt + U
                if (e.altKey) {
                    simulate(document.getElementById(bulletBtn), "click");
                }
                break;

            case 79: // Alt + O
                if (e.altKey) {
                    simulate(document.getElementById(listBtn), "click");
                }
                break;

            case 84: // Alt + T
                if (e.altKey) {
                    simulate(document.getElementById(checkboxBtn), "click");
                }
                break;

            case 76: // Alt + L
                if (e.altKey) {
                    $('#gwt-debug-NoteTitleView-textBox').click();
                }
                break;

            case 70: // Alt + F
                if (e.altKey) {
                    simulate(document.getElementById(noteSearchBtn), "click");
                }
                break;

            case 49: // Alt + 1
                if (e.altKey) {
                    simulate(document.getElementById(shortcutsBtn), "click");
                }
                break;

            case 50: // Alt + 2
                if (e.altKey) {
                    simulate(document.getElementById(allNotesBtn), "click");
                }
                break;

            case 51: // Alt + 3
                if (e.altKey) {
                    simulate(document.getElementById(noteBooksBtn), "click");
                }
                break;

            case 52: // Alt + 4
                if (e.altKey) {
                    simulate(document.getElementById(tagsBtn), "click");
                    $('.focus-drawer-Filter-input').focus();
                }
                break;
        }
        // e.preventDefault(); // prevent the default action (scroll / move caret)
    });
}