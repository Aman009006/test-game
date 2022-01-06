@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Отзывы</span>
		</li>
	</ul>
</div>
<h1 class="page-title">Отзывы </h1>
<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }} <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
</div> <!-- end .flash-message -->
<div class="row">
	<div class="col-md-12" style="margin-bottom: 20px;">
		<div class="row">
			<form method="post" action="/admin/opinions/create" class="horizontal-form">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
			<div class="col-md-10">
				<input type="text" class="form-control" placeholder="Код записи" name="code" value="">
			</div>
			<div class="col-md-2">
				<button type="submit" class="btn blue"><i class="fa fa-check"></i> Добавить </button>
			</div>
		</div>
	</div>
	<div class="col-md-12">
		<center><h2>Добавленные отзывы</h2></center>
		<div class="row">
			@foreach($opinions as $o)
			<div class = "col-md-12" style="padding: 20px;border: 1px dashed black;"> {!! $o->code !!} <a href="/admin/opinion/{{$o->id}}/delete"><div class="btn red pull-right"><i class="fa fa-times" aria-hidden="true"></i> Удалить </div></div>
			@endforeach
		</div>
	</div>
</div>
@stop