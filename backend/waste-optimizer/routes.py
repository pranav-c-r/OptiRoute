import os
import json
import requests
from typing import List, Dict, Any
from datetime import datetime, timedelta
from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import asyncio
import aiohttp

# --- LangChain Imports ---
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentType, Tool, initialize_agent
from langchain.memory import ConversationBufferMemory
from langchain.schema import SystemMessage
from langchain.tools import tool
from langchain.chains import LLMChain

# Load environment variables from the .env file
load_dotenv()

# Create an API Router for this module
router = APIRouter()

# --- Define the input and output data format using Pydantic ---
class AgentInput(BaseModel):
    raw_report: str = Field(..., description="Unstructured text report containing information on food surplus and demand.")
    priority_focus: str = Field(default="all", description="Focus area: 'hunger_relief', 'farmer_support', 'environment', or 'all'")

class AgentOutput(BaseModel):
    allocation_plan: str
    human_summary: str
    estimated_impact: Dict[str, Any]

# --- Set up the Gemini API ---
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable not found. Please set it in your .env file.")

llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-flash", 
    temperature=0.3,  # Lower temperature for more deterministic results
    google_api_key=GEMINI_API_KEY
)

# --- Simulated Database and External API Connections ---
# In a real implementation, these would connect to actual databases and APIs

# Simulated inventory database
SIMULATED_INVENTORY = [
    {"id": 1, "location": "Farm Co. (Chennai)", "item": "Tomatoes", "quantity": "200kg", "perishability": "high", 
     "harvest_date": "2023-09-20", "price_per_kg": 15, "farmer_id": "F1001"},
    {"id": 2, "location": "Dairy Central (Chennai)", "item": "Milk", "quantity": "150L", "perishability": "high", 
     "production_date": "2023-09-25", "price_per_l": 40, "farmer_id": "D2001"},
    {"id": 3, "location": "Warehouse A (Chennai)", "item": "Potatoes", "quantity": "500kg", "perishability": "low", 
     "storage_date": "2023-09-10", "price_per_kg": 20, "farmer_id": "F1002"},
    {"id": 4, "location": "Urban Market (Chennai)", "item": "Apples", "quantity": "50kg", "perishability": "medium", 
     "arrival_date": "2023-09-23", "price_per_kg": 80, "farmer_id": "F1003"},
    {"id": 5, "location": "Fishery Port (Chennai)", "item": "Fresh Fish", "quantity": "100kg", "perishability": "very_high", 
     "catch_date": "2023-09-26", "price_per_kg": 120, "farmer_id": "F3001"},
]

# Simulated demand database
SIMULATED_DEMANDS = [
    {"id": 1, "location": "Downtown Kitchen (Chennai)", "needs": ["Fresh produce", "dairy"], "urgency": "high", 
     "capacity_kg": 300, "population_served": 200, "last_delivery": "2023-09-23"},
    {"id": 2, "location": "Northside Shelter (Chennai)", "needs": ["Any food"], "urgency": "medium", 
     "capacity_kg": 500, "population_served": 150, "last_delivery": "2023-09-20"},
    {"id": 3, "location": "Community Center B (Chennai)", "needs": ["Non-perishable goods"], "urgency": "low", 
     "capacity_kg": 200, "population_served": 100, "last_delivery": "2023-09-25"},
    {"id": 4, "location": "Rural School Program (Kanchipuram)", "needs": ["Nutritious food", "fruits"], "urgency": "high", 
     "capacity_kg": 150, "population_served": 120, "last_delivery": "2023-09-18"},
]

# Simulated logistics database
SIMULATED_LOGISTICS = [
    {"id": 1, "vehicle_type": "Refrigerated Truck", "capacity_kg": 1000, "location": "Chennai Central", 
     "status": "available", "cost_per_km": 15, "co2_per_km": 0.8},
    {"id": 2, "vehicle_type": "Small Van", "capacity_kg": 300, "location": "North Chennai", 
     "status": "available", "cost_per_km": 8, "co2_per_km": 0.4},
    {"id": 3, "vehicle_type": "Refrigerated Truck", "capacity_kg": 1200, "location": "South Chennai", 
     "status": "maintenance", "cost_per_km": 18, "co2_per_km": 0.9},
    {"id": 4, "vehicle_type": "Pickup Truck", "capacity_kg": 500, "location": "West Chennai", 
     "status": "available", "cost_per_km": 10, "co2_per_km": 0.5},
]

