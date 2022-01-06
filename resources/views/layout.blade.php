<!DOCTYPE html>
<html>
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<meta name="csrf-token" content="{{ csrf_token() }}">
		<title>Интернет-магазин с сюрпризами box-case — уникальные призы для всех</title>
		<meta name="description" content="Бокс кейс Интернет-магазин  уникальных вещей. У нас на сайте вы можете получить приятные бонусы, подарки в сюрпизкейсах, доставка в любую точку России и СНГ"/>
		<meta name="keywords" content="бокс кейс, box case, box-case, сюрприз бокс, сюрпризатор, сюрприз кейс, ранбокс, ранбокс ру, сюрприз кейс, ranbox, ranbox ru, сайт ranbox, промокоды для ranbox, сайт ranbox ru, ranbox ru отзывы, сюрприз бокс, сайт кейс" />
		<link rel="stylesheet" href="/build/css/all-20597ee14f.css?v=1222223222222">
		<script src="/build/js/jquery-2.2.4.min.js"></script>
		<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
		<link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
		<link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
		<link rel="mask-icon" href="safari-pinned-tab.svg" color="#5bbad5">
		<meta name="theme-color" content="#ffffff">
		<script>
			var login = 0;     
		</script>
	</head>
	<body>
		<link rel="stylesheet" href="/build/css/animate.css" />
		<link rel="stylesheet" type="text/css" href="/build/css/tooltip-curved.css" />
		<header>
			<div class="h_top">
				<div class="row">
					<div class="inner">
						<div class="row">
							<div class="col-md-12">
								<div class="fix">
									<div class="pad15">
										<a href="/" class="h_logo">
										</a> 
									</div>
									<div class="h_menu" >
										<!-- Brand and toggle get grouped for better mobile display -->
										<div class="navbar-header">
											<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
											<span class="sr-only">Toggle navigation</span>
											<span class="icon-bar"></span>
											<span class="icon-bar"></span>
											<span class="icon-bar"></span>
											</button>
										</div>
										<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
											<ul class="nav navbar-nav ">
												<li><a href="/aukcion">Аукцион </a></li>
												<!--<li><a href="/">Коробки </a></li>-->
												<li><a href="/shop">Магазин </a></li>
												<li><a href="/delivery">Доставка </a></li>
												<li><a href="/opinions">Отзывы </a></li>
												<li><a href="/help">Помощь </a></li>
											</ul>
										</div>
										<!-- /.navbar-collapse -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="h_info">
				<div class="row">
					<div class="inner">
						<div class="row">
							<div class="col-md-12">
								<div class="fixs">
									@if(Auth::guest())
									<div class="user_profile">
										<a href="#" class="h_link"><span class="user_ico"> Регистрация</span></a>
										<a href="/login" class="h_vk"><span class="ico_vk"> Войти через VK</span></a>
									</div>
									@else
									<div class="user_profile">
										<a href="/profile" class="user_avatar">
											<img src="{{Auth::user()->avatar}}" alt="">
											<span> {{Auth::user()->username}} </span>
										</a>
										<div class="user_balance">
											Баланс: <span class="user-balance" style="color:#fff;">{{Auth::user()->money}}</span><span>Р</span>
										</div>
										<div class="user_balance_link modal-toggle" data-toggle="add-cash">пополнить</div>	 
									</div>
									@endif
									<div class="user_info">
										<div class="user_info_block">
											<div class="user_info_block_t">Пользователей </div>
											<div class="user_info_block_c counter-user " data-value="0">0 </div>
										</div>
										<div class="user_info_block boxes">
											<div class="user_info_block_t">Открыто коробок  </div>
											<div class="user_info_block_c counter-case " data-value="0">0 </div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
		<div class="main-wrapper">
			<div class="container-fluid">
				<div class="row">
					<div class="inner">
						<div class="row">
							<div class="col-md-12">
								<div class="live_bg">
									<div class="live col-md-2">
										<a href="/bonus" class="bonus"><img src="/build/images/gift.svg" class="gift_svg" alt="">Бонус каждый день</a> 
										<div class="live_top">
										</div>
										<div class="live_row live-win__coins-wrapper">
										</div>
									</div>
								</div>
									@yield('content')
									<!-- contest -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="container-fluid">
				<div class="row">
					<div class="inner">
						<div class="row">
							<div class="col-md-12">
								<div class="col-md-12">
									<!--   <div class="descr">
										Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud <br>
										exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.<br> 
										Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem <br>
										accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. <br>
										Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. <br>
										Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam <br>
										aliquam quaerat voluptatem.-->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer>
			<div class="row">
				<div class="inner">
					<div class="row">
						<div class="col-md-12">
							<div class="f_fix">
								<div class="f_top">
									<div class="f_menu">
										<div class="f_menu_li"><a href="index">Коробки </a> </div>
										<div class="f_menu_li"><a href="shop">Магазин </a> </div>
										<div class="f_menu_li"><a href="delivery">Доставка </a> </div>
										<div class="f_menu_li"><a href="opinions">Отзывы </a> </div>
										<div class="f_menu_li"><a href="help">Помощь </a> </div>
									</div>
									<div class="f_rekv">
										<div class="f_rekv_li">    <img src="/build/images/master.png" alt=""></div>
										<div class="f_rekv_li">   <img src="/build/images/qiwi.png" alt=""></div>
										<div class="f_rekv_li">    <img src="/build/images/visa.png" alt=""></div>
										<div class="f_rekv_li">    <img src="/build/images/yandex.png" alt=""></div>
									</div>
								</div>
								<div class="f_banners">
									<div class="f_banner_li"><a href="http://www.free-kassa.ru/"><img src="/build/images/free-kassa_logo.png"></a></div>
									<!--    <div class="f_banner_li"><a href="https://passport.webmoney.ru/asp/certview.asp?wmid=166615348360"><img src="/build/images/webmoney.png"></a></div>-->
									<div class="f_banner_li">
										<!--LiveInternet counter--><script type="text/javascript">
											document.write("<a href='//www.liveinternet.ru/click' "+
											"target=_blank><img src='//counter.yadro.ru/hit?t58.15;r"+
											escape(document.referrer)+((typeof(screen)=="undefined")?"":
											";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
											screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
											";"+Math.random()+
											"' alt='' title='LiveInternet' "+
											"border='0' width='88' height='31'><\/a>")
										</script><!--/LiveInternet-->
									</div>
								</div>
								<div class="f_text">
									BOX-CASE самый честный магазин коробок-сюрпризкейсов. Сайт по открытию коробок призов. 
									<p>copyright 2017 "/box-CASE"
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<!-- <div class="footer-wrapper">
			<div class="footer">
			    <div class="container22">
			        <div class="row">
			            <div class="col-sm-5 col-md-6 col-lg-7 hidden-xs">
			                <div class="footer__pay-system-header text-block text-block_tf_up text-block_color_gray text-block_fs_m text-block_fw_bold">Мы принимаем</div>
			            </div>
			            <div class="col-xs-12 col-sm-7 col-md-6 col-lg-5">
			                <nav class="nav-line footer__nav">
			                    <div class="nav-line__element footer__nav-element">
			                        <a href="/">
			                            <div class="nav-line__link  nav-line__link_active " >
			                                Коробки
			                            </div>
			                        </a>
			                    </div>
			                    <div class="nav-line__element footer__nav-element">
			                        <a href="/delivery">
			                            <div class="nav-line__link " >
			                                Доставка
			                            </div>
			                        </a>
			                    </div>
			                    <div class="nav-line__element footer__nav-element">
			                        <a href="/opinions">
			                            <div class="nav-line__link " >
			                                Отзывы
			                            </div>
			                        </a>
			                    </div>
			                    <div class="nav-line__element footer__nav-element">
			                        <a href="/help">
			                            <div class="nav-line__link " >
			                                Помощь
			                            </div>
			                        </a>
			                    </div>
			                </nav>
			            </div>
			        </div>
			        <div class="row visible-xs">
			            <div class="col-xs-12">
			                <div class="footer__pay-system-header text-block text-block_tf_up text-block_color_gray text-block_fs_m text-block_fw_bold text-block_align_center">Мы принимаем</div>
			            </div>
			        </div>
			        <div class="row">
			            <div class="col-xs-12 col-sm-5 col-md-6 col-lg-4">
			                <div class="pay-system">
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_mc.png" alt="MasterCard" title="MasterCard" class="pay-system__img"/></div>
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_visa.png" alt="Visa" title="Visa" class="pay-system__img"/></div>
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_ym.png" alt="Яндекс.Деньги" title="Яндекс.Деньги" class="pay-system__img"/></div>
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_qiwi.png" alt="Qiwi" title="Qiwi" class="pay-system__img"/></div>
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_mts.png" alt="МТС" title="МТС" class="pay-system__img"/></div>
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_tele2.png" alt="Tele2" title="Tele2" class="pay-system__img"/></div>
			                    <div class="pay-system__img-wrapper"><img src="/build/img/pay-icon_bee.png" alt="Beeline" title="Beeline" class="pay-system__img"/></div>
			                </div>
			                <div class="hidden"><a href="//www.free-kassa.com/"><img src="//www.free-kassa.ru/img/fk_btn/9.png"></a></div>
			                <div class="footer__copy-text text-block text-block_color_gray hidden-xs">Copyright © 2016 &mdash; 2017</div>
			            </div>
			            <div class="col-xs-12 col-sm-7 col-md-6 col-lg-5 col-lg-offset-3">
			                <div class="footer__vk-widgets">
			                    <div class="footer__vk-wrapper">
			                        <div id="vk_groups"></div>
			                    </div>
			                </div>
			            </div>
			        </div>
			        <div class="row">
			            <div class="col-xs-9 col-sm-8 col-md-6 col-lg-6">
			                <div class="footer__terms text-block text-block_color_gray text-block_fs_s">
			                    Авторизуясь на сайте вы принимаете&nbsp;
			                    <a href="/license" class="text-block__link">пользовательское соглашение</a><br>
			                    <a href="/confidence" class="text-block__link">Политика конфиденциальности</a>
			                </div>
			            </div>
			            <div class="col-xs-3 col-sm-4 col-md-6 col-lg-6">
			                <div class="footer__age-limit-wrapper">
			                    <div class="age-limit">18+</div>
			                </div>
			            </div>
			        </div>
			        <div class="row">
			            <div class="col-xs-12">
			                <div class="footer__copy-text text-block text-block_color_gray text-block_align_center visible-xs">Copyright © 2016 &mdash; 2017</div>
			            </div>
			        </div>
			    </div>
			</div>
			</div> -->       </div>
		<!-- modals -->
		<div id="login" class="modal-window modal-window_size_s">
			<div class="modal-window__header-wrapper">
				<div class="modal-window__header">
					Войти
					&nbsp;<span>на сайт</span>
					<div class="modal-window__header-border"></div>
				</div>
				<button class="modal-window__close-button"><img src="/build/img/cross_gray.png" alt="close" class="modal-window__close-button-cross"/></button>
			</div>
			<div class="modal-window__element modal-window__social-button-block">
				<a href="/login" class="modal-window__social-button"><img src="/build/img/social-button__vk.png" alt="ВКонтакте" title="ВКонтакте" class="modal-window__social-button-img"/></a>
			</div>
		</div>
		<div id="register" class="modal-window modal-window_size_s">
			<div class="modal-window__header-wrapper">
				<div class="modal-window__header">
					Выберите любимую
					&nbsp;<span>социальную сеть</span>
					<div class="modal-window__header-border"></div>
				</div>
				<button class="modal-window__close-button"><img src="/build/img/cross_gray.png" alt="close" class="modal-window__close-button-cross"/></button>
			</div>
			<div class="modal-window__element modal-window__social-button-block">
				<a href="/login" class="modal-window__social-button"><img src="/build/img/social-button__vk.png" alt="ВКонтакте" title="ВКонтакте" class="modal-window__social-button-img"/></a>
			</div>
		</div>
		<!-- additional modals -->
		<div id="add-cash" class="modal-window modal-window_size_m">
			<div class="modal-window__header-wrapper">
				<div class="modal-window__header">
					Пополнить &nbsp;<span>баланс</span>
					<div class="modal-window__header-border"></div>
				</div>
				<button class="modal-window__close-button"><img src="/build/img/cross_gray.png" alt="close" class="modal-window__close-button-cross"></button>
			</div>
			<div class="modal-window__element-header text-block text-block_tf_up text-block_align_center">Введите сумму:</div>
			<div class="modal-window__element modal-window__input-block modal-window__element_with-header">
				<div class="input-block modal-window__input-wrapper">
					<input class="input-block__input" value="50" title="">
				</div>
			</div>
			@php
				$settings = \DB::table('settings')->where('id', 1)->first();
			@endphp
			<div class="modal-window__element-header text-block">Пополняя баланс от {{$settings->free_case}} рублей вы получаете 1 уникальный <a href="/box/8">бесплатный кейс</a> подробнее о <a href="help">бесплатных кейсах</a></div>
			<div class="modal-window__element-header text-block">Выберите платежную систему:</div>
			<div class="modal-window__element modal-window__pay-system-wrapper modal-window__element_with-header">
				<div class="modal-window__pay-system pay-system">
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_mc-visa_l.png" alt="Банковская карта" title="Банковская карта" data-provider="card" data-currency="10" class="pay-system__img">
					</div>
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_ym_l.png" alt="Яндекс.Деньги" title="Яндекс.Деньги" data-provider="yadi" data-currency="21" class="pay-system__img">
					</div>
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_qiwi_l.png" alt="Qiwi" title="Qiwi" data-provider="yadi" data-currency="21" class="pay-system__img">
					</div>
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_mts_l.png" alt="МТС" title="МТС" data-provider="mts" data-currency="40" class="pay-system__img">
					</div>
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_mf_l.png" alt="Мегафон" title="Мегафон" data-provider="mega" data-currency="43" class="pay-system__img">
					</div>
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_tele2_l.png" alt="Tele2" title="Tele2" data-provider="tele2" data-currency="41" class="pay-system__img">
					</div>
					<div class="modal-window__img-wrapper pay-system__img-wrapper">
						<img src="/build/img/pay-icon_bee_l.png" alt="Beeline" title="Beeline" data-provider="beeline" data-currency="42" class="pay-system__img">
					</div>
				</div>
			</div>
			<div class="modal-window__element modal-window__button-block">
				<button id="btn-cash-in" class="modal-window__button button-rounding button-rounding_big button-rounding_long button-rounding_light">Пополнить</button>
			</div>
		</div>
		<div id="need-money" class="modal-window modal-window_size_s">
			<div class="modal-window__header-wrapper">
				<div class="modal-window__header">
					Необходимо
					&nbsp;<span>пополнить баланс</span>
					<div class="modal-window__header-border"></div>
				</div>
			</div>
			<div class="modal-window__element text-block text-block_color_gray text-block_align_center">Недостаточно средств на балансе. Пополните баланс.</span></div>
			<div class="modal-window__element modal-window__button-block">
				<button class="modal-window__button button-rounding button-rounding_big button-rounding_vlong button-rounding_light modal-toggle" data-toggle="add-cash">Пополнить</button>
			</div>
		</div>
		<div class="modal-layout"></div>
		<!-- scripts -->
		<script src="http://214010.selcdn.ru/ranbox/js/socket.io.min.js"></script>
		<script src="/build/js/jquery.jrumble.1.3.min.js"></script> 
		@yield('scripts')
	</body>
</html>