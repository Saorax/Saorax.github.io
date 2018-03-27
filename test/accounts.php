<!DOCTYPE html>
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>LizardGenerator - Accounts</title>
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
<main id="content" class="content" role="main">
<div class="row">
<div class="col-md-12">
<section class="widget">
<header>
<h3>
Our <span class="fw-semi-bold">Account Types</span>
</h3>
<div class="widget-controls">
</div>
</header>
<div class="widget-body">
<p>We offer a huge range of account types, covering many categories of sites, from streaming music and TV to gaming, VPNs, porn and loads more!</p>
<p>The list below is categorised alphabetically to make it simple to find your favourite sites.</p>
<table class="table table-hover">
<tbody>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Bitdefender (With Keys)</span>
&nbsp;<a target="_blank" href="https://login.bitdefender.net/central/index.html?lang=en_US"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>All accounts have at least 1 product key available.
Bitdefender Total Security Multi-Device is a security suite for Windows, Mac and Android devices to protect the devices through machine-learning technologies to improve malware detection and enhance pr</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">BT Sports</span>
&nbsp;<a target="_blank" href="https://home.bt.com/login/loginform"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>The home of world-class live sport brings you 24/7 TV channel streaming plus exclusive videos and latest news in football, rugby union, MotoGP, UFC, and more!</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">CBS All Access</span>
&nbsp;<a target="_blank" href="https://www.cbs.com/all-access/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Watch over 7500 CBS episodes on demand without any delays in programming with CBS All Access only on CBS.com.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Chegg</span>
&nbsp;<a target="_blank" href="https://www.chegg.com/login/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Connect with an online tutor instantly or get step-by-step Textbook Solutions for your hard classes. As always, save up to 90% on textbook rentals.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">CourseHero</span>
&nbsp;<a target="_blank" href="https://www.coursehero.com/login.php"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Instant access to millions of Study Resources, Course Notes, Test Prep, 24/7 Homework Help, Tutors, and more. Learn, teach, and study with Course Hero.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Creative Market</span>
&nbsp;<a target="_blank" href="https://creativemarket.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>All accounts have at least 1 purchase.
Buy and sell handcrafted, mousemade design content like vector patterns, icons, photoshop brushes, fonts and more at Creative Market.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Crunchyroll</span>
&nbsp;<a target="_blank" href="https://www.crunchyroll.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Crunchyroll is a leading global destination and platform for Japanese anime and Asian content. Crunchyroll delivers more than 25,000 episodes and 15,000 hours of content from Asian media producers directly to viewers.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Deezer</span>
&nbsp;<a target="_blank" href="https://www.deezer.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Get unlimited access to the songs and music you love, including the latest hits, your favorite artists and top radio channels.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">DIRECTV</span>
&nbsp;<a target="_blank" href="https://www.directv.com/DTVAPP/login/login.jsp"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Watch TV Networks Online &amp; On Demand w/ DIRECTV. Catch up on you favorite TV Channel Shows, Movies, News, Documentaries &amp; more.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">DIRECTV NOW</span>
&nbsp;<a target="_blank" href="https://directvnow.com/accounts/sign-in"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Get DIRECTV NOW &amp; Stream TV Live + On Demand. All your favorite TV for one Low Price. No Equipment, No Annual Contract, No hassle.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Dominos (USA with Points)</span>
&nbsp;<a target="_blank" href="https://www.dominos.com/en/pages/customer/?redirect=rewards&amp;utm_medium=micro&amp;utm_source=MCR&amp;utm_campaign=Loyalty_Coke#/customer/rewards/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Customers sign up for the rewards program online, order a pizza online at dominos.com or through the Domino's mobile app, and start earning points, according to a company press release.
60 Points earns you a free pizza.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">EA Origin</span>
&nbsp;<a target="_blank" href="https://profile.ea.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Origin brings you great PC and Mac games. Play the latest RPGs, Shooters, Sim games, and more.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">EA Origin [Private]</span>
&nbsp;<a target="_blank" href="https://profile.ea.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Origin brings you great PC and Mac games. Play the latest RPGs, Shooters, Sim games, and more.
These accounts are private (1 per person), however you MUST NOT change passwords.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">eBay</span>
&nbsp;<a target="_blank" href="https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&amp;_trksid=m570.l1524"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-danger pull-right">Out of Stock</span>
</h4>
<p>Buy and sell electronics, cars, fashion apparel, collectibles, sporting goods, digital cameras, baby items, coupons, and everything else on eBay.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">ESL Gaming</span>
&nbsp;<a target="_blank" href="https://play.eslgaming.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>World leading platform for esports. Play CS:GO, LoL, CoD, FIFA, SC2, WoT and more against real opponents for prizes and cash.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">fubo.tv</span>
&nbsp;<a target="_blank" href="https://www.fubo.tv/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>The largest collection of the latest football videos, match highlights, live scores, interviews, behind the scene clips and live audio.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Github</span>
&nbsp;<a target="_blank" href="https://github.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Online project hosting using Git. Includes source-code browser, in-line editing, wikis, and ticketing. </p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Good Old Games (GOG)</span>
&nbsp;<a target="_blank" href="https://www.gog.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Download the best classic and new games on Windows, Mac &amp; Linux. A vast selection of titles, DRM-free, with free goodies and 30-day money-back guarantee.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">HBO Now</span>
&nbsp;<a target="_blank" href="https://order.hbonow.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Stream all of HBO—the biggest shows, movies, and documentaries, plus hundreds of kids titles—to your favorite devices, no TV package required.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">HitLeap (with minutes)</span>
&nbsp;<a target="_blank" href="https://hitleap.com/authentication"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Free Website Traffic in minutes. HitLeap provides a traffic exchange service that helps you to increase visitors, rankings and more.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Hulu</span>
&nbsp;<a target="_blank" href="https://secure.hulu.com/account"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Hulu is the only streaming subscription service that offers current season programming from top U.S. broadcast networks the day after new episodes air, as well as acclaimed Hulu Originals.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Instagram</span>
&nbsp;<a target="_blank" href="https://www.instagram.com/accounts/login/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Instagram is an online mobile photo-sharing, video-sharing, and social networking service that enables its users to take pictures and videos, and share them either publicly or privately on the app, as well as through a variety of other social networking</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">KFC UK</span>
&nbsp;<a target="_blank" href="https://www.kfc.co.uk/colonelsclub"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Register, collect, redeem. It’s that simple! Join the Colonel’s Club today to start collecting Chicken Stamps and earn your way to free food rewards. Plus, get exclusive offers from KFC as you go. What’s not to love?</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">League of Legends [BR]</span>
&nbsp;<a target="_blank" href="http://br.leagueoflegends.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>League of Legends is a fast-paced, competitive online game that blends the speed and intensity of an RTS with RPG elements. Two teams of powerful champions, each with a unique design and playstyle, battle head-to-head across multiple battlefields and game</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">League of Legends [EUW]</span>
&nbsp;<a target="_blank" href="http://euw.leagueoflegends.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>As Above</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">League of Legends [NA]</span>
&nbsp;<a target="_blank" href="http://na.leagueoflegends.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>As Above</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">League of Legends [OCE]</span>
&nbsp;<a target="_blank" href="http://oce.leagueoflegends.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>As Above</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">League of Legends [TR]</span>
&nbsp;<a target="_blank" href="http://tr.leagueoflegends.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>As Above</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Lynda</span>
&nbsp;<a target="_blank" href="https://www.lynda.com/signin"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Learn software, creative, and business skills to achieve your personal and professional goals. Join today to get access to thousands of courses.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Mathway</span>
&nbsp;<a target="_blank" href="https://www.mathway.com/Algebra"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Math problem solver answers your algebra homework questions with step-by-step explanations.
</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Minecraft Premium</span>
&nbsp;<a target="_blank" href="https://minecraft.net/en/login/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Minecraft is a game about placing blocks and going on adventures. Buy it here, or explore the site for the latest news and the community's amazing creations!</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Miniclip</span>
&nbsp;<a target="_blank" href="http://www.miniclip.com/players/en/login.php"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>The Best Online Games! Awesome action games, puzzle games, exciting sports games, mobile games &amp; radical stunt games. Plus the worlds #1 pool game.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">MLB.TV</span>
&nbsp;<a target="_blank" href="https://securea.mlb.com/enterworkflow.do?flowId=registration.connect.wizard&amp;c_id=mlb&amp;template=mobile&amp;forwardUrl=http://mlb.mlb.com/mediacenter/index.jsp?c_id=mlb"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Watch full game archives of every 2016 regular season and Postseason game on over 400 supported devices. PLUS, watch select 2017 Spring Training games LIVE with no blackouts.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Napster (formerly Rhapsody)</span>
&nbsp;<a target="_blank" href="https://app.napster.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Stream music on-demand, download music for offline playback, and create playlists of your favorite songs.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">NBA League Pass</span>
&nbsp;<a target="_blank" href="https://watch.nba.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Watch live NBA games anywhere with NBA LEAGUE PASS. Go to nba.com/leaguepass to get started!</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Netflix</span>
&nbsp;<a target="_blank" href="https://www.netflix.com/Login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Netflix is the world’s leading Internet television network with over 83 million members in over 190 countries enjoying more than 125 million hours of TV shows and movies per day, including original series, documentaries and feature films.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Netflix Ultra HD</span>
&nbsp;<a target="_blank" href="https://www.netflix.com/globallogin"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Ultra HD 4k Netflix.
Netflix is the world’s leading Internet television network with over 83 million members in over 190 countries enjoying more than 125 million hours of TV shows and movies per day, including original series, documentaries and feature f</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">NFL Game Pass</span>
&nbsp;<a target="_blank" href="https://www.nfl.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Watch live NFL Preseason games, replay all 256 regular season games and listen to live gameday radio broadcasts with NFL Game Pass.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Pandora</span>
&nbsp;<a target="_blank" href="http://www.pandora.com/account/sign-in"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Pandora is personalized radio that plays music you'll love. Discover new music and enjoy old favorites. Start with your favorite artist, song or composer and Pandora will create a custom station that plays similar tracks</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Pinterest</span>
&nbsp;<a target="_blank" href="https://www.pinterest.com/login/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>A content sharing service that allows members to "pin" images, videos and other objects to their pinboard. </p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">PornHub</span>
&nbsp;<a target="_blank" href="https://wickedgen.com/www.pornhub.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Pornhub, part of the Pornhub NETWORK campaign, is a pornographic video sharing website and the largest pornography site on the Internet. </p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Reddit</span>
&nbsp;<a target="_blank" href="https://www.reddit.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Vote. The global Reddit community votes on which stories and discussions are important by casting upvotes or downvotes. The most interesting, funniest, impactful, or simply amazing stories rise to the top.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Roblox</span>
&nbsp;<a target="_blank" href="https://www.roblox.com/newlogin"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>ROBLOX is an online virtual playground and workshop, where kids of all ages can safely interact, create, have fun, and learn. It's unique in that practically everything on ROBLOX is designed and constructed by members of the community. ROBLOX is designed </p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Shutterstock</span>
&nbsp;<a target="_blank" href="https://accounts.shutterstock.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-danger pull-right">Out of Stock</span>
</h4>
<p>Search millions of royalty-free stock photos, illustrations, and vectors. Get inspired by ten thousand new, high-resolution images added daily.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Slingbox</span>
&nbsp;<a target="_blank" href="https://accounts.sling.com/accounts/sling/start?next=http%3A%2F%2Fwww.slingbox.com%2Fen-GB&amp;flow=default&amp;lang=ar&amp;l=slingbox&amp;policyCode=MAS&amp;context=DEFAULT_SLINGBOX&amp;ticket="><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Slingbox is a unique technology that lets you watch any content - whether that’s your cable TV channels with live and recorded shows or On Demand and video app content – anywhere in the world, on any device.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Soundcloud</span>
&nbsp;<a target="_blank" href="https://soundcloud.com/signin"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>SoundCloud is an audio platform that lets you listen to what you love and share the sounds you create.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Spotify</span>
&nbsp;<a target="_blank" href="https://www.spotify.com/login/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Spotify is a service that lets you stream music from a library that is so extensive that it would take 80 years of non-stop listening to hear it all.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Tidal</span>
&nbsp;<a target="_blank" href="https://listen.tidal.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>TIDAL is the first music service with High Fidelity sound quality, High Definition music videos and Curated Editorial, expertly crafted by music journalists.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Tumblr</span>
&nbsp;<a target="_blank" href="https://www.tumblr.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Post anything (from anywhere!), customize everything, and find and follow what you love. Create your own Tumblr blog today.
(All accounts have &gt;5 followers)</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Twitter</span>
&nbsp;<a target="_blank" href="https://twitter.com/login"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Twitter is an online news and social networking service where users post and read short 140-character messages called "tweets".</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Udemy</span>
&nbsp;<a target="_blank" href="https://www.udemy.com/join/login-popup/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Udemy is the world's largest destination for online courses. Discover an online course on Udemy.com and start learning a new skill today.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">UFC Fight Pass</span>
&nbsp;<a target="_blank" href="https://www.ufc.tv/page/fightpass"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>UFC FIGHT PASS is your ticket to all the MMA action, including hundreds of past and live events, Exclusive UFC FIGHT PASS Prelims, never-before-seen footage of your favorite fighters, plus original shows like Where Are They Now? and Lookin' For A Fight.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Vimeo</span>
&nbsp;<a target="_blank" href="https://vimeo.com/log_in"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Join the web's most supportive community of creators and get high-quality tools for hosting, sharing, and streaming videos in gorgeous HD and 4K with no ads</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">WWE</span>
&nbsp;<a target="_blank" href="https://secure.net.wwe.com/enterworkflow.do?flowId=account.login&amp;forwardUrl=http://network.wwe.com&amp;"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>With the award-winning WWE Network, you can watch every Pay-Per-View live, original programming, WWE's on demand library and much more.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Xbox Live</span>
&nbsp;<a target="_blank" href="https://account.xbox.com/Account/Signin?returnUrl=https://live.xbox.com/en-US/Home"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Xbox Live is where your gaming life comes together, with the games you love, the friends you play with, and the community that defines you.</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">Xfinity</span>
&nbsp;<a target="_blank" href="https://tv.xfinity.com/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-success pull-right">In Stock</span>
</h4>
<p>Watch TV series and top rated movies live and on demand with XFINITY® TV. Stream your favorite shows and movies anytime, anywhere!</p>
</td>
</tr>
<tr>
<td>
<h4>
<span class="fw-semi-bold">ZenMate Premium</span>
&nbsp;<a target="_blank" href="https://zenmate.com/login/"><i class="fa fa-external-link" aria-hidden="true"></i></a>
<span style="font-size: 13px" class="label label-danger pull-right">Out of Stock</span>
</h4>
<p>Get ZenMate Premium to stay secure and private online while accessing the content you love. Just choose your favorite plan!</p>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</div>
</div>
</main>
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