# Simulated storage facilities
SIMULATED_STORAGE = [
    {"id": 1, "location": "Cold Storage A (Chennai)", "capacity_kg": 2000, "available_kg": 800, 
     "temperature": "2°C", "cost_per_day_per_kg": 0.5},
    {"id": 2, "location": "Cold Storage B (Chennai)", "capacity_kg": 1500, "available_kg": 1200, 
     "temperature": "4°C", "cost_per_day_per_kg": 0.4},
    {"id": 3, "location": "Warehouse C (Chennai)", "capacity_kg": 3000, "available_kg": 2000, 
     "temperature": "ambient", "cost_per_day_per_kg": 0.2},
]

# --- Define LangChain Tools ---
# These tools simulate connecting to real data sources

@tool
def get_inventory_data(query: str = "") -> str:
    """Fetches current food surplus from warehouses, markets, and farms. 
    Can filter by location, item type, or perishability level."""
    # In a real implementation, this would query a database
    return json.dumps(SIMULATED_INVENTORY)

@tool
def get_demand_signals(location: str = "") -> str:
    """Fetches indicators of demand from communities, NGOs, or food banks. 
    Can filter by location or urgency level."""
    # In a real implementation, this would query a database
    return json.dumps(SIMULATED_DEMANDS)

@tool
def get_available_logistics(capacity_required: int = 0) -> str:
    """Fetches available transportation options with their capacity, location, and cost details."""
    available_vehicles = [v for v in SIMULATED_LOGISTICS if v["status"] == "available"]
    if capacity_required > 0:
        available_vehicles = [v for v in available_vehicles if v["capacity_kg"] >= capacity_required]
    return json.dumps(available_vehicles)

@tool
def get_storage_options(storage_type: str = "", capacity_needed: int = 0) -> str:
    """Fetches available storage facilities with their capacity, temperature, and cost details."""
    available_storage = SIMULATED_STORAGE
    if storage_type:
        available_storage = [s for s in available_storage if storage_type in s["temperature"]]
    if capacity_needed > 0:
        available_storage = [s for s in available_storage if s["available_kg"] >= capacity_needed]
    return json.dumps(available_storage)

@tool
def calculate_route_distance(origin: str, destination: str) -> str:
    """Calculates the distance and estimated travel time between two locations."""
    # Simulated route calculation - in real implementation, use Google Maps API
    distances = {
        ("Farm Co. (Chennai)", "Downtown Kitchen (Chennai)"): {"distance_km": 15, "time_min": 30},
        ("Farm Co. (Chennai)", "Northside Shelter (Chennai)"): {"distance_km": 25, "time_min": 45},
        ("Dairy Central (Chennai)", "Downtown Kitchen (Chennai)"): {"distance_km": 8, "time_min": 20},
        ("Dairy Central (Chennai)", "Northside Shelter (Chennai)"): {"distance_km": 20, "time_min": 35},
        ("Warehouse A (Chennai)", "Community Center B (Chennai)"): {"distance_km": 12, "time_min": 25},
        ("Urban Market (Chennai)", "Rural School Program (Kanchipuram)"): {"distance_km": 70, "time_min": 90},
    }
    
    key = (origin, destination)
    if key in distances:
        return json.dumps(distances[key])
    else:
        # Default values if route not in our simulated data
        return json.dumps({"distance_km": 20, "time_min": 40})

