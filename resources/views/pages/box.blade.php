@extends('layout')

@section('content')
<div class="col-md-10">
	<script>
		@if(Auth::guest())
		var login = 0;
		@else
		var login = {{Auth::user()->id}};
		@endif
	</script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pizzicato/0.6.2/Pizzicato.min.js"></script>
	<script src="/build/js/jquery-2.2.4.min.js"></script>
	<script src="/build/js/scratch.js?v=2"></script>
	<script src="/build/js/open.js?v=222222"></script>
	<link rel="stylesheet" href="/build/css/scratch.css?v=2">
	<script>
		window.config = {
		    'lang': 'ru',
		    'game_min_bet': 10,
		    'game_max_bet': 3000,
		    'game_guaranteed': 10,
		    'game_more': 20,
		    'game_win_min': 2,
		    'game_win_max': 4,
		    'min_deposit': 50,
		    'max_deposit': 10000,
		    'min_withdrawal': 100,
		    'max_withdrawal': 10000,
		    'level_up': 5000,
		    'bonus_daily': 1,
		    'referral_lvl1': 3,
		    'referral_lvl2': 4,
		    'referral_lvl3': 5,
		    'referral_sum': 10,
		    'referral_url': '',
		    'game_process_state': 0,
		    'game_process_bet': {{$case->price}},
		    'game_process_more': 20,
		    'game_process_winmin': 2,
		    'game_process_winmax': 4,
		    'game_process_guaranteed': 10,
		    'game_process_demo': 0,
		    'game_process_matrix': {
		        "1": "*",
		        "2": "*",
		        "3": "*",
		        "4": "*",
		        "5": "*",
		        "6": "*",
		        "7": "*",
		        "8": "*",
		        "9": "*"
		    },
		    'game_process_step': 0,
		    'game_process_step_4': 0,
		    'err_0': "Недостаточно средств на балансе",
		    'err_5': "Активирован DEMO режим, так как баланс или бесплатные попытки исчерпаны.",
		    'pbtn_1': "Начать игру",
		    'pbtn_2': "Играть Demo",
		    'sounds': 1,
		    'balance': 0,
		    'login': 'pIhF9pmiki',
		    'userpic': '',
		    'vk': 'vk.com/'
		};
		window.template = {};
		window.game = {
		    'blocker': '.game-blocker',
		    'blocker_d': '.game-blocker-disabled',
		    'loader': '.game-loader',
		    'btn_start': '.game-start-button',
		    'inp_amount': '.inp-bet-amount',
		    'layout_game_end': '.game-end',
		    'layout_game_win': '.game-win',
		    'layout_game_lose': '.game-lose',
		};
	</script>
	<div class="container2" style="overflow: hidden;
		position: relative;
		width: 400px;
		height: 140px;
		margin: 0 auto;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		-o-user-select: none;
		user-select: none;
		-moz-border-radius: 10px;
		">
		<a href="#" style="display: inline-block;" onclick="document.getElementById('ru').style.display = 'none';document.getElementById('game-table').style.display = 'block';" class="back">БИЛЕТЫ</a>
		@if($case->price != 0) <a href="#" onclick="document.getElementById('ru').style.display = 'block';
			document.getElementById('game-table').style.display = 'none';" class="back">БАРАБАН (БЕТА ТЕСТ)</a> @endif
	</div>
	<div id="ru" style="display: none;">
		<div class="game-win2" style="  display: none;
			position: fixed;
			top: 0;
			right: auto;
			bottom: auto;
			left: 0;
			height: 100vh;
			width: 100vw;
			background-color: rgba(0, 0, 0, 0.94);
			z-index: 120;">
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
					 @foreach($items as $item)
                        <div class="item">
                            <img src="{{$item->image}}" alt="{{$item->name}}" title="{{$item->name}}">
                        </div>
                    @endforeach
				</div>
			</div>
		</div>
		<div class="button-line">
			<div class="button-line__button-wrapper">
				<button id="start-roulette2" class="button-line__button button-line__start-button">Открыть коробку за <span class="price-box">{{ $case->price }}</span><span class="rouble">p</span></button>
				<input type="hidden" value="{{$case->id}}" id="box_id">
			</div>
		</div>
	</div>
	<div class="game" id="game-table">
		<div class="fix">
			<div class="cards">
				<div class="game-blocker" onclick="smoke.alert('Нажмите <b>«Начать играть»</b>, чтобы начать игру');"></div>
				<div class="game-loader"></div>
				<div class="demo-label demo-label-1" style="">
					<img src="/assets/img/demo.png" alt="DEMO" onclick="smoke.alert('<b>DEMO режим</b> включается автоматически, если вы не залогинены или ваш баланс исчерпан');">
				</div>
				<div class="game-end">
					<h3>Игра завершена!</h3>
					<button class="btn" onclick="gameAdditionalCard();">Открыть еще коробку за <span id="win-more-amount">0</span>р
					</button>
					<br>
					<button class="btn garant" onclick="gameGrabGuaranteedPrize();">Взять гарант приз</button>
					<div class="game-end-cover-1"></div>
				</div>
				<div class="game-win">
					<h3>
						Вы выиграли!<br><span id="game-win-amount">0</span>
						<div class="item_item_name " id="game-win-namer">силиконовый чехол чехол</div>
					</h3>
					<button class="btn garant" onclick="gamePlayAgain();">Закрыть</button>
					<button class="btn garant" onclick="goProfile();" style="margin-left:10px;">Заказать доставку</button>
					<button class="btn garant" style="margin-left:10px;" id="sell" onclick="sell();">Продать </button>
					<div class="game-end-cover-1"></div>
				</div>
				<div class="game-lose">
					<h3>Не угадали!</h3>
					<button class="btn garant" onclick="gamePlayAgain();">Еще раз <span class="flaticon-reload"></span>
					</button>
					<button class="btn garant" style="margin-left:10px;" id="sell2" onclick="sell();">Продать гарант</button>
				</div>
				<div class="game-containers">
					<div class="container" id="scratch-cn-1">
						<canvas class="canvas" id="scratch-can-1" width="190" height="140" data-field="1"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-1"><img id="gabo-image-1" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-2">
						<canvas class="canvas" id="scratch-can-2" width="190" height="140" data-field="2"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-2"><img id="gabo-image-2" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-3">
						<canvas class="canvas" id="scratch-can-3" width="190" height="140" data-field="3"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-3"><img id="gabo-image-3" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-4">
						<canvas class="canvas" id="scratch-can-4" width="190" height="140"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-4"><img id="gabo-image-4" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-5">
						<canvas class="canvas" id="scratch-can-5" width="190" height="140"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-5"><img id="gabo-image-5" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-6">
						<canvas class="canvas" id="scratch-can-6" width="190" height="140"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-6"><img id="gabo-image-6" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-7">
						<canvas class="canvas" id="scratch-can-7" width="190" height="140"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-7"><img id="gabo-image-7" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-8">
						<canvas class="canvas" id="scratch-can-8" width="190" height="140"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-8"><img id="gabo-image-8" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="container" id="scratch-cn-9">
						<canvas class="canvas" id="scratch-can-9" width="190" height="140"></canvas>
						<div class="winner-box" style="visibility: visible;">
							<div class="blinker"><i id="gabo-9"><img id="gabo-image-9" src="" style="width: 100px;"></i>
							</div>
						</div>
					</div>
					<div class="clr"></div>
				</div>
				<div align="center">
					<button class="btn game-start-button" onclick="gameStart();" style="z-index:1000;"></button>
				</div>
			</div>
			<div class="guaranteedBox more">
				<div class="guaranteedBox_title" onclick="guaranteedBox();">Гарантированный приз</div>
				<div class="guaranteedBox_img">
					<span id="win-gua-amount"></span>
				</div>
				<div class="guaranteedBox_info">
					<b> Как играть?</b><br>
					- Режте ножиком 3 одинаковых коробки и получите приз<br>
					-   3 попытки + 1 дополнительный по желанию (гарант приз)<br>
					-  Гарантированный выигрыш для каждого!
				</div>
			</div>
			<div class="clr"></div>
		</div>
	</div>
	<div class="content">
		<div class="box-items">
			<div class="row cases-row box-cases-row" align="center">
				@foreach($items as $item)
				<div class="box-case">
					<div class="dummy dummy-image">
						<div class="tooltip tooltip-west">
							<span class="tooltip-content">
							{{$item->name}} ({{$item->price}} руб. - цена продажи)</span>
							<span class="tooltip-item"></span>
						</div>
					</div>
					<img src="{{$item->image}}" alt="{{$item->name}}" class="box-case_img">
					<div class="box-case-title" title="{{$item->name}} ({{$item->price}} руб. - цена продажи)">{{$item->name}}</div>
				</div>
				@endforeach
			</div>
		</div>
	</div>
	<audio class="audio" id="audio-click" controls="" preload="auto">
		<source src="/assets/audio/click.mp3?v=2" type="audio/mpeg">
	</audio>
	<audio class="audio" id="audio-win" controls="" preload="auto">
		<source src="/assets/audio/win.mp3?v=1" type="audio/mpeg">
	</audio>
	<audio class="audio" id="audio-error" controls="" preload="auto">
		<source src="/assets/audio/error.mp3?v=1" type="audio/mpeg">
	</audio>
	<audio class="audio" id="audio-lose" controls="" preload="auto">
		<source src="/assets/audio/1lose.mp3?v=1" type="audio/mpeg">
	</audio>
	<audio class="audio" id="audio-start" controls="" preload="auto">
		<source src="/assets/audio/start.mp3?v=1" type="audio/mpeg">
	</audio>
	<audio class="audio" id="audio-choose" controls="" preload="auto">
		<source src="/assets/audio/1choose.mp3?v=1" type="audio/mpeg">
	</audio>
	<audio class="audio" id="audio-bet" controls="" preload="auto">
		<source src="/assets/audio/bet.mp3?v=1" type="audio/mpeg">
	</audio>
	<input type="hidden" value="{{$case->id}}" id="box_id">
	<!-- contest -->
</div>
@stop