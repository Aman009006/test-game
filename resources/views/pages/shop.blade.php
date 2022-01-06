@extends('layout')

@section('content')
<div class="col-md-10">
	<style>
		.live_bg {display:none;}
		.col-md-12 .col-md-10 {    }
		.col-md-2 {display:none;}
		.col-md-10 {width:100%;}
	</style>
	<div class="shop_bg">
		<div class="fix">
			<div class="container shop_top">
				<div class="fix">
					<div style="float:left;">
						<div class="content-button-row">
							<a href="/" class="back">&lt; Вернуться к списку коробок</a>
						</div>
					</div>
					<div style="float:right;">
						<div class="top-block__header" align="center">
							<div class="top-block__header-text">Магазин</div>
						</div>
						<div class="content-button-row lk-tabs" style="margin-top: 20px; text-align: center">
							<button data-tag="0" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_dark button-rounding_disabled">Все</button>
							<button data-tag="1" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Электроника</button>
							<button data-tag="2" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Звук</button>
							<button data-tag="3" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Для телефона</button>
							<button data-tag="4" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Прочее</button>
						</div>
					</div>
				</div>
			</div>
			<div class="container" align="center">
				<div class="row cases-row box-cases-row">
					@if(isset($items))
					@foreach($items as $i)
					<style>.tooltip:first-child {
						top: -30px;
						right: 30px;
						}
					</style>
					<div class="shop_it shop-item">
						<div class="dummy dummy-image">
							<div class="tooltip tooltip-west">
								<span class="tooltip-content">
								{{ $i->name }}   ( цена - {{$i->price}} руб.)</span>
								<span class="tooltip-item"></span>
							</div>
						</div>
						<div class="shop_it_item shop-box-{{$i->case->color}}">
							<div class="shop_it_price shop_it_gray">
								<span>  {{$i->price}}P</span>
							</div>
							<div class="shop_it_item_glow shop-box-{{$i->case->color}}-glow"></div>
							<img src="{{$i->image}}" class="shop_it_img" alt="" title="{{$i->name}}   ( цена - {{$i->price}} руб.)">
						</div>
						<button class="box__button shop-buy" data-id="{{$i->id}}" data-price="{{$i->price}}" title="{{$i->name}}   ( цена - {{$i->price}} руб.)">купить товар</button>
					</div>
					@endforeach
					@endif
				</div>
			</div>
		</div>
	</div>
	<script>
		$(document).ready(function(){
		    // switch tabs
		    $('.lk-tabs__lk-tab').click(function(){
		        var tag = $(this).attr('data-tag');
		        if(tag == 0) {
		            $('.shop-item').show();
		        } else {
		            $('.shop-item').each(function () {
		                var tags = $(this).attr('data-tags').split(',');
		                var hide = true;
		                for (var i = 0; i <= tags.length - 1; i++) {
		                    if (tags[i] == tag) {
		                        hide = false;
		                        break;
		                    }
		                }
		                if (hide) $(this).hide();
		                else $(this).show();
		            });
		        }
		    });
		});
	</script>
	<!-- contest -->
</div>
@stop

@section('scripts')
<script src="/build/js/all-dbd3292ee55e1f.js?v=22"></script>
@stop