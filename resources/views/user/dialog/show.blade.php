@extends("layouts.app") 
@section("content")
<div class="container mt-3">
    <div class="box mb-3">
        <div class="hero-head">
            <div class="hero is-link is-bold">
                <div class="hero-body">
                    <div class="container">
                        <p class="title">
                            Chat Messenger
                        </p>
                        <p class="subtitle">

                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="hero-body " style="flex-direction: column">
            @foreach ($dialog->messages as $message) @if(($message->user->id == Auth::user()->id) || (($message->user->role->name ==
            'admin' || $message->user->role->name == 'editor') && (Auth::user()->role->name == 'admin' || Auth::user()->role->name
            == 'editor') ))
            <div style="height: 100%; width: 100%;">
                <div style=" padding: .25em; text-align: right; overflow-wrap: normal; ">
                    <div style="display: inline-flex;">
                        <span class="tag is-medium is-info">{{ $message->content }}</span>
                        <div>
                        <p class="ml-3 mb-0">{{ $message->user->name }}</p>
                        <p class="mb-0">{{ date('d-m-Y', strtotime($message->created_at)) }}</p>
                        </div>
                    </div>
                </div>
            </div>
                @else
                    <div style="height: 100%; width: 100%;">
                        <div style=" padding: .25em; text-align: left; overflow-wrap: normal; ">
                            <div style="display: inline-flex;">
                                <div class="mr-3">
                                    <p class=" mb-0">{{ $message->user->name }}</p>
                                    <p class="mb-0">{{ date('d-m-Y', strtotime($message->created_at)) }}</p>
                                </div>
                                <span class="tag is-medium is-success">{{ $message->content }}</span>
                            </div>
                        </div>
            </div>
            @endif @endforeach
        </div>

        <div class="hero-foot">
            <footer class="section is-small">
                <form action="{{ route('messages.store', ['dialog_id' => $dialog->id])}}" method="post">
                    <div class="field has-addons">
                        <div class="control is-expanded">
                            <input class="input" name="content" type="text" placeholder="Type your message" />
                        </div>
                        <div class="control">
                            <button class="button is-info">
                                        Send
                                    </button>
                        </div>
                    </div>
                </form>
            </footer>
        </div>
    </div>
</div>
@endsection