<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Auth;
use Crypt;
use App\Cases;
use App\Items;
use App\Aitems;
use App\History;
use App\User;
use App\Delivery;
use App\Deliver;

class IndexController extends Controller
{
    public function index()
	{
		$cases = Cases::get();
		foreach($cases as $c)
		{
			$items = Items::where('case', $c->id)->orderBy('price','desc')->get();
			$c->items = $items;
			$hh = History::where('case', $c->id)->get();
			$total = 0;
			foreach($hh as $h)
			{
				$item = Items::where('id', $h->item)->first();
				if($item != false)
				{
					$total = $total + $item->price;
				}
			}
			$c->total = $total;
		}
		return view('pages.index', compact('cases'));
	}
	public function box($id)
	{
		$case = Cases::where('id', $id)->first();
		if($case == false)
		{
			abort(404);
		}
		else
		{
			$items = Items::where('case', $id)->orderBy('price', 'desc')->get();
			return view('pages.box', compact('items', 'case'));
		}
	}
	public function profile(){
        if(!Auth::check()){
            return Redirect::to('/login');
        }else{

            $items = History::where('user',Auth::user()->id)->where('status',0)->orderBy('id', 'desc')->get();
			$dev = Delivery::where('user', Auth::user()->id)->first();
            $c = User::where('ref_use',Auth::user()->ref_code)->count();
			$deliver = Deliver::where('user',Auth::user()->id)->orderBy('id','desc')->get();
			$opened = History::where('user', Auth::user()->id)->get();
			$total = 0;
			foreach($opened as $o)
			{
				$case = Cases::where('id', $o->case)->first();
				$total = $total + $case->price;
			}
			$total_opened = History::where('user', Auth::user()->id)->count();

           if(count($deliver) != 0){
                foreach ($deliver as $d){
                    $uk = User::where('id',$d->user)->first();
                    if(count($dev) != 0){
                        $d->country = Crypt::decrypt($dev->country);
                        $d->city  = Crypt::decrypt($dev->city);
                        $d->postalcode = Crypt::decrypt($dev->postalcode);
                        $d->dom = Crypt::decrypt($dev->dom);
                        $d->kvartira = Crypt::decrypt($dev->kvartira);
                        $d->street = Crypt::decrypt($dev->street);
                        $d->name = Crypt::decrypt($dev->name); //
						$d->phone = Crypt::decrypt($dev->phone); //
                    }
                    if($d->item1 != 0){$item1 = Items::where('id',$d->item1)->first(); $d->item1 = $item1->name;}else{$d->item1 = 'null';}
                    if($d->item2 != 0){$item2 = Items::where('id',$d->item2)->first(); $d->item2 = $item2->name;}else{$d->item2 = 'null';}
                    if($d->item3 != 0){$item3 = Items::where('id',$d->item3)->first(); $d->item3 = $item3->name;}else{$d->item3 = 'null';}
                    if($d->item4 != 0){$item4 = Items::where('id',$d->item4)->first(); $d->item4 = $item4->name;}else{$d->item4 = 'null';}
                    if($d->item5 != 0){$item5 = Items::where('id',$d->item5)->first(); $d->item5 = $item5->name;}else{$d->item5 = 'null';}
                    $d->name = $uk->username;
                }
            }

            if(count($dev) != 0){
                $country = Crypt::decrypt($dev->country);
                $city  = Crypt::decrypt($dev->city);
                $postalcode = Crypt::decrypt($dev->postalcode);
                $dom = Crypt::decrypt($dev->dom);
                $kvartira = Crypt::decrypt($dev->kvartira);
                $street = Crypt::decrypt($dev->street);
                $name = Crypt::decrypt($dev->name); //
				$phone = Crypt::decrypt($dev->phone);
                $c = User::where('ref_use',Auth::user()->ref_code)->count();
                foreach ($items as $item ){
                    if($item->type == 0)
					{
						$itema = Items::where('id',$item->item)->first();
						$item->image = $itema->image;
						$item->name  = $itema->name;
						$item->price = $itema->price;
					}
					else
					{
						$itema = Aitems::where('id',$item->item)->first();
						$item->image = $itema->image;
						$item->name  = $itema->name;
						$item->price = $itema->price;
					}
                }
            }else{
                $country = '';
                $city  = '';
                $postalcode = '';
                $dom = '';
                $kvartira = '';
                $street = '';
                $name = '';
                $deliver = 'null';
                $c = User::where('ref_use',Auth::user()->ref_code)->count();
                foreach ($items as $item ){
					if($item->type == 0)
					{
						$itema = Items::where('id',$item->item)->first();
						$item->image = $itema->image;
						$item->name  = $itema->name;
						$item->price = $itema->price;
					}
					else
					{
						$itema = Aitems::where('id',$item->item)->first();
						$item->image = $itema->image;
						$item->name  = $itema->name;
						$item->price = $itema->price;
					}
                }
            }
			$ref_payments = \DB::table('payments')->where('ref', Auth::user()->ref_code)->where('status', 1)->get();
			foreach($ref_payments as $r)
			{
				$r->user = User::where('id', $r->user)->first();
			}
			return view('pages.profile',compact('items','deliver','country','city','postalcode','dom','kvartira','street','name','c', 'total', 'total_opened', 'phone', 'ref_payments'));
        }
    }
	public function delivery(Request $r)
	{
		return view('pages.delivery');
	}
	public function aukcion($id = NULL)
	{
		if($id == NULL)
		{
			$auction = \DB::table('aukcion')->get();
			foreach($auction as $a)
			{
				$a->item = \DB::table('aukcion_items')->where('auc_id', $a->id)->first();
			}
			return view('pages.aukcion', compact('auction'));
		}
		else
		{
			$auction = \DB::table('aukcion')->where('id', $id)->first();
			$auction->item = \DB::table('aukcion_items')->where('auc_id', $id)->first();
			return view('pages.auk', compact('auction'));
		}
	}
	public function aukcionhistory(Request $r)
	{
		$history = \DB::table('history')->where('type', 1)->orderBy('id', 'desc')->paginate(10);
		$history->setPath('/aukcionhistory');
		foreach($history as $h)
		{
			$h->user = User::where('id', $h->user)->first();
			$h->it = Aitems::where('id', $h->item)->first();
		}
		return view('pages.aukcionhistory', compact('history'));
	}
	public function shop()
	{
		$items = Items::where('in_shop', 1)->orderBy('id', 'desc')->get();
		foreach($items as $i)
		{
			$i->case = Cases::where('id', $i->case)->first();
		}
		return view('pages.shop', compact('items'));
	}
	public function bonus()
	{
		$history = \DB::table('bonus_history')->orderBy('id', 'desc')->limit(100)->get();
		foreach($history as $h)
		{
			$h->u = User::where('id', $h->user)->first();
		}
		return view('pages.bonus', compact('history'));
	}
	public function opinions()
	{
		$opinions = \DB::table('opinions')->orderBy('id', 'desc')->limit(10)->get();
		return view('pages.opinions', compact('opinions'));
	}
	public function help()
	{
		return view('pages.help');
	}
	public function account($id)
	{
		$user = User::where('id', $id)->first();
		if($user == false)
		{
			abort(404);
		}
		else
		{
			$user->count = History::where('user', $id)->count();
			$opened = History::where('user', $id)->where('type', 0)->get();
			$total = 0;
			foreach($opened as $o)
			{
				$case = Cases::where('id', $o->case)->first();
				$total = $total + $case->price;
			}
			$user->total = $total;
			$user->refs = User::where('ref_use', $user->ref_code)->count();
			$drops = History::where('user', $id)->orderBy('id', 'desc')->get();
			foreach($drops as $d)
			{
				if($d->type == 0)
				{
					$i = Items::where('id', $d->item)->first();
					$d->image = $i->image;
				}
				else
				{
					$i = Aitems::where('id', $d->item)->first();
					$d->image = $i->image;
				}
			}
			return view('pages.account', compact('user', 'drops'));
		}
	}
}
