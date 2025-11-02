# backend/alembic/env.py
# (UnicodeDecodeErrorを避けるため、コメントも含めASCII文字のみで構成)
from __future__ import annotations

from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

# alembic.ini の設定を読み込みます
config = context.config

# ログ設定
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# autogenerate(自動検出)を使わない手書きマイグレーションの場合、
# target_metadata は None のままで問題ありません。
target_metadata = None


def run_migrations_offline() -> None:
    """Offline mode (for generating SQL scripts)"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Online mode (to apply changes to the DB)"""
    # alembic.ini の [alembic] セクションから接続情報を取得
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",  # 'sqlalchemy.url' などを読み込む
        poolclass=pool.NullPool,
        future=True,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()


# 実行
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
