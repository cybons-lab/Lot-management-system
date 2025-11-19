# Forecast Test Data Investigation Report

## Executive Summary

The Lot Management System generates forecast test data through two main mechanisms:
1. **Seed Service** (`seeds_service.py`) - Simple forecasts for basic testing
2. **Simulation Service** (`seed_simulate_service.py`) - Complex forecasts with dependencies on delivery places

The system uses a **header-detail (ヘッダ・明細)** structure with:
- **ForecastHeader**: Parent record linking customer, delivery place, and forecast period
- **ForecastLine**: Detail records with daily quantities and delivery dates

---

## 1. Data Structure

### Database Models
**Location:** `/backend/app/models/forecast_models.py`

#### ForecastHeader Table
```
forecast_headers (parent table)
├─ id: BigInteger (PK)
├─ customer_id: BigInteger (FK → customers)
├─ delivery_place_id: BigInteger (FK → delivery_places)
├─ forecast_number: String(50) [UNIQUE]
├─ forecast_start_date: Date
├─ forecast_end_date: Date
├─ status: Enum (active|completed|cancelled)
├─ created_at: DateTime
└─ updated_at: DateTime
```

#### ForecastLine Table
```
forecast_lines (detail table)
├─ id: BigInteger (PK)
├─ forecast_id: BigInteger (FK → forecast_headers, CASCADE)
├─ product_id: BigInteger (FK → products)
├─ delivery_date: Date
├─ forecast_quantity: Decimal(15,3)
├─ unit: String(20)
├─ created_at: DateTime
└─ updated_at: DateTime
```

**Backward Compatibility:**
- Alias: `Forecast = ForecastHeader` (line 139 for legacy code)
- Old API used flat `Forecast` model (single table)
- New API uses header-detail separation

---

## 2. Test Data Generation Methods

### Method A: Simple Seed Service (seeds_service.py)
**Function:** `seed_forecasts()` (lines 267-400)
**Usage:** Direct seed data generation without headers

#### Data Generation Logic
```python
def seed_forecasts(
    db: Session,
    req: SeedRequest,  # Contains forecasts count (0=disabled)
    rng: Random,
    created_customers: list[Customer],
    created_products: list[Product],
) → list[Forecast]
```

**Dataset Composition (for each customer × product pair):**

1. **Daily Forecasts** (±7 days from today)
   - Range: Today - 7 to Today + 7 = **15 days**
   - Quantity per day: `rng.randint(10, 1000)`
   - Fields: `date_day` only
   - Total records: `15 × num_customers × num_products`

2. **Dekad Forecasts** (Japanese 10-day periods)
   - Days 1st, 11th, 21st of each month
   - Per customer × product: **3 records**
   - Quantity per dekad: `rng.randint(10, 1000)`
   - Fields: `date_dekad_start` only

3. **Monthly Forecasts** (current month ±2 months)
   - Current month + next 2 months = **3 months**
   - Per customer × product: **3 records**
   - Quantity per month: `rng.randint(10, 1000)`
   - Fields: `year_month` only

**Total Forecast Records (Simple Method):**
```
= (customers × products) × (15 daily + 3 dekad + 3 monthly)
= (customers × products) × 21
```

**Example Calculation (default values in SeedRequest):**
```
- customers: 3
- products: 5
- Total = 3 × 5 × 21 = 315 forecast records
```

**Important Notes:**
- `forecasts` parameter: 0 = disabled, > 0 = enabled (count not used, auto-calculated)
- Uses flat `Forecast` model (no header separation)
- Method **DEPRECATED** - still in code for compatibility

---

### Method B: Enhanced Simulation Service (seed_simulate_service.py)
**Function:** `create_forecast_data()` (lines 333-451)
**Usage:** Production-grade test data with header-detail structure
**Added:** Phase 2.5 of `run_seed_simulation()`

#### Data Generation Logic
```python
def create_forecast_data(
    db: Session,
    params: dict,  # Contains forecasts flag (1=enabled, 0=disabled)
    masters: dict,  # customers, products, delivery_places
    rng: Random,
    tracker,  # Job tracker for logging
    task_id: str,
) → int  # Returns forecast_line count
```

