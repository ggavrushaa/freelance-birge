<?php

namespace App\Http\Controllers;

use App\Models\Tariff;
use App\Http\Requests\Tariff\StoreRequest;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use App\Enums\TariffAdditionalOptionsEnum;
use App\Services\TariffService;

class TariffController extends Controller
{
    public function __construct(
        private TariffService $service,
    ) {
    }

    public function create()
    {
        return Inertia::render(
            'tariff/create.page',
            [
                'additionalOptions' => TariffAdditionalOptionsEnum::cases(),
            ]
        );
    }

    public function edit(Tariff $tariff)
    {
        return Inertia::render(
            'tariff/edit.page',
            [
                'tariff' => $tariff->load('freelanceGig'),
                'additionalOptions' => TariffAdditionalOptionsEnum::cases(),
            ]
        );
    }

    public function store(StoreRequest $request): JsonResponse
    {
        $tariff = Tariff::create($request->validated());

        return response()->json([
            'success' => true,
            'tariff' => $tariff->load('freelanceGig'),
        ]);
    }

    public function update(StoreRequest $request, Tariff $tariff): JsonResponse
    {
        $tariff->update($request->validated());

        return response()->json([
            'success' => true,
            'tariff' => $tariff->load('freelanceGig'),
        ]);
    }

    public function destroy(Tariff $tariff): JsonResponse
    {
        $tariff->delete();

        return response()->json([
            'success' => true,
            'message' => 'Тариф успешно удален',
        ]);
    }

    public function syncTariffs($gigId)
    {
        $tariffs = $this->service->getUnassociatedTariffs();

        foreach ($tariffs as $tariff) {
            $this->service->associateTariffWithGig($tariff, $gigId);
        }       

        return response()->json([
            'success' => true,
            'message' => 'Тарифы успешно синхронизированы',
        ]);
    }
}