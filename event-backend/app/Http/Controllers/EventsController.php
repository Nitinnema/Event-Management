<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Event;

class EventsController extends Controller
{
    public function index()
    {
        $events = Event::all();
        return response()->json([
            $events
        ], 200);
    }

    public function myevents($id)
    {
        $events = Event::where('organizer_id', $id)->get();
        return response()->json($events, 200);
    }

    public function store(Request $request)
    {
        $event = Event::create($request->all());
        return response()->json([
            $event,
            'message'=> 'Event Created Successfully.'
        ], 201);
    }

    public function update(Request $request, Event $event)
    {
        $event->update($request->all());
        return response()->json([
            $event,
            'message'=> 'Event updated Successfully.'
        ],200);
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        return response()->json($event, 200);
    }

    public function destroy(Event $event,)
    {
        $event->delete();
        return response()->json(null, 204);
    }

    public function attend(Event $event)
    {
        $attending = $event->attendees()->where('user_id', Auth::id())->first();
        if (!null($attending)) {
            return null;
        };
        $attending = $event->$attendees()->create([
            'user_id' => Auth::id()
        ]);
        return response()->json([
            $attending,
            'message' => 'Attendee added successfully'
        ], 200);
    }

    public function unattend(Event $event)
    {
        $user = auth()->user();
        $event->attendees()->detach($user->id);
        return response()->json(['message' => 'Attendee removed successfully'], 200);
    }
}
