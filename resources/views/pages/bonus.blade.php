@extends('layout')

@section('content')
<div class="col-md-10">
    
       
   <!--  <div class="col-xs-12">
        <div class="help-padge__header text-block text-block_align_center text-block_fs_b text-block_tf_up text-block_fw_bold">Bonus</div>
    </div> -->
    
    
    
    <style>
  .live_bg {display:none;}
  .col-md-12 .col-md-10 {    }
  .col-md-2 {display:none;}
 .col-md-10 {width:100%;}

</style>
	<div class="profile_bg">
		<div class="fix">
		<button class="box_auction_game" id="getbonus">ПОЛУЧИТЬ БОНУС</button>
        
		<div class="col-xs-12">
			<div class="bonus_t">
			@php
			$settings = \DB::table('settings')->where('id', 1)->first();
			@endphp
			Бонус выдается 1 раз в 24 часа. Для получения бонуса нужно состоять в <a href="{{$settings->group_link}}" target="_blank">нашей группе</a><br>
			Сумма бонуса генерируется случайно от <b>1 рубля</b> до  <b>2 рублeй</b>
			</div>
		</div>
  
    <div class="col-xs-12">
        <div class="bonus_t2">Последние 100 бонусов</div>
    </div>
      <div class="col-xs-12">
          <div class="container">
              <div class="table-responsive">
            <table id="table" class="del_table_info w-100">
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Пользователь</td>
                    <td>Сумма</td>
                    <td>Дата</td>
                </tr>
                </thead>
				<tbody>
					@if(isset($history))
					@foreach($history as $h)
					<tr>
						<td data-title="ID">{{$h->id}}</td>
						<td data-title="Name">{{$h->u->username}}</td>
						<td data-title="Link">
						{{$h->count}}
						</td>
						<td data-title="Status">{{ $h->created_at }}</td>
					</tr>
					@endforeach
					@endif
				</tbody>
            </table>
              </div> </div>
      </div> </div></div>
    <!-- contest -->
</div>
@stop
@section('scripts')
<script src="/build/js/all-dbd3292ee55e1f.js?v=22"></script>
@stop