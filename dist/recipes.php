<?php header('Content-Type: application/json');
one();

function one(){
	$files = array_slice(scandir('data/recipes'), 2);

	$recipes = [];
	
	foreach($files AS $file){
		
		$temp = json_decode(file_get_contents('data/recipes/'.$file));
		
		if(!$temp){
			var_dump("ERROR: Invalid JSON in: 'data/recipes/" . $file);
			die;
		}else{
			$recipes[$temp->id] = $temp;
		}
			
	}
	
echo json_encode($recipes);

$myfile = fopen("recipes.json", "w") or die("Unable to open file!");
fwrite($myfile, json_encode($recipes));
fclose($myfile);

}