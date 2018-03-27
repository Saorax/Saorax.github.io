<?php

include "inc/header.php";

if ($_SESSION['rank'] < "5") {
	header('Location: index.php?error=no-admin');
	exit();
}

$profit = 0;

$result = mysqli_query($con, "SELECT * FROM `subscriptions`") or die(mysqli_error($con));
while($row = mysqli_fetch_assoc($result)) {
	$profit = $profit + $row['price'];
}

$profittoday = 0;

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `date` = '$date'") or die(mysqli_error($con));
while($row = mysqli_fetch_assoc($result)) {
	$profittoday = $profittoday + $row['price'];
}

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `active` = '1' AND `expires` >= '$date'") or die(mysqli_error($con));
$activesubscriptions = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `users`") or die(mysqli_error($con));
$totalusers = mysqli_num_rows($result);

if (isset($_POST['addgenerator'])){
	$name = mysqli_real_escape_string($con, $_POST['addgenerator']);
	mysqli_query($con, "INSERT INTO `generators` (`name`) VALUES ('$name')") or die(mysqli_error($con));
	
	$result = mysqli_query($con, "SELECT * FROM `generators` WHERE `name` = '$name'") or die(mysqli_error($con));
	while($row = mysqli_fetch_assoc($result)) {
		$accountid = $row['id'];
	}
	
	mysqli_query($con, "CREATE TABLE `generator$accountid` (id INT NOT NULL AUTO_INCREMENT,alt VARCHAR(1000),status INT(1) DEFAULT '1',primary key (id))") or die(mysqli_error($con));
}

if (isset($_GET['deletegenerator'])){
	$id = mysqli_real_escape_string($con, $_GET['deletegenerator']);
	mysqli_query($con, "DROP TABLE `generator$id`") or die(mysqli_error($con));
	mysqli_query($con, "DELETE FROM `generators` WHERE `id` = '$id'") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-manage.php");
		</script>
	';
}

if (isset($_POST['editgenerator']) & isset($_POST['generatorid'])){
	$id = mysqli_real_escape_string($con, $_POST['generatorid']);
	$name = mysqli_real_escape_string($con, $_POST['editgenerator']);
	mysqli_query($con, "UPDATE `generators` SET `name` = '$name' WHERE `id` = '$id'") or die(mysqli_error($con));
}

if (isset($_POST['alts']) & isset($_POST['generator'])){
	$id = mysqli_real_escape_string($con, $_POST['generator']);
	mysqli_query($con,"DELETE FROM `generator$id`") or die(mysqli_error($con));
	$values = htmlspecialchars($_POST['alts']);
	$array = explode("\n", $values);
	foreach($array as $line){
		$line = mysqli_real_escape_string($con, $line);
		if (!empty($line)) {
			mysqli_query($con, "INSERT INTO `generator$id` (`alt`) VALUES ('$line')") or die(mysqli_error($con));
		}
	}
}

if (isset($_POST['addpackage']) & isset($_POST['price']) & isset($_POST['generator']) & isset($_POST['length'])){
	$name = mysqli_real_escape_string($con, $_POST['addpackage']);
	$price = mysqli_real_escape_string($con, $_POST['price']);
	$generator = mysqli_real_escape_string($con, $_POST['generator']);
	$max = mysqli_real_escape_string($con, $_POST['max']);
	$length = mysqli_real_escape_string($con, $_POST['length']);
	mysqli_query($con, "INSERT INTO `packages` (`name`, `price`, `length`, `generator`, `accounts`) VALUES ('$name', '$price', '$length', '$generator', '$max')") or die(mysqli_error($con));
}

if (isset($_GET['deletepackage'])){
	$id = mysqli_real_escape_string($con, $_GET['deletepackage']);
	mysqli_query($con, "DELETE FROM `packages` WHERE `id` = '$id'") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-manage.php");
		</script>
	';
}

