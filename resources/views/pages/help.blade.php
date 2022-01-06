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
                <a href="/" class="content-button-row__button button-rounding button-rounding_med button-rounding_dark">&lt; Вернуться к списку кейсов</a>
            </div>
        </div>
        <div class="help-padge">
            <div class="container">
             
                    <div class="col-xs-12">
                        <div class="help-padge__header text-block text-block_align_center text-block_fs_b text-block_tf_up text-block_fw_bold">FAQ</div>
                    </div>
                    <div class="col-xs-12 col-sm-12 col-md-6 col-lg-7">
                        <div class="faq-block">
                            <div class="help-padge__faq-block-header faq-block__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">Задаваемые вопросы и ответы на них</div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Куда вводится промо код?</div>
                            <div class="faq-block__answer text-block">Промокод вводится в специальную форму под партнерский код на личной <a href="/profile">странице пользователя.</a></div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Можно ввести более одного промо кода?</div>
                            <div class="faq-block__answer text-block">Нет. Ввод промо кода доступен лишь единожды.</div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Что дает промо код?</div>
                            <div class="faq-block__answer text-block">Каждый промо код вносит на баланс до 50 рублей. Они могут быть использованы для открытия кейсов и заказов других услуг Сервиса.</div>
							                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Что дает бонус-код?</div>
                            <div class="faq-block__answer text-block">Бонус коды зачисляют на баланс определенную сумму, которая может быть использована для открытия кейсов и заказа доставки полученных призов.</div>
														                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Можно ввести несколько бонус кодов?</div>
                            <div class="faq-block__answer text-block">Бонус коды отличаются тем, что являются одноразовыми. <br><br>То есть один пользователь может использовать полученный бонусный код только один раз. Но если у вас есть несколько одноразовых бонус кодов, то они могут быть использованы отдельно друг от друга, но опять же по одному разу.</div>
						    <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как получить бесплатный кейс?</div>
							@php
				$settings = \DB::table('settings')->where('id', 1)->first();
			@endphp
                            <div class="faq-block__answer text-block">Чтобы получить доступ к одному бесплатному «free» кейсу, Ваш баланс должен быть пополнен на {{$settings->free_case}} рублей. Таким образом, пополняя баланс на {{ $settings->free_case*3 }} рублей, Вы получаете 3 бесплатных кейса, {{ $settings->free_case*4 }} рублей – 4 и так далее. Сумма на балансе может расходоваться на открытие платных кейсов или заказ доставки. </div>
                            <div class="help-padge__faq-block-header faq-block__header text-block text-block_fs_m text-block_tf_up text-block_fw_bold">Открытие box кейсов</div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Система открытия или как это работает?</div>
                            <div class="faq-block__answer text-block">Вам предложено 6 кейсов с призами. Открывая один из кейсов, перед Вами появляется девять ячеек, стирая их, Вы должны отгадать 3 одинаковых предмета, чтобы выиграть его. Если трёх попыток не хватает, можно купить дополнительную возможность и стереть четвёртую ячейку. Даже в случае проигрыша Вы получаете гарантированный приз, который может быть продан или доставлен на Ваш адрес. </div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Я гарантировано получу приз?</div>
                            <div class="faq-block__answer text-block">Открыв один из шести кейсов, независимо от того, повезёт Вам отгадать три одинаковых предмета под ячейками или нет, получаете один из доступных в кейсе товаров. Коробки в Box-Case – это некий аналог лотереи, но без возможности проиграть. Вы получаете свой приз в при любом исходе.</div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как открыть кейс и получить из него приз?</div>
                            <div class="faq-block__answer text-block">
                                <ol>
                                    <li>Первым делом регистрируемся на сайте через специальную форму. </li>
                                    <li>Пополняется свой счет на нужную сумму для открытия одного или нескольких кейсов.</li>
                                    <li>Перейдите к требуемой коробке и нажмите на кнопку «Открыть коробку».</li>
                                    <li>Перейдя на страницу с  ячейками, чтобы начать игру, нужно нажать на кнопку «Начать играть»</li>
                                    <li>Стирайте 3 призовые ячейки и 1 дополнительную, по желанию, приз гарантирован каждому.</li>
                                    <li>Решите, как поступить с полученным призом – продать или заказать доставку по адресу.</li>
                                </ol>
                            </div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Как это работает?</div>
                            <div class="faq-block__answer text-block">Определение товара происходит при помощи сложного алгоритма генерирующего случайные предметы расположенные в ячейках с коробками. Однако шанс напрямую зависит от ценности товара. Например, в первом кейсе вероятность получения ценных призов равна 15%, а шанс получить Люксовые часы Naviforce или смартфон 5%. Никто заранее не знает когда выпадет тот или иной приз.
                            </div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Можно вернуть ненужный приз и еще раз открыть кейс?</div>
                            <div class="faq-block__answer text-block">Можно! После стирания ячейки, если вам попался приз, в котором Вы не нуждаетесь - вы можете его продать, используя специальную кнопку “Продать”. Эта кнопка находится прямо на странице кейса и в личном кабинете в разделе “Мои товары”. Цена на продажу напрямую  зависит от ценности приза, она может быть как выше, так и ниже стоимости открытия коробки.</div>
                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">Я хочу заказать доставку, как это осуществить?</div>
                            <div class="faq-block__answer text-block">Больше информации о порядке и условиях получения товара можно найти на отдельной странице «<a href="/delivery">Доставка</a>».
							                            <div class="faq-block__question text-block text-block_fs_m text-block_fw_bold text-block_color_yellow">В чем отличие вариантов доставки?</div>
                                                        <div class="faq-block__answer text-block">
                              
                                    На нашем сервисе есть 2 варианта доставки 
									<br><br>
                                    1 вариант доставки: На ваш адрес отправляется до 5 товаров в одной коробке, Почтой Российской Федерации и в профиле указывается 1 трек-код (код отслеживания посылки).
									<br><br>
									2 вариант доставки: Отправка осуществляется через поставщика товара до 5 предметов каждый отдельно,  а срок доставки может длиться до 60 дней для граждан РФ. В профиле указывается до 5 трек кодов (код отслеживания посылки) товары  которых независимо друг от друга доставляются до адресата,  в том  числе срок доставки каждого может отличаться .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> 
    <!-- contest -->
</div>
    </div>
@stop


@section('scripts')
<script src="/build/js/all-dbd3292ee55e1f.js?v=22"></script>
@stop