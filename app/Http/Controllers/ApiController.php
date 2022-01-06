<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Cases;
use App\Items;
use App\User;
use App\Settings;
use App\History;
use Auth;
use Crypt;
use DB;
use Illuminate\Contracts\Encryption\DecryptException;
use Carbon\Carbon;
use Redirect;
use Validator;
use App\Deliver;
use App\Cardgames;
use App\Delivery;
use App\Aitems;
use App\Promo;
use App\Promohistory;

class ApiController extends Controller
{
	const Okup = 3.5;
    public function open2(Request $r)
	{
		if(!Auth::check()){return response()->json(['status' => 403]);}
        $case =  Cases::where('id',$r->id)->first();
        $user = Auth::user();
		
        if($user->money < $case->price){return response()->json(['status' => 401]);}
        $user->money = $user->money - $case->price;
        $user->save();
		$settings = Settings::where('id', 1)->first();
		$pro = mt_rand(1,100);
        if($pro > $case->chance){
            $pro2 = mt_rand(1,100);
            if($pro2 < $case->chance){
                $win = Items::where('case',$r->id)->where('price','<',$case->price)->where('type', 0)->inRandomOrder()->first();
                $win2 = Items::where('case',$r->id)->orderBy('price','desc')->get();
            }else{
                $win = Items::where('case',$r->id)->where('price','<=',$case->price + 1000)->where('type', 0)->inRandomOrder()->first();
                $win2 = Items::where('case',$r->id)->orderBy('price','desc')->get();
            }
        }else{
            $win = Items::where('case',$r->id)->where('price','>',$case->price)->where('type', 0)->inRandomOrder()->first();
            $win2 = Items::where('case',$r->id)->orderBy('price','desc')->get();
        }
		foreach ($win2 as $key => $val) {
            if ($val->name == $win->name) {
                $key = $key + 1;

                $int_id =  \DB::table('history')->insertGetId([
                    'user' => $user->id,
                    'item' =>  $win->id,
                    'case' => $case->id,
                ]);
                return response()->json([
                    'status' => 200,
                    'name' => $win->name,
                    'number' => $key,
                    'image' => $win->image,
                    'user_item_id' => $int_id,
                    'balance' => $user->money,
                    'price_sale' => $win->price
                ]);
            }
        }
	}
	public function sell(Request $r){
		if(Auth::guest()) { return 'Something wrong [#1]'; }
		if($r->id == 0)
		{
			return '';
		}
		else
		{
			$itemss = History::where('id',$r->id)->first();
		}
		if($itemss->type == 1)
		{
			$item = Aitems::where('id', $itemss->item)->first();
			$user = Auth::user();
			if($itemss->status != 0){ return response()->json(['status' => 401]); }
			$user->money = $user->money + $item->price;
			$user->save();
			$itemss->status = 1;
			$itemss->save();
			return response()->json(['balance' => $user->money]);
		}
		else
		{
			$item = Items::where('id',$itemss->item)->first();
			$user = User::where('id',$itemss->user)->first();
			if($itemss->status != 0){return response()->json(['status' => 401]);}
			$user->money = $user->money + $item->price;
			$user->save();
			$itemss->status = 1;
			$itemss->save();
			return response()->json(['balance' => $user->money]);
		}
    }
	public function newGame(Request $r)
	{
		if(Auth::guest()) { return response()->json(['status' => 403, 'message' => 'Авторизуйтесь через вконтакте.']); }
		$user = Auth::user();
		$case = Cases::where('id', $r->id)->first();
		if($case->price == 0)
		{
			if($user->free_cases_left < 1){ $demo = 1; } else { $demo = 0; }
		}
		else
		{
			if($user->money < $case->price){ $demo = 1; } else { $demo = 0; }
		}
		//dd($demo);
		if($demo != 1)
		{
			if($case->price != 0)
			{
				$user->money = $user->money - $case->price;
				$user->save();
				$settings = Settings::where('id', 1)->first();
				$chance = $case->chance;
			}
			else
			{
				$user->free_cases_left = $user->free_cases_left - 1;
				$user->save();
				$chance = 110;
			}
		}
		else
		{
			if($case->price != 0)
			{
				$chance = 80;
			}
			else
			{
				$chance = 110;
			}
		}
		
		$pro = mt_rand(1,100);
		$items = Items::where('case', $r->id)->get();
		if($pro > $chance)
		{
			$pro2 = mt_rand(1,100);
			if($pro2 > $chance)
			{
				$item1 = Items::where('case', $r->id)->where('type', 0)->where('price', '<', $case->price)->inRandomOrder()->first();
				$item2 = Items::where('case', $r->id)->where('type', 0)->where('id', '!=', $item1->id)->inRandomOrder()->first();
				$item3 = Items::where('case', $r->id)->where('type', 0)->where('id', '!=', $item1->id)->where('id', '!=', $item2->id)->inRandomOrder()->first();
				$items = array($item1, $item2, $item3);
				shuffle($items);
				$garant = Items::where('case', $r->id)->where('price', '<', $case->price)->inRandomOrder()->first();
				Cardgames::create([
					'bet' => $case->price,
					'case' => $r->id,
					'user' => Auth::user()->id,
					'status' => 0,
					'type' => 0,
					'opened' => 0,
					'items' => json_encode($items),
					'cards' => 0,
					'garant' => $garant->id,
					'demo' => $demo
				]);
				return response()->json(['status' => 1, 'message' => 'Ваша заявка оформлена!', 'ads' => array('steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*'), 'amount' => $user->money, 'demo' => $demo]);
			}
			else
			{
				$item1 = Items::where('case', $r->id)->where('price', '<', $case->price+($case->price*0.2))->where('type', 0)->inRandomOrder()->first();
				$item2 = $item1;
				$item3 = Items::where('case', $r->id)->where('id', '!=', $item1->id)->inRandomOrder()->first();
				$items = array($item1, $item2, $item3);
				shuffle($items);
				$garant = Items::where('case', $r->id)->where('price', '<', $case->price)->where('type', 0)->inRandomOrder()->first();
				$item_2 = Items::where('case', $r->id)->where('id', '!=', $item1->id)->inRandomOrder()->first();
				array_push($items, $item_2);
				Cardgames::create([
					'bet' => $case->price,
					'case' => $r->id,
					'user' => Auth::user()->id,
					'status' => 0,
					'type' => 1,
					'opened' => 0,
					'items' => json_encode($items),
					'item_2' => $item_2->id,
					'cards' => 0,
					'garant' => $garant->id,
					'demo' => $demo
				]);
				return response()->json(['status' => 1, 'message' => 'Ваша заявка оформлена!', 'ads' => array('steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*'), 'amount' => $user->money, 'demo' => $demo]);
			}
		}
		else
		{
			$pro2 = mt_rand(1,100);
			if($pro2 > $chance)
			{
				if($case->price == 0)
				{
					$item1 = Items::where('case', $r->id)->where('price', '<', 500)->where('type', 0)->inRandomOrder()->first();
				}
				else
				{
					$item1 = Items::where('case', $r->id)->where('price', '<', $case->price*self::Okup)->where('type', 0)->inRandomOrder()->first();
				}
				$item2 = $item1;
				$item3 = Items::where('case', $r->id)->where('id', '!=', $item1->id)->where('type', 0)->inRandomOrder()->first();
				$items = array($item1, $item2, $item3);
				shuffle($items);
				$garant = Items::where('case', $r->id)->where('price', '<', $case->price)->where('type', 0)->inRandomOrder()->first();
				$item_2 = $item1;
				array_push($items, $item_2);
				Cardgames::create([
					'bet' => $case->price,
					'case' => $r->id,
					'user' => Auth::user()->id,
					'status' => 0,
					'type' => 2,
					'opened' => 0,
					'items' => json_encode($items),
					'item_2' => $item_2->id,
					'cards' => 0,
					'garant' => $garant->id,
					'demo' => $demo
				]);
				return response()->json(['status' => 1, 'message' => 'Ваша заявка оформлена!', 'ads' => array('steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*'), 'amount' => $user->money, 'demo' => $demo]);
			}
			else
			{
				if($case->price == 0)
				{
					$item1 = Items::where('case', $r->id)->where('price', '<', 500)->where('type', 0)->inRandomOrder()->first();
				}
				else
				{
					$item1 = Items::where('case', $r->id)->where('price', '<', $case->price*self::Okup)->where('type', 0)->inRandomOrder()->first();
				}
				
				$item2 = $item1;
				$item3 = $item1;
				$items = array($item1, $item2, $item3);
				if($case->price != 0)
				{
					$garant = Items::where('case', $r->id)->where('price', '<', $case->price)->where('type', 0)->inRandomOrder()->first();
				}
				else
				{
					$garant = Items::where('case', $r->id)->where('price', '<', 1000)->where('type', 0)->inRandomOrder()->first();
				}
				Cardgames::create([
					'bet' => $case->price,
					'case' => $r->id,
					'user' => Auth::user()->id,
					'status' => 0,
					'type' => 3,
					'opened' => 0,
					'items' => json_encode($items),
					'item_2' => $item2->id,
					'cards' => 0,
					'garant' => $garant->id,
					'demo' => $demo
				]);
				return response()->json(['status' => 1, 'message' => 'Ваша заявка оформлена!', 'ads' => array('steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*', 'steps' => '*'), 'amount' => $user->money, 'demo' => $demo]);
			}
		}
	}
	public function checkCard(Request $r)
	{
		if(!isset($r->user) && !isset($r->card))
		{
			return 'Something wrong';
		}
		else
		{
			if(Auth::guest()) { return 'Something wrong [#1]'; }
			$game = Cardgames::where('user', Auth::user()->id)->orderBy('id', 'desc')->first();
			if($game == false) { return 'Something wrong [#2]'; }
			$card = $game->opened; // +
			$items = json_decode($game->items);
			$itemid = $items[$card]->id;
			if($game->opened == 0)
			{
				$cards_log = array();
				$card_log = array("card" => (int)$r->card, "itemid" => $itemid);
				array_push($cards_log, $card_log);
				$game->cards = json_encode($cards_log);
			}
			else
			{
				$cards_log = json_decode($game->cards);
				$card_log = array("card" => (int)$r->card, "itemid" => $itemid);
				array_push($cards_log, $card_log);
				$game->cards = json_encode($cards_log);
			}
			$game->opened = $game->opened + 1;
			$game->save();
			$game_2 = Cardgames::where('user', Auth::user()->id)->orderBy('id', 'desc')->first();
			$cards_log = json_decode($game_2->cards, true);
			$ads = array();
			$i = 1;
			while($i != 10)
			{
				$key = array_search($i, array_column($cards_log, 'card'));
				if($key == false)
				{
					if($cards_log[$key]['card'] == $i)
					{
						array_push($ads, array('steps' => $cards_log[$key]['itemid']));
					}
					else
					{
						array_push($ads, array('steps' => '*'));
					}
				}
				else
				{
					array_push($ads, array('steps' => $cards_log[$key]['itemid']));
				}
				$i++;
			}
			if($game_2->type == 0 && $game_2->opened == 3)
			{
				$game_2->status = 1;
				$game_2->save();
				if($game_2->demo == 0)
				{
					$int_id =  \DB::table('history')->insertGetId([
						'user' => Auth::user()->id,
						'item' =>  $game_2->garant,
						'case' => $game_2->case
					]);
				}
				$garant = Items::where('id', $game->garant)->first();
				return json_encode(array("winname" => $garant->name, "garantimage" => $garant->image, "win2" => $garant->price, "garant" => $garant->id ,"win" => "-1", "ananas" => "0", "status" => 1, "matrix" => $ads, "step" => 3, "cards" => $ads, "amount" => Auth::user()->money, "demo" => $game_2->demo));
			}
			elseif($game_2->type == 1 && $game_2->opened == 3)
			{
				$garant = Items::where('id', $game->garant)->first();
				return json_encode(array("garant" => $garant->price/2, "win" => 0, "ananas" => "0", "status" => 1, "matrix" => $ads, "step" => 3));
			}
			elseif($game_2->type == 1 && $game_2->opened == 4)
			{
				$garant = Items::where('id', $game->garant)->first();
				if($game_2->demo == 0)
				{
					$int_id =  \DB::table('history')->insertGetId([
						'user' => Auth::user()->id,
						'item' =>  $game_2->garant,
						'case' => $game_2->case,
					]);
				}
				return json_encode(array("winname" => $garant->name, "garantimage" => $garant->image, "win2" => $garant->price, "win"=>0, "ananas" => 0, "status" => 1, "matrix" => $ads, "step" => 4, "cards" => $ads, "amount" => Auth::user()->money, "demo" => $game_2->demo));
			}
			elseif($game_2->type == 2 && $game_2->opened == 4)
			{
				$items = json_decode($game_2->items, true);
				if($game_2->demo == 0)
				{
					$int_id =  \DB::table('history')->insertGetId([
						'user' => Auth::user()->id,
						'item' =>  $items[3]['id'],
						'case' => $game_2->case
					]);
				}
				return json_encode(array("winname" => $items[3]['name'], "image" => $items[3]['image'], "win" => $items[3]['price'], "ananas" => "0", "status" => 1, "matrix" => $ads, "step" => 4, "amount" => Auth::user()->money, "demo" => $game_2->demo));
			}
			elseif($game_2->type == 3 && $game_2->opened == 3)
			{
				$items = json_decode($game_2->items, true);
				if($game_2->demo == 0)
				{
					$int_id =  \DB::table('history')->insertGetId([
						'user' => Auth::user()->id,
						'item' =>  $items[1]['id'],
						'case' => $game_2->case
					]);
				}
				return json_encode(array("winname" => $items[1]['name'], "image" => $items[1]['image'], "win" => $items[1]['price'], "ananas" => "0", "status" => 1, "matrix" => $ads, "step" => 3, "amount" => Auth::user()->money, "demo" => $game_2->demo));
			}
			$garant = Items::where('id', $game->garant)->first();
			return json_encode(array("garant" => $garant->price/2, "win" => 0, "status" => 1, "matrix" => $ads, "step" => $game->opened));
			
		}
	}
	public function test()
	{
		
		dd((int)(20/3));
		
	}
	public function getImage(Request $r)
	{
		if(!isset($r->id))
		{
			return '';
		}
		else
		{
			$item = Items::where('id', $r->id)->first();
			return response()->json(["image" => $item->image]);
		}
	}
	public function sell2(Request $r)
	{
		if(!isset($r->user) || Auth::user()->id != $r->user) { return 'Something wrong'; }
		$game = Cardgames::where('user', Auth::user()->id)->orderBy('id', 'desc')->first();
		if($game-> demo == 1) { return response()->json(['balance' => Auth::user()->money]); }
		$itemss = History::where('user', Auth::user()->id)->orderBy('id', 'desc')->first();
		$item = Items::where('id',$itemss->item)->first();
		$user = User::where('id',$itemss->user)->first();
		if($itemss->status != 0){return response()->json(['status' => 401]);}
		$user->money = $user->money + $item->price;
		$user->save();
		$itemss->status = 1;
		$itemss->save();
		return response()->json(['balance' => $user->money]);
	}
	public function getCard(Request $r)
	{
		if($r->user != Auth::user()->id) { return 'Something wrong'; }
		$game = Cardgames::where('user', Auth::user()->id)->orderBy('id', 'desc')->first();
		$garant = Items::where('id', $game->garant)->first();
		$user = Auth::user();
		if($game->demo == 0) 
		{
			if($user->money < $garant->price/2) { return json_encode(array("status" => 0, "err_0" => "Недостаточно средств")); }
			$user->money = $user->money - $garant->price/2;
			$user->save();
		}
		$game->status = 5;
		$game->save();
		return json_encode(array('status' => 1, 'amount' => $user->money));
	}
	public function getGarant(Request $r)
	{
		if(!isset($r->user)) { return 'Something wrong [#1]'; }
		if(Auth::guest()) { return 'Something wrong [#2]'; }
		if($r->user != Auth::user()->id) { return 'Something wrong [#3]'; }
		$game = Cardgames::where('user', Auth::user()->id)->orderBy('id', 'desc')->limit(1)->first();
		if($game->demo == 1)
		{
			return json_encode(array('demo' => 1, "status" => 0, "error" => "Игра в DEMO режиме завершена"));
		}
		else
		{
			$int_id =  \DB::table('history')->insertGetId([
				'user' => Auth::user()->id,
				'item' =>  $game->garant,
				'case' => $game->case
			]);
			return json_encode(array('status' => 1, 'demo' => 0, 'amount' => Auth::user()->money));
		}
	}
	 public function updateDelivery(Request $r){

        $validator = Validator::make($r->all(), [
            'profile_country' => 'required|max:255',
            'profile_city' => 'required|max:255',
            'profile_zip' => 'required|max:255',
            'profile_house' => 'required|max:255',
            'profile_name' => 'required|max:255',
            'profile_street' => 'required|max:255'
        ]);
        if ($validator->fails()) {
            return response()->json(['status' => 500]);
        }

        $user = Auth::user();
        $cauntry = $r->profile_country;
        $city  = $r->profile_city;
        $postalcode = $r->profile_zip;
        $dom = $r->profile_house;
        $kvartira = $r->profile_flat;
        $street = $r->profile_street;
        $name = $r->profile_name;
		$phone = $r->phone;

        $name_e = Crypt::encrypt($name);
        $country_e = Crypt::encrypt($cauntry);
        $city_e  = Crypt::encrypt($city);
        $postalcode_e = Crypt::encrypt($postalcode);
        $kvartira_e = Crypt::encrypt($kvartira);
        $dom_e = Crypt::encrypt($dom);
        $street_e = Crypt::encrypt($street);
		$phone_e = Crypt::encrypt($phone);

        $check = Delivery::where('user', $user->id)->first();
        if(count($check) == 0){
            Delivery::create([
                'user' => $user->id,
                'name' => $name_e,
                'country' => $country_e,
                'city' => $city_e,
                'postalcode' => $postalcode_e,
                'dom' => $dom_e,
                'kvartira' => $kvartira_e,
                'street' => $street_e,
				'phone' => $phone_e
            ]);
            return response()->json(['status' => 200]);
        }else{
            $check->user = $user->id;
            $check->name = $name_e;
            $check->country = $country_e;
            $check->city = $city_e;
            $check->postalcode =  $postalcode_e;
            $check->dom = $kvartira_e;
            $check->kvartira = $dom_e;
            $check->street =  $street_e;
			$check->phone = $phone_e;
            $check->save();
            return response()->json(['status' => 200]);
        }
    }
	public function deliver(Request $r){
        //if ($r->ajax()){
            $h1 =  History::where('id', $r->item_1_id)->where('status',0)->first();
            $h2 =  History::where('id', $r->item_2_id)->where('status',0)->first();
            $h3 =  History::where('id', $r->item_3_id)->where('status',0)->first();
            $h4 =  History::where('id', $r->item_4_id)->where('status',0)->first();
            $h5 =  History::where('id', $r->item_5_id)->where('status',0)->first();
            $user = User::where('id',$r->user)->first();
            $delivery = Delivery::where('user',$user->id)->first();
            if(count($h1) != 0){$itema = Items::where('id',$h1->item)->first(); $item1 = $itema->id;}else{$item1 = 'null';}
            if(count($h2) != 0){$itemb = Items::where('id',$h2->item)->first(); $item2 = $itemb->id;}else{$item2 = 'null';}
            if(count($h3) != 0){$itemc = Items::where('id',$h3->item)->first(); $item3 = $itemc->id;}else{ $item3 = 'null';}
            if(count($h4) != 0){$itemd = Items::where('id',$h4->item)->first(); $item4 = $itemd->id;}else{$item4 = 'null';}
            if(count($h5) != 0){$iteme = Items::where('id',$h5->item)->first(); $item5 = $iteme->id;}else{ $item5 = 'null';}

			$settings = Settings::where('id', 1)->first();
            if($user->money < $settings->d_price){ return response()->json(['status' => 400]);}
			
			$user->money = $user->money - $settings->d_price;
			$user->save();
			
			
            if(count($delivery) == 0){return response()->json(['status' => 502]);}
            if(count($h1) != 0){ if($h1->status !=  0){return response()->json(['status' => 456]);} if($h1->user !=  $r->user){return response()->json(['status' => 500]);}}
            if(count($h2) != 0){if($h2->status !=  0){return response()->json(['status' => 456]);} if($h2->user !=  $r->user){return response()->json(['status' => 500]);}}
            if(count($h3) != 0){if($h3->status !=  0){return response()->json(['status' => 456]);} if($h3->user !=  $r->user){return response()->json(['status' => 500]);}}
            if(count($h4) != 0){if($h4->status !=  0){return response()->json(['status' => 456]);} if($h4->user !=  $r->user){return response()->json(['status' => 500]);}}
            if(count($h5) != 0){if($h5->status !=  0){return response()->json(['status' => 456]);} if($h5->user !=  $r->user){return response()->json(['status' => 500]);}}

            if(count($h1) != 0){$h1->status = 2;$h1->save();}
            if(count($h2) != 0){$h2->status = 2;$h2->save();}
            if(count($h3) != 0){$h3->status = 2;$h3->save();}
            if(count($h4) != 0){$h4->status = 2;$h4->save();}
            if(count($h5) != 0){$h5->status = 2;$h5->save();}

            Deliver::create([
                'user' => $user->id,
                'item1' => $item1,
                'item2' => $item2,
                'item3' => $item3,
                'item4' => $item4,
                'item5' => $item5
            ]);
            return response()->json(['status' => 200]);
    }
	public function open(Request $r)
	{
		if(Auth::guest()) { return json_encode(array("status" => 403, "error" => "Для участия в аукционе необходимо авторизоваться")); }
		$item = \DB::table('aukcion_items')->where('auc_id', $r->id)->first();
		$pro = $r->pro;
		if(Auth::user()->money < $item->price*($pro/100)) { return json_encode(array("status" => 401, "error" => "Недостаточно средств ".$item->price*($pro/100))); }
		$user = Auth::user();
		$user->money = $user->money - $item->price*($pro/100);
		$user->save();
		$pro_2 = mt_rand(1,100);
		if($pro_2 < $pro)
		{
			$int_id =  \DB::table('history')->insertGetId([
				'user' => Auth::user()->id,
				'item' =>  $item->id,
				'case' => $r->id,
				'status' => 0,
				'type' => 1,
				'chance' => $pro
			]);
			return response()->json(['status' => 200, "name" => $item->name, "number" => 15, "image" => $item->image, "user_item_id" => $int_id, "balance" => Auth::user()->money, "price_sale" => $item->price]);
		}
		else
		{
			return response()->json(['status' => 200, "name" => "Проиграл", "number" => 14, "image" => "/build/img/sad.png","user_item_id" => 0, "balance" => Auth::user()->money, "price_sale" => 0]);
		}
	}
	public function shopbuy(Request $r)
	{
		if(!isset($r->id))
		{
			return false;
		}
			
		$id = $r->id;
		$item = \DB::table('items')->where('id', $id)->first();
		if(Auth::guest())
		{
			$data = ['status'=> 403];
			return $data;
		}
		else
		{
			if(Auth::user()->money < $item->price)
			{
				$data = ['status'=> 401];
				return $data;
			}
			else
			{
				$history = History::create([
					'item' => $id,
					'user' => Auth::user()->id,
					'case' => $item->case,
					'status' => 0,
					'type' => 0,
					'chance' => 0
				]);
				$user = User::where('id', Auth::user()->id)->first();
				$user->money = $user->money - $item->price;
				$user->save();
				$user = User::where('id', Auth::user()->id)->first();
				$data = ['status'=> 200, 'balance' => $user->money];
				return $data;
			}
		}
	}
	public function takeBonus()
	{
		if(Auth::guest())
		{
			return json_encode(array("success" => false, "message" => "Необходимо авторизоваться!"));
		}
		else
		{
			$user = User::where('id', Auth::user()->id)->first();
			if($user->bonus_time > Carbon::now())
			{
				return json_encode(array("success" => false, "message" => "Бонус можно получать раз в 24 часа!"));
			}
			else
			{
				$settings = Settings::where('id', 1)->first();
				$obj = json_decode($this->curl("https://api.vk.com/method/groups.isMember?group_id=".$settings->group_id."&user_id=".Auth::user()->login2));
				if($obj->response == 0)
				{
					$is_member = 0;
				}
				elseif($obj->response == 1)
				{
					$is_member = 1;
				}
				else
				{
					$is_member = 0;
				}
				
				
				if($is_member == 0)
				{
					return json_encode(array("success" => false, "message" => "Ошибка! Вы не подписаны на группу!"));
				}
				else
				{
					$user->bonus_time = Carbon::now()->addDays(1);
					$bonus = mt_rand(1, 2);
					$user->money = $user->money + $bonus;
					$user->save();
					$int_id =  \DB::table('bonus_history')->insertGetId([
						'user' => Auth::user()->id,
						'count' =>  $bonus
					]);
					return json_encode(array("success" => true, "message" => "Бонус успешно получен!"));
				}
			}
		}
	}
	
