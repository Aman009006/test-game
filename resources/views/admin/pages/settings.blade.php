@extends('admin')

@section('content')
<div class="page-bar">
	<ul class="page-breadcrumb">
		<li>
			<a href="/admin">Главная</a>
			<i class="fa fa-circle"></i>
		</li>
		<li>
			<span>Настройки</span>
		</li>
	</ul>
</div>

<h1 class="page-title"> Настройки сайта </h1>

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
				<form method="post" action="/admin/settings/save" class="horizontal-form">
					<input type="hidden" name="_token" value="{{ csrf_token() }}">
					<div class="form-body">
						<div class="row">
							<div class="col-md-12">
								<div class="portlet-title">
									<div class="form-group">
										<div class="caption font-red-sunglo">
											<span class="caption-subject bold uppercase">Основные настройки</span>
										</div>
									</div>
								</div>
							</div> 
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">ID группы</label>
									<input type="number" class="form-control" placeholder="151007439" name="group_id" value="{{ $settings->group_id }}">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Ссылка на группу</label>
									<input type="text" class="form-control" placeholder="https://vk.com/cheap.scripts" name="group_link" value="{{ $settings->group_link }}">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Сумма за активацию реферального кода</label>
									<input type="number" class="form-control" placeholder="50" name="ref_sum" value="{{ $settings->ref_sum }}" onchange="if (this.value < 1) this.value=1">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Процент отчисления за реф.платежи</label>
									<input type="number" class="form-control" placeholder="5" name="ref_percent" value="{{ $settings->ref_percent }}" onchange="if (this.value < 1) this.value=1">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Сумма депозита для получения бесплтаного кейса</label>
									<input type="number" class="form-control" placeholder="300" name="free_case" value="{{ $settings->free_case }}">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Цена доставки</label>
									<input type="number" class="form-control" placeholder="300" name="d_price" value="{{ $settings->d_price }}">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<div class="portlet-title">
									<div class="form-group">
										<div class="caption font-red-sunglo">
											<span class="caption-subject bold uppercase">Настройка оплаты</span>
										</div>
									</div>
								</div>
							</div> 
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Минимальная сумма депозита</label>
									<input type="number" class="form-control" placeholder="50" name="min_pay" value="{{ $settings->min_pay }}" onchange="if (this.value < 1) this.value=1">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">ID Магазина</label>
									<input type="text" class="form-control" placeholder="ID Магазина" name="fk_id" value="{{ $settings->fk_id }}">
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Секретный ключ #1</label>
									<input type="text" class="form-control" placeholder="Секретный ключ #1" name="fk_secret1" value="{{ $settings->fk_secret1 }}">
								</div>
							</div>
							<div class="col-md-6">
								<div class="form-group">
									<label class="control-label">Секретный ключ #2</label>
									<input type="text" class="form-control" placeholder="Секретный ключ #2" name="fk_secret2" value="{{ $settings->fk_secret2 }}">
								</div>
							</div>
						</div>
					</div>
					<div class="form-actions right">
						<button type="submit" class="btn blue"><i class="fa fa-check"></i> Создать </button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>


@endsection