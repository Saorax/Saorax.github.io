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

if(isset($_POST['username']) && isset($_POST['password'])){

	$username = mysqli_real_escape_string($con, $_POST['username']);
	$password = mysqli_real_escape_string($con, md5($_POST['password']));
	
	$result = mysqli_query($con, "SELECT * FROM `users` WHERE `username` = '$username'") or die(mysqli_error($con));
	if(mysqli_num_rows($result) < 1){
		header("Location: login.php?error=incorrect-password");
	}
	while($row = mysqli_fetch_array($result)){
		if($password != $row['password']){
			header("Location: login.php?error=incorrect-password");
		}elseif($row['status'] == "0"){
			header("Location: login.php?error=banned");
		}else{
			$_SESSION['id'] = $row['id'];
			$_SESSION['username'] = $username;
			$_SESSION['email'] = $row['email'];
			$_SESSION['rank'] = $row['rank'];
			header("Location: index.php");
		}
	}
	
}

?>

<!DOCTYPE html>

<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Lizard - Login</title>

<link href="./files/application.min.css" rel="stylesheet">
 
<!--[if IE 9]>
        <link href="https://wickedgen.com/css/application-ie9-part2.css" rel="stylesheet">
    <![endif]-->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
    <script src='https://www.google.com/recaptcha/api.js'></script>

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<style type="text/css">.cf-hidden { display: none; } .cf-invisible { visibility: hidden; }</style></head>
<body class="login-page nav-collapsed">
<div class="container">
<main id="content" class="widget-login-container" role="main">
<div class="row">
<div class="col-lg-4 col-sm-6 col-xs-10 col-lg-offset-4 col-sm-offset-3 col-xs-offset-1">
<section class="widget widget-login animated fadeInUp">
<header>
<h3>Login to LizardGenerator!</h3>
</header>
<div class="widget-body">
<p class="widget-login-info">
Don't have an account? Sign up now!
</p>
 <form class="form-signin" action="login.php" method="POST">
<div class="form-group ">
            <input type="text" id="username" name="username" class="form-control" placeholder="Username" autofocus>

</div>
<div class="form-group ">
            <input type="password" id="password" name="password" class="form-control" placeholder="Password">

</div>
<div class="text-center">
<div class="g-recaptcha" data-sitekey="6LcvmBMUAAAAAIHAUa-iezLOBdhVXD464ltmW8M1"></div>
<div class="clearfix">
<div class="btn-toolbar pull-right">
<a href="http://lizardgenerator.xyz/register.php" class="btn btn-default btn-sm">Create an Account</a>
<button type="submit" class="btn btn-inverse btn-sm">Login</button>
</div>
</div>
<div class="row">
<div class="col-sm-6 col-sm-push-6">
<div class="clearfix">
<div class="checkbox widget-login-info pull-right ml-n-lg">
<input type="checkbox" name="rememberMe" id="rememberMe" value="1">
<label for="rememberMe">Keep me signed in </label>
</div>
</div>
</div>
<div class="col-sm-6 col-sm-pull-6">
<a class="mr-n-lg" href="https://wickedgen.com/forgot">Forgot Password</a>
</div>
</div>
</form>
</div>
</section>
</div>
</div>
</main>
<footer class="page-footer">
2016 © to LizardGenerator!.
</footer>
</div>

<?php 
	if($_GET['error'] == "banned"){
		echo '
			<div class="modal fade" id="error" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 15%; overflow-y: visible; display: none;">
				<div class="modal-dialog modal-sm">
					<div class="modal-content panel-danger">
						<div class="modal-header panel-heading">
							<center><h3 style="margin:0;"><i class="icon-warning-sign"></i> Error!</h3></center>
						</div>
						<div class="modal-body">
							<center>
								<strong>Your account has been banned.</strong>
							</center>
						</div>
					</div>
				</div>
			</div>
		';
	}

	if($_GET['error'] == "incorrect-password"){
		echo '
			<div class="modal fade" id="error" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 15%; overflow-y: visible; display: none;">
				<div class="modal-dialog modal-sm">
					<div class="modal-content panel-danger">
						<div class="modal-header panel-heading">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<center><h3 style="margin:0;"><i class="icon-warning-sign"></i> Error!</h3></center>
						</div>
						<div class="modal-body">
							<center>
								<strong>The password you entered was not correct.</strong>
							</center>
						</div>
					</div>
				</div>
			</div>
		';
	}
	
	if($_GET['error'] == "not-logged-in"){
		echo '
			<div class="modal fade" id="error" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 15%; overflow-y: visible; display: none;">
				<div class="modal-dialog modal-sm">
					<div class="modal-content panel-warning">
						<div class="modal-header panel-heading">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<center><h3 style="margin:0;"><i class="icon-warning-sign"></i> Error!</h3></center>
						</div>
						<div class="modal-body">
							<center>
								<strong>You must be logged in to do that.</strong>
							</center>
						</div>
					</div>
				</div>
			</div>
		';
	}
	?>
	
 
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
 
 <?php
	if(isset($_GET['error'])){
		echo "<script type='text/javascript'>
				$(document).ready(function(){
				$('#error').modal('show');
				});
			  </script>"
		;
	}
	?>


</body></html>