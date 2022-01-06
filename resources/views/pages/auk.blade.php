@extends('layout')

@section('content')
<div class="col-md-10">
	<div class="profile_bg">
		<div class="fix">
			<div class="content-button-row">
				<div class="container">
					<a href="/aukcion" class="back">Аукцион</a>
					<a href="/aukcionhistory" class="back">История аукционов</a>
					<a href="/" class="back">Перейти к коробкам</a>
				</div>
			</div>
			<div class="game-win">
				<div class="game-win__wrapper">
					<div class="game-win__block">
						<div class="game-win__header-line">
							<div class="game-win__name" id="win-name">%name%</div>
						</div>
						<div class="game-win__block-prize game-win__block-prize_green">
							<div class="game-win__block-prize-bg-rays"><img src="/build/img/win-bg-1.png" alt="" class="game-win__block-prize-bg-rays-img game-win__block-prize-bg-rays-img_one"><img src="/build/img/win-bg-2.png" alt="" class="game-win__block-prize-bg-rays-img game-win__block-prize-bg-rays-img_two"></div>
							<img src="/build/img/tovary.png" alt="" class="game-win__block-prize-img">
						</div>
						<!--<div class="game-win__block-button-line"><a href="#" class="game-win__block-button-line-share-link"><span>Расскажи друзьям</span><br/>и получи +100500 к удаче</a></div>-->
						<div class="game-win__block-button-line">
							<button class="btn garant" id="win-sale-item">Продать за <span class="price">%price%</span><span class="rouble">p</span></button>
							<button class="btn garant" id="win-order-item">Заказать доставку</button>
							<button class="btn garant" id="button-game-again">Открыть еще</button>
						</div>
						<input type="hidden" value="" id="user-item-id">
					</div>
				</div>
			</div>
			<div class="roulette-line">
				<div class="roulette-wrapper__mid">
					<div class="roulette-wrapper__mid-layer">
						<div class="roulette-wrapper__mid-line roulette-wrapper__mid-line_top"></div>
						<div class="roulette-wrapper__mid-line roulette-wrapper__mid-line_bottom"></div>
					</div>
				</div>
				<div class="roulette-wrapper">
					<div class="roulette-wrapper__shadow roulette-wrapper__shadow_left"></div>
					<div class="roulette-wrapper__shadow roulette-wrapper__shadow_right"></div>
					<div class="roulette">
						<div class="item">
							<img src="{{$auction->item->image}}" alt="{{ $auction->item->name }}" title="{{ $auction->item->name }}">
						</div>
						<div class="item">
							<img src="/build/img/sad.png" alt="sad" width="72px" title="sad">
						</div>
					</div>
				</div>
			</div>
			<div class="button-line">
				<div class="button-line__button-wrapper">
					<div align="center">
						<button class="chance_but" id="start-roulette" style="z-index:100;"><span class="game_ico"></span>начать играть за  {{ $auction->item->price/2 }} P</button>
					</div>
					<input type="hidden" value="{{ $auction->id}}" id="box_id">
					<input type="hidden" value="{{ $auction->item->price }}" id="box_price">
					<input type="hidden" value="{{ $auction->item->price/2 }}" id="box_price2">
					<input type="hidden" value="50" id="procent">
				</div>
			</div>
			<div class="top-block__header" align="center">
				<div class="chance_minus"></div>
				<div class="chance_plus"></div>
				<div class="top-block__header-text">Ваш шанс на выигрыш <span id="pro">50</span> %</div>
			</div>
			<style>
				.range-slider {
				width: 50%;
				}
				.range-slider {
				margin: 10px auto;
				}
				.range-slider__range {
				-webkit-appearance: none;
				width: calc(100% - (73px));
				height: 10px;
				border-radius: 5px;
				background: #16191a;
				outline: none;
				padding: 0;
				margin: 0;
				}
				.range-slider__range::-webkit-slider-thumb {
				-webkit-appearance: none;
				appearance: none;
				width: 20px;
				height: 20px;
				border-radius: 50%;
				background: #006300;
				cursor: pointer;
				-webkit-transition: background .15s ease-in-out;
				transition: background .15s ease-in-out;
				}
				.range-slider__range::-webkit-slider-thumb:hover {
				background: #006300;
				}
				.range-slider__range:active::-webkit-slider-thumb {
				background: #006300;
				}
				.range-slider__range::-moz-range-thumb {
				width: 20px;
				height: 20px;
				border: 0;
				border-radius: 50%;
				background: #2c3e50;
				cursor: pointer;
				-webkit-transition: background .15s ease-in-out;
				transition: background .15s ease-in-out;
				}
				.range-slider__range::-moz-range-thumb:hover {
				background: #1abc9c;
				}
				.range-slider__range:active::-moz-range-thumb {
				background: #1abc9c;
				}
				.range-slider__value {
				display: inline-block;
				position: relative;
				width: 60px;
				color: #fff;
				line-height: 20px;
				text-align: center;
				border-radius: 3px;
				background: #2c3e50;
				padding: 5px 10px;
				margin-left: 8px;
				}
				.range-slider__value:after {
				position: absolute;
				top: 8px;
				left: -7px;
				width: 0;
				height: 0;
				border-top: 7px solid transparent;
				border-right: 7px solid #2c3e50;
				border-bottom: 7px solid transparent;
				content: '';
				}
				::-moz-range-track {
				background: #d7dcdf;
				border: 0;
				}
			</style>
			<div class="range-slider">
				<input class="range-slider__range" type="range" value="50" min="0" max="70" step="10">
			</div>
		</div>
		<div class="fix">
			<div class="chance_info_block">
				<img src="{{ $auction->item->image }}" alt="" class="chance_info_img">
				<div class="chance_info_info">
					<div class="chance_info_title">
						<b>{{ $auction->item->name }}</b>
					</div>
					<div class="chance_info_text">
						{{ $auction->item->desc }}
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- contest -->
</div>
@stop

@section('scripts')
<script src="/build/js/all-dbd3292ee55e1f.js?v=22"></script>
@stop