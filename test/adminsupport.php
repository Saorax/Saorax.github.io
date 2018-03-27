<?php

include "inc/header.php";

if ($_SESSION['rank'] < "5") {
	header('Location: index.php?error=no-admin');
	exit();
}

if (isset($_GET['read'])){
	$id = mysqli_real_escape_string($con, $_GET['read']);
	mysqli_query($con, "UPDATE `support` SET `read` = '1' WHERE `id` = '$id'") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-support.php");
		</script>
	';
}

if (isset($_GET['delete'])){
	$id = mysqli_real_escape_string($con, $_GET['delete']);
	mysqli_query($con, "DELETE FROM `support` WHERE `id` = '$id'") or die(mysqli_error($con));
	echo '
		<script>
			window.history.replaceState("object or string", "Title", "/admin-support.php");
		</script>
	';
}

if (isset($_POST['reply']) & isset($_POST['id']) & isset($_POST['to']) & isset($_POST['subject'])){
	$reply = mysqli_real_escape_string($con, $_POST['reply']);
	$id = mysqli_real_escape_string($con, $_POST['id']);
	$to = mysqli_real_escape_string($con, $_POST['to']);
	$subject = mysqli_real_escape_string($con, $_POST['subject']);
	mysqli_query($con, "INSERT INTO `support` (`from`, `to`, `subject`, `message`, `date`) VALUES ('Admin', '$to', '$subject', '$reply', DATE('$date'))") or die(mysqli_error($con));
	mysqli_query($con, "UPDATE `support` SET `read` = '1' WHERE `id` = '$id'") or die(mysqli_error($con));
}

$result = mysqli_query($con, "SELECT * FROM `support`") or die(mysqli_error($con));
$totaltickets = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `support` WHERE `to` = 'Admin'") or die(mysqli_error($con));
$receivedtickets = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `support` WHERE `from` = 'Admin'") or die(mysqli_error($con));
$senttickets = mysqli_num_rows($result);

$result = mysqli_query($con, "SELECT * FROM `support` WHERE `read` = '0'") or die(mysqli_error($con));
$unansweredtickets = mysqli_num_rows($result);

if($receivedtickets == 0){
	$replystatus = 0;
}else{
	$replystatus = $senttickets / $receivedtickets * 100;
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
								  <h1>Support Tickets</h1>
							  </div>
							  <legend></legend>
							  <div id="menu">
								<div class="list-group">
								<?php
								$supportquery = mysqli_query($con, "SELECT * FROM `support` WHERE `to` = 'Admin' ORDER BY `date` DESC") or die(mysqli_error());
								while ($row = mysqli_fetch_assoc($supportquery)) {
									echo '
										<a href="#" style="margin-top: 5px;" class="list-group-item ';
									if($row['read'] != "1"){
									echo 'active';
									}
									echo '" data-toggle="collapse" data-target="#message'.$row[id].'" data-parent="#menu">
											<span class="name" style="min-width: 120px;display: inline-block;">'.$row["from"].'</span> <span class="">'.$row["subject"].'</span>
												<span class="badge">'.$row["date"].'</span> 
												<span class="badge"><i class="icon-plus"></i></span>
											</span>
										</a>
										<div id="message'.$row[id].'" class="sublinks collapse" style="background:#F1F2F7;">
											<textarea class="form-control" rows="8" disabled>'.$row[message].'</textarea></br>
											<form method="POST" action="admin-support.php" id="reply" name="reply">
												<textarea name="reply" class="form-control" rows="4"></textarea></br>
												<input type="hidden" name="id" value="'.$row[id].'"/>
												<input type="hidden" name="to" value="'.$row[from].'"/>
												<input type="hidden" name="subject" value="'.$row[subject].'"/>
												<button type="submit" style="margin-left: 5px;width:495px;" class="btn btn-info btn-large">Send Reply</button>
												<div class="btn-group">
													<a style="width:150px;" href="admin-support.php?read='.$row[id].'" class="btn btn-success btn-large">Set Read</a>
													<a style="width:150px;" href="admin-support.php?delete='.$row[id].'" class="btn btn-danger btn-large">Delete</a>
												</div></br></br>
											</form>
										</div>
									';
								}
								?>
								</div>
							  </div>
						  </div>
					  </section>
				  </div>
				  <div class="col-lg-3">
					  <section class="panel">
						  <div class="panel-body">
							  <div class="task-thumb-details">
								  <h1>Support Statistics</h1>
							  </div>
							  <legend></legend>
								<ul class="nav nav-pills nav-stacked">
                                  <li><a href="#"> <strong><i class="icon-envelope"></i></strong>&nbsp Total Tickets<span class="label label-primary pull-right r-activity"><?php echo $totaltickets;?></span></a></li>
                                  <li><a href="#"> <strong><i class="icon-download"></i></strong>&nbsp Received Tickets<span class="label label-warning pull-right r-activity"><?php echo $receivedtickets;?></span></a></li>
								  <li><a href="#"> <strong><i class="icon-upload"></i></strong>&nbsp Sent Tickets<span class="label label-success pull-right r-activity"><?php echo $senttickets;?></span></a></li>
								  <li><a href="#"> <strong><i class="icon-remove"></i></strong>&nbsp Unanswered Tickets<span class="label label-info pull-right r-activity"><?php echo $unansweredtickets;?></span></a></li>
								</ul></br>
								<legend></legend>
								<center><font size="3"><strong><i class="icon-upload"></i></strong>&nbsp Reply Status</font></center></br>
								<div class="progress progress-striped active progress-sm">
                                  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="<?php echo $replystatus;?>" aria-valuemin="0" aria-valuemax="100" style="width: <?php echo $replystatus;?>%">
                                      <span class="sr-only"><?php echo $replystatus;?>% Complete</span>
                                  </div>
                                </div>
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


</body></html>