**Trigger Condition:**
```python
generate_forecasts = params.get("forecasts", 0) > 0
```

**Dataset Structure:**

1. **Forecast Headers** (one per delivery place)
   - Forecast period: Today - 7 to Today + 7 = **15-day window**
   - Forecast number: `SEED-{delivery_place_code}-{start_date:%Y%m%d}[-{suffix}]`
   - Status: `"active"`
   - Customer ID: Linked from delivery place
   - Delivery place ID: Direct link

2. **Forecast Lines** (daily granularity)
   - **Products per header:** 5 (or all if ≤5 products exist)
   - **Days per header:** 15 (start_date to end_date inclusive)
   - **Lines per header:** `5 products × 15 days = 75 lines`
   - Quantity per line: `Decimal(rng.randint(10, 1000))`
   - Unit: Product's base_unit (e.g., "PCS", "BOX", "SET")
   - Delivery date: Incremented daily within forecast window

**Total Forecast Records (Simulation Method):**
```
Total Headers = Number of delivery places
Total Lines = (Number of delivery places) × 5 products × 15 days
            = (Number of delivery places) × 75 lines
```

**Example Calculation (default master values):**
```
Master Data Generation:
- customers: 300 (default profile)
- delivery_places: 5 per profile
- products: 1500 (default profile)

Forecast Calculation:
- Headers: 5 (one per delivery place)
- Lines: 5 × 75 = 375 forecast lines
```

**If Forecasts Disabled (forecasts=0):**
```
- Logs: "Forecast generation skipped: forecasts=0"
- Headers created: 0
- Lines created: 0
```

---

## 3. Data Insertion Sequence

### Processing Order in Simulation Service

The system follows a **strict dependency order** in `run_seed_simulation()` (lines 997-1089):

```
Phase 1: Database Reset
└─ Truncate all tables
   └─ DONE: Empty database

Phase 2: Master Data Creation
├─ Customers (from params)
├─ Suppliers (from params)
├─ Delivery Places (5 per profile, linked to random customers)
├─ Products (from params)
├─ Warehouses (from params)
└─ DONE: All masters committed

Phase 2.5: Forecast Data Creation ⭐ KEY PHASE
├─ Check: generate_forecasts flag (from params.forecasts)
├─ Create ForecastHeader per delivery_place
│  └─ Link customer_id from delivery_place
│  └─ Forecast period: today - 7 to today + 7
├─ Create ForecastLine for each header
│  ├─ Products: random 5 (or all if < 5)
│  ├─ Days: 15 (start_date to end_date)
│  ├─ Quantity: rng.randint(10, 1000)
│  └─ Delivery date: incremented daily
└─ DONE: Forecasts committed

Phase 3: Stock Inventory (Lots)
├─ Create lots (from params)
├─ Each lot gets:
│  ├─ Product: random from created products
│  ├─ Warehouse: random from created warehouses
│  ├─ Supplier: random from created suppliers
│  ├─ Expiry date: random 0-360 days in future
│  └─ Stock movement (INBOUND)
└─ DONE: Inventory committed

Phase 4: Orders
├─ Create orders (from params)
├─ Each order gets:
│  ├─ Customer: random from created customers
│  ├─ Order lines: 1-5 per order
│  ├─ Each line gets delivery_place_id
│  └─ Stock movement preparation
└─ DONE: Orders committed

Phase 5: Allocations
├─ Allocate ~80% of order lines
├─ FIFO lot selection (by received_date)
├─ Constraints:
│  ├─ Max 3 lots per line (lot_split_max_per_line)
│  └─ Available stock check
└─ DONE: Allocations + SHIPMENT movements committed

Phase 6: Post-Check Validation
├─ Lot split violations (≤ limit)
├─ Destination count (≤ 5 per order)
├─ Order line count (≤ 5 per order)
└─ Stock equation (no negative stock)

Phase 7: Snapshot Save (optional)
└─ Save parameters for reproducibility

Phase 8: Results
└─ Return summary with all counts
```