if (isset($_POST['editpackage']) & isset($_POST['packageid']) & isset($_POST['editprice']) & isset($_POST['editgenerator']) & isset($_POST['editlength'])){
	$id = mysqli_real_escape_string($con, $_POST['packageid']);
	$name = mysqli_real_escape_string($con, $_POST['editpackage']);
	$price = mysqli_real_escape_string($con, $_POST['editprice']);
	$generator = mysqli_real_escape_string($con, $_POST['editgenerator']);
	$length = mysqli_real_escape_string($con, $_POST['editlength']);
	$max = mysqli_real_escape_string($con, $_POST['editmax']);
	mysqli_query($con, "UPDATE `packages` SET `name` = '$name' WHERE `id` = '$id'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `packages` SET `price` = '$price' WHERE `id` = '$id'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `packages` SET `generator` = '$generator' WHERE `id` = '$id'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `packages` SET `length` = '$length' WHERE `id` = '$id'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `packages` SET `accounts` = '$max' WHERE `id` = '$id'") or die(mysqli_error($con));
}

if (isset($_POST['website']) & isset($_POST['paypal'])){
	$website = mysqli_real_escape_string($con, $_POST['website']);
	$paypal = mysqli_real_escape_string($con, $_POST['paypal']);
	$footer = mysqli_real_escape_string($con, $_POST['footer']);
	$favicon = mysqli_real_escape_string($con, $_POST['favicon']);
	mysqli_query($con, "UPDATE `settings` SET `website` = '$website'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `settings` SET `paypal` = '$paypal'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `settings` SET `footer` = '$footer'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `settings` SET `favicon` = '$favicon'") or die(mysqli_error($con));
}
	
?>


<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LizardGenerator - Dashboard</title>
<link href="./files/application.min.css" rel="stylesheet">
<link href="./files/main.css" rel="stylesheet">
    <script src="https://use.fontawesome.com/2b69ff6045.js"></script>
 
<!--[if IE 9]>
    <link href="./css/application-ie9-part2.css" rel="stylesheet">
    <![endif]-->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<style type="text/css">.cf-hidden { display: none; } .cf-invisible { visibility: hidden; }</style></head>
<body class="nav-static  nav-collapsed pace-done"><div class="pace  pace-inactive"><div class="pace-progress" data-progress-text="100%" data-progress="99" style="width: 100%;">
  <div class="pace-progress-inner"></div>
</div>
<div class="pace-activity"></div></div>
<nav id="sidebar" class="sidebar" role="navigation">
<div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 613px;"><div class="js-sidebar-content" style="overflow: hidden; width: auto; height: 613px;">
<header class="logo hidden-xs">
<a href="./index.php">Black Widow</a>
</header>
    <!-- Source created by Scott Thomas  -->
<ul class="sidebar-nav">
<li class="active">
<a href="./index.php">
<span class="icon">
<i class="fa fa-desktop"></i>
</span>
Dashboard
</a>
</li>
<li>
<a href="./accounts.php">
<span class="icon">
<i class="fa fa-spinner"></i>
</span>
Account List
<span class="label label-danger">
58
</span>
</a>
</li>
<li>
<a href="./purchase.php">
<span class="icon">
<i class="fa fa-shopping-cart"></i>
</span>
Purchase
</a>
</li>
<li>
<a href="./generator.php">
<span class="icon">
<i class="fa fa-paypal"></i>
</span>
Generator
</a>
</li>
<li>
<a href="./free">
<span class="icon">
<i class="fa fa-gift"></i>
</span>
Free Generator
</a>
</li>
<li>
<a href="./support.php">
<span class="icon">
<i class="fa fa-wheelchair-alt "></i>
</span>
Support
</a>
<?php
					if (($_SESSION['rank']) == "5") {
                        echo '
                        <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="falsetrue">Admin <span class="caret"></span></a>
                <ul class="dropdown-menu">
						  
						  <li class="sub-menu">
							  <a href="javascript:;" >
								  <i class="fa fa-user"></i>
								  <span>Administration</span>
							  </a>
							  <ul class="sub">
								  <li><a  href="./adminmanage.php">Manage</a></li>
								  <li><a  href="./adminsupport.php">Support</a></li>
								  <li><a  href="./adminstatistics.php">Statistics</a></li>
								  <li><a  href="./adminflagged.php">Flagged</a></li>
								  <li><a  href="./adminnews.php">News</a></li>
								  <li><a  href="./adminsubscriptions.php">Subscriptions</a></li>
								  <li><a  href="./adminusers.php">Users</a></li>
							  </ul>
						  </li>
						';
					}
                    ?>
                  </ul>
                </ul>
