<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'IndexController@index');
Route::get('/box/{id}', 'IndexController@box');
Route::get('/delivery', 'IndexController@delivery');
Route::get('/aukcion/{id?}', 'IndexController@aukcion');
Route::get('/aukcionhistory', 'IndexController@aukcionhistory');
Route::get('/shop', 'IndexController@shop');
Route::get('/bonus', 'IndexController@bonus');
Route::get('/opinions', 'IndexController@opinions');
Route::get('/help', 'IndexController@help');
Route::get('/account/{id}', 'IndexController@account');


Route::post('/open2', 'ApiController@open2');
Route::post('/open', 'ApiController@open');
Route::post('/sale', 'ApiController@sell');
Route::post('/newGame', 'ApiController@newGame');
Route::post('/checkCard', 'ApiController@checkCard');
Route::get('/getImage', 'ApiController@getImage');
Route::post('/sale2', 'ApiController@sell2');
Route::post('/getCard', 'ApiController@getCard');
Route::post('/checkCard2', 'ApiController@checkCard');
Route::post('/getGarant', 'ApiController@getGarant');
Route::post('/deliverFast', 'ApiController@deliver');
Route::post('/shop/buy', 'ApiController@shopbuy');
Route::post('/takeBonus', 'ApiController@takeBonus');
Route::post('/activate', 'ApiController@activate');
Route::post('/promo', 'ApiController@promo');
Route::post('/api/stats', 'ApiController@getStats');
Route::post('/api/last', 'ApiController@last');
Route::get('/pay', 'ApiController@pay');
Route::get('/checkPayment', 'ApiController@check');
Route::post('/updateDelivery', ['as' => 'updateDelivery', 'uses' => 'ApiController@updateDelivery']);

Route::get('test', 'ApiController@test');


Route::get('/login', 'LoginController@vklogin');

Route::group(['middleware' => 'auth'], function () {
    Route::get('/logout', 'LoginController@logout');
    Route::get('/profile', ['as' => 'profile', 'uses' => 'IndexController@profile']);
});



/*adminka*/
Route::group(['middleware' => 'auth', 'middleware' => 'access:admin'], function () {
	Route::get('/admin', ['as' => 'admin', 'uses' => 'AdminController@index']);
	/* Players */
	Route::get('/admin/users', ['as' => 'users', 'uses' => 'AdminController@users']);
	Route::post('/admin/user/save', ['as' => 'user.save', 'uses' => 'AdminController@user_save']);
	Route::get('/admin/user/{id}/edit', ['as' => 'user.edit', 'uses' => 'AdminController@edit_user']);
	Route::get('/admin/user/{id}/ban', 'AdminController@ban_user');
	/* Cases */
	Route::get('/admin/cases', ['as' => 'cases', 'uses' => 'AdminController@cases']);
	Route::get('/admin/new_case', ['as' => 'new_case', 'uses' => 'AdminController@new_case']);
	Route::get('/admin/case/{id}/edit', ['as' => 'case.edit', 'uses' => 'AdminController@case_edit']);
	Route::get('/admin/case/{id}/delete', ['as' => 'case.delete', 'uses' => 'AdminController@case_delete']);
	Route::get('/admin/item/{id}/add', ['as' => 'item.add', 'uses' => 'AdminController@item_add']);
	Route::get('/admin/item/{id}/edit', ['as' => 'item.edit', 'uses' => 'AdminController@item_edit']);
	Route::get('/admin/item/{id}/delete', ['as' => 'item.delete', 'uses' => 'AdminController@item_delete']);
	Route::post('/admin/item/add', ['as' => 'item.save', 'uses' => 'AdminController@item_create']);
	Route::post('/admin/item/update', ['as' => 'item.update', 'uses' => 'AdminController@item_update']);
	Route::post('/admin/case/save', ['as' => 'case.save', 'uses' => 'AdminController@add_case']);
	Route::post('/admin/case/update', ['as' => 'case.upd', 'uses' => 'AdminController@case_update']);
	/* Deliver */
	Route::get('/admin/delivers', ['as' => 'withdraw', 'uses' => 'AdminController@vivod']);
	Route::post('/admin/deliver/save', ['as' => 'withdraw.save', 'uses' => 'AdminController@withdraw_save']);
	Route::get('/admin/deliver/{id}/edit', ['as' => 'withdraw.edit', 'uses' => 'AdminController@edit_withdraw']);
	/*Payments*/
	Route::get('/admin/payments', 'AdminController@payments');
	/*promocodes*/
	Route::get('/admin/promocodes', 'AdminController@promocodes');
	Route::post('/admin/createpromo', 'AdminController@createpromo');
	Route::get('/admin/promocode/{id}/delete', 'AdminController@deletepromo');
	Route::get('/admin/promohistory', 'AdminController@promohistory');
	/*Settings*/
	Route::post('/admin/settings/save', 'AdminController@settings_save');
	/*OPINIONS*/
	Route::get('/admin/opinions', 'AdminController@opinions');
	Route::get('/admin/opinion/{id}/delete', 'AdminController@opinion_delete');
	Route::post('/admin/opinions/create', 'AdminController@opinion_create');
	/*Auction*/
	Route::get('/admin/auctions', 'AdminController@auctions');
	Route::get('/admin/aukcion/{id}/delete', 'AdminController@auction_delete');
	Route::get('/admin/aukcion/{id}/edit', 'AdminController@auction_edit');
	Route::get('/admin/aitem/{id}/edit', 'AdminController@aitem_edit');
	Route::post('/admin/aitem/update', 'AdminController@aitem_save');
	Route::post('/admin/aitem/{id}/delete', 'AdminController@aitem_delete');
	Route::get('/admin/auction/add', 'AdminController@auction_add');
	Route::post('/admin/aitem/add', 'AdminController@aitem_add');
	/*Auction*/
});
/*adminka*/