### Critical Dependencies for Forecasts

1. **Forecasts depend on:**
   - ✅ Delivery Places created (Phase 2)
   - ✅ Products created (Phase 2)
   - ✅ Customers created (Phase 2 → delivery places)

2. **Forecasts are independent from:**
   - ❌ Orders (created later in Phase 4)
   - ❌ Lots (created after in Phase 3)
   - ❌ Allocations (created after in Phase 5)

3. **What depends on Forecasts:**
   - Nothing! Forecasts are generated but not used by subsequent phases

---

## 4. Configuration Parameters

### Default Seed Request (admin_seeds_schema.py)
```python
SeedRequest:
  seed: 42 (reproducible)
  dry_run: False
  customers: 3 (minimum test)
  suppliers: 2
  delivery_places: 2
  products: 5
  forecasts: 0  # ⭐ DISABLED by default!
  warehouses: 2
  lots: 10
  orders: 5
```

### Simulation Request (admin_simulate_schema.py)
```python
SimulateSeedRequest:
  profile: str | None  # small, medium, large_near
  random_seed: int | None  # Default: current timestamp
  warehouses: 1-10 (default: 2)
  customers: int | None  # Profile default
  suppliers: int | None
  products: int | None
  lots: int | None
  orders: int | None
  forecasts: 0 | 1 | None  # 0=disabled, 1=enabled, None=profile default
  lot_split_max_per_line: 1-3 (default: 1)
  order_line_items_per_order: 1-5 (default: 1)
  case_mix: dict (optional overrides)
  save_snapshot: bool (default: True)
```

### YAML Profiles (seed_profiles.yaml)

#### Base (_base) - Common Configuration
```yaml
_base:
  order_line_items_per_order: {min: 1, max: 5}
  destinations_max_per_order: 5 (fixed)
  lot_split_max_per_line: 3
  case_mix:
    only_other_warehouse: 0.08
    expired_lot_present: 0.03
    many_small_lots: 0.12
    single_big_lot: 0.12
  # NOTE: forecasts NOT explicitly set (can be API override)
```

#### Profile: small
```yaml
customers: 300
suppliers: 60
products: 1500
warehouses: 6
lots: 6000
orders: 4000
# forecasts: inherited (None = API override or profile default)
```

#### Profile: medium
```yaml
customers: 1200
suppliers: 120
products: 6000
warehouses: 8
lots: 45000
orders: 30000
```

#### Profile: large_near
```yaml
customers: 3000
suppliers: 200
products: 12000
warehouses: 9
lots: 120000
orders: 80000
```

---

## 5. Forecast Data Examples

### Example 1: Simple Seed Data
**Input:**
```
SeedRequest(
  customers=2,
  products=3,
  forecasts=1  # Enable
)
```

**Output:**
```
Forecast records = 2 × 3 × 21 = 126 records

Structure (flat, no headers):
- 2 × 3 daily records (today ± 7 days) = 90
- 2 × 3 dekad records (3 periods) = 18
- 2 × 3 monthly records (3 months) = 18
Total = 126
```

### Example 2: Simulation with Headers
**Input:**
```
SimulateSeedRequest(
  profile="small",
  warehouses=2,
  forecasts=1
)
```

**Expanded Parameters:**
```
customers: 300 (from profile)
suppliers: 60
products: 1500
warehouses: 2 (API override)
lots: 6000
orders: 4000
forecasts: 1 (enabled)
```

**Delivery Places:**
```
delivery_places = 5 (fixed in Phase 2.5, line 242)
```

**Forecast Output:**
```
ForecastHeader records: 5 (one per delivery place)

ForecastLine records per header:
- Products selected: min(5, 1500) = 5
- Days: 15 (today ± 7)
- Lines per header: 5 × 15 = 75
- Total lines: 5 × 75 = 375

Total ForecastLine records: 375
```

**Sample ForecastLine:**
```
{
  id: 1001,
  forecast_id: 1,  # FK to ForecastHeader
  product_id: 101,  # Random product
  delivery_date: 2025-11-19,
  forecast_quantity: 456.000,  # Random 10-1000
  unit: "PCS",
  created_at: 2025-11-19T12:00:00Z
}
```

