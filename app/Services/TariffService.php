<?php 

namespace App\Services;

use App\Models\Tariff;
use App\Models\FreelanceGig;


class TariffService
{
    public function getUnassociatedTariffs()
    {
        return Tariff::whereNull('freelance_gig_id')->get();
    }

    public function associateTariffWithGig(Tariff $tariff, $gigId)
    {
        $tariff->freelance_gig_id = $gigId;
        $tariff->save();
    }
}