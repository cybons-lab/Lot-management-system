from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.api.deps import get_db_session
from app.models import Lot
from app.schemas import LotCreate, LotUpdate, LotResponse

router = APIRouter()


@router.get("", response_model=List[LotResponse])
def get_lots(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db_session)
):
    """
    ロット一覧を取得
    
    Args:
        skip: スキップする件数
        limit: 取得する最大件数
        db: データベースセッション
    
    Returns:
        List[LotResponse]: ロット一覧
    """
    lots = db.query(Lot).offset(skip).limit(limit).all()
    return lots


@router.get("/{lot_id}", response_model=LotResponse)
def get_lot(
    lot_id: int,
    db: Session = Depends(get_db_session)
):
    """
    指定されたIDのロットを取得
    
    Args:
        lot_id: ロットID
        db: データベースセッション
    
    Returns:
        LotResponse: ロット情報
    
    Raises:
        HTTPException: ロットが見つからない場合
    """
    lot = db.query(Lot).filter(Lot.id == lot_id).first()
    if not lot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ロットID {lot_id} が見つかりません"
        )
    return lot


@router.post("", response_model=LotResponse, status_code=status.HTTP_201_CREATED)
def create_lot(
    lot: LotCreate,
    db: Session = Depends(get_db_session)
):
    """
    新しいロットを作成
    
    Args:
        lot: ロット作成データ
        db: データベースセッション
    
    Returns:
        LotResponse: 作成されたロット情報
    """
    db_lot = Lot(**lot.model_dump())
    db.add(db_lot)
    db.commit()
    db.refresh(db_lot)
    return db_lot


@router.put("/{lot_id}", response_model=LotResponse)
def update_lot(
    lot_id: int,
    lot: LotUpdate,
    db: Session = Depends(get_db_session)
):
    """
    ロット情報を更新
    
    Args:
        lot_id: ロットID
        lot: 更新データ
        db: データベースセッション
    
    Returns:
        LotResponse: 更新されたロット情報
    
    Raises:
        HTTPException: ロットが見つからない場合
    """
    db_lot = db.query(Lot).filter(Lot.id == lot_id).first()
    if not db_lot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ロットID {lot_id} が見つかりません"
        )
    
    # 更新データを適用
    update_data = lot.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_lot, key, value)
    
    db.commit()
    db.refresh(db_lot)
    return db_lot


@router.delete("/{lot_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_lot(
    lot_id: int,
    db: Session = Depends(get_db_session)
):
    """
    ロットを削除
    
    Args:
        lot_id: ロットID
        db: データベースセッション
    
    Raises:
        HTTPException: ロットが見つからない場合
    """
    db_lot = db.query(Lot).filter(Lot.id == lot_id).first()
    if not db_lot:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ロットID {lot_id} が見つかりません"
        )
    
    db.delete(db_lot)
    db.commit()