---

## 6. JSON Test Data Files

### File: forecast_daily_PRD999_v1.json
**Location:** `/backend/data/forecast_daily_PRD999_v1.json`
**Purpose:** Manual test data fixture (NOT generated by seed)
**Structure:** Old flat Forecast format

```json
{
  "version_no": 1,
  "version_issued_at": "2025-11-02T00:00:00Z",
  "source_system": "external",
  "deactivate_old_version": true,
  "forecasts": [
    {
      "forecast_id": "FC-2025-002",
      "product_id": "PRD-001",
      "client_id": "CUS001",
      "supplier_id": "SUP001",
      "granularity": "daily",
      "qty_forecast": 100,
      "version_no": 1,
      "version_issued_at": "2025-11-02T00:00:00Z",
      "date_day": "2025-11-15"
    }
  ]
}
```

**Note:** Uses legacy flat structure (not header-detail)

---

## 7. API Endpoints

### Seed Data Generation Endpoints

#### POST /api/admin/simulate-seed-data
**Request:**
```json
{
  "profile": "small",
  "warehouses": 2,
  "forecasts": 1,
  "random_seed": 42,
  "save_snapshot": true
}
```

**Response:**
```json
{
  "task_id": "task_abc123",
  "message": "Seed simulation started (reset → insert)"
}
```

#### GET /api/admin/simulate-progress/{task_id}
**Response:**
```json
{
  "task_id": "task_abc123",
  "status": "running",
  "phase": "MASTERS",
  "progress_pct": 25,
  "logs": [
    "Phase 2: Creating master data",
    "Created 300 customers",
    "Created 60 suppliers",
    "→ Creating Products...",
    "✓ Created 1500 products",
    "Phase 2.5: Creating forecast data",
    "→ Forecast check: params.forecasts=1, generate=true, customers=300, products=1500",
    "→ Inserting 375 forecast lines...",
    "✓ Created 375 forecast line entries"
  ]
}
```

#### GET /api/admin/simulate-result/{task_id}
**Response (on completion):**
```json
{
  "success": true,
  "summary": {
    "warehouses": 2,
    "forecasts": 375,  # Count of ForecastHeader records
    "orders": 4000,
    "order_lines": 8000,
    "lots": 6000,
    "allocations": 4800,
    "cap_checks": {
      "lot_split": "OK",
      "destinations": "OK",
      "order_lines": "OK"
    },
    "stock_equation_ok": true,
    "orphan_count": 0
  },
  "snapshot_id": 42
}
```

---

## 8. Control Parameters Reference

| Parameter | Type | Range | Default | Impact |
|-----------|------|-------|---------|--------|
| `forecasts` | int | 0 or 1 | 0 | Enables/disables all forecast generation |
| `profile` | str | small, medium, large_near | None | Sets default counts from YAML |
| `warehouses` | int | 1-10 | 2 | Overrides profile |
| `customers` | int | ≥0 | Profile | Affects delivery places |
| `products` | int | ≥0 | Profile | Products per forecast header |
| `delivery_places` | int | Fixed 5 | 5 | Number of forecast headers |
| `random_seed` | int | Any | timestamp | Reproducibility |

---

## 9. Code Flow Diagram

