@extends('layout')

@section('content')
<div class="col-md-10">
	<style>
		.live_bg {display:none;}
		.col-md-12 .col-md-10 {    }
		.col-md-2 {display:none;}
		.col-md-10 {width:100%;}
	</style>
	<div class="shop_bg shop_top">
		<div class="fix">
			<div class="profile-row">
				<div class="container">
					<div class="row">
						<div class="fix">
							<div class="profile_block">
								<div class="profile_info">
									<img src="{{ $user->avatar }}" alt="" class="profile_img">
									<div class="profile_rows">
										<div class="profile_row1" style="    margin: 14px 0;
											">
											{{$user->username}} <br>
										</div>
										<div class="profile_row2">
											ОТКРЫТО КОРОБОК: <span>{{$user->count}}</span> <br>
											НА СУММУ: <span>{{$user->total}}</span>
										</div>
										<div class="profile_row3">
											приглашено друзей: <span>{{$user->refs}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row cases-history" align="center">
						<div class="col-xs-12">
							<div class="cases-history_header text-block text-block_align_center text-block_fs_b text-block_tf_up text-block_fw_bold">История открытий</div>
						</div>
						@if(isset($drops) && !empty($drops))
						@foreach($drops as $drop)
						<a href="@if($drop->type == 0) /box/{{$drop->case}} @else /aukcion/{{$drop->case}} @endif" class="box-case">
							<img src="{{$drop->image}}" alt="" class="box-case_img">
							<div class="box-case-title">@if($drop->type == 0) Коробка №{{$drop->case}} @else Аукцион №{{$drop->case}} @endif</div>
						</a>
						@endforeach
						@endif
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