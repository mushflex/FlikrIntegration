

/*
 * Flikr Api Model
 * 
 *  It has the Api key and makes the call to Flikr Api to search for photos
 *  It returns the response as a JSON object to the controller that called it
 */
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
	    	if (req.readyState == 4 && req.status == 200) {
	            var objResp = FlikrApp.xmlToJson(req.responseXML.documentElement);
	            console.log(objResp);
	            FlikrApp.drawOutput(objResp);
	        }
	    	
	    }
	    var url = FlikrApp.api_url + "?method=flickr.photos.search&api_key="+FlikrApp.api_key+"&text="+query;
	    req.open("GET", url, true);
	    console.log(req);
	    req.send(null);
	    
	},

	xmlToJson: function(xml) {
		
		// Create the return object
		var	data = {};

		// append a value
		function Add(name, value) {
			if (data[name]) {
				if (data[name].constructor != Array) {
					data[name] = [data[name]];
				}
				data[name][data[name].length] = value;
			}
			else {
				data[name] = value;
			}
		};
		
		// element attributes
		var c, cn;
		for (c = 0; cn = xml.attributes[c]; c++) {
			Add(cn.name, cn.value);
		}
		
		// child elements
		for (c = 0; cn = xml.childNodes[c]; c++) {
			if (cn.nodeType == 1) {
				if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
					// text value
					Add(cn.nodeName, cn.firstChild.nodeValue);
				}
				else {
					// sub-object
					Add(cn.nodeName, FlikrApp.xmlToJson(cn));
				}
			}
		}

		return data;
	},
	
	// handles the response, adds the html
	drawOutput: function(respArray) {
		arrPhotos = respArray.photos.photo;
		var strHtml = "";
		//console.log("arrPhotos"+arrPhotos);
	    for(index in arrPhotos) {
	    	var objPhoto = arrPhotos[index];
	    	console.log("photo is: ", objPhoto);
	    	var imgUrlThumb = "https://farm"+objPhoto.farm+".staticflickr.com/"+objPhoto.server+"/"+objPhoto.id+"_"+objPhoto.secret+"_t.jpg"
	    	var imgUrlOrig = "https://farm"+objPhoto.farm+".staticflickr.com/"+objPhoto.server+"/"+objPhoto.id+"_"+objPhoto.secret+".jpg"	
	    	var	imgDesc = objPhoto.title
	        strHtml += '<li><a href="'+imgUrlOrig+'"><img src="'+imgUrlThumb+'" alt="'+imgDesc+'" /><img src="'+imgUrlOrig+'" alt="'+imgDesc+'" class="preview" /></a></li>';
	    }
	    //print onto list
	    document.getElementById('gallery').innerHTML = strHtml;
	   
	},
	
	//handles drawing an error message
	drawError: function() {
	    var container = document.getElementById('gallery');
	    container.innerHTML = 'There was an error!';
	}
	
		
}


function printOutput(objForm) {
	var strSrchQry = objForm.searchBox.value;
	FlikrApp.doAjax(strSrchQry);	
}  




