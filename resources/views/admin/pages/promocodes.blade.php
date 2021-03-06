@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Промо-коды</span>
		</li>
	</ul>
</div>

<h1 class="page-title">Промо-коды </h1>
<div class="flash-message">
    @foreach (['danger', 'warning', 'success', 'info'] as $msg)
      @if(Session::has('alert-' . $msg))

      <p class="alert alert-{{ $msg }}">{{ Session::get('alert-' . $msg) }} <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a></p>
      @endif
    @endforeach
</div> <!-- end .flash-message -->
<div class="row">
	<div class="col-md-12">
		<form class="form-horizontal" method="POST" action="/admin/createpromo">
			<input type="hidden" name="_token" value="{{ csrf_token() }}">
			<div class="form-group">
				<label for="code" class="control-label col-xs-1">Сумма</label>
				<div class="col-xs-3">
					<input type="text" class="form-control" id="code" placeholder="CHEAPSCRIPTS.RU2017" onchange="" name='code' value=''>
				</div>
				<label for="amount" class="control-label col-xs-1">Сумма</label>
				<div class="col-xs-3">
					<input type="number" class="form-control" id="amount" placeholder="Сумма" onchange="if (this.value < 1) this.value=1" name='amount' value='100'>
				</div>
				<label for="count" class="control-label col-xs-1">Количество активаций</label>
				<div class="col-xs-3">
					<input type="number" class="form-control" id="count" placeholder="Количество" onchange="if (this.value < 1) this.value=1" name="count" value='50'>
				</div>
				<div class = "col-xs-12 pull-right">
					<button type="submit" class="btn btn-primary col-xs-1"><i class="fa fa-plus-circle" aria-hidden="true"></i> Создать</button>
				</div>
			</div>
		</form>
		<div class="portlet light bordered">
			<div class="portlet-body">
				<table id="example" class="table table-striped table-bordered" cellspacing="0" width="100%">
					<thead>
						<tr>
							<th>#</th>
							<th>Код</th>
							<th>Сумма за активацию</th>
							<th>Количество активаций</th>
							<th>Активировано</th>
							<th>Управление</th>
						</tr>
					</thead>
					<tbody>
						@foreach($a as $b)
						<tr>
							<td style="vertical-align: middle;">{{$b->id}}</td>
							<td align="center">{{ $b->code }}</td>
							<td style="vertical-align: middle;">{{$b->price}}</td>
							<td style="vertical-align: middle;">{{$b->activation_count}}</td>
							<td style="vertical-align: middle;">{{$b->activated}}</td>
							<td style="vertical-align: middle;"><a class="btn red btn-sm" href="/admin/promocode/{{ $b->id }}/delete">Удалить</a></td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

@endsection