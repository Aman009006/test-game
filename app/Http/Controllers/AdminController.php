<?php namespace App\Http\Controllers;

use App\User;
use App\Cases;
use App\Items;
use App\History;
use App\Promo;
use App\Promohistory;
use App\Aitems;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Deliver;
use App\Delivery;
use App\Settings;
use Crypt;


class AdminController extends Controller
{
	public function index()
    {
		$user_money = \DB::table('users')->where('money', '!=', 0)->sum('money');
		$user_today = \DB::table('users')->where('created_at', '>=', Carbon::today())->count();
		$opened_today = \DB::table('history')->where('created_at', '>=', Carbon::today())->count();
		$pay_today = \DB::table('payments')->where('created_at', '>=', Carbon::today())->where('status', 1)->sum('amount');
		$pay_week = \DB::table('payments')->where('created_at', '>=', Carbon::now()->subDays(7))->where('status', 1)->sum('amount');
		$pay_month = \DB::table('payments')->where('created_at', '>=', Carbon::now()->subDays(30))->where('status', 1)->sum('amount');
		$pay_all = \DB::table('payments')->where('status', 1)->sum('amount');
		
		if(!$user_money) $user_money = 0;
		if(!$user_today) $user_today = 0;
		if(!$opened_today) $opened_today = 0;
		if(!$pay_today) $pay_today = 0;
		if(!$pay_week) $pay_week = 0;
		if(!$pay_month) $pay_month = 0;
		if(!$pay_all) $pay_all = 0;

		return view('admin.index', compact('user_money', 'user_today', 'opened_today', 'pay_today', 'pay_week', 'pay_month', 'pay_all')); 
    }
	
	public function users()
    {
		$users = User::get();
		return view('admin.pages.users', compact('users')); 
    }
	
	public function edit_user($id)
    {
		return view('admin.includes.modal_users', ['user' => User::findOrFail($id)]);
    }
	
	public function item_add($id)
    {
		return view('admin.includes.modal_item_add', ['case' => Cases::findOrFail($id)]);
    }
	
	public function item_edit($id)
    {
		return view('admin.includes.modal_item_edit', ['item' => Items::findOrFail($id)]);
    }
	
	public function item_create(Request $r) {  
		if($r->name == '' || $r->image == '' || $r->price == '' || $r->id == '' || $r->type == '')
		{
			$r->session()->flash('alert-danger', 'Необходимо заполнить все поля!');
			return redirect()->back();
		}
		
		if(!isset($r->in_shop))
		{
			$in_shop = 0;
		}
		else
		{
			$in_shop = 1;
		}
        Items::create([
            'name' => $r->get('name'),
            'price' => $r->get('price'),
            'type' => $r->get('type'),
			'image' => $r->get('image'),
			'case' => $r->get('id'),
			'in_shop' => $in_shop
        ]);
		
		$r->session()->flash('alert-success', 'Предмет добавлен!');
        return redirect()->back();
    }
	
	public function item_update(Request $r) {     
        Items::where('id', $r->get('id'))->update([
			'name' => $r->get('name'),
			'price' => $r->get('price'),
			'type' => $r->get('type'),
            'image' => $r->get('img'),
			'in_shop' => $r->get('in_shop')
        ]);
		
		$r->session()->flash('alert-success', 'Предмет обновлен!');
        return redirect()->back();
    }
	
	public function user_save(Request $r) 
	{     
        User::where('id', $r->get('id'))->update([
            'money' => $r->get('money'),
            'is_admin' => $r->get('is_admin'),
            'is_yt' => $r->get('is_yt')
        ]);
		
		$r->session()->flash('alert-success', 'Настройки пользователя сохранены!');
        return redirect()->route('users');
    }
	public function new_case()
    {
		return view('admin.pages.new_case'); 
    }
	
	public function case_edit($id)
    {
		$case = Cases::where('id', $id)->first();
		$items = Items::where('case', $id)->get();
		
		$item = Items::where('case', $id)->get();
		
		return view('admin.pages.edit_case', compact('case', 'items', 'item'));
    }
	
	public function add_case(Request $r) {     
        Cases::create([
			'name' => $r->get('name'),
            'price' => $r->get('price'),
            'chance' => $r->get('chance'),
            'image' => $r->get('image'),
			'color' => $r->get('color')
        ]);
		
		$r->session()->flash('alert-success', 'Вы создали новый кейс!');
        return redirect()->route('cases');
    }
	
	public function case_update(Request $r) {     
        Cases::where('id', $r->get('id'))->update([
            'name' => $r->get('name'),
            'price' => $r->get('price'),
            'chance' => $r->get('chance'),
			'color' => $r->get('color')
        ]);
		
		$r->session()->flash('alert-success', 'Вы обновили кейс!');
        return redirect()->route('cases');
    }
	
	public function case_delete($id, Request $r) {
		Cases::where('id', $id)->delete();
		$items = Items::where('case', $id)->first();
		if($items == true)
		{
			Items::where('case', $id)->delete();
		}
		
		$r->session()->flash('alert-success', 'Кейс удален!');
        return redirect()->route('cases');
	}
	
