@extends('layout')

@section('content')
<div class="col-md-10">
    
    
    <div class="profile_bg">
        <div class="container">
  <div class="content-button-row">
        <div class="container">
            <a href="/aukcion" class="back">Аукцион</a>
			<a href="/aukcionhistory" class="back">История аукционов</a>
        </div>
    </div>
            <div class="table-responsive">
                <table class="aucton_table_info">
                    <thead>
                    <tr>

                        <td style="width: 23%;">Дата</td>
                        <td style="width: 28%;">Пользователь</td>
                        <td style="width: 29%;">Название лота</td>
                        <td style="width: 25%;">Выиграл с шансом</td>
                    </tr>
                    </thead>
                    <tbody>
							@if(isset($history))
							@foreach($history as $h)
							<tr>
                                <td>{{ $h->created_at }}</td>
                                <td><img src="{{$h->user->avatar}}" class="auction_table_ava"><span>{{$h->user->username}}</span></td>
                                <td><img src="{{$h->it->image}}" class="auction_table_lot"> <span>{{$h->it->name}}</span></td>
                                <td align="right">{{$h->chance}}%</td>
                            </tr>
							@endforeach
							@endif
                    </tbody>
                </table>
            </div>
            {{ $history->links() }}
        </div>
    </div>
    <!-- contest -->
</div>
@stop