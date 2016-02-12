<?php
/* Last updated with phpFlickr 1.3.2
 *
 * This example file shows you how to call the 100 most recent public
 * photos.  It parses through them and prints out a link to each of them
 * along with the owner's name.
 *
 * Most of the processing time in this file comes from the 100 calls to
 * flickr.people.getInfo.  Enabling caching will help a whole lot with
 * this as there are many people who post multiple photos at once.
 *
 * Obviously, you'll want to replace the "<api key>" with one provided 
 * by Flickr: http://www.flickr.com/services/api/key.gne
 */
require_once("flickrApi.php");

$searchQuery = $_POST["search"];
$f = new flikrConnect();
$recent = $f->photos_search($searchQuery);

<?php foreach ($recent['photo'] as $photo): ?>
$owner = $f->people_getInfo($photo['owner']);
echo "<a href='http://www.flickr.com/photos/" . $photo['owner'] . "/" . $photo['id'] . "/'>";
    echo $photo['title'];
    echo "</a> Owner: ";
    echo "<a href='http://www.flickr.com/people/" . $photo['owner'] . "/'>";
    echo $owner['username'];
    echo "</a><br>";


<?php endforeach; ?>
		<a href="#img1"><img class="thumb" src="thumb-1.jpg"></a>

		<!-- lightbox container hidden with CSS -->
		<div class="lightbox" id="img1">
		  <a href="#_" class="btn-close">X</a>
		  <img src="URL">
		</div>

		<a href="#img2">
		<img class="thumb" src="thumb-2.jpg">
		</a>
		<!-- lightbox container hidden with CSS -->
		<div class="lightbox" id="img2">
		  <a href="#img1" class="light-btn btn-prev">prev</a>
		    <a href="#_" class="btn-close">X</a>
		    <img src="2.jpg">
		  <a href="#img3" class="light-btn btn-next">next</a>
		</div>

		<a href="#img3">
		<img class="thumb" src="thumb-3.jpg">
		</a>
		<!-- lightbox container hidden with CSS -->
		<div class="lightbox" id="img3">
		  <a href="#img2" class="light-btn btn-prev">prev</a>
		    <a href="#_" class="btn-close">X</a>
		    <img src="3.jpg">
		  <a href="#img1" class="light-btn btn-next">next</a>

		</div>
	</div>
	<script type="text/javascript">

		function do_connect(arrImgs){
			//connect to dp api
			console.log("array of stuff i have:", arrImgs);
		}

	</script>


?>