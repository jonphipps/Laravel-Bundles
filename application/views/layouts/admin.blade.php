
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Administration</title>
		{{Asset::styles()}}
	</head>
	<body id="{{URI::segment(1, 'home')}}" class="{{URI::segment(2, 'index')}}">

		<!-- Navigation -->
		<div class="navbar navbar-static">
			<div class="navbar-inner">
				<div class="container">
					<a class="brand" href="{{URL::to('admin')}}">Bundles Admin</a>
					<ul class="nav">
						<li class="{{Nav::active('admin')}}"><a href="{{URL::to('admin')}}">Home</a></li>
						<li class="{{Nav::active('admin_bundles*')}}"><a href="{{URL::to('admin_bundles')}}">Bundles</a></li>
						<li class="{{Nav::active('admin_users*')}}"><a href="{{URL::to('admin_users')}}">Users</a></li>
						<li class="{{Nav::active('admin_pages*')}}"><a href="{{URL::to('admin_pages')}}">Pages</a></li>
						<li class="{{Nav::active('admin_cats*')}}"><a href="{{URL::to('admin_cats')}}">Categories</a></li>
					</ul>
				</div>
			</div>
		</div>
		<!-- End Navigation -->

		<div class="container">
			<div class="messages">
				{{View::make('partials.messages')->render()}}
			</div>
			<div class="content">
				{{$content}}
			</div>

			<footer>
				<p>&copy; {{date("Y")}} Userscape</p>
			</footer>

		</div> <!-- /container -->
<script>
var SITE_URL = "<?php echo URL::to(); ?>";
var BASE_URL = "<?php echo URL::base(); ?>";
@if (isset($tags) AND is_array($tags))
	var initialTags = [
		@foreach ($tags as $tag)
			"{{$tag}}",
		@endforeach
	];
@else
	var initialTags = [];
@endif

@if (isset($dependencies) AND is_array($dependencies))
	var initialDependenciesTags = [
		@foreach ($dependencies as $item)
			"{{$item}}",
		@endforeach
	];
@else
	var initialDependenciesTags = [];
@endif
</script>
		{{Asset::scripts()}}
	</body>
</html>