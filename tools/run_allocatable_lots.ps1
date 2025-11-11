<# 
.SYNOPSIS
  Query allocatable lots inside the Postgres Docker container via psql.

.EXAMPLE
  .\run_allocatable_lots.ps1

.EXAMPLE
  .\run_allocatable_lots.ps1 -ProductCode P001 -WarehouseCode W01

.PARAMETER ProductCode
  Product code to filter (empty = no filter).

.PARAMETER WarehouseCode
  Warehouse code to filter (empty = no filter).

.PARAMETER DbService
  Docker Compose service name for Postgres.

.PARAMETER DbUser
  Database user.

.PARAMETER DbName
  Database name.

.PARAMETER SqlPathInContainer
  Path to allocatable_lots.sql inside the container.
#>

param(
  [string]$ProductCode = "",
  [string]$WarehouseCode = "",
  [string]$DbService = "db-postgres",
  [string]$DbUser = "admin",
  [string]$DbName = "lot_management",
  [string]$SqlPathInContainer = "/app/sql/allocatable_lots.sql"
)

$cmd = @(
  "docker", "compose", "exec", "-T", $DbService,
  "psql", "-U", $DbUser, "-d", $DbName,
  "-v", "prod=$ProductCode",
  "-v", "wh=$WarehouseCode",
  "-f", $SqlPathInContainer
)

Write-Host ">> Running:" ($cmd -join " ") -ForegroundColor Cyan
$process = Start-Process -FilePath $cmd[0] -ArgumentList $cmd[1..($cmd.Count-1)] -Wait -NoNewWindow -PassThru
if ($process.ExitCode -ne 0) {
  Write-Error "psql exited with code $($process.ExitCode)"
  exit $process.ExitCode
}
