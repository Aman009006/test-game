@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Редактировать аукцион</span>
		</li>
	</ul>
</div>


<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }} <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
</div> <!-- end .flash-message -->


<h1 class="page-title"> Список предметов 
	<span style="margin-left: 20px;">
		<a class="btn btn-lg green" data-toggle="modal" data-target="#add_item" href="/admin/aitem/{{ $case->id }}/add"> Добавить предмет <i class="fa fa-plus"></i></a>
	</span>
</h1>

<div class="row">
	<div class="col-md-12">
		<table class="table table-striped table-bordered" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>ID</th>
					<th>Картинка</th>
					<th>Имя</th>
					<th>Цена</th>
					<th>Управление</th>
				</tr>
			</thead>
			<tbody>
				@foreach($items as $item)
				<tr>
					<td style="vertical-align: middle;">{{$item->id}}</td>
					<td align="center"><img width="50px" src="{{ $item->image }}"/></td>
					<td style="vertical-align: middle;">{{$item->name}}</td>
					<td style="vertical-align: middle;">{{$item->price}}</td>
					<td align="center" style="vertical-align: middle;">
						<a class="btn blue btn-sm" data-toggle="modal" data-target="#add_item" href="/admin/aitem/{{ $item->id }}/edit">Редактировать</a>
						<a class="btn red btn-sm" href="/admin/aitem/{{ $item->id }}/delete">Удалить</a>
					</td>
				</tr>
				@endforeach
			</tbody>
		</table>
	</div>
</div>

<div class="modal fade" id="add_item" tabindex="-1" role="basic" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			@include('admin.includes.modal_aitem_add', ['case' => $case])
		</div>
	</div>
</div>

@if(!$item)
<div class="modal fade" id="edit_item" tabindex="-1" role="basic" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			@include('admin.includes.modal_item_edit', ['item' => $item])
		</div>
	</div>
</div>
@else
@endif
@endsection