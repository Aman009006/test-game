<script>
	$("#range_1").ionRangeSlider({
		type: "single",
		min: 0,
		max: 100,
		step: 10,
	});
</script>
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	<h4 class="modal-title">Запрос на доставку №{{$deliver->id}}</h4>
</div>
<form method="post" action="/admin/deliver/save" class="horizontal-form" id="save">
<div class="modal-body">
	<div class="row">
		<div class="col-md-6">
			<div class="control-group">
                <ul style="list-style-type: none; ">
					<h3>Данные для доставки</h3>
                    <li><span style="font-weight: bold;">ФИО:</span> {{$deliver->name}}</li>
                    <li><span style="font-weight: bold;">Страна:</span> {{$deliver->country}}</li>
                    <li><span style="font-weight: bold;">Город:</span> {{$deliver->city}}</li>
                    <li><span style="font-weight: bold;">Индекс:</span> {{$deliver->postalcode}}</li>
                    <li><span style="font-weight: bold;">Дом, корпус, строение:</span> {{$deliver->dom}}</li>
                    <li><span style="font-weight: bold;">Квартира / Офис:</span> {{$deliver->kvartira}}</li>
                    <li><span style="font-weight: bold;">Улица:</span> {{$deliver->street}}</li>
                </ul>
            </div>
		</div>
		<div class="col-md-6">
				<div class="form-group">
					<div class="control-group">
						<ul style="list-style-type: none; ">
							<h3>Предметы</h3>
							<li>{{$deliver->item1}}</li>
							<li>{{$deliver->item2}}</li>
							<li>{{$deliver->item3}}</li>
							<li>{{$deliver->item4}}</li>
							<li>{{$deliver->item5}}</li>
						</ul>
					</div>
				</div>
			</div>
	</div>
	
	<input name="id" value="{{$deliver->id}}" type="hidden">
	<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<div class="form-body">
		<div class="row">
		</div>
		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label">Трек-номер</label>
					<input type="text" class="form-control" name="tracking" value="@if($deliver->tracking == 'null') ---  @else {{ $deliver->tracking }} @endif"> 
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label">Статус</label>
					<select class="form-control" tabindex="1" name="status" value="{{ $deliver->status }}">
						<option value="1" @if($deliver->status == 1) selected @endif>Отправлено</option>
						<option value="0" @if($deliver->status == 0) selected @endif>Ожидает</option>
					</select>
				</div>
			</div>
		</div>
	</div>
	
</div>
<div class="modal-footer">
	<button type="button" class="btn dark btn-outline" data-dismiss="modal">Закрыть</button>
	<button type="submit" class="btn green"><i class="fa fa-check"></i> Сохранить</button>
</div>
</form>