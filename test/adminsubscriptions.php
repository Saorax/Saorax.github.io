<?php

include "inc/header.php";

if ($_SESSION['rank'] < "5") {
	header('Location: index.php?error=no-admin');
	exit();
}

if (isset($_GET['delete'])){
	$id = mysqli_real_escape_string($con, $_GET['delete']);
	mysqli_query($con, "UPDATE `subscriptions` SET `active` = '0' WHERE `id` = '$id'") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-subscriptions.php");
		</script>
	';
}

if (isset($_POST['subscriptionid']) && isset($_POST['editpackage']) && isset($_POST['editexpires'])){
	$id = mysqli_real_escape_string($con, $_POST['subscriptionid']);
	$package = mysqli_real_escape_string($con, $_POST['editpackage']);
	$expires = mysqli_real_escape_string($con, $_POST['editexpires']);
	mysqli_query($con, "UPDATE `subscriptions` SET `package` = '$package' WHERE `id` = '$id'") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `subscriptions` SET `expires` = '$expires' WHERE `id` = '$id'") or die(mysqli_error($con));
}

if (isset($_POST['addsubscription']) && isset($_POST['package'])){
	$user = mysqli_real_escape_string($con, $_POST['addsubscription']);
	$package = mysqli_real_escape_string($con, $_POST['package']);

	$result = mysqli_query($con,"SELECT * FROM `packages` WHERE `id` = '$package'");
	while ($row = mysqli_fetch_array($result)) 
	{
		$length = $row['length'];
	}

	$today = time();

	if($length == "Lifetime"){
		$expires = strtotime("100 years", $today);
	}elseif($length == "1 Day"){
		$expires = strtotime("+1 day", $today);
	}elseif($length == "3 Days"){
		$expires = strtotime("+3 days", $today);
	}elseif($length == "1 Week"){
		$expires = strtotime("+1 week", $today);
	}elseif($length == "1 Month"){
		$expires = strtotime("+1 month", $today);
	}elseif($length == "2 Months"){
		$expires = strtotime("+2 months", $today);
	}elseif($length == "3 Months"){
		$expires = strtotime("+3 months", $today);
	}elseif($length == "4 Months"){
		$expires = strtotime("+4 months", $today);
	}elseif($length == "5 Months"){
		$expires = strtotime("+5 months", $today);
	}elseif($length == "6 Months"){
		$expires = strtotime("+6 months", $today);
	}elseif($length == "7 Months"){
		$expires = strtotime("+7 months", $today);
	}elseif($length == "8 Months"){
		$expires = strtotime("+8 months", $today);
	}elseif($length == "9 Months"){
		$expires = strtotime("+9 months", $today);
	}elseif($length == "10 Months"){
		$expires = strtotime("+10 months", $today);
	}elseif($length == "11 Months"){
		$expires = strtotime("+11 months", $today);
	}elseif($length == "12 Months"){
		$expires = strtotime("+12 months", $today);
	}else{
	}

	$expires = date('Y-m-d', $expires);
	mysqli_query($con, "INSERT INTO `subscriptions` (`username`, `date`, `price`, `payment`, `package`, `expires`) VALUES ('$user', DATE('$date'), '0.00', 'Gift', '$package', '$expires')") or die(mysqli_error($con));
}

