<?php
	define('__ROOT__', dirname(dirname(dirname(dirname(__FILE__))))); 
	require_once(__ROOT__."/wp-load.php");
	require_once(__ROOT__."/wp-includes/wp-db.php");
	
	$showposts = $_POST['num'];
	$subject = $_POST['subject'];
	$offset = $_POST['n']*$_POST['num'];
	// $showposts = 10;
	// $subject = 90;
	// $offset = 10;

	global $post;
	global $wpdb;
	$posts = $wpdb->get_results($wpdb->prepare("SELECT `post_id`,`meta_value` AS `post_thumbnail_id` FROM `{$wpdb->postmeta}` WHERE `meta_key` = '_thumbnail_id' ORDER BY `post_id` DESC LIMIT {$offset},{$showposts}"),ARRAY_A); 
	$i = 0;
	$darry = array();

	function get_post_category_id($post_ID){
		 global $wpdb;
		 $sql="SELECT `term_taxonomy_id` FROM $wpdb->term_relationships WHERE `object_id`='".$post_ID."';";
		 $cat_id=$wpdb->get_results($sql);
		 $output = array();
		 foreach($cat_id as $catId){
		 	array_push($output, $catId->term_taxonomy_id);
		}
		 return($output);
	}


if ($subject) {

	$cat_id=$wpdb->get_results($wpdb->prepare("SELECT `object_id` FROM $wpdb->term_relationships WHERE `term_taxonomy_id` = {$subject} ORDER BY `object_id` DESC LIMIT {$offset},{$showposts}")); 
	foreach($cat_id as $catId) {
	 	$post = get_post($catId->object_id,ARRAY_A);
	 	$id = $catId->object_id; 
		$imgid = get_post_meta( $id, '_thumbnail_id', true );
		$iarray = $wpdb->get_results("SELECT * FROM $wpdb->postmeta WHERE post_id = $imgid;");
		$name = explode('.', $iarray[0]->meta_value);
		$nameture = explode('/', $name[0]);
		$nameturesss = urlencode($nameture[count($nameture)-1]);
		unset($nameture[count($nameture)-1]);

		$nameurl = implode('/',$nameture).'/'.$nameturesss."-150x150.".$name[count($name)-1];
	    // http://cngulu.com
	    $imgurl = 'http://cngulu.com/wp-content/uploads/'.$nameurl;
	    
	    $nameconturl = implode('/',$nameture).'/'.$nameturesss."-220x150.".$name[count($name)-1];
	    $imgconturl = 'http://cngulu.com/wp-content/uploads/'.$nameconturl;

	    // if (file_exists($imgurl)) {

	    // 	echo "--------------";
	    // }

	    $content = array($imgurl,$post['post_title'],$post['post_author'],$post['post_date'],$post['guid'],$id,$imgconturl);
	    
	    array_push($darry,$content);
	    // Loop... 

	}
		
}
else {

	foreach($posts as $postdata) { 
	    $post = get_post($postdata['post_id'],ARRAY_A); 
	    $id = $postdata['post_id'];

	    // echo get_the_post_thumbnail($postdata['post_id'], array(50,50));

	    $imgid = get_post_meta( $postdata['post_id'], '_thumbnail_id', true );
		
		$iarray = $wpdb->get_results("SELECT * FROM $wpdb->postmeta WHERE post_id = $imgid;");

		$name = explode('.', $iarray[0]->meta_value);
		$nameture = explode('/', $name[0]);
		$nameturesss = urlencode($nameture[count($nameture)-1]);
		unset($nameture[count($nameture)-1]);

		$nameurl = implode('/',$nameture).'/'.$nameturesss."-150x150.".$name[count($name)-1];
		$nameconturl = implode('/',$nameture).'/'.$nameturesss."-220x150.".$name[count($name)-1];
	    // http://cngulu.com
	    $imgurl = 'http://cngulu.com/wp-content/uploads/'.$nameurl;
	    $imgconturl = 'http://cngulu.com/wp-content/uploads/'.$nameconturl;

	    // if (file_exists($imgurl)) {

	    // 	echo "--------------";
	    // }

	    $content = array($imgurl,$post['post_title'],$post['post_author'],$post['post_date'],$post['guid'],$id,$imgconturl);
	    
	    array_push($darry,$content);
	    // Loop... 
	    $i++; 
	}

}
	// $imageData = file_get_contents($darry[0][0]);
	// header('Content-Type: image/jpg');
	// print_r ($imageData);
	// echo '<img src=data:image/jpeg;base64,'.$imageData.'<.img>';
	// echo $darry[0][0];
	// echo imagecreatefromstring ($darry[0][0]);
	// $ar = array($imageData,$darry[0][1]);
	echo json_encode($darry);
?>