	public function activate(Request $r)
	{
		if(Auth::guest())
		{
			return '';
		}
		else
		{
			if(Auth::user()->ref_use != '')
			{
				return json_encode(["status" => 403]);
			}
			else
			{
				$referer = User::where('ref_code', $r->code)->first();
				if($referer == false)
				{
					return json_encode(["status" => 404]);
				}
				elseif($referer->id == Auth::user()->id)
				{
					return json_encode(["status" => 401]);
				}
				else
				{
					$settings = Settings::where('id', 1)->first();
					$user = Auth::user();
					$user->money = $user->money + $settings->ref_sum;
					$user->ref_use = $r->code;
					$user->save();
					return json_encode(["status" => 200, "balance" => $user->money]);
				}
			}
		}
	}
	
	
	public function promo(Request $r)
	{
		if(Auth::guest()) { return json_encode(["status" => false, "error" => "Для ввода промо-кода необходимо авторизоваться!"]); } 
		
		$code_count = Promo::where('code', $r->code)->count();
		if((int)$code_count == 0) { return json_encode(["status" => false, "error" => "Промокод не найден!"]); } 
		$code = Promo::where('code', $r->code)->first();
		$vvodil = Promohistory::where('user', Auth::user()->id)->where('code', $code->code)->first();
		if($vvodil == true) { return json_encode(["status" => false, "error" => "Вы уже вводили данный промокод!"]); } 
		if($code->activation_count < $code->activated) { return json_encode(["status" => false, "error" => "Промокод не найден!"]); Promo::where('code', $r->code)->delete(); } 
		
		$user = Auth::user();
		$user->money = $user->money + $code->price;
		Promohistory::create(['user' => Auth::user()->id, 'code' => $code->code]);
		$user->save();
		$code->activated = $code->activated+1;
		$code->save();
		return json_encode(['status' => 'true', 'balance' => Auth::user()->money]);
		
	}
	
