<!-- FA Fonts -->
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<script>
        function setFocus() {
            var editor = $('textarea');
            var value = editor.val();
            editor.val("");
            editor.focus();
            editor.val(value);
        }
</script>

<nav class="btn-group">
    <a class="btn btn-default fa fa-bold" href="#bold" onclick="setFocus();"></a>
    <a class="btn btn-default fa fa-italic icon italic" href="#italic" onclick="setFocus();"></a>
    <!-- not implemented in Anchor 0.9.2 <a class="btn btn-default fa fa-strikethrough" href="#strike" onclick="setFocus();"></a> -->
    <a class="btn btn-default fa fa-list-ul" href="#list" onclick="setFocus();"></a>
    <a class="btn btn-default fa fa-quote-right" href="#quote" onclick="setFocus();"></a>
    <a class="btn btn-default fa fa-code" href="#code" onclick="setFocus();"></a>
    <a class="btn btn-default fa fa-link" href="#link" onclick="setFocus();"></a>
    <a class="btn btn-default fa fa-picture-o" href="#img" onclick="setFocus();"></a>
    <a class="btn btn-default" href="#h1" onclick="setFocus();">H1</a>
    <a class="btn btn-default" href="#h2" onclick="setFocus();">H2</a>
    <a class="btn btn-default" href="#h3" onclick="setFocus();">H3</a>
    <a class="btn btn-default" href="#h4" onclick="setFocus();">H4</a>
    <a class="btn btn-default" href="#h5" onclick="setFocus();">H5</a>
    <a class="btn btn-default" href="#h6" onclick="setFocus();">H6</a>
</nav>