</li>
<div>

                </ul>
</ul>
</div>
</div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 613px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
</nav>
 
<nav class="page-controls navbar navbar-default">
<div class="container-fluid">
 
<div class="navbar-header">
<ul class="nav navbar-nav">
<li>
 
<a class="visible-sm visible-xs" id="nav-collapse-toggle" href="./index.php" title="" data-placement="bottom" data-original-title="Show/hide sidebar">
<span class="rounded rounded-lg bg-gray text-white visible-xs"><i class="fa fa-bars fa-lg"></i></span>
<i class="fa fa-bars fa-lg hidden-xs"></i>
</a>
</li>
<li class="ml-sm mr-n-xs hidden-xs"><a href="./index.php"><i class="fa fa-refresh fa-lg"></i></a></li>
</ul>
 
<a class="navbar-brand visible-xs" href="./index.php">
Black Widow
</a>
</div>
 
 
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="./free">Free Generator <span class="fa fa-flash"></span></a></li>
          <li class="active"><a href="./purchase.php"> Purchase <span class="fa fa-paypal"></span></a></li>
          <li class="active"><a href="./support.php"> Support <span class="fa fa-spinner"></span></a></li>
          <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="fa fa-hand-o-right"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="https://www.youtube.com/channel/UCFMgwRFLSz5Fx3xspqh3nXw">Youtube</a></li>
            <li class="divider"></li>
            <li><a href="./generator.php">Generator</a></li>
            <li class="divider"></li>
            <li><a href="lib/logout.php">Logout</a></li>
          </ul>
        </li>
      </ul>


</nav>
</div><div class="slimScrollBar" style="background: rgb(0, 0, 0); width: 4px; position: absolute; top: 0px; opacity: 0.4; display: none; border-radius: 7px; z-index: 99; right: 1px; height: 613px;"></div><div class="slimScrollRail" style="width: 4px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 0.2; z-index: 90; right: 1px;"></div></div>
</nav>
 
<nav class="page-controls navbar navbar-default">
<div class="container-fluid">
 
<div class="navbar-header">
<ul class="nav navbar-nav">
<li>
 
<a class="visible-sm visible-xs" id="nav-collapse-toggle" href="./dash#" title="" data-placement="bottom" data-original-title="Show/hide sidebar">
<span class="rounded rounded-lg bg-gray text-white visible-xs"><i class="fa fa-bars fa-lg"></i></span>
<i class="fa fa-bars fa-lg hidden-xs"></i>
</a>
</li>
<li class="ml-sm mr-n-xs hidden-xs"><a href="./index.php"><i class="fa fa-refresh fa-lg"></i></a></li>
</ul>
 
<a class="navbar-brand visible-xs" href="./index.php">
Black Widow
</a>
</div>
 
 
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="./freegenerator.php">Free Generator <span class="fa fa-flash"></span></a></li>
          <li class="active"><a href="./purchase.php"> Purchase <span class="fa fa-paypal"></span></a></li>
          <li class="active"><a href="./support.php"> Support <span class="fa fa-spinner"></span></a></li>
          <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="fa fa-hand-o-right"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Youtube</a></li>
            <li class="divider"></li>
            <li><a href="./generator.php">Generator</a></li>
            <li class="divider"></li>
            <li><a href="lib/logout.php">Logout</a></li>
          </ul>
        </li>
      </ul>


