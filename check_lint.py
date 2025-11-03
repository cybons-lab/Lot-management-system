# check_lint.py  (ログ保存対応版)
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent
BACKEND = REPO / "backend"
FRONTEND = REPO / "frontend"
LOG_DIR = REPO / "lint_logs"
LOG_DIR.mkdir(exist_ok=True)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
LOG_FILE = LOG_DIR / f"lint_check_{timestamp}.log"


def run(cmd: list[str], cwd: Path | None = None, name: str = "") -> int:
    """コマンド実行（ログファイルにも出力）"""
    if name:
        header = f"\n=== {name} ===\n"
        print(header)
        LOG_FILE.write_text(header, encoding="utf-8", errors="ignore")

    process = subprocess.Popen(
        cmd,
        cwd=cwd,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        encoding="utf-8",
        errors="ignore",
    )
    with open(LOG_FILE, "a", encoding="utf-8", errors="ignore") as f:
        for line in process.stdout:
            print(line, end="")
            f.write(line)
    process.wait()
    return process.returncode


def ensure_dir(p: Path, label: str) -> bool:
    if not p.exists():
        msg = f"[ERROR] {label} directory not found: {p}\n"
        print(msg)
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(msg)
        return False
    return True


def main() -> int:
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write(f"[Start] Lint/Format check {timestamp}\n\n")

    err = 0
    py = sys.executable

    # Backend check
    if ensure_dir(BACKEND, "backend"):
        run([py, "-m", "ruff", "--version"], BACKEND, "Backend: Ruff version")
        run([py, "-m", "black", "--version"], BACKEND, "Backend: Black version")
        if (
            run(
                [py, "-m", "ruff", "check", "."],
                BACKEND,
                "Backend: ruff check (detect only)",
            )
            != 0
        ):
            err = 1
        if (
            run(
                [py, "-m", "black", "--check", "."],
                BACKEND,
                "Backend: black --check (detect only)",
            )
            != 0
        ):
            err = 1

    # Frontend check
    if ensure_dir(FRONTEND, "frontend"):
        npx = "npx.cmd" if os.name == "nt" else "npx"
        if not shutil.which(npx):
            msg = (
                "[ERROR] npx not found. Install Node.js and run `npm i` in frontend.\n"
            )
            print(msg)
            with open(LOG_FILE, "a", encoding="utf-8") as f:
                f.write(msg)
            err = 1
        else:
            node_modules = FRONTEND / "node_modules"
            if not node_modules.exists():
                msg = "[WARN] node_modules not found. Run: (cd frontend && npm i)\n"
                print(msg)
                with open(LOG_FILE, "a", encoding="utf-8") as f:
                    f.write(msg)

            if (
                run(
                    [npx, "eslint", "src/**/*.{ts,tsx,js,jsx}", "--max-warnings=0"],
                    FRONTEND,
                    "Frontend: ESLint (detect only)",
                )
                != 0
            ):
                err = 1

            if (
                run(
                    [npx, "prettier", "--check", "src/**/*.{ts,tsx,js,jsx,css,md}"],
                    FRONTEND,
                    "Frontend: Prettier --check (detect only)",
                )
                != 0
            ):
                err = 1

    result_msg = (
        "\n*** All checks passed. ***\n"
        if not err
        else "\n*** Lint/Format check FAILED. See logs above. ***\n"
    )
    print(result_msg)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(result_msg)

    print(f"\n[Log saved to] {LOG_FILE}")
    return err


if __name__ == "__main__":
    sys.exit(main())
