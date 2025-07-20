<?php 

namespace App\Services;

use App\Models\FreelanceGig;


class FreelanceGigService
{
    public function createTariffs(FreelanceGig $gig, array $tariffs)
    {
        foreach ($tariffs as $tariff) {
            $gig->tariffs()->create($tariff);
        }
    }
    public function createFreelanceGig(array $data)
    {
        $gig = FreelanceGig::create($data);
        $this->createTariffs($gig, $data['tariffs'] ?? []);
        
        return $gig;
    }
}