</nav>
<div class="content-wrap">
<main id="content" class="content" role="main">
<div class="row">
<div class="col-md-3 col-sm-6">
<section class="widget bg-primary text-red">
<div class="widget-body clearfix">
<div class="row">
<div class="col-xs-3" style="height:50px;">
<span class="widget-icon">
<i class="fa fa-globe"></i>
</span>
</div>
<div class="col-xs-9">
<h5 class="count">
                                  <?php echo $totalusers;?>
                              </h5>
                              <p>Total Users</p>
</div>
</div>
</div>
</section>
</div>
<div class="col-md-3 col-sm-6">
<section class="widget bg-danger text-red">
<div class="widget-body clearfix">
<div class="row">
<div class="col-xs-3" style="height:50px;">
<span class="widget-icon">
<i class="fa fa-gift"></i>
</span>
</div>
<div class="col-xs-9">
<h5 class=" count2">
                                  <?php echo $totalalts;?>
                              </h5>
                              <p>Total Alts</p>
</div>
</div>
</div>
</section>
</div>
<div class="col-md-3 col-sm-6">
<section class="widget bg-warning text-red">
<div class="widget-body clearfix">
<div class="row">
<div class="col-xs-3" style="height:50px;">
<span class="widget-icon">
<i class="fa fa-refresh"></i>
</span>
</div>
<div class="col-xs-9">
<h5 class=" count3">
                                  <?php echo $generated;?>
                              </h5>
                              <p>Total Generated</p>
</div>
</div>
</div>
</section>
</div>
<div class="col-md-3 col-sm-6">
<section class="widget bg-gray text-white">
<div class="widget-body clearfix">
<div class="row">
<div class="col-xs-3" style="height:50px;">
<span class="widget-icon">
<i class="fa fa-cog"></i>
</span>
</div>
<div class="col-xs-9">
 <h5 class=" count4">
                                  Premium
                              </h5>
                              <p><?php echo $expires;?></p>
