<?php
	define('__ROOT__', dirname(dirname(dirname(dirname(__FILE__))))); 
	require_once(__ROOT__."/wp-load.php");
	require_once(__ROOT__."/wp-includes/wp-db.php");
	
	$showposts = $_POST['num'];
	$subject = $_POST['subject'];
	$offset = $_POST['n']*$_POST['num'];
	global $post;
	$posts = $wpdb->get_results($wpdb->prepare("SELECT `post_id`,`meta_value` AS `post_thumbnail_id` FROM `{$wpdb->postmeta}` WHERE `meta_key` = '_thumbnail_id' ORDER BY `post_id` DESC LIMIT {$offset},{$showposts}"),ARRAY_A); 
	$i = 0;
	$darry = array();
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
	    // http://cngulu.com
	    $imgurl = 'http://cngulu.com/wp-content/uploads/'.$nameurl;

	    // if (file_exists($imgurl)) {

	    // 	echo "--------------";
	    // }

	    $content = array($imgurl,$post['post_title'],$post['post_author'],$post['post_date'],$post['guid']);
	    
	    array_push($darry,$content);
	    // Loop... 
	    $i++; 
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
