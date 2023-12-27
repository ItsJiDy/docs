<?php
// Check if form is submitted and we have the fields we want.
if(isset($_POST["mytext"]))
{
	$file = "data.txt";
	$text = $_POST["mytext"];

	// This file will create a data.txt file and put whatever is in the POST field mytext into the text and put a new line on the end.
	// The FILE_APPEND allows you to append text to the file. LOCK_EX prevents anyone else from writing to the file at the same time.
	file_put_contents($file, $text . "\r\n", FILE_APPEND | LOCK_EX);
}
?>