</div>
</div>
</div>
</section>
</div>
</div>
 <div class="row">
				  <div class="col-lg-4">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Manage Generators</h1>
							  </div>
							  <legend></legend>
							  <div id="collapse">
								<button class="btn btn-info btn-block" data-toggle="collapse" data-target=".addgenerator" data-parent="#collapse"><i class="icon-plus"></i> Add Generator</button></br>
								<form action="admin-manage.php" method="POST">
									<div class="addgenerator sublinks collapse">
										<legend></legend>
										<input name="addgenerator" type="text" class="form-control" placeholder="Ex. Netflix"></br>
										<button type="submit" class="btn btn-primary btn-block"><i class="icon-plus"></i> Add Generator</button></br>
									</div>
								</form>
							  </div>
							  <legend></legend>
							  <div class="panel-group" id="accordion">
								<?php
								$accountsquery = mysqli_query($con, "SELECT * FROM `generators`") or die(mysqli_error($con));
								while($row = mysqli_fetch_assoc($accountsquery)){
									$generatorid = $row[id];
									$getgeneratorsquery = mysqli_query($con, "SELECT * FROM `generator$generatorid`") or die(mysqli_error($con));
									$generatoramount = mysqli_num_rows($getgeneratorsquery);
									echo '
									  <div class="panel panel-info">
										  <div class="panel-heading">
											  <h4 class="panel-title">
												  <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse'.$row[id].'" aria-expanded="false">'.$row[name].'&nbsp <span class="badge bg-success">'.$generatoramount.'</span></a>
												  <a href="admin-manage.php?deletegenerator='.$row[id].'" class="btn btn-xs btn-danger pull-right"><i class="icon-remove"></i></a>
												  <a class="btn btn-primary btn-xs pull-right" data-toggle="modal" href="#editgenerator" data-generator="'.$row['name'].'" data-generatorid="'.$row['id'].'"><i class="icon-pencil"></i></a>
											  </h4>
										  </div>
										  <div id="collapse'.$row[id].'" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
											  <div class="panel-body" style="background:#F1F2F7;">
												  <form action="admin-manage.php" method="POST">
													<input type="hidden" name="generator" value="'.$row[id].'">
													<textarea name="alts" rows="5" class="form-control" placeholder="username:password username:password">';
													while($row = mysqli_fetch_assoc($getgeneratorsquery))
													{
														echo $row['alt']."\n";
													}
													echo '</textarea>
													<br>
													<button type="submit" class="btn btn-info btn-large btn-block">Update Alts</button>
												  </form>
											  </div>
										  </div>
									  </div></br>
									  <legend></legend>
									';
								}
								?>
							  </div>
						  </div>
					  </section>
				  </div>
				  <div class="col-lg-4">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Manage Packages</h1>
							  </div>
							  <legend></legend>
							  <div id="collapse">
								<button class="btn btn-info btn-block" data-toggle="collapse" data-target=".addpackage" data-parent="#collapse"><i class="icon-plus"></i> Add Package</button></br>
								<form action="admin-manage.php" method="POST">
									<div class="addpackage sublinks collapse">
										<legend></legend>
										<input name="addpackage" type="text" class="form-control" placeholder="Name (Ex. Gold Package)"></br>
										<input name="price" type="text" class="form-control" placeholder="Price (Ex. 0.01)"></br>
										<select name="generator" class="form-control">
											<option value="" selected>All Generators</option>
											<?php
												$accountsquery = mysqli_query($con, "SELECT * FROM `generators`") or die(mysqli_error($con));
												while($row = mysqli_fetch_assoc($accountsquery)){
													echo '<option value="'.$row[id].'">'.$row[name].'</option>';
												}
											?>
										</select></br>
										<select name="length" class="form-control">
											<option value="Lifetime" selected>Lifetime</option>
											<option value="1 Day">1 Day</option>
											<option value="3 Days">3 Days</option>
											<option value="1 Week">1 Week</option>
											<option value="1 Month">1 Month</option>
											<option value="2 Months">2 Months</option>
											<option value="3 Months">3 Months</option>
											<option value="4 Months">4 Months</option>
											<option value="5 Months">5 Months</option>
											<option value="6 Months">6 Months</option>
											<option value="7 Months">7 Months</option>
											<option value="8 Months">8 Months</option>
											<option value="9 Months">9 Months</option>
											<option value="10 Months">10 Months</option>
											<option value="11 Months">11 Months</option>
											<option value="12 Months">12 Months</option>
										</select></br>
										<input type="number" name="max" class="form-control" placeholder="Max accounts/day (Leave empty for unlimited)"></br>
										<button type="submit" class="btn btn-primary btn-block"><i class="icon-plus"></i> Add Package</button></br>
									</div>
								</form>
							  </div>
							  <legend></legend>
							  <div class="panel-group" id="accordion">
								<?php
								$packagesquery = mysqli_query($con, "SELECT * FROM `packages`") or die(mysqli_error($con));
								while($row = mysqli_fetch_assoc($packagesquery)){
									echo '
									  <div class="panel panel-info">
										  <div class="panel-heading">
											  <h4 class="panel-title">
												  <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" href="#2collapse'.$row[id].'" aria-expanded="false">'.$row[name].'&nbsp <span class="badge bg-success">$'.$row[price].'</span></a>
												  <a href="admin-manage.php?deletepackage='.$row[id].'" class="btn btn-xs btn-danger pull-right"><i class="icon-remove"></i></a>
												  <a class="btn btn-primary btn-xs pull-right" data-toggle="modal" href="#editpackage" data-package="'.$row['name'].'" data-packageid="'.$row['id'].'" data-price="'.$row['price'].'" data-length="'.$row['length'].'" data-accounts="'.$row['accounts'].'" data-generator="'.$row['generator'].'"><i class="icon-pencil"></i></a>
											  </h4>
										  </div>
										  <div id="2collapse'.$row[id].'" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;">
											  <div class="panel-body" style="background:#F1F2F7;">
												  <form action="admin-manage.php" method="POST">
													<input type="hidden" name="package" value="'.$row[id].'">
													<br>
													<button type="submit" class="btn btn-info btn-large btn-block"><i class="icon-edit"></i> Edit Package</button>
												  </form>
											  </div>
										  </div>
									  </div></br>
									  <legend></legend>
									';
								}
								?>
							  </div>
						  </div>
					  </section>
				  </div>
				  <div class="col-lg-4">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Manage Settings</h1>
							  </div>
							  <legend></legend>
							  <?php
								$accountsquery = mysqli_query($con, "SELECT * FROM `settings` LIMIT 1") or die(mysqli_error($con));
								while($row = mysqli_fetch_assoc($accountsquery)){
									echo '
									  <form class="form-horizontal" action="admin-manage.php" method="POST">
										  <div class="form-group">
											  <label for="website" class="col-lg-2 col-sm-2 control-label">Website Name</label>
											  <div class="col-lg-10">
												  <input type="text" class="form-control" name="website" placeholder="Website Name" value="'.$row['website'].'">
											  </div>
										  </div>
										  <div class="form-group">
											  <label for="paypal" class="col-lg-2 col-sm-2 control-label">Paypal</label>
											  <div class="col-lg-10">
												  <input type="email" class="form-control" name="paypal" placeholder="name@domain.com" value="'.$row['paypal'].'">
											  </div>
										  </div>
										  <div class="form-group">
											  <label for="bitcoin" class="col-lg-2 col-sm-2 control-label">Bitcoin</label>
											  <div class="col-lg-10">
												  <input type="text" class="form-control" name="bitcoin" placeholder="Bitcoin is not enabled." disabled>
											  </div>
										  </div>
										  <div class="form-group">
											  <label for="footer" class="col-lg-2 col-sm-2 control-label">Footer</label>
											  <div class="col-lg-10">
												  <input type="text" class="form-control" name="footer" placeholder="© 2014-2015 | Name Inc."  value="'.$row['footer'].'">
											  </div>
										  </div>
										  <div class="form-group">
											  <label for="favicon" class="col-lg-2 col-sm-2 control-label">Favicon</label>
											  <div class="col-lg-10">
												  <input type="url" class="form-control" name="favicon" placeholder="http://domain.com/image.jpg"  value="'.$row['favicon'].'">
											  </div>
										  </div>
										  <button type="submit" class="btn btn-info btn-large btn-block"><i class="icon-edit"></i> Update Settings</button>
									  </form>
									';
								}
							  ?>
						  </div>
					  </section>
				  </div>
              </div>

          </section>
		  
		  <!-- Modal -->
		  <div class="modal fade" id="editgenerator" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog modal-sm">
				  <div class="modal-content">
					  <div class="modal-header">
						  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						  <h4 class="modal-title">Edit Generator</h4>
					  </div>
					  <div class="modal-body">
					   <form action="admin-manage.php" method="POST">
					    <input type="hidden" name="generatorid">
						<div class="form-group">
						  <label>Name</label>
						  <input type="text" class="form-control" name="editgenerator">
						</div>
					  </div>
					  <div class="modal-footer">
						<button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
						<button class="btn btn-warning" type="submit"> Update</button>
                      </div>
					   </form>
				  </div>
			  </div>
		  </div>
		  <!-- modal -->
		  
		  <!-- Modal -->
		  <div class="modal fade" id="editpackage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog modal-sm">
				  <div class="modal-content">
					  <div class="modal-header">
						  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						  <h4 class="modal-title">Edit Package</h4>
					  </div>
					  <div class="modal-body">
					   <form action="admin-manage.php" method="POST">
					    <input type="hidden" name="packageid">
						<div class="form-group">
						  <label>Name</label>
						  <input type="text" class="form-control" name="editpackage">
						</div>
						<div class="form-group">
						  <label>Price</label>
						  <input type="text" class="form-control" name="editprice">
						</div>
						<div class="form-group">
							<label>Generator(s)</label>
							<select name="editgenerator" class="form-control">
								<option value="">All Generators</option>
								<?php
									$accountsquery = mysqli_query($con, "SELECT * FROM `generators`") or die(mysqli_error($con));
									while($row = mysqli_fetch_assoc($accountsquery)){
										echo '<option value="'.$row[id].'">'.$row[name].'</option>';
									}
								?>
							</select>
						</div>
						<div class="form-group">
							<label>Length</label>
							<select name="editlength" class="form-control">
								<option value="Lifetime">Lifetime</option>
								<option value="1 Day">1 Day</option>
								<option value="3 Days">3 Days</option>
								<option value="1 Week">1 Week</option>
								<option value="1 Month">1 Month</option>
								<option value="2 Months">2 Months</option>
								<option value="3 Months">3 Months</option>
								<option value="4 Months">4 Months</option>
								<option value="5 Months">5 Months</option>
								<option value="6 Months">6 Months</option>
								<option value="7 Months">7 Months</option>
								<option value="8 Months">8 Months</option>
								<option value="9 Months">9 Months</option>
								<option value="10 Months">10 Months</option>
								<option value="11 Months">11 Months</option>
								<option value="12 Months">12 Months</option>
							</select>
						</div>
						<div class="form-group">
							<label>Max accounts/day</label>
							<input type="number" name="editmax" class="form-control" placeholder="(Leave empty for unlimited)">
						</div>
					  </div>
					  <div class="modal-footer">
						<button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
						<button class="btn btn-warning" type="submit"> Update</button>
                      </div>
					   </form>
				  </div>
			  </div>
		  </div>
		  <!-- modal -->
		  
      </section>
      <!--main content end-->
      <!--footer start-->
      <footer class="site-footer">
          <div class="text-center">
              <?php echo $footer;?>
              <a href="#" class="go-top">
                  <i class="icon-angle-up"></i>
              </a>
          </div>
      </footer>
      <!--footer end-->
  </section>
  