	public function pay(Request $r)
	{
		if(Auth::guest()) { return json_encode(["success" => false, "error" => "Для пополнения необходимо авторизоваться!"]); }
		$settings = Settings::where('id', 1)->first();
		if($r->amount < $settings->min_pay) { return json_encode(["success" => false, "error" => "Минимальная сумма пополнения ".$settings->min_pay." руб!"]); }
		
		$type = $r->provider;
        $amount = $r->amount;
		
		if((int)$amount < 1){
			$amount = 1;
		}
		$int_id =  \DB::table('payments')->insertGetId([
			'amount' => (int)$amount,
			'user' => Auth::user()->id,
			'ref' => Auth::user()->ref_use,
			'time' => time(),
			'status' => 0,
		]);
		$orderID = $int_id;
		
		$sign = md5($settings->fk_id.':'.$amount.':'.$settings->fk_secret1.':'.$orderID);
		$url = 'http://www.free-kassa.ru/merchant/cash.php?m='.$settings->fk_id.'&oa='.$amount.'&o='.$orderID.'&s='.$sign.'&lang=ru';
		return json_encode(['success' => true, 'redirect_url' => $url]);
	}
	
	public function check(Request $request)
	{
		$settings = Settings::where('id', 1)->first();
		$sign = md5($settings->fk_id.':'.$request->AMOUNT.':'.$settings->fk_secret2.':'.$request->MERCHANT_ORDER_ID);

       /* if($sign != $request->SIGN){
            return "Произошла ошибка [#0]";
        }*/
        $payment = \DB::table('payments')->where('id', $request->MERCHANT_ORDER_ID)->first();
        if(count($payment) == 0)
		{
            return "Произошла ошибка [#1]";
        }
		else
		{
            if($payment->status != 0)
			{
                return "Произошла ошибка [#2]";
            }
			else
			{
                if($payment->amount != $request->AMOUNT)
				{
                    return "Произошла ошибка [#3]";
                }
				else
				{
                    $user = User::where('id', $payment->user)->first();
                    $user->money = $user->money + $payment->amount;
					$user->free_cases_left = $user->free_cases_left + (int)($payment->amount/$settings->free_case);
                    $user->save();
                    $te = User::where('ref_code', $payment->ref)->first();
                    if(count($te) == null || count($te) == 0)
					{

                    }
					else
					{
                        $bon = ((int)$settings->ref_percent/100)*$payment->amount;
                        $te->money =   $te->money + $bon;
                        $te->save();
                    }
                    \DB::table('payments')
                        ->where('id', $payment->id)
                        ->update(['status' => 1]);
                    return 'success';
                }
            }
        }
	}
	public function getStats(){
        $user = User::where('id', '>', 1)->count()+1005607;
        $cases =  History::where('id', '>', 0)->count()+2934660;
        return response()->json(['users' => $user,'box' => $cases]);
    }
	public function last(){
        $game = History::where('id', '>', 0)->orderBy('id', 'DESC')->where('type', 0)->limit(16)->get();
        foreach ($game as $g) {
            $user = User::where('id', $g->user)->first();
            $item  = Items::where('id',$g->item)->first();
            $g->avatar = $user->avatar;
            $g->image = $item->image;
        }
        return $game;
    }
	
	public function curl($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $output = curl_exec($ch);
        curl_close($ch);
        return $output;
    }
}