@tool
def get_farmer_info(farmer_id: str) -> str:
    """Retrieves information about a farmer including their economic situation and past transactions."""
    # Simulated farmer data
    farmers = {
        "F1001": {"name": "Raj Kumar", "location": "Chennai", "years_farming": 12, 
                 "economic_status": "struggling", "last_month_income": 15000},
        "F1002": {"name": "Vijay Singh", "location": "Kanchipuram", "years_farming": 8, 
                 "economic_status": "moderate", "last_month_income": 25000},
        "F1003": {"name": "Priya Patel", "location": "Vellore", "years_farming": 5, 
                 "economic_status": "struggling", "last_month_income": 12000},
        "D2001": {"name": "Milk Cooperative", "location": "Chennai", "years_farming": 20, 
                 "economic_status": "stable", "last_month_income": 80000},
        "F3001": {"name": "Fisherman Cooperative", "location": "Chennai Coast", "years_farming": 15, 
                 "economic_status": "moderate", "last_month_income": 45000},
    }
    
    return json.dumps(farmers.get(farmer_id, {"error": "Farmer not found"}))

@tool
def send_alert(recipient: str, message: str) -> str:
    """Sends an alert or notification to a recipient (driver, warehouse manager, etc.)."""
    # In a real implementation, this would integrate with SMS/email APIs
    print(f"ALERT SENT TO {recipient}: {message}")
    return json.dumps({"status": "success", "message": "Alert sent successfully"})

@tool
def calculate_environmental_impact(food_waste_kg: int, distance_km: int) -> str:
    """Calculates the environmental impact of food waste and transportation."""
    # Emission factors (kg CO2 equivalent)
    food_waste_emission = 2.5 * food_waste_kg  # ~2.5 kg CO2e per kg of food waste
    transport_emission = 0.8 * distance_km  # ~0.8 kg CO2e per km for a medium truck
    
    water_waste = 1000 * food_waste_kg  # ~1000 liters of water per kg of food waste
    
    return json.dumps({
        "co2_emissions_kg": round(food_waste_emission + transport_emission, 2),
        "water_waste_liters": water_waste,
        "food_waste_kg": food_waste_kg,
        "transport_distance_km": distance_km
    })

@tool
def record_allocation_plan(plan: str) -> str:
    """Records the final allocation plan in the system database."""
    # In a real implementation, this would write to a database
    print(f"ALLOCATION PLAN RECORDED: {plan}")
    return json.dumps({"status": "success", "message": "Plan recorded successfully"})

# --- Initialize the Agent with Tools ---
tools = [
    get_inventory_data, 
    get_demand_signals, 
    get_available_logistics,
    get_storage_options,
    calculate_route_distance,
    get_farmer_info,
    send_alert,
    calculate_environmental_impact,
    record_allocation_plan
]

# System message that defines the agent's behavior
system_message = SystemMessage(content="""You are an expert supply chain logistics coordinator called "HungerGuard AI". 
Your goal is to minimize food waste and hunger by optimally matching food surplus to communities in need. 

You must consider these factors in priority order:
1. URGENCY: Address critical hunger situations first
2. PERISHABILITY: Highly perishable goods must be allocated immediately to nearest locations
3. PROXIMITY: Minimize transportation distance to reduce spoilage and environmental impact
4. ECONOMIC IMPACT: Support struggling farmers when possible without compromising hunger relief
5. ENVIRONMENTAL EFFICIENCY: Minimize CO2 emissions and resource waste

Always use your tools to get the latest data before making decisions.
After creating a plan, calculate its environmental and economic impact.
Send alerts to relevant stakeholders for urgent actions.
Finally, record the allocation plan in the system.

Think step-by-step and provide clear reasoning for your decisions.""")

# Initialize memory for the agent
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# Initialize the agent
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True,
    handle_parsing_errors=True,
    memory=memory,
    agent_kwargs={
        "system_message": system_message,
    }
)