<div class="loader-wrap hiding hide">
<i class="fa fa-circle-o-notch fa-spin-fast"></i>
</div>
 
<script src="./files/jquery.min.js.download"></script>
<script src="./files/bootstrap.min.js.download"></script>
<script src="./files/jquery.slimscroll.min.js.download"></script>
<script src="./files/widgster.js.download"></script>
<script src="./files/pace.min.js.download"></script>
<script src="./files/jquery.touchSwipe.js.download"></script>
<script class="include" type="text/javascript" src="js/jquery.dcjqaccordion.2.7.js"></script>
 
<script src="./files/settings.js.download"></script>
<script src="./files/app.js.download"></script>
 
 <!--common script for all pages-->
    <script src="js/common-scripts.js"></script>
	<script class="include" type="text/javascript" src="js/jquery.dcjqaccordion.2.7.js"></script>

    <!--common script for all pages-->
<script src="js/common-scripts.js"></script>
	
	<script>
		$('#editgenerator').on('show.bs.modal', function(e) {
			var generator = $(e.relatedTarget).data('generator');
			var generatorid = $(e.relatedTarget).data('generatorid');
			$(e.currentTarget).find('input[name="editgenerator"]').val(generator);
			$(e.currentTarget).find('input[name="generatorid"]').val(generatorid);
		});
		
		$('#editpackage').on('show.bs.modal', function(e) {
			var package = $(e.relatedTarget).data('package');
			var packageid = $(e.relatedTarget).data('packageid');
			var price = $(e.relatedTarget).data('price');
			var length = $(e.relatedTarget).data('length');
			var accounts = $(e.relatedTarget).data('accounts');
			var generator = $(e.relatedTarget).data('generator');
			$(e.currentTarget).find('input[name="editpackage"]').val(package);
			$(e.currentTarget).find('input[name="packageid"]').val(packageid);
			$(e.currentTarget).find('input[name="editprice"]').val(price);
			$(e.currentTarget).find('input[name="editmax"]').val(accounts);
		});
	</script>

</body></html>