	public function item_delete($id, Request $r) {
		Items::where('id', $id)->delete();
		
		$r->session()->flash('alert-success', 'Предмет удален!');
        return redirect()->back();
	}
	
	public function cases() {
		$cases = Cases::get();
		return view('admin.pages.cases', compact('cases')); 
    }

	
	public function vivod()
    {
        $delivers = Deliver::orderBy('id','asc')->get();
        if(count($delivers) != 0){
            foreach ($delivers as $d){
                $uk = User::where('id',$d->user)->first();
                if($d->item1 != 0){$item1 = Items::where('id',$d->item1)->first(); $d->item1 = $item1->image; $d->itemm1 = $item1;}else{$d->item1 = 'null';}
                if($d->item2 != 0){$item2 = Items::where('id',$d->item2)->first(); $d->item2 = $item2->image; $d->itemm2 = $item2;}else{$d->item2 = 'null';}
                if($d->item3 != 0){$item3 = Items::where('id',$d->item3)->first(); $d->item3 = $item3->image; $d->itemm3 = $item3;}else{$d->item3 = 'null';}
                if($d->item4 != 0){$item4 = Items::where('id',$d->item4)->first(); $d->item4 = $item4->image; $d->itemm4 = $item4;}else{$d->item4 = 'null';}
                if($d->item5 != 0){$item5 = Items::where('id',$d->item5)->first(); $d->item5 = $item5->image; $d->itemm5 = $item5;}else{$d->item5 = 'null';}
                $d->name = $uk->username;
                $d->user_id = $uk->id;
            }
        }
		return view('admin.pages.vivod', compact('delivers'));
    }
	
	public function withdraw_save(Request $r)
	{
		if($r->get('status') == 0 || $r->get('status') == 1)
		{
			Deliver::where('id', $r->get('id'))->update([
				'status' => $r->get('status'),
				'tracking' => $r->get('tracking')
			]);
		}
		$r->session()->flash('alert-success', 'Статус выплаты обновлен!');
		return redirect()->back();
	}
	
	public function edit_withdraw($id)
	{
		
		$deliver = Deliver::where('id',$id)->first();
		$dev = Delivery::where('user',$deliver->user)->first();
        if(count($dev) != 0){
            $deliver->country = Crypt::decrypt($dev->country);
            $deliver->city  = Crypt::decrypt($dev->city);
            $deliver->postalcode = Crypt::decrypt($dev->postalcode);
            $deliver->dom = Crypt::decrypt($dev->dom);
            $deliver->kvartira = Crypt::decrypt($dev->kvartira);
            $deliver->street = Crypt::decrypt($dev->street);
            $deliver->name = Crypt::decrypt($dev->name); //
        }
        if($deliver->item1 != 0){$item1 = Items::where('id',$deliver->item1)->first(); $deliver->item1 = $item1->name;}else{$deliver->item1 = 'null';}
        if($deliver->item2 != 0){$item2 = Items::where('id',$deliver->item2)->first(); $deliver->item2 = $item2->name;}else{$deliver->item2 = 'null';}
        if($deliver->item3 != 0){$item3 = Items::where('id',$deliver->item3)->first(); $deliver->item3 = $item3->name;}else{$deliver->item3 = 'null';}
        if($deliver->item4 != 0){$item4 = Items::where('id',$deliver->item4)->first(); $deliver->item4 = $item4->name;}else{$deliver->item4 = 'null';}
        if($deliver->item5 != 0){$item5 = Items::where('id',$deliver->item5)->first(); $deliver->item5 = $item5->name;}else{$deliver->item5 = 'null';}
        return view('admin.includes.modal_deliver', compact('deliver'));
	}
	
	public function payments()
	{
		$a = \DB::table('payments')->orderBy('id', 'desc')->where('status', 1)->take(100)->get();
		foreach ($a as $b) {
			$u = User::find($b->user);
			$b->name = $u->username;
			$b->name_id = $u->id;
		}
		return view('admin.pages.payments', compact('a'));
	}
	public function promocodes()
	{
		$a = \DB::table('promocodes')->get();
		return view('admin.pages.promocodes', compact('a'));
	}
	public function createpromo(Request $r)
	{
		if(!isset($r->amount) || !isset($r->count) || !isset($r->code))
		{
			$r->session()->flash('alert-danger', 'Не введены параметры!');
			return redirect()->back();
		}
		else
		{
			$code = Promo::where('code', $r->code)->first();
			if($code == true)
			{
				$r->session()->flash('alert-danger', 'Такой промокод уже существует!');
				return redirect()->back();
			}
			$user = Promo::create([
				'code' => $r->code,
				'price' => $r->amount,
				'activation_count' => $r->count
			]);
			$r->session()->flash('alert-success', 'Промо-код успешно создан!');
			return redirect()->back();
		}
	}
	public function deletepromo(Request $r, $id)
	{
		if(!isset($id))
		{
			$r->session()->flash('alert-danger', 'Укажите ID промокода!');
			return redirect()->back();
		}
		$p = Promo::where('id', $id)->first();
		if($p == false)
		{
			$r->session()->flash('alert-danger', 'Промокод не найден!');
			return redirect()->back();
		}
		Promo::where('id', $id)->delete();
		$r->session()->flash('alert-success', 'Промо-код удален!');
		return redirect()->back();
	}
	