# --- Impact Calculation Function ---
def calculate_impact_metrics(plan_text: str) -> Dict[str, Any]:
    """Calculate estimated impact metrics based on the allocation plan."""
    # This is a simplified calculation - in a real system, you'd extract more precise data
    people_served = 0
    food_saved_kg = 0
    economic_value = 0
    emissions_saved = 0
    
    # Simple heuristic-based calculations
    if "Tomatoes" in plan_text:
        food_saved_kg += 200
        economic_value += 200 * 15  # 200kg * ₹15/kg
        people_served += 50
    if "Milk" in plan_text:
        food_saved_kg += 150
        economic_value += 150 * 40  # 150L * ₹40/L
        people_served += 60
    if "Potatoes" in plan_text:
        food_saved_kg += 500
        economic_value += 500 * 20  # 500kg * ₹20/kg
        people_served += 100
    if "Apples" in plan_text:
        food_saved_kg += 50
        economic_value += 50 * 80  # 50kg * ₹80/kg
        people_served += 25
    if "Fish" in plan_text:
        food_saved_kg += 100
        economic_value += 100 * 120  # 100kg * ₹120/kg
        people_served += 40
    
    # Estimate emissions saved (avoided food waste)
    emissions_saved = round(2.5 * food_saved_kg, 2)
    
    return {
        "people_served": people_served,
        "food_saved_kg": food_saved_kg,
        "economic_value_rupees": economic_value,
        "emissions_saved_kg": emissions_saved,
        "water_saved_liters": 1000 * food_saved_kg  # ~1000L water per kg of food
    }

