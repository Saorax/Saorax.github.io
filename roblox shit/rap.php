<?php

$uname = $_GET['u'];

$error = "";

$user = "";

if(empty($uname)) {

	$error = "{\"error\": \"No Username specified. Add \'?u=USERNAME/USERID\' \"}";	echo $error;

} else {

	if (is_numeric($userId)) {

		$user = $userId;

	} else {

		$url = "https://api.roblox.com/users/get-by-username?username=".$uname;

		$json = json_decode(file_get_contents($url));

		if (($json->success) == "false") {

			$error = $json->errorMessage;

			echo $error;

		} else {

			$user = $json->Id;

		}

	}

	$rap1 = 0;

	$rap2 = 0;

	$rap3 = 0;

	$rap = "";

	$url1 = "https://inventory.roblox.com/v1/users/".$user."/assets/collectibles?assetType=Hat&sortOrder=Asc&limit=100";

	$json1 = json_decode(file_get_contents($url1));

	if(($json1->previousPageCursor) == null) {

		$url2 = "https://inventory.roblox.com/v1/users/".$user."/assets/collectibles?assetType=Face&sortOrder=Asc&limit=100";

		$json2 = json_decode(file_get_contents($url2));

		$decode = $json2->data;

		foreach($decode as $var1) {

			$rap1 += $var1->recentAveragePrice;

		}

		$url3 = "https://inventory.roblox.com/v1/users/".$user."/assets/collectibles?assetType=Gear&sortOrder=Asc&limit=100";

		$json3 = json_decode(file_get_contents($url3));

		$decode = $json3->data;

		foreach($decode as $var2) {

			$rap2 += $var2->recentAveragePrice;

		}

		$url4 = "https://inventory.roblox.com/v1/users/".$user."/assets/collectibles?assetType=Hat&sortOrder=Asc&limit=100";

		$json4 = json_decode(file_get_contents($url4));

		$decode = $json4->data;

		foreach($decode as $var3) {

			$rap3 += $var3->recentAveragePrice;

		}

		$rap = $rap3+$rap2+$rap1;

		echo "{\"rap\": \"".$rap."\"}";

	} else if (($json1->errors->code) == "1") {

		$error = "{\"error\": \"".$json1->errors->message."\"}";

		echo $error;

	}

}

?>
