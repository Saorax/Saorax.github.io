<?php

include "inc/header.php";

if ($_SESSION['rank'] < "5") {
	header('Location: index.php?error=no-admin');
	exit();
}

if ($_GET['action'] == "resetall"){
	mysqli_query($con, "TRUNCATE TABLE `statistics`") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-statistics.php");
		</script>
	';
}

if (isset($_GET['reset'])){
	$id = mysqli_real_escape_string($con, $_GET['reset']);
	
	$result = mysqli_query($con, "SELECT * FROM `statistics` WHERE `id` = '$id'") or die(mysqli_error($con));
	while ($row = mysqli_fetch_array($result)) {
		$user = $row['username'];
	}
	echo $user;
	mysqli_query($con, "DELETE FROM `statistics` WHERE `username` = '$user'") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-statistics.php");
		</script>
	';
}

$generatedtoday = 0;

$result = mysqli_query($con, "SELECT * FROM `statistics` WHERE `date` = '$date'") or die(mysqli_error($con));
while ($row = mysqli_fetch_array($result)) {
	$generatedtoday = $generatedtoday + $row['generated'];
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
				  <div class="col-lg-9">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Generate Statistics</h1>
							  </div>
							  <legend></legend>
								<section class="panel">
								  <table class="table table-striped table-advance table-hover">
								  
									<div id="collapse">

										<input id="filter" type="text" class="form-control" placeholder="Filter..">
									  <thead>
									  <tr>
									      <th><i class="icon-user"></i> Username</th>
										  <th><i class="icon-repeat"></i> Total Generated</th>
										  <th><i class="icon-calendar"></i> Generated Today</th>
										  <th></th>
									  </tr>
									  </thead>
									  <tbody class="searchable">
										<?php
										$result = mysqli_query($con, "SELECT * FROM `statistics` GROUP BY `username`") or die(mysqli_error($con));
										while ($row = mysqli_fetch_array($result)) {
											$usertotalgenerated = 0;
											$result2 = mysqli_query($con, "SELECT * FROM `statistics` WHERE `username` = '$row[username]'") or die(mysqli_error($con));
											while ($row2 = mysqli_fetch_array($result2)) {
												$usertotalgenerated = $usertotalgenerated + $row2['generated'];
											}
											$result3 = mysqli_query($con, "SELECT * FROM `statistics` WHERE `username` = '$row[username]' AND `date` = '$date'") or die(mysqli_error($con));
											if(mysqli_num_rows($result3) < 1){
												$usergeneratedtoday = "0";
											}else{
												while ($row3 = mysqli_fetch_array($result3)) {
													$usergeneratedtoday = $row3['generated'];
												}
											}
											echo '<tr>
											  <td><a href="#">' . $row['username'] . '</a></td>
											  <td>'.$usertotalgenerated.'</td>
											  <td>'.$usergeneratedtoday.'</td>
											  <td><a class="btn btn-info btn-xs" href="admin-statistics.php?reset='.$row['id'].'"><i class="icon-remove-circle "> Reset</i></a></td>
											</tr>';
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
								  <h1>Generate Statistics</h1>
							  </div>
							  <legend></legend>
								<ul class="nav nav-pills nav-stacked">
                                  <li><a href="#"> <strong><i class="icon-repeat"></i></strong>&nbsp Total Generated<span class="label label-primary pull-right r-activity"><?php echo $generated;?></span></a></li>
                                  <li><a href="#"> <strong><i class="icon-calendar"></i></strong>&nbsp Generated Today<span class="label label-warning pull-right r-activity"><?php echo $generatedtoday;?></span></a></li></br>
								  <legend></legend>
								  <a class="btn btn-danger btn-block" href="admin-statistics.php?action=resetall"><i class="icon-remove-circle "> Reset All</i></a>
								</ul>
						  </div>
					  </section>
				  </div>
              </div>

          </section>
		  
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
	</script>

</body></html>