# --- API Endpoint ---
@router.post("/generate_plan", response_model=AgentOutput)
async def generate_plan_endpoint(input_data: AgentInput, background_tasks: BackgroundTasks):
    """
    Takes a raw text report and uses a Gemini-powered agent to generate an optimal food distribution plan.
    """
    try:
        # Prepare the prompt with the user's input and focus area
        prompt = f"""
        Create an optimal food allocation plan based on this report: {input_data.raw_report}
        
        Priority focus: {input_data.priority_focus}
        
        Please:
        1. Analyze available inventory and demand signals
        2. Consider logistics constraints and storage options
        3. Create a prioritized allocation plan
        4. Calculate environmental and economic impact
        5. Send alerts for urgent actions
        6. Record the final plan
        """
        
        # Run the agent
        result = await agent.arun(prompt)
        
        # Parse the result into plan and summary
        if "SUMMARY:" in result:
            parts = result.split("SUMMARY:")
            plan_str = parts[0].strip()
            summary_str = "SUMMARY:" + parts[1].strip()
        elif "Summary:" in result:
            parts = result.split("Summary:")
            plan_str = parts[0].strip()
            summary_str = "Summary:" + parts[1].strip()
        else:
            plan_str = result
            summary_str = "Summary not explicitly provided, but plan was generated successfully."
        
        # Calculate impact metrics
        impact_metrics = calculate_impact_metrics(plan_str)
        
        # In a real implementation, you might store the plan in a database here
        background_tasks.add_task(store_allocation_plan, plan_str, impact_metrics)
        
        return AgentOutput(
            allocation_plan=plan_str,
            human_summary=summary_str,
            estimated_impact=impact_metrics
        )
        
    except Exception as e:
        print(f"An error occurred during agent execution: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

# Background task to store the allocation plan
async def store_allocation_plan(plan: str, impact_metrics: Dict[str, Any]):
    """Store the allocation plan in a database (simulated)."""
    # In a real implementation, this would write to a database
    print(f"Storing plan with impact: {impact_metrics}")
    # Simulate async storage operation
    await asyncio.sleep(0.1)
    return {"status": "success"}

# --- Additional API Endpoints for System Monitoring ---
@router.get("/system_status")
async def get_system_status():
    """Returns current system status and inventory overview."""
    total_inventory = sum([int(item['quantity'].replace('kg', '').replace('L', '')) for item in SIMULATED_INVENTORY])
    total_demand = sum([demand['capacity_kg'] for demand in SIMULATED_DEMANDS])
    
    return {
        "status": "operational",
        "total_inventory_kg": total_inventory,
        "total_demand_capacity": total_demand,
        "utilization_rate": round(total_inventory / total_demand * 100, 2) if total_demand > 0 else 0,
        "last_updated": datetime.now().isoformat()
    }

@router.get("/inventory")
async def get_inventory():
    """Returns current inventory details."""
    return SIMULATED_INVENTORY

@router.get("/demand")
async def get_demand():
    """Returns current demand details."""
    return SIMULATED_DEMANDS

# --- Additional Management Endpoints ---
@router.get("/logistics")
async def get_logistics():
    """Returns current logistics details."""
    return SIMULATED_LOGISTICS

@router.get("/storage")
async def get_storage():
    """Returns current storage details."""
    return SIMULATED_STORAGE

@router.get("/farmers")
async def get_farmers():
    """Returns farmer information."""
    farmers = {
        "F1001": {"name": "Raj Kumar", "location": "Chennai", "years_farming": 12, 
                 "economic_status": "struggling", "last_month_income": 15000},
        "F1002": {"name": "Vijay Singh", "location": "Kanchipuram", "years_farming": 8, 
                 "economic_status": "moderate", "last_month_income": 25000},
        "F1003": {"name": "Priya Patel", "location": "Vellore", "years_farming": 5, 
                 "economic_status": "struggling", "last_month_income": 12000},
        "D2001": {"name": "Milk Cooperative", "location": "Chennai", "years_farming": 20, 
                 "economic_status": "stable", "last_month_income": 80000},
        "F3001": {"name": "Fisherman Cooperative", "location": "Chennai Coast", "years_farming": 15, 
                 "economic_status": "moderate", "last_month_income": 45000},
    }
    return farmers

@router.get("/dashboard/stats")
async def get_waste_optimizer_stats():
    """Returns dashboard statistics for waste optimizer."""
    total_inventory = sum([int(item['quantity'].replace('kg', '').replace('L', '')) for item in SIMULATED_INVENTORY])
    total_demand = sum([demand['capacity_kg'] for demand in SIMULATED_DEMANDS])
    available_vehicles = len([v for v in SIMULATED_LOGISTICS if v["status"] == "available"])
    total_storage = sum([s['available_kg'] for s in SIMULATED_STORAGE])
    
    return {
        "total_inventory_kg": total_inventory,
        "total_demand_capacity": total_demand,
        "utilization_rate": round(total_inventory / total_demand * 100, 2) if total_demand > 0 else 0,
        "available_vehicles": available_vehicles,
        "total_vehicles": len(SIMULATED_LOGISTICS),
        "available_storage_kg": total_storage,
        "total_storage_capacity": sum([s['capacity_kg'] for s in SIMULATED_STORAGE]),
        "last_updated": datetime.now().isoformat()
    }

@router.get("/dashboard/inventory-flow")
async def get_inventory_flow():
    """Returns inventory flow data for charts."""
    # Simulate weekly data
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    food_in = [2500, 3200, 2800, 3500, 4000, 1800, 2200]
    food_out = [2200, 2800, 2600, 3000, 3500, 1600, 2000]
    waste = [150, 200, 120, 180, 220, 100, 130]
    
    return {
        "days": days,
        "food_in": food_in,
        "food_out": food_out,
        "waste": waste
    }

@router.get("/dashboard/network-status")
async def get_network_status():
    """Returns food bank network status."""
    locations = ['Central Food Bank', 'North Branch', 'South Hub', 'East Center', 'West Station']
    current_inventory = [2500, 1800, 2200, 1600, 2000]
    daily_distribution = [800, 600, 700, 500, 650]
    surplus_available = [300, 200, 250, 150, 180]
    
    return {
        "locations": locations,
        "current_inventory": current_inventory,
        "daily_distribution": daily_distribution,
        "surplus_available": surplus_available
    }

@router.get("/dashboard/waste-reduction")
async def get_waste_reduction():
    """Returns waste reduction data by category."""
    categories = ['Vegetables', 'Fruits', 'Dairy', 'Meat', 'Bakery', 'Prepared Meals']
    waste_before = [150, 120, 80, 60, 90, 110]
    waste_after = [45, 36, 24, 18, 27, 33]
    
    return {
        "categories": categories,
        "waste_before": waste_before,
        "waste_after": waste_after
    }