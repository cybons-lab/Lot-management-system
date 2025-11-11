-- sql/allocatable_lots.sql
-- psql variables: prod, wh (empty string = no filter)
-- Usage examples:
--   psql -U admin -d lot_management -f /app/sql/allocatable_lots.sql
--   psql -U admin -d lot_management -v prod='P001' -v wh='W01' -f /app/sql/allocatable_lots.sql

\if :{?prod}
\else
\set prod ''
\endif

\if :{?wh}
\else
\set wh ''
\endif

WITH lot_stock AS (
  SELECT
    l.id              AS lot_id,
    l.lot_number,
    l.product_code,
    l.warehouse_code,
    l.expiry_date,
    l.is_locked,
    s.current_quantity,
    s.last_updated
  FROM public.lot_current_stock s
  JOIN public.lots l ON l.id = s.lot_id
  WHERE l.deleted_at IS NULL
),
alloc AS (
  SELECT lot_id, SUM(allocated_qty)::numeric(15,4) AS allocated_qty
  FROM public.allocations
  WHERE deleted_at IS NULL
  GROUP BY lot_id
)
SELECT
  ls.product_code,
  ls.warehouse_code,
  ls.lot_number,
  ls.expiry_date,
  ls.last_updated,
  ls.current_quantity,
  COALESCE(a.allocated_qty, 0) AS allocated_qty,
  (ls.current_quantity - COALESCE(a.allocated_qty,0)) AS free_qty
FROM lot_stock ls
LEFT JOIN alloc a ON a.lot_id = ls.lot_id
WHERE (ls.current_quantity - COALESCE(a.allocated_qty,0)) > 0
  AND ls.is_locked = false
  AND (ls.expiry_date IS NULL OR ls.expiry_date >= CURRENT_DATE)
  AND ( (:'prod' = '') OR (ls.product_code   = :'prod') )
  AND ( (:'wh'   = '') OR (ls.warehouse_code = :'wh')   )
ORDER BY ls.product_code, ls.warehouse_code, ls.expiry_date NULLS FIRST, ls.lot_id;
