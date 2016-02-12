


var FlikrApp = {
	
	api_url: "https://api.flickr.com/services/rest/",
	api_key: "5a14290fec50f53f1f4f5e8c15ae1b0a",
	api_sec: "c49b0e390ea61e87",
	
	// helper function for cross-browser request object
	doAjax: function (query, success, error) {
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
	    var url = FlikrApp.api_url + "?method=flickr.photos.search&api_key="+FlikrApp.api_key+"&text="+query;
	    req.open("GET", url, true);
	    console.log(url);
	    req.send();
	    console.log(req);
	    console.log(req.statusText);
	    console.log(req.responseText);
	    
	    return req;
	}
	
	
		
		
}


// handles the click event for link 1, sends the query
function getOutput(strSrchQry) {
	objResp = FlikrApp.doAjax(strSrchQry);
	if (objResp.status == 200) drawOutput(objResp.response);
	else drawError();
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
