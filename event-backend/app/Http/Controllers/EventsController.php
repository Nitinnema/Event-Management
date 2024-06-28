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

    public function attend($event_id, $user_id)
    {
        $event = Event::find($event_id);

        if (!$event) {
            return response()->json([
                'message' => 'Event not found'
            ], 404);
        }
        $event->attendees()->attach($user_id);

        return response()->json([
            'event_id' => $event_id,
            'user_id' => $user_id,
            'message' => 'Attendee added successfully'
        ], 200);
    }

    public function unattend($event_id, $user_id)
    {
        $event = Event::find($event_id);

    if (!$event) {
        return response()->json([
            'message' => 'Event not found'
        ], 404);
    }

    $event->attendees()->detach($user_id);

    return response()->json([
        'event_id' => $event_id,
        'user_id' => $user_id,
        'message' => 'Attendee removed successfully'
    ], 200);
    }
}
