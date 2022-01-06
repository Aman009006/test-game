@extends('layout')

@section('content')
<div class="col-md-10">
	<div class="profile_bg">
		<div class="fix">
			<div class="content-button-row">
				<div class="container">
					<a href="/aukcionhistory" class="back">История аукционов</a>
				</div>
			</div>
			<div class="container" align="center">
				<div class="cases-history1">
					@foreach($auction as $a)
					@if($a->item != NULL)
					<div class="box_auction_bg">
						<div class="box_auction" align="center">
							<div class="box_fix">
								<div class="box_auction_title">{{$a->item->name}}</div>
							</div>
							<div class="box_auction_img">
								<img src="{{$a->item->image}}" alt="" title="{{$a->item->name}}">
							</div>
							<div class="box_auction_price">цена лота: <span>{{$a->item->price}}р</span></div>
							<div class="box_auction_price">цена с мин. %: <span>{{$a->item->price*0.1}}р</span></div>
							<button class="box_auction_game aasasasa" id="goAuction" data-id="{{$a->id}}" title="{{$a->item->name}}">
							Играть
							</button>
						</div>
					</div>
					@endif
					@endforeach
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