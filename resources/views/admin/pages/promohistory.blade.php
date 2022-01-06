@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>История активации промо-кодов </span>
		</li>
	</ul>
</div>

<h1 class="page-title">История активации промо-кодов </h1>
<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }} <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
</div> <!-- end .flash-message -->
<div class="row">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
					<thead>
						<tr>
							<th>#</th>
							<th>Код</th>
							<th>Пользователь</th>
							<th>Активировал</th>
						</tr>
					</thead>
					<tbody>
					@php
					@endphp
						@foreach($history as $h)
						<tr>
							<td style="vertical-align: middle;">{{$h->id}}</td>
							<td align="center">{{ $h->code }}</td>
							<td style="vertical-align: middle;"><a href="/account/{{$h->user}}">{{$h->usr->username}}</a></td>
							<td style="vertical-align: middle;">{{$h->created_at->diffForHumans()}}</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

@endsection