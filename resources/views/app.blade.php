<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel con React</title>
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script src="https://www.paypal.com/sdk/js?client-id=AZyFVJuFkIHG_jTud0wVQqgmEOLTMBtJjutOEIq9UI4dDn0WTy_tvxuDWJSwnB6szmXWqB2r-5CK8LRB"></script>
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>