/**

* Zepto plugin to create textareas into markdown editors

*/

;(($ => {

                $.fn.editor = function(...args) {
                                var options = args[1] || {};

                                var defaults = {};



                                var settings = $.extend({}, defaults, options);

                                var textarea = $(this);
                                var container = textarea.parent();



                                var insert = str => {

                                                var element = textarea[0];

                                                var start = element.selectionStart;

                                                var value = element.value;

  

                                                element.value = value.substring(0, start) + str + value.substring(start);

  

                                                element.selectionStart = element.selectionEnd = start + str.length;

                                };



                                var wrap = (left, right) => {
                                                var element = textarea[0];

                                                var start = element.selectionStart;
                                                var end = element.selectionEnd;

                                                var value = element.value;



                                                element.value = value.substring(0, start) + left + value.substring(start, end) + right + value.substring(end);



                                                element.selectionStart = end + left.length + right.length;
                                };



                                var tab = event => {
                                                var element = textarea[0];

                                                var start = element.selectionStart;
                                                var end = element.selectionEnd;

                                                var value = element.value;



                                                var selections = value.substring(start, end).split("\n");



                                                for(var i = 0; i < selections.length; i++) {

                                                                selections[i] = "\t" + selections[i];

                                                }



                                                element.value = value.substring(0, start) + selections.join("\n") + value.substring(end);



                                                if(end > start) {

                                                                element.selectionStart = start;

                                                                element.selectionEnd = end + selections.length;

                                                }

                                                else element.selectionStart = element.selectionEnd = start + 1;
                                };



                                var untab = event => {
                                                var element = textarea[0];



                                                var start = element.selectionStart;
                                                var end = element.selectionEnd;

                                                var value = element.value;

                                                var pattern = new RegExp(/^[\t]{1}/);

                                                var edits = 0;



                                                // single line

                                                if(start == end) {

                                                                // move to the start of the line

                                                                while(start > 0) {

                                                                               if(value.charAt(start) == "\n") {

                                                                                               start++;

                                                                                               break;

                                                                               }

  

                                                                               start--;

                                                                }

  

                                                                var portion = value.substring(start, end);

                                                                var matches = portion.match(pattern);

  

                                                                if(matches) {

                                                                               element.value = value.substring(0, start) + portion.replace(pattern, '') + value.substring(end);

                                                                               end--;

                                                                }

  

                                                                element.selectionStart = element.selectionEnd = end;

                                                }

                                                // multiline

                                                else {

                                                                var selections = value.substring(start, end).split("\n");

  

                                                                for(var i = 0; i < selections.length; i++) {

                                                                               if(selections[i].match(pattern)) {

                                                                                               edits++;

                                                                                               selections[i] = selections[i].replace(pattern, '');

                                                                               }

                                                                }

  

                                                                element.value = value.substring(0, start) + selections.join("\n") + value.substring(end);

  

                                                                element.selectionStart = start;

                                                                element.selectionEnd = end - edits;

                                                }
                                };



                                var controls = {

                                                bold() {

                                                                wrap('**', '**');

                                                },

                                                italic() {

                                                                wrap('*', '*');

                                                },

             strike() {

                                                                wrap('~~', '~~');

                                                },

                                                code() {

                                                                wrap('`', '`');

                                                },

                                                link() {
                                                                var element = textarea[0];

                                                                var start = element.selectionStart;
                                                                var end = element.selectionEnd;

                                                                var value = element.value;



                                                                var selection = value.substring(start, end);

                                                                var link = '[' + selection + '](' + selection + ')';



                                                                element.value = value.substring(0, start) + link + value.substring(end);

                                                                element.selectionStart = element.selectionEnd = end + link.length;
                                                },

             img() {
                             var element = textarea[0];

                             var start = element.selectionStart;
                             var end = element.selectionEnd;

                             var value = element.value;



                             var selection = value.substring(start, end);

                             var link = '![' + selection + '](' + selection + ')';



                             element.value = value.substring(0, start) + link + value.substring(end);

                             element.selectionStart = element.selectionEnd = end + link.length;
             },

                                                list() {
                                                                var element = textarea[0];

                                                                var start = element.selectionStart;
                                                                var end = element.selectionEnd;

                                                                var value = element.value;



                                                                var selections = value.substring(start, end).split("\n");



                                                                for(var i = 0; i < selections.length; i++) {

                                                                                selections[i] = '* ' + selections[i];

                                                                 }



                                                                element.value = value.substring(0, start) + "\n" + selections.join("\n") + "\n" + value.substring(end);
                                                },

                                                quote() {
                                                                var element = textarea[0];

                                                                var start = element.selectionStart;
                                                                var end = element.selectionEnd;

                                                                var value = element.value;



                                                                var selections = value.substring(start, end).split("\n");



                                                                for(var i = 0; i < selections.length; i++) {

                                                                               selections[i] = '> ' + selections[i];

                                                                }



                                                                element.value = value.substring(0, start) + selections.join("\n") + value.substring(end);
                                                },

             h1() {

                wrap('#', '');                                                      

                                                },

             h2() {

                wrap('##', '');                                                   

                                                },

             h3() {

                wrap('###', '');                                                 

                                                },

             h4() {

                wrap('####', '');                                                              

                                                },

             h5() {

                wrap('#####', '');                                                           

                                                },

             h6() {

                wrap('######', '');                                                        

                                                }

                                };



                                textarea.on('keydown', event => {

                                                if(event.keyCode === 9) {

                                                                event.preventDefault();

                                                                event.stopPropagation();

  

                                                                if(event.shiftKey && event.keyCode === 9) {

                                                                               untab(event);

                                                                }

                                                                else {

                                                                               tab(event);

                                                                }

                                                }

                                });



                                container.on('click', 'nav a', event => {
                                                var a = $(event.target);
                                                var method = a.attr('href').split('#').pop();



                                                if(controls[method]) controls[method]();



                                                return false;
                                });
                };

})(Zepto));