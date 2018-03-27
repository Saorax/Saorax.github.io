<?php

include 'inc/header.php';

$result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `username` = '$username' AND `active` = '1' AND `expires` >= '$date'") or die(mysqli_error($con));
if (mysqli_num_rows($result) < 1 && $_SESSION['rank'] != "5") {
	$subscription = "0";
}else{
	$subscription = "1";
}

if(isset($_POST['purchase'])){
	$id = mysqli_real_escape_string($con, $_POST['purchase']);
	$result = mysqli_query($con, "SELECT * FROM `packages` WHERE `id` = '$id'") or die(mysqli_error($con));

	while ($row = mysqli_fetch_array($result)) {
		$packageprice = $row['price'];
		$packagename = $website." - ".$row['name'];
		$custom = $row['id']."|".$username;
	}
	
	$paypalurl = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&amount=".urlencode($packageprice)."&business=".urlencode($paypal)."&page_style=primary&item_name=".urlencode($packagename)."&return=http://".$_SERVER['SERVER_NAME'].dirname($_SERVER['REQUEST_URI'])."/purchase.php?action=buy-success&rm=2&notify_url=http://".$_SERVER['SERVER_NAME'].dirname($_SERVER['REQUEST_URI'])."/lib/ipn.php"."&cancel_return=http://".$_SERVER['SERVER_NAME'].dirname($_SERVER['REQUEST_URI'])."/purchase.php?action=buy-error&custom=".urlencode($custom)."&mc_currency=USD";
	header('Location: '.$paypalurl);
}
 
 
 ?>

<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Black Widow - Purchase</title>
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
<div class="col-md-12">
<section class="widget">
<header>
<center><h3>
LizardGenerator <span class="fw-semi-bold">News</span>
</h3></center>
<div class="widget-controls">
</div>
</header>
 <section id="main-content">
      <br> 
       
          <section class="wrapper">
		  
              <div class="row product-list">
				<?php
					$result = mysqli_query($con, "SELECT * FROM `packages` ORDER BY CAST(price AS DECIMAL(10,2))");
					while ($row = mysqli_fetch_assoc($result)) {
						if($row['generator'] == ""){
							$generatorname = "All";
						}else{
							$generatorquery = mysqli_query($con, "SELECT * FROM `generators` WHERE `id` = '$row[generator]'") or die(mysqli_error($con));
							while($row1 = mysqli_fetch_array($generatorquery)){
								$generatorname = $row1['name'];
							}
						}
						if($row['accounts'] == "0" || $row['accounts'] == ""){
							$accounts = "Unlimited";
						}else{
							$accounts = $row['accounts']."/day";
						}
						echo '
                          <div class="col-md-4">
                              <section class="panel">
                                  <div class="panel-body text-center">
                                      <a href="#" class="pro-title">
                                          <H3>'.$row['name'].'</H3>
                                      </a>
                                      <p class="price">$'.$row['price'].'</p>
									  <legend></legend>
									  <label>Generator(s):</label> '.$generatorname.'</br>
									  <label>Length:</label> '.$row[length].'</br>
									  <label>Accounts:</label> '.$accounts.'</br></br>
									  <form method="POST" action="purchase.php">
										<input type="hidden" name="purchase" value="'.$row[id].'"/>
										<button type="submit" class="btn btn-info btn-lg btn-block"
						';
						if ($subscription != "0" || $_SESSION['rank'] == "5"){
							echo "enabled";
						}
						echo '
										><i class="icon-shopping-cart"></i> Buy Now</button>
									  </form>
								  </div>
                              </section>
                          </div>
						';
					}	 
				?>
              </div>

          </section>
		  
		  <?php 
		  
		  if($_GET['action'] == "buy-success"){
			  $result = mysqli_query($con, "SELECT * FROM `subscriptions` WHERE `username` = '$username' AND `date` = '$date'") or die(mysqli_error($con));
			  if (mysqli_num_rows($result) < 1) {
				  echo '
					  <div class="modal fade" id="buy-success" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 15%; overflow-y: visible; display: none;">
						<div class="modal-dialog modal-m">
							<div class="modal-content">
								<div class="modal-header">
									<center><h3 style="margin:0;">Waiting for purchase to complete..</h3></center>
								</div>
								<div class="modal-body">
									<script language="JavaScript" type="text/javascript">  
										var count = 10;
										function countDown(){
										 if (count <=0){  
										  document.getElementById("timer").innerHTML = "<b>Refreshing...</b>";
										 }else{  
										  count--;  
										  document.getElementById("timer").innerHTML = "<center>Refreshing in "+ count + " seconds</center>";
												  setTimeout("countDown()", 1000)
										 }  
										}
									</script>
									<span id="timer"><script>countDown();</script></span></br>
									<script type="text/javascript">
										window.setTimeout(function(){window.location.href="purchase.php?action=buy-success"},10000);
									</script>
									<div id="progress-bar" class="progress progress-striped active" style="margin-bottom:0;">
										<div class="progress-bar" style="width: 100%">
										</div>
									</div>
								</div>
							</div>
						</div>
					  </div>
				  ';
			  }else{
				echo '
					  <div class="modal fade" id="buy-success" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top: 15%; overflow-y: visible; display: none;">
						<div class="modal-dialog modal-m">
							<div class="modal-content">
								<div class="modal-header">
									<center><h3 style="margin:0;">Purchase Completed!</h3></center>
								</div>
								<div class="modal-body">
									<div id="progress-bar" class="progress progress-striped" style="margin-bottom:0;">
										<div class="progress-bar progress-bar-success" style="width: 100%">
										</div>
									</div>
								</div>
								<center>
									<p>Thanks for your purchase! You have succesfully received your subscription package.</p>
									<p>Visit the <a href="generator.php">Generator Page</a> to start generating.</p></br>
								</center>
							</div>
						</div>
					  </div>
				';
			  }
		  }
		  ?>
		  
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
 
<script src="./files/settings.js.download"></script>
<script src="./files/app.js.download"></script>
    <?php
	if($_GET['action'] == "buy-success"){
		echo "<script type='text/javascript'>
				$(document).ready(function(){
				$('#buy-success').modal('show');
				});
			  </script>"
		;
	}
	?>
 

</body></html>