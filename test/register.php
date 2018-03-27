<?php

ob_start();

if(file_exists("install.php") == "1"){
	header('Location: install.php');
	exit();
}

include 'inc/database.php';

$result = mysqli_query($con, "SELECT * FROM `settings` LIMIT 1") or die(mysqli_error($con));
while($row = mysqli_fetch_assoc($result)){
	$website = $row['website'];
	$favicon = $row['favicon'];
}

if (!isset($_SESSION)) { 
	session_start(); 
}

if (isset($_SESSION['username'])) {
	header('Location: index.php');
	exit();
}

if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['confirmpassword']) && isset($_POST['email'])){

	$username = mysqli_real_escape_string($con, $_POST['username']);
	$password = mysqli_real_escape_string($con, md5($_POST['password']));
	$confirmpassword = mysqli_real_escape_string($con, md5($_POST['confirmpassword']));
	$email = mysqli_real_escape_string($con, $_POST['email']);
	
	if($password != $confirmpassword){
		die("The confirmation password was not equal to the password.");
	}
	
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("The email entered was not correct.");
    }
	
	$result = mysqli_query($con, "SELECT * FROM `users` WHERE `username` = '$username'") or die(mysqli_error($con));
	if(mysqli_num_rows($result) > 0){
		die("This username already exists.");
	}
	
	$result = mysqli_query($con, "SELECT * FROM `users` WHERE `email` = '$email'") or die(mysqli_error($con));
	if(mysqli_num_rows($result) > 0){
		die("This email already exists.");
	}
	
	$ip = mysqli_real_escape_string($con, $_SERVER['REMOTE_ADDR']);
	$date = date('Y-m-d');
	
	mysqli_query($con, "INSERT INTO `users` (`username`, `password`, `email`, `date`, `ip`) VALUES ('$username', '$password', '$email', '$date', '$ip')") or die(mysqli_error($con));
	
	header("Location: login.php?action=registered");
	
}

?>

<!DOCTYPE html>

<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LizardGen - Register
</title>
<script type="text/javascript" async="" src="./files/ga.js.download"></script><script type="text/javascript" async="" src="./files/recaptcha__en.js.download"></script><script async="" src="./files/cloudflare.min.js.download"></script>
<link href="./files/application.min.css" rel="stylesheet">
 
<!--[if IE 9]>
        <link href="http://lizardgenerator.xyz/css/application-ie9-part2.css" rel="stylesheet">
    <![endif]-->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<script src="./files/api.js.download"></script>

<style type="text/css">.cf-hidden { display: none; } .cf-invisible { visibility: hidden; }</style></head>
<body class="login-page nav-collapsed">
<div class="container">
<main id="content" class="widget-login-container" role="main">
<div class="row">
<div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1">
<section class="widget widget-login animated fadeInUp">
<header>
<h3>Register New Account</h3>
</header>
<div class="widget-body">
<form class="form-signin" action="register.php" method="POST">
        <h2 class="form-signin-heading"><?php echo $website;?></h2>
        <div class="login-wrap">
            <input type="text" id="username" name="username" class="form-control" placeholder="Username" autofocus>
            <input type="password" id="password" name="password" class="form-control" placeholder="Password">
			<input type="password" id="confirmpassword" name="confirmpassword" class="form-control" placeholder="Confirm Password">
			<input type="text" id="email" name="email" class="form-control" placeholder="Email">
            <button class="btn btn-lg btn-login btn-block" type="submit">Register</button>
	  </form>

			<div class="registration">
                Already have an account?&nbsp
                <a class="" href="login.php">
                    Sign In
                </a>
            </div>

</form>
</div>
</section>
</div>
</div>
</main>
<footer class="page-footer">
2016 © LizardGenerator!.
</footer>
</div>
 
<div class="loader-wrap hiding hide">
<i class="fa fa-circle-o-notch fa-spin-fast"></i>
</div>
 
<script src="./files/jquery.min.js.download"></script>
<script src="./files/jquery.pjax.js.download"></script>
<script src="./files/transition.js.download"></script>
<script src="./files/collapse.js.download"></script>
<script src="./files/dropdown.js.download"></script>
<script src="./files/button.js.download"></script>
<script src="./files/tooltip.js.download"></script>
<script src="./files/alert.js.download"></script>
<script src="./files/jquery.slimscroll.min.js.download"></script>
<script src="./files/widgster.js.download"></script>
 
<script src="./files/settings.js.download"></script>
<script src="./files/app.js.download"></script>
 
 

</body></html>