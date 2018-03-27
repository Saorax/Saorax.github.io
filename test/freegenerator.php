

<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Free Generator - Dashboard</title>
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
<a href="./index.php">BwgGenerator</a>
</header>
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
<a href="./iccounts.php">
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
<a href="./iurchase.php">
<span class="icon">
<i class="fa fa-shopping-cart"></i>
</span>
Purchase
</a>
</li>
<li>
<a href="./ienerator.php">
<span class="icon">
<i class="fa fa-paypal"></i>
</span>
Generator
</a>
</li>
<li>
<a href="./iree">
<span class="icon">
<i class="fa fa-gift"></i>
</span>
Free Generator
</a>
</li>
<li>
<a href="./iupport.php">
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
								  <li><a  href="./idminmanage.php">Manage</a></li>
								  <li><a  href="./idminsupport.php">Support</a></li>
								  <li><a  href="./idminstatistics.php">Statistics</a></li>
								  <li><a  href="./idminflagged.php">Flagged</a></li>
								  <li><a  href="./idminnews.php">News</a></li>
								  <li><a  href="./idminsubscriptions.php">Subscriptions</a></li>
								  <li><a  href="./idminusers.php">Users</a></li>
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
 
<a class="visible-sm visible-xs" id="nav-collapse-toggle" href="./i title="" data-placement="bottom" data-original-title="Show/hide sidebar">
<span class="rounded rounded-lg bg-gray text-white visible-xs"><i class="fa fa-bars fa-lg"></i></span>
<i class="fa fa-bars fa-lg hidden-xs"></i>
</a>
</li>
<li class="ml-sm mr-n-xs hidden-xs"><a href="./i><i class="fa fa-refresh fa-lg"></i></a></li>
</ul>
 
<a class="navbar-brand visible-xs" href="./i>
Lizard Generator
</a>
</div>
 
 
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="./iree/">Free Generator <span class="fa fa-flash"></span></a></li>
          <li class="active"><a href="./iurchase.php"> Purchase <span class="fa fa-paypal"></span></a></li>
          <li class="active"><a href="./iupport.php"> Support <span class="fa fa-spinner"></span></a></li>
          <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="fa fa-hand-o-right"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="https://www.youtube.com/channel/UCFMgwRFLSz5Fx3xspqh3nXw">Youtube</a></li>
            <li class="divider"></li>
            <li><a href="./ienerator.php">Generator</a></li>
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
<li class="ml-sm mr-n-xs hidden-xs"><a href="./i><i class="fa fa-refresh fa-lg"></i></a></li>
</ul>
 
<a class="navbar-brand visible-xs" href="./index.php">
Lizard Generator
</a>
</div>
 
 
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="active"><a href="./ireegenerator.php">Free Generator <span class="fa fa-flash"></span></a></li>
          <li class="active"><a href="./iurchase.php"> Purchase <span class="fa fa-paypal"></span></a></li>
          <li class="active"><a href="./iupport.php"> Support <span class="fa fa-spinner"></span></a></li>
          <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span class="fa fa-hand-o-right"></span></a>
          <ul class="dropdown-menu" role="menu">
            <li><a href="#">Youtube</a></li>
            <li class="divider"></li>
            <li><a href="./ienerator.php">Generator</a></li>
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
<h5 class="no-margin">TOTAL USERS</h5>
<p class="h2 no-margin fw-normal">27535</p>
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
<h5 class="no-margin">TOTAL ALTS</h5>
<p class="h2 no-margin">210897</p>
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
 
 


</body></html>