$result = mysqli_query($con, "SELECT * FROM `subscriptions`") or die(mysqli_error($con));
$totalsubscriptions = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `active` = '1' AND `expires` >= '$date'") or die(mysqli_error($con));
$activesubscriptions = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `expires` < '$date'") or die(mysqli_error($con));
$expiredsubscriptions = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `date` = '$date'") or die(mysqli_error($con));
$todayssubscriptions = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `active` = '0'") or die(mysqli_error($con));
$canceledsubscriptions = mysqli_num_rows($result);
	
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
<h5 class="no-margin">ADDED THIS WEEK</h5>
<p class="h2 no-margin fw-normal">6147</p>
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
<h5 class="no-margin">TOTAL GENERATIONS</h5>
<p class="h2 no-margin fw-normal">535179</p>
</div>
</div>
</div>
</section>
</div>
</div>


                   <div class="row">
				  <div class="col-lg-9">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Active Subscriptions</h1>
							  </div>
							  <legend></legend>
								<section class="panel">
								  <table class="table table-striped table-advance table-hover">
								  
									<div id="collapse">

										<button class="btn btn-info btn-large btn-block" data-toggle="collapse" data-target="#addsubscription" data-parent="#collapse"><i class="icon-plus"></i> Add Subscription</button></br>

										<div id="addsubscription" class="sublinks collapse">
											<legend></legend>
											<form action="adminsubscriptions.php" method="POST">
												<input type="text" name="addsubscription" class="form-control" placeholder="Username"></br>
												<select name="package" class="form-control">
												<?php
													$packagesquery = mysqli_query($con, "SELECT * FROM `packages`") or die(mysqli_error($con));
													while($row = mysqli_fetch_assoc($packagesquery)){
														echo '<option value="'.$row[id].'">'.$row[name].'</option>';
													}
												?>
												</select></br>
												<button type="submit" class="btn btn-primary btn-large btn-block"><i class="icon-plus"></i> Add Subscription</button>
											</form>
										</div>
										<legend></legend>
										<input id="filter" type="text" class="form-control" placeholder="Filter..">
									  <thead>
									  <tr>
										  <th><i class="icon-user"></i> Username</th>
										  <th><i class="icon-tag"></i> Package</th>
										  <th><i class="icon-calendar"></i> Expires</th>
										  <th></th>
										  <th></th>
									  </tr>
									  </thead>
									  <tbody class="searchable">
										<?php
										$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `active` = '1' AND `expires` >= '$date'") or die(mysqli_error($con));
										while ($row = mysqli_fetch_array($result)) {
											echo'<tr><td><a href="#">'.$row['username'].'</a></td>';
											$packagequery = mysqli_query($con, "SELECT * FROM `packages` WHERE `id` = '$row[package]'") or die(mysqli_error($con));
											while ($packageinfo = mysqli_fetch_array($packagequery)) {
												echo '<td>' . $packageinfo['name'] . '</td>';
												$package = $packageinfo['name'];
											}
											echo '
												  <td>'.$row['expires'].'</td>
												  <td><a class="btn btn-success btn-xs" data-toggle="modal" href="#info" data-username="'.$row['username'].'" data-package="'.$package.'" data-price="'.$row['price'].'" data-payment="'.$row['payment'].'" data-date="'.$row['date'].'" data-expires="'.$row['expires'].'" data-txn="'.$row['txn'].'"><i class="icon-info"></i>&nbsp More Info</a></td>
												  <td>
													  <a class="btn btn-primary btn-xs" data-toggle="modal" href="#edit" data-username="'.$row['username'].'" data-package="'.$row['package'].'" data-expires="'.$row['expires'].'" data-subscriptionid="'.$row['id'].'"><i class="icon-pencil"></i></a>
													  <a class="btn btn-danger btn-xs" href="admin-subscriptions.php?delete=' . $row['id'] . '"><i class="icon-trash "></i></a>
												  </td>
											  </tr>
											';
										}
										?>
									  </tbody>
								  </table>
							  </section>
						  </div>
					  </section>
				  </div>
				  <div class="col-lg-3">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Subscription Statistics</h1>
							  </div>
							  <legend></legend>
								<ul class="nav nav-pills nav-stacked">
                                  <li><a href="#"> <strong><i class="icon-tags"></i></strong>&nbsp Total Subscriptions<span class="label label-primary pull-right r-activity"><?php echo $totalsubscriptions;?></span></a></li>
                                  <li><a href="#"> <strong><i class="icon-ok"></i></strong>&nbsp Active Subscriptions<span class="label label-warning pull-right r-activity"><?php echo $activesubscriptions;?></span></a></li>
								  <li><a href="#"> <strong><i class="icon-remove"></i></strong>&nbsp Expired Subscriptions<span class="label label-success pull-right r-activity"><?php echo $expiredsubscriptions;?></span></a></li>
								  <li><a href="#"> <strong><i class="icon-calendar"></i></strong>&nbsp Today's Subscriptions<span class="label label-info pull-right r-activity"><?php echo $todayssubscriptions;?></span></a></li>
								  <li><a href="#"> <strong><i class="icon-off"></i></strong>&nbsp Canceled Subscriptions<span class="label label-default pull-right r-activity"><?php echo $canceledsubscriptions;?></span></a></li>
								</ul>
						  </div>
					  </section>
				  </div>
              </div>

          </section>
		  
		  <!-- Modal -->
		  <div class="modal fade" id="info" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog modal-sm">
				  <div class="modal-content">
					  <div class="modal-header">
						  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						  <h4 class="modal-title">Subscription Info</h4>
					  </div>
					  <div class="modal-body">
						<div class="form-group">
						  <label for="username">Username</label>
						  <input type="text" class="form-control" name="username" disabled>
						</div>
						<div class="form-group">
						  <label for="package">Package</label>
						  <input type="text" class="form-control" name="package" disabled>
						</div>
						<div class="form-group">
						  <label for="price">Price</label>
						  <input type="text" class="form-control" name="price" disabled>
						</div>
						<div class="form-group">
						  <label for="payment">Payment Method</label>
						  <input type="text" class="form-control" name="payment" disabled>
                        </div>
						<div class="form-group">
						  <label for="date">Date</label>
						  <input type="date" class="form-control" name="date" disabled>
                        </div>
						<div class="form-group">
						  <label for="expires">Expires</label>
						  <input type="date" class="form-control" name="expires" disabled>
                        </div>
						<div class="form-group">
						  <label for="txn">Transaction ID</label>
						  <input type="text" class="form-control" name="txn" disabled>
                        </div>
					  </div>
				  </div>
			  </div>
		  </div>
		  <!-- modal -->
		  
		  <!-- Modal -->
		  <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog modal-sm">
				  <div class="modal-content">
					  <div class="modal-header">
						  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						  <h4 class="modal-title">Edit Subscription</h4>
					  </div>
					  <div class="modal-body">
					   <form action="admin-subscriptions.php" method="POST">
					    <input type="hidden" name="subscriptionid">
						<div class="form-group">
						  <label>Username</label>
						  <input type="text" class="form-control" name="editusername" disabled>
						</div>
						<div class="form-group">
						  <label>Package</label>
						  <select class="form-control" name="editpackage">
							<?php
								$packagesquery = mysqli_query($con, "SELECT * FROM `packages`") or die(mysqli_error($con));
								while($row = mysqli_fetch_assoc($packagesquery)){
									echo '<option value="'.$row[id].'">'.$row[name].'</option>';
								}
							?>
						  </select>
						</div>
						<div class="form-group">
						  <label>Expires</label>
						  <input type="date" class="form-control" name="editexpires">
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

    <script>
		$(document).ready(function () {

			(function ($) {

				$('#filter').keyup(function () {

					var rex = new RegExp($(this).val(), 'i');
					$('.searchable tr').hide();
					$('.searchable tr').filter(function () {
						return rex.test($(this).text());
					}).show();

				})

			}(jQuery));

		});
		
		$('#info').on('show.bs.modal', function(e) {
			var username = $(e.relatedTarget).data('username');
			var package = $(e.relatedTarget).data('package');
			var price = $(e.relatedTarget).data('price');
			var payment = $(e.relatedTarget).data('payment');
			var date = $(e.relatedTarget).data('date');
			var expires = $(e.relatedTarget).data('expires');
			var txn = $(e.relatedTarget).data('txn');
			$(e.currentTarget).find('input[name="username"]').val(username);
			$(e.currentTarget).find('input[name="package"]').val(package);
			$(e.currentTarget).find('input[name="price"]').val(price);
			$(e.currentTarget).find('input[name="payment"]').val(payment);
			$(e.currentTarget).find('input[name="date"]').val(date);
			$(e.currentTarget).find('input[name="expires"]').val(expires);
			$(e.currentTarget).find('input[name="txn"]').val(txn);
		});
		
		$('#edit').on('show.bs.modal', function(e) {
			var editusername = $(e.relatedTarget).data('username');
			var editexpires = $(e.relatedTarget).data('expires');
			var subscriptionid = $(e.relatedTarget).data('subscriptionid');
			var editpackage = $(e.relatedTarget).data('package');
			$(e.currentTarget).find('input[name="editusername"]').val(editusername);
			$(e.currentTarget).find('input[name="editexpires"]').val(editexpires);
			$(e.currentTarget).find('input[name="subscriptionid"]').val(subscriptionid);
		});
	</script>


</body></html>