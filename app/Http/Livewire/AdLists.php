<?php

namespace App\Http\Livewire;

use Livewire\Component;
use Livewire\WithFileUploads;
use Illuminate\Support\Facades\Storage;
use App\Models\Ad;
use Illuminate\Support\Facades\Log;
use Jantinnerezo\LivewireAlert\LivewireAlert;

class AdLists extends Component
{
    use WithFileUploads;
    use LivewireAlert;
    
    public $ad_file;
    public $ad_title;
 
    public function saveAd()
    {
        $this->validate([
            'ad_title' => 'required',
            'ad_file' => 'nullable|image|mimes:mp4,gif|max:10240', // 10MB Max
        ]);
        
        $ad = new Ad;
        $ad->title = $this->ad_title;
        $ad->file = 'default';
        $ad->status = 1;
        $ad->save();

        // if (!Storage::exists('ad_files')) {
        //     Storage::makeDirectory('ad_files');
        // }
        // $this->ad_file->store('photos');
        // $path = $this->ad_file->storeAs('ad_files', $ad->id . '.' . $this->ad_file->getClientOriginalExtension());
        $path = $this->ad_file->storeAs('ad_files', $ad->id . '.' . $this->ad_file->getClientOriginalExtension(), 'public');
        Log::error('error'.$this->path);
        Ad::find($ad->id)->update(['file' => "{$ad->id}" . '.' . $this->ad_file->getClientOriginalExtension()]);
            
        // Create symbolic link to ad_files directory
        if (!file_exists(public_path('storage/ad_files'))) {
            Artisan::call('storage:link');
        }
        
        $this->alert('success', 'Basic Alert');
        $this->emit('refreshLivewire');
        $this->dispatchBrowserEvent('alert', ['type' => 'success', 'message' => 'Ad Successfully Created!']);
        
    }

    public function render()
    {
        $ads = Ad::paginate(3);
        return view('livewire.ad-lists', ['ads' => $ads]);
    }

    public function upload()
    {
        // $path = $this->ad_file->storeAs('ad_files', $ad->id . '.' . $this->ad_file->getClientOriginalExtension(), 'public');
        // Log::error('error'.$this->path);
    }
}
