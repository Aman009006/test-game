@extends('layout')

@section('content')
<div class="col-md-10">
	<style>
		.live_bg {display:none;}
		.col-md-12 .col-md-10 {    }
		.col-md-2 {display:none;}
		.col-md-10 {width:100%;}
	</style>
	<div class="profile_bg">
		<div class="fix">
			<div class="content-button-row">
				<div class="container">
					<a href="/" class="content-button-row__button button-rounding button-rounding_med button-rounding_dark">&lt; Вернуться к списку коробок</a>
				</div>
			</div>
			@php
			$settings = \DB::table('settings')->where('id', 1)->first();
			@endphp
			<div class="help-padge">
				<div class="container">
					<div class="col-xs-12">
						<div class="help-padge__header text-block text-block_align_center text-block_fs_b text-block_tf_up text-block_fw_bold">Доставка и оплата</div>
					</div>
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-7">
						<div class="faq-block">
							<div class="help-padge__faq-block-header faq-block__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">Доставка</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как заказать товар, полученный из коробок?</div>
							<div class="faq-block__answer text-block">
								Чтобы заказать товары, которые вам выпали из коробок:
								<ol>
									<li>Перейдите на страницу вашего профиля и заполните анкету для доставки товаров.</li>
									<li>Перейдите в раздел «Мои товары».</li>
									<li>У каждого предмета есть 2 кнопки - «Продать» и «Добавить в корзину».</li>
									<li>Нажмите на кнопку «Добавить» у всех товаров, которые вы хотите заказать с доставкой. После этого они переместятся в коробки «Корзины доставки»</li>
									<li>После наполнения корзины нажмите кнопку «Заказать доставку».</li>
								</ol>
							</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как отслеживать статус моей посылки?</div>
							<div class="faq-block__answer text-block">Перейдите в раздел “Мои заказы” на странице вашего профиля и отслеживайте изменение статуса заказа в удобной таблице.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Сколько стоит доставка?</div>
							<div class="faq-block__answer text-block">Стоимость доставки для всех стран и регионов составляет {{$settings->d_price}} рублей. Оплата доставки списывается с баланса на сайте.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Сколько товаров можно заказать одновременно?</div>
							<div class="faq-block__answer text-block">В одной посылке мы можем доставить от 1 до 5 товаров включительно. Если вы хотите заказать больше 5 товаров необходимо оформить несколько доставок.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Куда вы сможете доставить товары?</div>
							<div class="faq-block__answer text-block">Доставка производится во все города России, Украины, Республики Беларусь, Казахстана, Азербайджана, Армении, Киргизии, Молдавии, Таджикистана, Туркмении и Узбекистана. Стоимость доставки не зависит от региона и составляет {{$settings->d_price}} рублей.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Есть ли самовывоз?</div>
							<div class="faq-block__answer text-block">Самовывоза нет, все товары доставляются только через Почту России и транспортные компании.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как быстро производится доставка?</div>
							<div class="faq-block__answer text-block">Доставка товаров в пределах России производится в течение 30 дней с момента оформления заказа через Почту России. Заказы в страны СНГ доставляются от 30 до 60 дней при помощи транспортных компаний и выдаются в специальных пунктах выдачи, расположенных в вашем городе.</div>
							<div class="help-padge__faq-block-header faq-block__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">Оплата</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как пополнить баланс?</div>
							<div class="faq-block__answer text-block">Нажмите на кнопку “+” или “пополнить баланс” в верхней части сайта.<br>
								Откроется список возможных способов оплаты.<br>
								После завершения оплаты вы будете перенаправлены обратно на сайт и сможете открывать коробки и заказывать доставку.
							</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Минимальная и максимальная сумма пополнения баланса?</div>
							<div class="faq-block__answer text-block">Баланс можно пополнить на сумму от 100 рублей. За один раз можно пополнять баланс не более, чем на 15 000 рублей.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как быстро зачисляются средства?</div>
							<div class="faq-block__answer text-block">Все платежи зачисляются в течение 1 минуты после оплаты. Если деньги не зачислились на баланс - обратитесь к нашим консультантам в форме справа.</div>
							<div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Можно выводить деньги?</div>
							<div class="faq-block__answer text-block">Нет. Баланс можно только тратить на открытие коробок и заказ доставки товаров.</div>
						</div>
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