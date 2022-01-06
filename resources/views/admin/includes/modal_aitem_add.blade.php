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
	<h4 class="modal-title">Создание нового предмета</h4>
</div>
<form method="post" action="/admin/aitem/add" class="horizontal-form" id="save">
<div class="modal-body">
	<input name="id" value="{{ $case->id }}" type="hidden">
	<input type="hidden" name="_token" value="{{ csrf_token() }}">
	<div class="form-body">
		<div class="row">
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label">Имя предмета</label>
					<input type="text" class="form-control" name="name" value="">
				</div>
			</div>
			<div class="col-md-6">
				<div class="form-group">
					<label class="control-label">Цена</label>
					<input type="text" class="form-control" name="price" value="">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group">
					<label class="control-label">Описание</label>
					<input type="text" class="form-control" name="desc" value="">
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<div class="form-group text-center">
					<label class="control-label">Картинка</label>
					<div class="col-md-12">
						<input type="text" class="form-control" name="image" placeholder="Путь к картинке: /style/coin-100.svg">
					</div>
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