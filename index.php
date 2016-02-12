<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>FlikrApp</title>

	<link href="/css/app.css" rel="stylesheet">

</head>
<body>
	<div>

		<form action=""> 
		Search: <input type="text" id="search" onkeyup="getOutput(this.value)">
		</form>
		
		<div class="lightbox" id="output">
			<!-- images go here -->
		</div>
	</div>
	<script type="text/javascript">
		// handles the click event for link 1, sends the query
		function getOutput() {
			doAjax(
		      'flikrConnect.php', // URL for the PHP file
		       drawOutput,  // handle successful request
		       drawError    // handle error
		  );
		  return false;
		}  
		// handles drawing an error message
		function drawError() {
		    var container = document.getElementById('output');
		    container.innerHTML = 'There was an error!';
		}
		// handles the response, adds the html
		function drawOutput(responseText) {
		    var container = document.getElementById('output');
		    container.innerHTML = responseText;
		}
		// helper function for cross-browser request object
		function doAjax(url, success, error) {
		    var req = false;
		    try{
		        // most browsers
		        req = new XMLHttpRequest();
		    } catch (e){
		        // IE
		        try{
		            req = new ActiveXObject("Msxml2.XMLHTTP");
		        } catch(e) {
		            // try an older version
		            try{
		                req = new ActiveXObject("Microsoft.XMLHTTP");
		            } catch(e) {
		                return false;
		            }
		        }
		    }
		    if (!req) return false;
		    if (typeof success != 'function') success = function () {};
		    if (typeof error!= 'function') error = function () {};
		    req.onreadystatechange = function(){
		        if(req.readyState == 4) {
		            return req.status === 200 ? 
		                success(req.responseText) : error(req.status);
		        }
		    }
		    req.open("GET", url, true);
		    req.send(null);
		    return req;
		}

	</script>
</body>
</html>
