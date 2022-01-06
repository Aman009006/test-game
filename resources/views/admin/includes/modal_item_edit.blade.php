<script>
	$("#range_1").ionRangeSlider({
		type: "single",
		min: 0.1,
		max: 100,
		step: 0.1
	});
</script>
<div class="modal-header">
	<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
	<h4 class="modal-title">Редактирование предмета</h4>
</div>
<form method="post" @if(!isset($item->auc_id)) action="/admin/item/update" @else action="/admin/aitem/update" @endif class="horizontal-form" id="save">
<div class="modal-body">
	<input name="id" value="{{ $item->id }}" type="hidden">
	<input name="case_id" value="{{ $item->case_id }}" type="hidden">
	<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<div class="form-body">
		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label">Имя предмета</label>
					<input type="text" class="form-control" name="name" value="{{ $item->name }}">
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label">Цена</label>
					<input type="text" class="form-control" name="price" value="{{ $item->price }}">
				</div>
			</div>
		</div>
		<div class="row">
			@if(!isset($item->auc_id))
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label">Тип</label>
					<select class="form-control" tabindex="1" name="type" value="{{ $item->type }}">
						<option value="0" @if($item->type == '0') selected @endif>Выпадающий</option>
						<option value="1" @if($item->type == '1') selected @endif>Не выпадает</option>
					</select>
				</div>
			</div>
			@endif
		</div>
		@if(isset($item->auc_id))
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label">Описание</label>
					<input type="text" class="form-control" name="desc" value="{{ $item->desc }}">
				</div>
			</div>	
		</div>
		@endif
		<div class="row">
			@if(!isset($item->auc_id))
			<div class="col-md-6">
			@else
			<div class="col-md-12">
			@endif
				<div class="form-group text-center">
					<label class="control-label">Путь к картинке</label>
					<div class="col-md-12">
						<input type="text" class="form-control" name="img" placeholder="Путь к картинке: /style/coin-100.svg" value="{{ $item->image }}">
					</div>
				</div>
			</div>
			@if(!isset($item->auc_id))
			<div class="col-md-6">
				<div class="form-group text-center">
					<label class="control-label">Добавить в магазин</label>
					<div class="col-md-12">
						<input type="checkbox" id="subscribeNews" name="in_shop" value="1" @if( $item->in_shop == 1 ) checked @endif>
					</div>
				</div>
			</div>
			@endif
		</div>
		</div>
	</div>
	
</div>
<div class="modal-footer">
	<button type="button" class="btn dark btn-outline" data-dismiss="modal">Закрыть</button>
	<button type="submit" class="btn green"><i class="fa fa-check"></i> Сохранить</button>
</div>
</form>