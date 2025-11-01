from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import lots, admin
from app.core.config import settings
from app.core.database import init_db

# FastAPIアプリケーションの作成
app = FastAPI(
    title="Lot Management System API",
    version="1.0.0",
    description="ロット管理システムのバックエンドAPI",
)

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """アプリケーション起動時の処理"""
    # データベースの初期化
    init_db()
    print("🚀 Application started successfully")
    print(f"📊 Environment: {settings.ENVIRONMENT}")
    print(f"🗄️  Database: {settings.DATABASE_URL}")


@app.on_event("shutdown")
async def shutdown_event():
    """アプリケーション終了時の処理"""
    print("👋 Application shutting down")


# ルーターの登録
app.include_router(
    lots.router,
    prefix="/api/lots",
    tags=["lots"]
)

app.include_router(
    admin.router,
    prefix="/api/admin",
    tags=["admin"]
)


@app.get("/")
def read_root():
    """
    ルートエンドポイント
    
    Returns:
        dict: APIの基本情報
    """
    return {
        "message": "Lot Management System API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/admin/health"
    }


@app.get("/api")
def api_info():
    """
    API情報エンドポイント
    
    Returns:
        dict: API情報
    """
    return {
        "endpoints": {
            "lots": "/api/lots",
            "admin": "/api/admin",
            "health": "/api/admin/health",
            "reset": "/api/admin/reset-database (開発環境のみ)"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
