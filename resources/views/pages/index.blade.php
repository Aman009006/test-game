@extends('layout')

@section('content')
<div class="col-md-10">		
<!-- /contest -->
	<div class="cases-line">
		<div class="container">
			<div class="row cases-row box-cases-row">
			@foreach($cases as $c)
				<div class="col-sm-12">
					<div class="box box_{{$c->color}}-box">
						<div class="fix">
							<a href="/box/{{$c->id}}">
								<div class="col-sm-3 pad0">
									<div class="image_box">
										<div class="box_case_name">
										{{$c->name}}                    
										</div>
										<img src="{{$c->image}}" alt="" class="box_img">
									</div>
								</div>
							</a>
							<div class="col-sm-9 pad0">
								<div align="center">
									<div class="box_open">
										<a href="/box/{{$c->id}}">Открыть коробку <span>за {{$c->price}}р</span></a>
										<div class="box_open_price box_open_price_{{$c->color}}">
											<span>  {{$c->price}}р</span>
										</div>
									</div>
								</div>
								<div class="box_info">
									<div class="box_info_items">   содержит <span>{{count($c->items)}} </span>товаров</div>
									<div class="box_info_money">
										Выдано товаров на сумму {{$c->total}}руб.
									</div>
								</div>
								<div align="center" class="glows">
								@if(count($c->items) != 0)
									@foreach($c->items as $ee)
									<a href="/box/{{$c->id}}">
										<div class="box_it">
											<div class="box_it_glow"></div>
											<img src="{{$ee->image}}" class="box__it_img" style=" width: 70px;height: 70px;"/>
										</div>
									</a>
									@endforeach
								@endif
								</div>
							</div>
						</div>
					</div>
				</div>
				@endforeach
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
<script src="/build/js/all-dbd3292ee55e1f.js?v=2"></script>
@stop