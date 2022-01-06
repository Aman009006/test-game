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
			   @php
			   $settings = \DB::table('settings')->where('id', 1)->first();
			   @endphp
               <a href="{{$settings->group_link}}" target="_blank" class="content-button-row__button content-button-row__button_right button-rounding button-rounding_med button-rounding_light">Написать отзыв</a>
            </div>
         </div>
         <div class="reviews-block">
            <div class="container">
               <div class="row">
                  <div class="reviews-block__header-line top-block__header">
                     <div class="top-block__header-line"></div>
                     <div class="top-block__header-text">
                        <span>Отзывы пользователей</span>
                     </div>
                     <div class="top-block__header-line"></div>
                  </div>
                  <div class="reviews-block__reviews-card-wrapper">
					@foreach($opinions as $o)
                     <div class="reviews-block__reviews-card">
						{!! $o->code !!}
                        
                     </div>
					@endforeach
                     <!--					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>
                        					                        <div class="reviews-block__reviews-card">
                        л
                                               </div>-->
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