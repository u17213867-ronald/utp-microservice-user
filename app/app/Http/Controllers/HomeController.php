<?php
namespace App\Http\Controllers;

use App\Models\Vehiculo;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'Vehículo eliminado']);
    }

    public function store(Request $request)
    {
        return response()->json(['message' => 'Vehículo eliminado']);
    }

    public function show(Vehiculo $vehiculo)
    {
        return response()->json(['message' => 'Vehículo eliminado']);
    }

    public function update(Request $request, Vehiculo $vehiculo)
    {
        return response()->json(['message' => 'Vehículo eliminado']);
    }

    public function destroy(Vehiculo $vehiculo)
    {
        $vehiculo->delete();
        return response()->json(['message' => 'Vehículo eliminado']);
    }
}
