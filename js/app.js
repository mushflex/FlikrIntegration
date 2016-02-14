

/*
 * Flikr Api Model
 * 
 *  It has the Api key and makes the call to Flikr Api to search for photos
 *  It returns the response as a JSON object to the controller that called it
 */
var FlikrApp = {
	
	api_url: "https://api.flickr.com/services/rest/",
	api_key: "5a14290fec50f53f1f4f5e8c15ae1b0a",
	strSavedQuery: "", 
	maxPageNo: 0,
	
	// helper function for cross-browser request object
	doFlikrApiCall: function (query, pageNo) {
		
		FlikrApp.strSavedQuery = query;
	    var req = false;
	    var blnFirstSrch = false;
	    if (!pageNo){
	    	pageNo = 1;
	    	blnFirstSrch = true
	    }
	    try{
	        // most browsers
	        req = new XMLHttpRequest();
	    } catch (e){
	        // IE support (not tested)
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
	            var objResp = FlikrApp.convertXmlToJson(req.responseXML.documentElement);
	            //console.log(objResp);
	            FlikrApp.drawOutput(objResp);
	            
	            //setup/update pagination
	            if(blnFirstSrch)
	            	FlikrApp.updatePagination(pageNo, pageNo);
	            else
	            	FlikrApp.updatePagination(FlikrApp.maxPageNo-7, pageNo);
	        }
	    	
	    } 
	    var url = FlikrApp.api_url + "?method=flickr.photos.search&api_key="+FlikrApp.api_key+"&text="+query+"&per_page=5&page="+pageNo;
	    req.open("GET", url, true);
	    //console.log(req);
	    req.send(null);
	    
	},

	convertXmlToJson: function(strXml) {
		
		// Create the return object
		var	jsonData = {};

		// append a value
		function Add(name, value) {
			if (jsonData[name]) {
				if (jsonData[name].constructor != Array) {
					jsonData[name] = [jsonData[name]];
				}
				jsonData[name][jsonData[name].length] = value;
			}
			else {
				jsonData[name] = value;
			}
		};
		
		// element attributes
		var child, childnode;
		for (child = 0; childnode = xml.attributes[child]; child++) {
			Add(childnode.name, childnode.value);
		}
		
		// child elements
		for (child = 0; childnode = xml.childNodes[child]; child++) {
			if (childnode.nodeType == 1) {
				if (childnode.childNodes.length == 1 && childnode.firstChild.nodeType == 3) {
					// text value
					Add(childnode.nodeName, childnode.firstChild.nodeValue);
				}
				else {
					// recursively go deeper into tree
					Add(childnode.nodeName, FlikrApp.convertXmlToJson(childnode));
				}
			}
		}

		return jsonData;
	},
	
	// handles the response, adds the html
	drawOutput: function(respArray) {
		arrPhotos = respArray.photos.photo;
		var strHtml = "";
		//console.log("arrPhotos"+arrPhotos);
	    for(index in arrPhotos) {
	    	var objPhoto = arrPhotos[index];
	    	//console.log("photo is: ", objPhoto);
	    	var imgUrlThumb = "https://farm"+objPhoto.farm+".staticflickr.com/"+objPhoto.server+"/"+objPhoto.id+"_"+objPhoto.secret+"_t.jpg"
	    	var imgUrlOrig = "https://farm"+objPhoto.farm+".staticflickr.com/"+objPhoto.server+"/"+objPhoto.id+"_"+objPhoto.secret+".jpg"	
	    	var	imgDesc = objPhoto.title
	        strHtml += '<li><a href="'+imgUrlOrig+'" target="_blank"><img src="'+imgUrlThumb+'" alt="'+imgDesc+'" title="'+imgDesc+'" /><img src="'+imgUrlOrig+'" alt="'+imgDesc+'" title="'+imgDesc+'" class="preview" /></a></li>';
	    }
	    //print onto list
	    document.getElementById('gallery').innerHTML = strHtml;
	},
	
	/*
	 * pagination section
	 */
	updatePagination: function(pageNo, activePage){
		var strHtml = "";
		FlikrApp.maxPageNo = pageNo+7;
		if(pageNo > 1){
			intPrevSetPage = FlikrApp.maxPageNo-15;
			if(intPrevSetPage < 0) intPrevSetPage = 1; 
			strHtml += '<li onclick="javascript:paginationChange('+intPrevSetPage+')"><a><<</a></li>'
		}
		for(var i=pageNo;i<=FlikrApp.maxPageNo;i++){
			if(i == activePage)
				strHtml += '<li onclick="javascript:printOutput(null,'+i+')"><a class="active">'+i+'</a></li>'
			else
				strHtml += '<li onclick="javascript:printOutput(null,'+i+')"><a>'+i+'</a></li>'
		}
		intNewSetPage = FlikrApp.maxPageNo+1;
		strHtml += '<li onclick="javascript:paginationChange('+intNewSetPage+')"><a>>></a></li>'
		
		document.getElementById('pagination').innerHTML = strHtml;
	},
	
	//handles drawing an error message
	drawError: function() {
	    var container = document.getElementById('gallery');
	    container.innerHTML = 'There was an error!';
	}
	
}


function printOutput(objForm, pageNo) {
	if(objForm)	var strSrchQry = objForm.searchBox.value;
	else var strSrchQry = FlikrApp.strSavedQuery;
	
	if(pageNo)FlikrApp.doFlikrApiCall(strSrchQry, pageNo);	
	else FlikrApp.doFlikrApiCall(strSrchQry);	
} 

function paginationChange(intPageNo){
	FlikrApp.updatePagination(intPageNo);
}




