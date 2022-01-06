@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Последние заявки на вывод</span>
		</li>
	</ul>
</div>
<h1 class="page-title"> Последние заявки на вывод </h1>

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
							<th>#</th>
							<th>Пользователь</th>
							<th>Предмет 1</th>
							<th>Предмет 2</th>
							<th>Предмет 3</th>
							<th>Предмет 4</th>
							<th>Предмет 5</th>
							<th>Статус</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						@foreach($delivers as $b)
						<tr>
							<td style="vertical-align: middle;">{{$b->id}}</td>
							<td align="center"><a href="/account/{{$b->user_id}}">{{$b->name}}</a></td>
							<td style="vertical-align: middle;"><img src="{{$b->item1}}" style="width:30px;height:30px;" alt="{{$b->itemm1->name}}" title="{{$b->itemm1->name}}"></img></td>
							<td style="vertical-align: middle;"><img src="{{$b->item2}}" style="width:30px;height:30px;" alt="{{$b->itemm2->name}}" title="{{$b->itemm2->name}}"></img></td>
							<td style="vertical-align: middle;"><img src="{{$b->item3}}" style="width:30px;height:30px;" alt="{{$b->itemm3->name}}" title="{{$b->itemm3->name}}"></img></td>
							<td style="vertical-align: middle;"><img src="{{$b->item4}}" style="width:30px;height:30px;" alt="{{$b->itemm4->name}}" title="{{$b->itemm4->name}}"></img></td>
							<td style="vertical-align: middle;"><img src="{{$b->item5}}" style="width:30px;height:30px;" alt="{{$b->itemm5->name}}" title="{{$b->itemm5->name}}"></img></td>
							<td style="vertical-align: middle;">@if($b->status == 0) <i class="fa fa-clock-o" aria-hidden="true" style="color: #ffc800; text-align: center;"></i> @elseif($b->status == 1) <i class="fa fa-check" aria-hidden="true" style="color: green; text-align: center;"></i> @endif</td>
							<td align="center" style="vertical-align: middle;">
								<a class="btn blue btn-sm" data-toggle="modal" data-target="#add_item" href="/admin/deliver/{{ $b->id }}/edit">Edit</a>
							</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

@if(isset($b))
<div class="modal fade" id="add_item" tabindex="-1" role="basic" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			@include('admin.includes.modal_deliver', ['deliver' => $b])
		</div>
	</div>
</div>
@endif
@stop