	public function promohistory()
	{
		$history = Promohistory::get();
		foreach($history as $h)
		{
			$h->usr = User::where('id', $h->user)->first();
		}
		return view('admin.pages.promohistory', compact('history'));
	}
	public function settings()
	{
		$settings = Settings::where('id', 1)->first();
		return view('admin.pages.settings', compact('settings'));
	}
	public function settings_save(Request $r)
	{
		Settings::where('id', 1)->update([
            'group_id' => $r->get('group_id'),
            'group_link' => $r->get('group_link'),
            'ref_sum' => $r->get('ref_sum'),
			'ref_percent' => $r->get('ref_percent'),
			'min_pay' => $r->get('min_pay'),
			'fk_id' => $r->get('fk_id'),
			'fk_secret1' => $r->get('fk_secret1'),
			'fk_secret2' => $r->get('fk_secret2'),
			'free_case' => $r->get('free_case'),
			'd_price' => $r->get('d_price')
        ]);
		
		$r->session()->flash('alert-success', 'Настройки обновлены!');
        return redirect()->back();
	}
	
	public function opinions()
	{
		$opinions = \DB::table('opinions')->orderBy('id', 'desc')->get();
		return view('admin.pages.opinions', compact('opinions'));
	}
	
	public function opinion_delete(Request $r, $id)
	{
		$opinion = \DB::table('opinions')->where('id', $id)->first();
		if($opinion == false)
		{
			$r->session()->flash('alert-danger', 'Отзыва с таким ID не найдено!');
			return redirect()->back();
		}
		else
		{
			\DB::table('opinions')->where('id', $id)->delete();
			$r->session()->flash('alert-success', 'Отзыв удален!');
			return redirect()->back();
		}
	}
	
	public function opinion_create(Request $r)
	{
		\DB::table('opinions')->insert([
			'code' => $r->code
		]);
		$r->session()->flash('alert-success', 'Отзыв успешно добавлен!');
		return redirect()->back();
	}
	
	public function auctions()
	{
		$aukc = \DB::table('aukcion')->get();
		foreach($aukc as $a)
		{
			$a->item = Aitems::where('auc_id', $a->id)->first();
		}
		return view('admin.pages.aukcions', compact('aukc'));
	}
	
	public function auction_delete(Request $r, $id)
	{
		\DB::table('aukcion')->where('id', $id)->delete();
		Aitems::where('auc_id', $id)->delete();
		$r->session()->flash('alert-success', 'Аукцион удален!');
		return redirect()->back();
	}
	public function auction_edit(Request $r, $id)
	{
		$case = \DB::table('aukcion')->where('id', $id)->first();
		$items = Aitems::where('auc_id', $id)->get();
		
		$item = Aitems::where('auc_id', $id)->get();
		
		return view('admin.pages.edit_aukcion', compact('case', 'items', 'item'));
		/*\DB::table('aukcion')->where('id', $id)->delete();
		Aitems::where('auc_id', $id)->delete();
		$r->session()->flash('alert-success', 'Аукцион удален!');
		return redirect()->back();*/
	}
	
	public function aitem_edit(Request $r, $id)
	{
		return view('admin.includes.modal_item_edit', ['item' => Aitems::findOrFail($id)]);
	}
	public function aitem_save(Request $r)
	{
		Aitems::where('id', $r->get('id'))->update([
			'name' => $r->get('name'),
            'image' => $r->get('img'),
			'price' => $r->get('price'),
			'desc' => $r->get('desc')
        ]);
		
		$r->session()->flash('alert-success', 'Предмет обновлен!');
        return redirect()->back();
	}
	public function aitem_delete(Request $r, $id)
	{
		Aitems::where('id', $id)->delete();
		$r->session()->flash('alert-success', 'Предмет удален!');
        return redirect()->back();
	}
	public function auction_add(Request $r)
	{
		$id = \DB::table('aukcion')->insertGetId([]);
		$r->session()->flash('alert-success', 'Аукцион добавлен!');
		return redirect('/admin/aukcion/'.$id.'/edit');
	}
	public function aitem_add(Request $r)
	{
		$item = Aitems::where('auc_id', $r->id)->first();
		if($item == false)
		{
			Aitems::create([
				'auc_id' => $r->id,
				'name' => $r->name,
				'image' => $r->image,
				'price' => $r->price,
				'desc' => $r->desc
			]);
			$r->session()->flash('alert-success', 'Предмет создан!');
			return redirect()->back();
		}
		else
		{
			$r->session()->flash('alert-dager', 'В аукционе не может быть более 2ух предметов!');
			return redirect()->back();
		}
	}
	
	public function generate()
    {
        $length = 15;
        $chars = 'abdefhiknrstyzABDEFGHKNQRSTYZ23456789';
        $numChars = strlen($chars);
        $string = '';
        for ($i = 0; $i < $length; $i++) {
            $string .= substr($chars, rand(1, $numChars) - 1, 1);
        }
        return $string;
    }
}