```
API Request: POST /api/admin/simulate-seed-data
  ↓
SimulateSeedRequest validation
  ↓
_expand_params() - Merge YAML + API overrides
  ↓
run_seed_simulation() [NEW DB SESSION]
  ├─ Phase 1: Reset
  │  └─ truncate_all_tables()
  │
  ├─ Phase 2: Masters
  │  ├─ create_master_data()
  │  │  ├─ seed_customers()
  │  │  ├─ seed_suppliers()
  │  │  ├─ seed_delivery_places()
  │  │  ├─ seed_products()
  │  │  └─ seed_warehouses()
  │  └─ db.commit()
  │
  ├─ Phase 2.5: Forecasts ⭐
  │  └─ create_forecast_data()
  │     ├─ Check: params["forecasts"] > 0
  │     ├─ For each delivery_place:
  │     │  ├─ Create ForecastHeader
  │     │  │  └─ Link customer_id, delivery_place_id
  │     │  └─ For each of 5 products × 15 days:
  │     │     └─ Create ForecastLine
  │     │        └─ quantity: rng.randint(10, 1000)
  │     └─ db.commit()
  │
  ├─ Phase 3: Inventory
  │  └─ create_lot_inventory()
  │
  ├─ Phase 4: Orders
  │  └─ create_orders_with_constraints()
  │
  ├─ Phase 5: Allocations
  │  └─ create_allocations_with_constraints()
  │
  ├─ Phase 6: Validation
  │  └─ validate_simulation_constraints()
  │
  ├─ Phase 7: Snapshot
  │  └─ save_simulation_snapshot()
  │
  └─ Phase 8: Results
     └─ Return summary

Response: task_id
  ↓
Client polls: GET /api/admin/simulate-progress/{task_id}
  ↓
Client polls: GET /api/admin/simulate-result/{task_id}
  ↓
Return final summary with counts
```

---

## 10. Key Findings & Important Notes

### ✅ Strengths

1. **Two-Tier Architecture:**
   - Simple method for unit tests (seeds_service)
   - Complex method for integration tests (seed_simulate_service)

2. **Header-Detail Separation:**
   - Properly normalized database structure
   - Supports customer-specific delivery windows
   - Enables complex business rules

3. **Parameter Flexibility:**
   - YAML profiles for reusable configurations
   - API overrides for ad-hoc testing
   - Seed value for reproducibility

4. **Comprehensive Generation:**
   - Dependencies tracked
   - Constraint validation
   - Progress tracking for long operations

### ⚠️ Important Caveats

1. **Forecasts Disabled by Default:**
   ```python
   forecasts: conint(ge=0) = 0  # ⭐ Default is 0 (disabled)
   ```
   Must explicitly set `forecasts=1` to enable

2. **Delivery Places Fixed at 5:**
   ```python
   num_delivery_places = 5  # Hard-coded in Phase 2.5
   ```
   Not configurable - always 5 per profile

3. **Products Per Header Limited to 5:**
   ```python
   if len(all_products) <= 5:
       products_for_header = all_products
   else:
       products_for_header = rng.sample(all_products, 5)
   ```
   Random sample of 5 (even if 1500+ products exist)

4. **Old Flat Forecast Model Still Exists:**
   - `Forecast = ForecastHeader` (backward compat alias)
   - Old API/code may still reference flat structure
   - Migration deadline: 2026-02-15

5. **Forecasts Not Used by Other Phases:**
   - Generated but not consumed by orders/allocations
   - No cross-validation with actual demand
   - Useful for UI testing only

### 📊 Record Count Formula

**Simple Method (seeds_service.py):**
```
Total Records = customers × products × 21
  = customers × products × (15 daily + 3 dekad + 3 monthly)
```

**Simulation Method (seed_simulate_service.py):**
```
Total ForecastHeader = delivery_places (fixed at 5)
Total ForecastLine = delivery_places × 5 products × 15 days
                   = delivery_places × 75
```

---

## Summary Table

| Aspect | Simple Seed | Simulation |
|--------|-------------|-----------|
| **Model** | Flat Forecast | ForecastHeader + ForecastLine |
| **Entry Point** | `seed_forecasts()` | `create_forecast_data()` |
| **Control** | `forecasts` param | `params["forecasts"]` |
| **Structure** | All in one table | Parent-child relationship |
| **Headers** | N/A | One per delivery place (5 fixed) |
| **Lines** | Records direct | 75 per header (5 products × 15 days) |
| **Date Range** | ±7 days + dekads + months | ±7 days only (today ± 7) |
| **Total Records** | `customers × products × 21` | `5 × 75 = 375` (simulation default) |
| **Default Enabled** | No | No (requires API flag) |
| **Used By** | Legacy/backward compat | Current system |

