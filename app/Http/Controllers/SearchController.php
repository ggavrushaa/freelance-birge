<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\FreelanceGig;
use App\Models\CustomerJob;
use App\Services\FilterService;
use App\Services\SearchService;
use App\Http\Requests\Search\SearchJobsRequest;
use App\Http\Requests\Search\SearchGigsRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(
        private FilterService $filterService,
        private SearchService $searchService
    ) {
    }

    public function index()
    {
        return Inertia::render('search/index.page');
    }

    public function show(int $categoryId)
    {
        $category = Category::findOrFail($categoryId);

        return Inertia::render('search/show.page', [
            'category' => $category,
            'subCategories' => $category->subCategories()->get(),
        ]);
    }

    public function search(Request $request)
    {
        $search = $request->get('search');
        $user = auth()->user();
        $role = $user->role;

        if ($role === 'freelancer') {
            $suggestions = CustomerJob::where('name', 'like', '%' . $search . '%')
                ->where('is_active', true)
                ->get();
        } else {
            $suggestions = FreelanceGig::where('name', 'like', '%' . $search . '%')->get();
        }

        return response()->json($suggestions);
    }

    public function searchJobs(SearchJobsRequest $request)
    {
        $search = $request->get('search', '');
        $filters = $request->only([
            'completion_time',
            'express_mode',
            'premium_mode',
            'category_id',
            'sub_category_id'
        ]);

        $perPage = $request->get('per_page', 10);

        $query = CustomerJob::query();

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $this->filterService->applyJobFilters($query, $filters);

        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['sub_category_id'])) {
            $query->where('sub_category_id', $filters['sub_category_id']);
        }

        $jobs = $query->with(['category', 'subCategory', 'author'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'jobs' => $jobs,
            'filters' => $this->filterService->getFilterOptions()
        ]);
    }

    public function searchGigs(SearchGigsRequest $request)
    {
        $search = $request->get('search', '');
        $filters = $request->only([
            'completion_time',
            'express_mode',
            'premium_mode',
            'seller_level',
            'review_range',
            'category_id',
            'sub_category_id'
        ]);

        $perPage = $request->get('per_page', 10);

        $query = FreelanceGig::query();

        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }
        
        $this->filterService->applyGigFilters($query, $filters);

        if (isset($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (isset($filters['sub_category_id'])) {
            $query->where('sub_category_id', $filters['sub_category_id']);
        }

        $gigs = $query->with(['category', 'subCategory', 'freelancer', 'tariffs'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'gigs' => $gigs,
            'filters' => $this->filterService->getFilterOptions()
        ]);
    }

    public function getFilterOptions()
    {
        return response()->json([
            'filters' => $this->filterService->getFilterOptions()
        ]);
    }

    public function getSimilarJobSuggestions(Request $request)
    {
        $search = $request->get('search', '');
        $limit = $request->get('limit', 10);

        $suggestions = $this->filterService->getSimilarJobSuggestions($search, $limit);

        return response()->json([
            'suggestions' => $suggestions
        ]);
    }

    public function getSimilarGigSuggestions(Request $request)
    {
        $search = $request->get('search', '');
        $limit = $request->get('limit', 10);

        $suggestions = $this->filterService->getSimilarGigSuggestions($search, $limit);

        return response()->json([
            'suggestions' => $suggestions
        ]);
    }
}
