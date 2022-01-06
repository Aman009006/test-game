@extends('layout')

@section('content')
<div class="col-md-10">
<style>
	.live_bg {display:none;}
	.col-md-12 .col-md-10 {    }
	.col-md-2 {display:none;}
	.col-md-10 {width:100%;}
</style>
<script>
	var login = {{Auth::user()->id}};
</script>
<div class="profile_bg">
	<div class="fix">
		<div class="container">
			<div class="content-button-row visible-xs visible-sm">
				<a href="/box/8">
					<div class="lk-tabs__lk-cashin content-button-row__button  button-rounding button-rounding_med button-rounding_light">Бесплатных кейсов: <span>{{ Auth::user()->free_cases_left }}</span></div>
				</a>
			</div>
			<div class="content-button-row lk-tabs">
				<button data-toggleup="#game-history, #finance, #affiliate" data-toggledown="#profile-row" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_dark button-rounding_disabled">Профиль</button>
				<button data-toggleup="#profile-row, #finance, #affiliate" data-toggledown="#game-history" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Мои товары</button>
				<button data-toggleup="#profile-row, #game-history, #affiliate" data-toggledown="#finance" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Мои доставки</button>
				<button data-toggleup="#profile-row, #game-history, #finance" data-toggledown="#affiliate" id="affiliate-tab" class="lk-tabs__lk-tab content-button-row__button button-rounding button-rounding_med button-rounding_trans-dark">Партнёрская программа</button>
				<a href="/box/6">
					<div class="lk-tabs__lk-cashin content-button-row__button content-button-row__button_right button-rounding button-rounding_med button-rounding_light hidden-xs hidden-sm">Бесплатных кейсов: <span>0</span></div>
				</a>
			</div>
		</div>
		<div id="profile-row" class="lk-block profile-row profile_user">
			<div class="fix">
				<div class="profile_block">
					<div class="profile_info">
						<img src="{{Auth::user()->avatar}}" alt="" class="profile_img">
						<div class="profile_rows">
							<div class="profile_row1">
							{{Auth::user()->username}} <br>
								<a href="/logout" class="user_exit">выйти</a>
							</div>
							<div class="profile_row2">
								ОТКРЫТО КОРОБОК: <span>{{ $total_opened }}</span> <br>
								НА СУММУ: <span>{{ $total }}</span>
							</div>
							<div class="profile_row3">
								приглашено друзей: <span>{{$c}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="profile_block">
					<div class="profile_partner">
					@php
					$settings = \DB::table('settings')->where('id', 1)->first();
					@endphp
						<div class="profile_partner_top">	<span>У вас есть партнерский код?</span> <br>
							Введите код и получите на счет 	<span>{{$settings->ref_sum}}Р</span>  прямо сейчас			
						</div>
						<div class="profile_partner_input">
							<input value="" id="promocode_value">
							<button id="promocode_btn">OK</button>
						</div>
					</div>
					<div class="profile_promo">
						<div class="profile_promo_top">	<span>У вас есть БОНУС код?</span> <br>
							Введите код:	
						</div>
						<div class="profile_promo_input">
							<input value="" id="promo_value">
							<button id="promo_btn">OK</button>
						</div>
					</div>
				</div>
				<div class="profile_block">
					<div class="fix">
						<div class="right">
							<div class="promo_text">
								приглашайте друзей и зарабатывайте <span>{{$settings->ref_percent}}%</span> от всех пополнений
								отправьте свой уникальный код друзьям
								и получайте по <span>{{$settings->ref_percent}}%</span> <br>
								от каждого пополнения баланса друга
							</div>
							<div class="your_gifts">
								Пригласил:  {{$c}} <a style="outline:none;cursor:pointer;border:0;background:none;" data-toggleup="#profile-row, #game-history, #finance" data-toggledown="#affiliate" id="affiliate-tab" class="lk-tabs__lk-tab">Подробнее</a>
							</div>
							<div class="your_promo">
								ВАШ ПРОМОКОД: <span>{{Auth::user()->ref_code}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="fix">
				<div class="quest_title">
					Анкета для доставки товаров:<span> [Не менять до получения заказа] </span>
				</div>
				<div class="fix address" align="center">
					<div class="quest_block">
						<div class="quest_block_label">Фамилия Имя Отчество (полностью)</div>
						<input class="quest_block_input" name="profile_name" value="@if(isset($name)) {{$name}} @endif" data-error="Необходимо заполнить фамилию имя и отчество" title="">
						<div class="quest_block_label">Страна</div>
						<input class="quest_block_input" name="profile_country" value="@if(isset($country)) {{ $country }} @endif" data-error="Необходимо заполнить страну" title="">
						<div class="quest_block_label">Город</div>
						<input class="quest_block_input" name="profile_city" value="@if(isset($city)) {{ $city }} @endif" data-error="Необходимо заполнить город" title="">
						<div class="quest_block_label">Индекс</div>
						<input class="quest_block_input" name="profile_zip" value="@if(isset($postalcode)) {{ $postalcode }} @endif" data-error="Необходимо заполнить индекс" title="">
					</div>
					<div class="quest_block">
						<div class="quest_block_label">Улица</div>
						<input class="quest_block_input" name="profile_street" value="@if(isset($street)) {{$street}} @endif" data-error="Необходимо заполнить улицу" title="">
						<div class="quest_block_label">Дом, корпус, строение</div>
						<input class="quest_block_input" name="profile_house" value="@if(isset($dom)) {{$dom}} @endif" data-error="Необходимо заполнить дом, корпус и строение" title="">
						<div class="quest_block_label">Квартира / Офис</div>
						<input class="quest_block_input" name="profile_flat" value="@if(isset($kvartira)) {{$kvartira}} @endif" data-error="Необходимо заполнить квартиру или офис" title="">
						<div class="quest_block_label">Номер телефона (обязательно)</div>
						<input class="quest_block_input" name="phone" value="@if(isset($phone)) {{$phone}} @endif" data-error="Необходимо заполнить телефон" title="">
						<div class="address__button-line">
							<button class="address__button" id="btn-profile-delivery-save">Сохранить</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="game-history" class="lk-block game-history">
			<div class="corb_send ">
				<div class="corb_trash_title">корзина для отправки</div>
				<div class="fix box__cart-line" align="center">
					<div class="box_send box_cart" data-free="1">
						<div class="box_send_item">
							<div class="box_send_item_glow"></div>
							<div class="box__img-wrapper box_send_img" align="center">
							</div>
						</div>
						<div class="box__float-button-wrapper">
							<button class="box_send_del">  <span class="box_send_ico"></span>убрать из коробки</button>                            
						</div>
					</div>
					<div class="box_send box_cart" data-free="1">
						<div class="box_send_item">
							<div class="box_send_item_glow"></div>
							<div class="box__img-wrapper box_send_img" align="center">
							</div>
						</div>
						<div class="box__float-button-wrapper">
							<button class="box_send_del">  <span class="box_send_ico"></span>убрать из коробки</button>                        
						</div>
					</div>
					<div class="box_send box_cart" data-free="1">
						<div class="box_send_item">
							<div class="box_send_item_glow"></div>
							<div class="box__img-wrapper box_send_img" align="center">
							</div>
						</div>
						<div class="box__float-button-wrapper">
							<button class="box_send_del">  <span class="box_send_ico"></span>убрать из коробки</button>                               
						</div>
					</div>
					<div class="box_send box_cart" data-free="1">
						<div class="box_send_item">
							<div class="box_send_item_glow"></div>
							<div class="box__img-wrapper box_send_img" align="center">
							</div>
						</div>
						<div class="box__float-button-wrapper">
							<button class="box_send_del">  <span class="box_send_ico"></span>убрать из коробки</button>                          
						</div>
					</div>
					<div class="box_send box_cart" data-free="1">
						<div class="box_send_item">
							<div class="box_send_item_glow"></div>
							<div class="box__img-wrapper box_send_img" align="center">
							</div>
						</div>
						<div class="box__float-button-wrapper">
							<button class="box_send_del">  <span class="box_send_ico"></span>убрать из коробки</button>                                
						</div>
					</div>
				</div>
			</div>
			<div class="box__button-delivery-line" align="center">
				<button id="buy_fast" class="order_delivery box__button-delivery">   <span class="order_ico"></span>  Заказать доставку за {{$settings->d_price}}Р</button>
				<!--	<button id="buy_slow" class="order_delivery box__button-delivery">   <span class="order_ico"></span>  Заказать медленную доставку за 150Р</button>-->
			</div>
			<div class="cases-history">
			@foreach($items as $item)
                        <!--<div class="box-select col-xs-12 col-sm-6 col-md-4 col-lg-3" id="box-{{$item->id}}">
                            <a href="#">
                                <div class="box box_nobg box_gray-box">
                                    <div class="box__bg-layout">
                                        <div class="box__bg-wrapper">
                                            <div class="box__bg box__bg_hov box__bg_red"><img src="/build/img/box__red-hov_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__box box__bg_red box__bg-box"><img src="/build/img/box__red-box_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__bg_hov box__bg_orange"><img src="/build/img/box__orange-hov_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__box box__bg_orange box__bg-box"><img src="/build/img/box__orange-box_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__bg_hov box__bg_blue"><img src="/build/img/box__blue-hov_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__box box__bg_blue box__bg-box"><img src="/build/img/box__blue-box_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__bg_hov box__bg_green"><img src="/build/img/box__green-hov_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__box box__bg_green box__bg-box"><img src="/build/img/box__green-box_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__bg_hov box__bg_gray"><img src="/build/img/box__gray-hov_min.png" alt="" class="box__bg-img"></div>
                                            <div class="box__bg box__box box__bg_gray box__bg-box"><img src="/build/img/box__gray-box_min.png" alt="" class="box__bg-img"></div>
                                        </div>
                                    </div>
                                    <div class="box__header-wrapper">
                                        <div class="box__header-line">
                                            <div class="box__name">{{$item->name}}</div>
                                        </div>
                                    </div>
                                    <div class="box__img-wrapper"><img src="{{$item->image}}" alt="{{$item->name}}" title="{{$item->name}}" class="box__img"></div>
                                    <div class="box__float-button-wrapper box__float-button-wrapper_bottom">
                                        <button class="sale-box box__float-button" data-id="{{$item->id}}" data-title="{{$item->name}}" data-price="{{$item->price}}">
                                            <img src="/build/img/rub-icon.png" alt="" title="Продать" class="box__float-button-img">
                                        </button>
                                        <button class="add-cart box__float-button box__float-button_right" data-id="{{$item->id}}" data-image="{{$item->image}}" data-title="{{$item->name}}">
                                            <img src="/build/img/cart-icon.png" alt="" title="Доставить" class="box__float-button-img">
                                        </button>
                                    </div>
                                </div>
                            </a>
                        </div>-->
				<div class="box_history_bg">
					<div class="box_history box__float-button-wrapper box-select" id="box-{{$item->id}}" align="center">
						<button class="sale-box" data-id="{{$item->id}}" data-title="{{$item->name}}" data-price="{{$item->price}}">
						<span class="sell_ico"></span>   продать товар
						</button>
						<div class="box_history_title">{{$item->name}}</div>
						<div class="box_history_img">
							<img src="{{$item->image}}" alt="{{$item->name}}" title="{{$item->name}}">
						</div>
						<button class="add-cart" data-id="{{$item->id}}" data-image="{{$item->image}}" data-title="{{$item->name}}">
						<span class="send_ico"></span> переместить в коробку
						</button>
					</div>
				</div>
				@endforeach
			</div>
		</div>
		<div id="finance" class="lk-block finance">
			<div class="container">
				<div class="table-responsive">
					<table class="del_table_info">
						<thead>
							<tr>
								<td style="width: 30%;">Товары</td>
								<td style="width: 15%;">Адрес</td>
								<td style="width: 15%;">Статус</td>
								<td style="width: 15%;">Трекинг-код</td>
								<td style="width: 15%;">Дата оформления</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								@if($deliver == 'null')
								<td>
									Извините, ничего не найдено.
								</td>
								@else
									@foreach($deliver as $deliver1)
										<div class="table-col col-xs-12">
											<table class="finance__table main-table">
												<thead>
												<tr>

													<th class="main-table__th main-table__th_left" style="    width: 30%;">
														@if($deliver1->item1 != 'null')
															{{$deliver1->item1}},<br>
														@endif
														@if($deliver1->item2 != 'null')
																{{$deliver1->item2}},<br>
														@endif
														@if($deliver1->item3 != 'null')
																{{$deliver1->item3}},<br>
														@endif
														@if($deliver1->item4 != 'null')
																{{$deliver1->item4}},<br>
														@endif
														@if($deliver1->item5 != 'null')
																{{$deliver1->item5}}<br>
														 @endif
													</th>
													<th class="main-table__th main-table__th_left" style="    width: 25%;">
														Имя: {{$deliver1->name}}<br>
														Страна: {{$deliver1->country}}<br>
														Город: {{$deliver1->city}}<br>
														Индекс: {{$deliver1->postalcode}}<br>
														Дом: {{$deliver1->dom}}<br>
														Квартира: {{$deliver1->kvartira}}<br>
														Улица: {{$deliver1->street}}<br>
													</th>
													<th class="main-table__th main-table__th_center" style="    width: 10%;">
														@if($deliver1->status == 0)
														Ожидает отправки
														@elseif($deliver1->status == 1)
														Отправлено
														@endif
													</th>
													<th class="main-table__th main-table__th_center" style="    width: 20%;">
														@if($deliver1->tracking != 'null')
															{{$deliver1->tracking}}
														@else
															-
														@endif
													</th>
													<th class="main-table__th main-table__th_center"style="    width: 20%;">{{$deliver1->created_at}}</th>
												</tr>
												</thead>
												<tbody>
												</tbody>
											</table>
										</div>
									@endforeach
								@endif
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div id="affiliate" class="lk-block affiliate">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<div class="lk-block__header text-block text-block_align_center text-block_fs_b text-block_tf_up text-block_fw_bold">Партнёрская программа</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<div class="profile-affiliate dark-card">
							<div class="dark-card__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">
								Приглашай друзей и
								&nbsp;<span class="yellow">получай {{$settings->ref_percent}}% от всех пополнений!</span>
							</div>
							<div class="text-block">Моментально, деньги сразу доступны для выплаты.</div>
							<div class="row">
								<div class="dark-card__input-block-col col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<div class="dark-card__input-block input-block">
										<div class="input-block__header text-block">Твой промо-код:</div>
										<input id="change-kod__input" value="{{Auth::user()->ref_code}}" class="dark-card__input input-block__input input-block__input_left-align input-block__input_right-button-b">
									</div>
								</div>
							</div>
						</div>
						<div class="instruction-affiliate light-border-card">
							<div class="light-border-card__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">Инструкция:</div>
							<div class="light-border-card__element">
								<img src="/build/img/affiliate-instruction__icon_1.png" alt="" class="light-border-card__element-icon">
								<div class="light-border-card__element-text text-block">Распространяй свой промо-код и получай {{$settings->ref_percent}}% от всех пополнений игроков, которые введут его при регистрации. За ввод твоего промо-кода игрок получит {{$settings->ref_sum}} рублей!</div>
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
						<div class="partner-list">
							<div class="partner-list__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">
								Привлечённые игроки:
								<div class="hidden-xs partner-list__counter text-block text-block_color_gray">
									Пригласил:
									&nbsp;<span class="white">{{$c}}</span>
								</div>
							</div>
							<div class="row">
								<div class="table-col col-xs-12">
									<table class="partner-list__table main-table">
										<thead>
											<tr>
												<th class="main-table__th main-table__th_left">Игрок</th>
												<th class="main-table__th main-table__th_center">Cумма пополнения</th>
												<th class="main-table__th main-table__th_center">Дата</th>
											</tr>
										</thead>
										<tbody>
											@foreach($ref_payments as $r)
											<tr>
												<th class="main-table__th main-table__th_left" style="    width: 33%; color: white;">{{$r->user->username}}</th>
												<th class="main-table__th main-table__th_center" style="    width: 33%; color: white;">{{ $r->amount }}</th>
												<th class="main-table__th main-table__th_center" style="    width: 33%; color: white;">{{ $r->created_at }}</th>
											</tr>
											@endforeach
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@stop

@section('scripts')
<script src="/build/js/all-dbd3292ee55e1f.js?v=22"></script>
@stop