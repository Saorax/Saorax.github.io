 <?php
$cardlist = $_GET['c'];
$naem = array();
$errm = new \ stdClass();
$pattack = array();
$ptypes = "";
$pretreat = "";
$pname = "";
$presistance = "";
$pweakness = "";
$ptext = "";
$partist = "";
$prarity = "";
/*
$errm->success = false;
$errm->error = "No card specified";
echo json_encode($errm);

$url = "url";
$json = json_decode(file_get_contents($url));
$username = $json->Username;
 */
//require "../vendor/autoload.php";

if (empty($cardlist)) {
	$errm->success = false;
	$errm->error = "No card specified";
	echo json_encode($errm);
} else {
	$url = "https://api.pokemontcg.io/v1/cards?name=".$cardlist;
	$json = json_decode(file_get_contents($url));
	//echo $json->cards[0]->name;
	if ($json->cards == null) {
		$errm->error = "No cards founds";
		echo json_encode($errm);
	} else {
		foreach($json->cards as $x) {
			//echo $x->name;
			$url1 = "https://api.pokemontcg.io/v1/sets/".$x->setCode;
			$json1 = json_decode(file_get_contents($url1));
			// artist //
			if (!$x->artist) {
				$partist = "N/A";
			}
			elseif($x->artist == "") {
				$partist = "N/A";
			}
			else {
				$partist = $x->artist;
			}
			// rarity //
			if (!$x->rarity) {
				$prarity = "N/A";
			}
			elseif($x->rarity == "") {
				$prarity = "N/A";
			}
			else {
				$prarity = $x->rarity;
			}
			if (!$x->attacks) {
				foreach($x->text as $y) {
					$text.= $y."\n";
				}
			} else {
				$costt = $attacks->cost;
				foreach($x->attacks as $z) {
					unset($pattack);
					$pattack[0] = array(
							'text' => $x->attacks[0]->text,
							'cost' => $costt,
							'name' => $x->attacks[0]->name,
							'damage' => $x->attacks[0]->damage);
					unset($costt);
				}
			}
			$naem[] = array(
					'name' => $x->name,
					'rarity' => $prarity,
					'artist' => $partist,
					'id' => $x->id,
					'hp' => $x->hp,
					'set' => $x->set,
					'setAmount' => $json1->set->totalCards,
					'setCode' => $x->setCode,
					'setNumber' => $x->number,
					'setDate' => $json1->set->releaseDate,
					'setSymbol' => $json1->set->symbolUrl,
					'setLogo' => $json1->set->logoUrl,
					'subtype' => $x->subtype,
					'supertype' => $x->supertype,
					'series' => $x->series,
					'image' => $x->imageUrlHiRes,
					'pokedexNum' => $x->nationalPokedexNumber,
					'attacks' => $pattack);
		}

		echo json_encode($naem);
	}
}
?>
