@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Список аукционов</span>
		</li>
	</ul>
</div>

<h1 class="page-title"> Список аукционов</h1>

<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }} <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
</div>

<div class="row">
	<div class="col-md-12">
		<div class="portlet light bordered">
			<div class="portlet-body">
				<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
					<thead>
						<tr>
							<th>ID</th>
							<th>Предмет</th>
							<th>Название</th>
							<th>Цена</th>
							<th>Управление</th>
						</tr>
					</thead>
					<tbody>
						@foreach($aukc as $a)
						<tr>
							<td style="vertical-align: middle;">{{$a->id}}</td>
							<td align="center"><img width="50px" src="@if(isset($a->item)) {{ $a->item->image }} @else /build/images/shop_box1.png @endif" title="@if(isset($a->item)) {{$a->item->name}} @else Пустой бокс @endif"></td>
							<td style="vertical-align: middle;">@if(isset($a->item)) {{$a->item->name}} @else Пустой бокс @endif</td>
							<td style="vertical-align: middle;">@if(isset($a->item)) {{$a->item->price}}  @else - @endif</td>
							
							<td align="center" style="vertical-align: middle;">
								<a class="btn blue btn-sm" href="/admin/aukcion/{{ $a->id }}/edit">Редактировать</a>
								<a class="btn red btn-sm" href="/admin/aukcion/{{ $a->id }}/delete">Удалить</a>
							</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
@endsection