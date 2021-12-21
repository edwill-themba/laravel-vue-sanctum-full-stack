<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $messages = Message::all();
         return response()->json(['messages' => $messages], 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
         $this->validate($request,[
             'title'         => 'required|min:9|max:155|unique:messages',
             'body'          => 'required|min:9|max:200',
             'period_start'  => 'required|date|after:today|before:2022-01-01',
             'period_end'    => 'required|date|after:period_start|before:2022-01-01'
          ]);

          $user_message = new Message;
          $user_message->title = $request->input('title');
          $user_message->body = $request->input('body');
          $user_message->user_id = Auth::user()->id;
          $user_message->period_start = $request->input('period_start');
          $user_message->period_end = $request->input('period_end');

         
          $user_message->save();
          return response()->json(['user_message' => $user_message], 201);
          
          
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user_message = Message::find($id);
        return response()->json(['user_message' => $user_message ], 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        $this->validate($request,[
            'title'         => 'required|min:9|max:155|unique:messages',
            'body'          => 'required|min:9|max:200',
            'period_start'  => 'required|date|after:yesterday|before:2022-01-01',
            'period_end'    => 'required|date|after:period_start||before:2022-01-01',
        ]);

         $user_message = Message::find($id);
         $user_message->title = $request->input('title');
         $user_message->body = $request->input('body');
         $user_message->period_start = $request->input('period_start');
         $user_message->period_end = $request->input('period_end');

         if( $user_message->user_id !== Auth::user()->id){
            return response()->json(['message' => 'you are not authorized'], 401);  
         }

        
         $user_message->save();
         return response()->json(['user_message' => $user_message], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user_message = Message::find($id);
        if( $user_message->user_id !== Auth::user()->id){
            return response()->json(['message' => 'you are not authorized'], 401);  
         }
        $user_message->delete();
        return response()->json(['message' => 'message was deleted successfully'], 200);
    }
}
