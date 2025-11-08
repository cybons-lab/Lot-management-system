--
-- PostgreSQL database dump
--

\restrict zd2o84MOorMbH0WjZryYdfupogJ897HymmzHZh87hz7u7u5xZShXMQoxIY5wo5k

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: audit_write(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.audit_write() RETURNS trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
      v_op text;
      v_row jsonb;
      v_user text;
    BEGIN
      v_user := current_user;
      IF TG_OP = 'INSERT' THEN v_op := 'I'; v_row := to_jsonb(NEW);
      ELSIF TG_OP = 'UPDATE' THEN v_op := 'U'; v_row := to_jsonb(NEW);
      ELSE v_op := 'D'; v_row := to_jsonb(OLD);
      END IF;

      EXECUTE format('INSERT INTO %I.%I_history(op, changed_at, changed_by, row_data)
                      VALUES ($1, now(), $2, $3)', TG_TABLE_SCHEMA, TG_TABLE_NAME)
      USING v_op, v_user, v_row;

      RETURN COALESCE(NEW, OLD);
    END
    $_$;


--
-- Name: comment_on_column_if_exists(text, text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.comment_on_column_if_exists(sch text, tbl text, col text, comm text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  exists_col boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = sch AND table_name = tbl AND column_name = col
  ) INTO exists_col;

  IF exists_col THEN
    EXECUTE format('COMMENT ON COLUMN %I.%I.%I IS %L', sch, tbl, col, comm);
  END IF;
END$$;


--
-- Name: comment_on_table_if_exists(text, text, text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.comment_on_table_if_exists(sch text, tbl text, comm text) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF to_regclass(format('%I.%I', sch, tbl)) IS NOT NULL THEN
    EXECUTE format('COMMENT ON TABLE %I.%I IS %L', sch, tbl, comm);
  END IF;
END$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


--
-- Name: TABLE alembic_version; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.alembic_version IS 'Alembicの現在リビジョンを保持する内部管理テーブル';


--
-- Name: COLUMN alembic_version.version_num; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.alembic_version.version_num IS 'Alembic リビジョン番号（現在HEAD）';


--
-- Name: allocations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.allocations (
    id integer NOT NULL,
    order_line_id integer NOT NULL,
    lot_id integer NOT NULL,
    allocated_qty double precision NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    destination_id integer
);


--
-- Name: TABLE allocations; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.allocations IS '受注明細へのロット引当情報';


--
-- Name: COLUMN allocations.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.id IS '主キー（自動採番）';


--
-- Name: COLUMN allocations.order_line_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.order_line_id IS '受注明細ID（FK: order_lines.id）';


--
-- Name: COLUMN allocations.lot_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.lot_id IS 'ロットID（FK: lots.id）';


--
-- Name: COLUMN allocations.allocated_qty; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.allocated_qty IS '引当数量';


--
-- Name: COLUMN allocations.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.created_at IS 'レコード作成日時';


--
-- Name: COLUMN allocations.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN allocations.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.created_by IS '作成者';


--
-- Name: COLUMN allocations.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.updated_by IS '更新者';


--
-- Name: COLUMN allocations.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.deleted_at IS '論理削除日時';


--
-- Name: COLUMN allocations.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN allocations.destination_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.allocations.destination_id IS '納入場所ID（FK: delivery_places.id）';


--
-- Name: allocations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.allocations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: allocations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.allocations_id_seq OWNED BY public.allocations.id;


--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    customer_code text NOT NULL,
    customer_name text NOT NULL,
    address text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    id integer NOT NULL
);


--
-- Name: TABLE customers; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.customers IS '得意先マスタ';


--
-- Name: COLUMN customers.customer_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.customer_code IS '得意先コード（PK/UK）';


--
-- Name: COLUMN customers.customer_name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.customer_name IS '得意先名称';


--
-- Name: COLUMN customers.address; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.address IS '住所';


--
-- Name: COLUMN customers.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.created_at IS 'レコード作成日時';


--
-- Name: COLUMN customers.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN customers.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.created_by IS '作成者';


--
-- Name: COLUMN customers.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.updated_by IS '更新者';


--
-- Name: COLUMN customers.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.deleted_at IS '論理削除日時';


--
-- Name: COLUMN customers.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN customers.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.customers.id IS '主キー（自動採番）';


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- Name: delivery_places; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.delivery_places (
    id integer NOT NULL,
    delivery_place_code character varying NOT NULL,
    delivery_place_name character varying NOT NULL,
    address character varying,
    postal_code character varying,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL
);


--
-- Name: TABLE delivery_places; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.delivery_places IS '納入場所マスタ（配送先情報）';


--
-- Name: COLUMN delivery_places.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.id IS '主キー（自動採番）';


--
-- Name: COLUMN delivery_places.delivery_place_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.delivery_place_code IS '納入場所コード（UK）';


--
-- Name: COLUMN delivery_places.delivery_place_name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.delivery_place_name IS '納入場所名称';


--
-- Name: COLUMN delivery_places.address; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.address IS '住所';


--
-- Name: COLUMN delivery_places.postal_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.postal_code IS '郵便番号';


--
-- Name: COLUMN delivery_places.is_active; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.is_active IS '有効フラグ（1=有効,0=無効）';


--
-- Name: COLUMN delivery_places.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.created_at IS 'レコード作成日時';


--
-- Name: COLUMN delivery_places.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN delivery_places.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.created_by IS '作成者';


--
-- Name: COLUMN delivery_places.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.updated_by IS '更新者';


--
-- Name: COLUMN delivery_places.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.deleted_at IS '論理削除日時';


--
-- Name: COLUMN delivery_places.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.delivery_places.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: delivery_places_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.delivery_places_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: delivery_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.delivery_places_id_seq OWNED BY public.delivery_places.id;


--
-- Name: expiry_rules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expiry_rules (
    id integer NOT NULL,
    rule_type text NOT NULL,
    days integer,
    fixed_date date,
    is_active boolean DEFAULT true NOT NULL,
    priority integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    product_id integer,
    supplier_id integer
);


--
-- Name: TABLE expiry_rules; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.expiry_rules IS '有効期限ルール定義（製品/仕入先ごと）';


--
-- Name: COLUMN expiry_rules.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.id IS '主キー（自動採番）';


--
-- Name: COLUMN expiry_rules.rule_type; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.rule_type IS 'ルール種別（days/fixed_date）';


--
-- Name: COLUMN expiry_rules.days; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.days IS '有効日数（製造日から）';


--
-- Name: COLUMN expiry_rules.fixed_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.fixed_date IS '固定日付';


--
-- Name: COLUMN expiry_rules.is_active; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.is_active IS '有効フラグ';


--
-- Name: COLUMN expiry_rules.priority; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.priority IS '優先順位（小さいほど優先）';


--
-- Name: COLUMN expiry_rules.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.created_at IS 'レコード作成日時';


--
-- Name: COLUMN expiry_rules.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN expiry_rules.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.created_by IS '作成者';


--
-- Name: COLUMN expiry_rules.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.updated_by IS '更新者';


--
-- Name: COLUMN expiry_rules.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.deleted_at IS '論理削除日時';


--
-- Name: COLUMN expiry_rules.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN expiry_rules.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.product_id IS '製品ID（FK: products.id / NULL=全製品）';


--
-- Name: COLUMN expiry_rules.supplier_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.expiry_rules.supplier_id IS '仕入先ID（FK: suppliers.id / NULL=全仕入先）';


--
-- Name: expiry_rules_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.expiry_rules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: expiry_rules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.expiry_rules_id_seq OWNED BY public.expiry_rules.id;


--
-- Name: forecasts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forecasts (
    id integer NOT NULL,
    forecast_id character varying(36) NOT NULL,
    granularity character varying(16) NOT NULL,
    date_day date,
    date_dekad_start date,
    year_month character varying(7),
    qty_forecast integer NOT NULL,
    version_no integer NOT NULL,
    version_issued_at timestamp with time zone NOT NULL,
    source_system character varying(32) NOT NULL,
    is_active boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    product_id integer NOT NULL,
    customer_id integer NOT NULL,
    CONSTRAINT ck_forecast_granularity CHECK (((granularity)::text = ANY (ARRAY[('daily'::character varying)::text, ('dekad'::character varying)::text, ('monthly'::character varying)::text]))),
    CONSTRAINT ck_forecast_period_key_exclusivity CHECK (((((granularity)::text = 'daily'::text) AND (date_day IS NOT NULL) AND (date_dekad_start IS NULL) AND (year_month IS NULL)) OR (((granularity)::text = 'dekad'::text) AND (date_dekad_start IS NOT NULL) AND (date_day IS NULL) AND (year_month IS NULL)) OR (((granularity)::text = 'monthly'::text) AND (year_month IS NOT NULL) AND (date_day IS NULL) AND (date_dekad_start IS NULL)))),
    CONSTRAINT ck_forecast_qty_nonneg CHECK ((qty_forecast >= 0))
);


--
-- Name: TABLE forecasts; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.forecasts IS '需要予測（DELFOR等のEDI受信データ）';


--
-- Name: COLUMN forecasts.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.id IS '主キー（自動採番）';


--
-- Name: COLUMN forecasts.forecast_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.forecast_id IS '外部予測ID（一意）';


--
-- Name: COLUMN forecasts.granularity; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.granularity IS '粒度（daily/weekly/dekadなど）';


--
-- Name: COLUMN forecasts.date_day; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.date_day IS '日次キー（granularity=daily時）';


--
-- Name: COLUMN forecasts.date_dekad_start; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.date_dekad_start IS '旬開始日キー（granularity=dekad時）';


--
-- Name: COLUMN forecasts.year_month; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.year_month IS '月次キー（YYYY-MM, granularity=monthly時）';


--
-- Name: COLUMN forecasts.qty_forecast; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.qty_forecast IS '予測数量';


--
-- Name: COLUMN forecasts.version_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.version_no IS '版番号（同一期間内の差替管理）';


--
-- Name: COLUMN forecasts.version_issued_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.version_issued_at IS '版の発行日時（受信基準時刻）';


--
-- Name: COLUMN forecasts.source_system; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.source_system IS '受信元システム識別子';


--
-- Name: COLUMN forecasts.is_active; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.is_active IS '有効版フラグ';


--
-- Name: COLUMN forecasts.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.created_at IS 'レコード作成日時';


--
-- Name: COLUMN forecasts.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN forecasts.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.created_by IS '作成者';


--
-- Name: COLUMN forecasts.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.updated_by IS '更新者';


--
-- Name: COLUMN forecasts.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.deleted_at IS '論理削除日時';


--
-- Name: COLUMN forecasts.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN forecasts.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.product_id IS '製品ID/または製品コード';


--
-- Name: COLUMN forecasts.customer_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.forecasts.customer_id IS '得意先ID（FK: customers.*）/または得意先コード';


--
-- Name: forecast_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.forecast_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: forecast_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.forecast_id_seq OWNED BY public.forecasts.id;


--
-- Name: inbound_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.inbound_submissions (
    id integer NOT NULL,
    submission_id text,
    source_uri text,
    source character varying(20) DEFAULT 'ocr'::character varying NOT NULL,
    operator text,
    submission_date timestamp without time zone,
    status text,
    total_records integer,
    processed_records integer,
    failed_records integer,
    skipped_records integer,
    error_details text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    CONSTRAINT ck_inbound_submissions_source CHECK (((source)::text = ANY (ARRAY[('ocr'::character varying)::text, ('manual'::character varying)::text, ('edi'::character varying)::text])))
);


--
-- Name: TABLE inbound_submissions; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.inbound_submissions IS '外部入力の受信単位（OCR/EDI/手動等）のトラッキング';


--
-- Name: COLUMN inbound_submissions.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.id IS '主キー（自動採番）';


--
-- Name: COLUMN inbound_submissions.submission_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.submission_id IS '受信側の一意識別子（重複防止）';


--
-- Name: COLUMN inbound_submissions.source_uri; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.source_uri IS '受信ソースURI（ファイル名/パス/URL等）';


--
-- Name: COLUMN inbound_submissions.source; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.source IS '入力経路（ocr/manual/edi等）';


--
-- Name: COLUMN inbound_submissions.operator; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.operator IS '操作者（ユーザーIDまたはロボ名）';


--
-- Name: COLUMN inbound_submissions.submission_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.submission_date IS '受信日時';


--
-- Name: COLUMN inbound_submissions.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.status IS '処理状態（pending/success/failed等）';


--
-- Name: COLUMN inbound_submissions.total_records; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.total_records IS '受信レコード総数';


--
-- Name: COLUMN inbound_submissions.processed_records; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.processed_records IS '処理済み件数';


--
-- Name: COLUMN inbound_submissions.failed_records; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.failed_records IS '失敗件数';


--
-- Name: COLUMN inbound_submissions.skipped_records; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.skipped_records IS 'スキップ件数';


--
-- Name: COLUMN inbound_submissions.error_details; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.error_details IS 'エラー詳細（テキスト/JSON可）';


--
-- Name: COLUMN inbound_submissions.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.created_at IS 'レコード作成日時';


--
-- Name: COLUMN inbound_submissions.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN inbound_submissions.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.created_by IS '作成者';


--
-- Name: COLUMN inbound_submissions.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.updated_by IS '更新者';


--
-- Name: COLUMN inbound_submissions.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.deleted_at IS '論理削除日時';


--
-- Name: COLUMN inbound_submissions.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.inbound_submissions.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: lot_current_stock; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lot_current_stock (
    lot_id integer NOT NULL,
    current_quantity double precision NOT NULL,
    last_updated timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL
);


--
-- Name: TABLE lot_current_stock; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.lot_current_stock IS 'ロット別現在庫数（1ロット=1行の集計値）';


--
-- Name: COLUMN lot_current_stock.lot_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.lot_id IS 'ロットID（PK/FK: lots.id）';


--
-- Name: COLUMN lot_current_stock.current_quantity; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.current_quantity IS '現在庫数量（入庫-出庫-引当の計算結果）';


--
-- Name: COLUMN lot_current_stock.last_updated; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.last_updated IS '最終更新日時';


--
-- Name: COLUMN lot_current_stock.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.created_at IS 'レコード作成日時';


--
-- Name: COLUMN lot_current_stock.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN lot_current_stock.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.created_by IS '作成者';


--
-- Name: COLUMN lot_current_stock.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.updated_by IS '更新者';


--
-- Name: COLUMN lot_current_stock.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.deleted_at IS '論理削除日時';


--
-- Name: COLUMN lot_current_stock.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lot_current_stock.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: lots; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lots (
    id integer NOT NULL,
    lot_number text NOT NULL,
    receipt_date date NOT NULL,
    mfg_date date,
    expiry_date date,
    kanban_class text,
    sales_unit text,
    inventory_unit text,
    received_by text,
    source_doc text,
    qc_certificate_status text,
    qc_certificate_file text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    warehouse_code_old text,
    lot_unit character varying(10),
    is_locked boolean DEFAULT false NOT NULL,
    lock_reason text,
    inspection_date date,
    inspection_result text,
    warehouse_id integer,
    product_id integer,
    supplier_id integer
);


--
-- Name: TABLE lots; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.lots IS 'ロットマスタ（入庫実績由来のトレーサビリティ情報）';


--
-- Name: COLUMN lots.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.id IS '主キー（自動採番）';


--
-- Name: COLUMN lots.lot_number; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.lot_number IS 'ロット番号（手動/外部入力）';


--
-- Name: COLUMN lots.receipt_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.receipt_date IS '入庫日';


--
-- Name: COLUMN lots.mfg_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.mfg_date IS '製造日';


--
-- Name: COLUMN lots.expiry_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.expiry_date IS '有効期限';


--
-- Name: COLUMN lots.kanban_class; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.kanban_class IS 'かんばん区分';


--
-- Name: COLUMN lots.received_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.received_by IS '入庫担当者';


--
-- Name: COLUMN lots.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.created_at IS 'レコード作成日時';


--
-- Name: COLUMN lots.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN lots.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.created_by IS '作成者';


--
-- Name: COLUMN lots.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.updated_by IS '更新者';


--
-- Name: COLUMN lots.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.deleted_at IS '論理削除日時';


--
-- Name: COLUMN lots.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN lots.warehouse_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.warehouse_id IS '保管倉庫ID（FK: warehouses.id）';


--
-- Name: COLUMN lots.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.product_id IS '製品ID（FK: products.id）';


--
-- Name: COLUMN lots.supplier_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.lots.supplier_id IS '仕入先ID（FK: suppliers.id）';


--
-- Name: lots_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lots_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lots_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lots_id_seq OWNED BY public.lots.id;


--
-- Name: ocr_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ocr_submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ocr_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ocr_submissions_id_seq OWNED BY public.inbound_submissions.id;


--
-- Name: order_line_warehouse_allocation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_line_warehouse_allocation (
    id integer NOT NULL,
    order_line_id integer NOT NULL,
    warehouse_id integer NOT NULL,
    quantity numeric(15,4) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    CONSTRAINT ck_olwa_quantity_positive CHECK (((quantity)::double precision > (0)::double precision))
);


--
-- Name: TABLE order_line_warehouse_allocation; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.order_line_warehouse_allocation IS '受注明細×倉庫の引当（複数倉庫対応中間）';


--
-- Name: COLUMN order_line_warehouse_allocation.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.id IS '主キー（自動採番）';


--
-- Name: COLUMN order_line_warehouse_allocation.order_line_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.order_line_id IS '受注明細ID（FK: order_lines.id）';


--
-- Name: COLUMN order_line_warehouse_allocation.warehouse_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.warehouse_id IS '倉庫ID（FK: warehouses.id）';


--
-- Name: COLUMN order_line_warehouse_allocation.quantity; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.quantity IS '倉庫別引当数量';


--
-- Name: COLUMN order_line_warehouse_allocation.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.created_at IS 'レコード作成日時';


--
-- Name: COLUMN order_line_warehouse_allocation.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN order_line_warehouse_allocation.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.created_by IS '作成者';


--
-- Name: COLUMN order_line_warehouse_allocation.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.updated_by IS '更新者';


--
-- Name: COLUMN order_line_warehouse_allocation.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.deleted_at IS '論理削除日時';


--
-- Name: COLUMN order_line_warehouse_allocation.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_line_warehouse_allocation.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: order_line_warehouse_allocation_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_line_warehouse_allocation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_line_warehouse_allocation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_line_warehouse_allocation_id_seq OWNED BY public.order_line_warehouse_allocation.id;


--
-- Name: order_lines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.order_lines (
    id integer NOT NULL,
    order_id integer NOT NULL,
    line_no integer NOT NULL,
    quantity numeric(15,4) NOT NULL,
    unit text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    product_id integer
);


--
-- Name: TABLE order_lines; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.order_lines IS '受注明細';


--
-- Name: COLUMN order_lines.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.id IS '主キー（自動採番）';


--
-- Name: COLUMN order_lines.order_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.order_id IS '受注ID（FK: orders.id）';


--
-- Name: COLUMN order_lines.line_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.line_no IS '明細行番号';


--
-- Name: COLUMN order_lines.quantity; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.quantity IS '受注数量';


--
-- Name: COLUMN order_lines.unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.unit IS '単位';


--
-- Name: COLUMN order_lines.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.created_at IS 'レコード作成日時';


--
-- Name: COLUMN order_lines.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN order_lines.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.created_by IS '作成者';


--
-- Name: COLUMN order_lines.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.updated_by IS '更新者';


--
-- Name: COLUMN order_lines.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.deleted_at IS '論理削除日時';


--
-- Name: COLUMN order_lines.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN order_lines.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.order_lines.product_id IS '製品ID（将来変更用：FK想定）';


--
-- Name: order_lines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.order_lines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: order_lines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.order_lines_id_seq OWNED BY public.order_lines.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    order_no text NOT NULL,
    order_date date NOT NULL,
    status text NOT NULL,
    sap_order_id text,
    sap_status text,
    sap_sent_at timestamp without time zone,
    sap_error_msg text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    customer_order_no text,
    delivery_mode text,
    customer_id integer,
    customer_order_no_last6 character varying(6) GENERATED ALWAYS AS ("right"(customer_order_no, 6)) STORED,
    CONSTRAINT ck_orders_delivery_mode CHECK (((delivery_mode IS NULL) OR (delivery_mode = ANY (ARRAY['normal'::text, 'express'::text, 'pickup'::text])))),
    CONSTRAINT ck_orders_status CHECK ((status = ANY (ARRAY['draft'::text, 'confirmed'::text, 'shipped'::text, 'closed'::text])))
);


--
-- Name: TABLE orders; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.orders IS '受注ヘッダ';


--
-- Name: COLUMN orders.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.id IS '主キー（自動採番）';


--
-- Name: COLUMN orders.order_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.order_no IS '受注番号（外部連携ID等）';


--
-- Name: COLUMN orders.order_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.order_date IS '受注日';


--
-- Name: COLUMN orders.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.status IS '受注ステータス';


--
-- Name: COLUMN orders.sap_order_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.sap_order_id IS 'SAP側受注番号（登録後）';


--
-- Name: COLUMN orders.sap_status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.sap_status IS 'SAP連携状態';


--
-- Name: COLUMN orders.sap_sent_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.sap_sent_at IS 'SAP送信日時';


--
-- Name: COLUMN orders.sap_error_msg; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.sap_error_msg IS 'SAP連携エラー内容';


--
-- Name: COLUMN orders.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.created_at IS 'レコード作成日時';


--
-- Name: COLUMN orders.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN orders.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.created_by IS '作成者';


--
-- Name: COLUMN orders.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.updated_by IS '更新者';


--
-- Name: COLUMN orders.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.deleted_at IS '論理削除日時';


--
-- Name: COLUMN orders.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN orders.customer_order_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.customer_order_no IS '先方注文番号（原票）';


--
-- Name: COLUMN orders.customer_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.orders.customer_id IS '得意先ID（FK: customers.id）';


--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    product_code text NOT NULL,
    product_name text NOT NULL,
    customer_part_no text,
    maker_item_code text,
    internal_unit text NOT NULL,
    assemble_div text,
    next_div text,
    shelf_life_days integer,
    requires_lot_number integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    base_unit character varying(10) DEFAULT 'EA'::character varying NOT NULL,
    packaging_qty numeric(10,2) DEFAULT '1'::numeric NOT NULL,
    packaging_unit character varying(20) DEFAULT 'EA'::character varying NOT NULL,
    supplier_item_code character varying,
    delivery_place_id integer,
    ji_ku_text character varying,
    kumitsuke_ku_text character varying,
    delivery_place_name character varying,
    shipping_warehouse_name character varying,
    id integer NOT NULL,
    supplier_id integer
);


--
-- Name: TABLE products; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.products IS '商品マスタ';


--
-- Name: COLUMN products.product_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.product_code IS '製品コード（社内品番, PK/UK）';


--
-- Name: COLUMN products.product_name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.product_name IS '製品名称';


--
-- Name: COLUMN products.customer_part_no; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.customer_part_no IS '先方品番（得意先側品番）';


--
-- Name: COLUMN products.maker_item_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.maker_item_code IS 'メーカー品番（製造元品番）';


--
-- Name: COLUMN products.internal_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.internal_unit IS '内部管理単位（在庫基準単位）';


--
-- Name: COLUMN products.assemble_div; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.assemble_div IS '組立区分（将来拡張）';


--
-- Name: COLUMN products.next_div; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.next_div IS 'NEXT区分（得意先出荷時の区分、必要に応じ使用）';


--
-- Name: COLUMN products.shelf_life_days; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.shelf_life_days IS '想定賞味/有効日数';


--
-- Name: COLUMN products.requires_lot_number; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.requires_lot_number IS 'ロット必須フラグ（0/1）';


--
-- Name: COLUMN products.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.created_at IS 'レコード作成日時';


--
-- Name: COLUMN products.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN products.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.created_by IS '作成者';


--
-- Name: COLUMN products.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.updated_by IS '更新者';


--
-- Name: COLUMN products.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.deleted_at IS '論理削除日時';


--
-- Name: COLUMN products.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN products.base_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.base_unit IS '基本単位（例: EA）';


--
-- Name: COLUMN products.packaging_qty; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.packaging_qty IS '包装数量（1箱あたり数量等）';


--
-- Name: COLUMN products.packaging_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.packaging_unit IS '包装単位';


--
-- Name: COLUMN products.supplier_item_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.supplier_item_code IS '仕入先側の品番';


--
-- Name: COLUMN products.delivery_place_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.delivery_place_id IS 'デフォルト納入場所ID（FK: delivery_places.id）';


--
-- Name: COLUMN products.ji_ku_text; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.ji_ku_text IS '事業区分テキスト（任意メタ）';


--
-- Name: COLUMN products.kumitsuke_ku_text; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.kumitsuke_ku_text IS '組付区分テキスト（任意メタ）';


--
-- Name: COLUMN products.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.id IS '主キー（自動採番）';


--
-- Name: COLUMN products.supplier_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.products.supplier_id IS '主要仕入先ID（FK: suppliers.id）';


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: purchase_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.purchase_requests (
    id integer NOT NULL,
    requested_qty double precision NOT NULL,
    unit text,
    reason_code text NOT NULL,
    src_order_line_id integer,
    requested_date date,
    desired_receipt_date date,
    status text,
    sap_po_id text,
    notes text,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    product_id integer,
    supplier_id integer
);


--
-- Name: TABLE purchase_requests; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.purchase_requests IS '購買依頼（補充や手配の内部起票）';


--
-- Name: COLUMN purchase_requests.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.id IS '主キー（自動採番）';


--
-- Name: COLUMN purchase_requests.requested_qty; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.requested_qty IS '依頼数量';


--
-- Name: COLUMN purchase_requests.unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.unit IS '単位';


--
-- Name: COLUMN purchase_requests.reason_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.reason_code IS '依頼理由コード';


--
-- Name: COLUMN purchase_requests.src_order_line_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.src_order_line_id IS '起点受注明細ID（FK: order_lines.id）';


--
-- Name: COLUMN purchase_requests.requested_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.requested_date IS '依頼日';


--
-- Name: COLUMN purchase_requests.desired_receipt_date; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.desired_receipt_date IS '希望入庫日';


--
-- Name: COLUMN purchase_requests.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.status IS '状態';


--
-- Name: COLUMN purchase_requests.sap_po_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.sap_po_id IS 'SAP発注番号（連携後）';


--
-- Name: COLUMN purchase_requests.notes; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.notes IS '備考';


--
-- Name: COLUMN purchase_requests.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.created_at IS 'レコード作成日時';


--
-- Name: COLUMN purchase_requests.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN purchase_requests.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.created_by IS '作成者';


--
-- Name: COLUMN purchase_requests.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.updated_by IS '更新者';


--
-- Name: COLUMN purchase_requests.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.deleted_at IS '論理削除日時';


--
-- Name: COLUMN purchase_requests.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN purchase_requests.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.product_id IS '製品ID（FK: products.id）';


--
-- Name: COLUMN purchase_requests.supplier_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.purchase_requests.supplier_id IS '仕入先ID（FK: suppliers.id）';


--
-- Name: purchase_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.purchase_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: purchase_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.purchase_requests_id_seq OWNED BY public.purchase_requests.id;


--
-- Name: sap_sync_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sap_sync_logs (
    id integer NOT NULL,
    order_id integer,
    payload text,
    result text,
    status text,
    executed_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL
);


--
-- Name: TABLE sap_sync_logs; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.sap_sync_logs IS 'SAP連携の実行ログ（送信ペイロードと結果）';


--
-- Name: COLUMN sap_sync_logs.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.id IS '主キー（自動採番）';


--
-- Name: COLUMN sap_sync_logs.order_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.order_id IS '対象受注ID（FK: orders.id）';


--
-- Name: COLUMN sap_sync_logs.payload; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.payload IS '送信ペイロード（JSON文字列）';


--
-- Name: COLUMN sap_sync_logs.result; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.result IS '応答内容（JSON文字列）';


--
-- Name: COLUMN sap_sync_logs.status; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.status IS '連携状態（pending/success/failed/retry等）';


--
-- Name: COLUMN sap_sync_logs.executed_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.executed_at IS '連携実行日時';


--
-- Name: COLUMN sap_sync_logs.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.created_at IS 'レコード作成日時';


--
-- Name: COLUMN sap_sync_logs.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN sap_sync_logs.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.created_by IS '作成者';


--
-- Name: COLUMN sap_sync_logs.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.updated_by IS '更新者';


--
-- Name: COLUMN sap_sync_logs.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.deleted_at IS '論理削除日時';


--
-- Name: COLUMN sap_sync_logs.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.sap_sync_logs.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: sap_sync_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sap_sync_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sap_sync_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sap_sync_logs_id_seq OWNED BY public.sap_sync_logs.id;


--
-- Name: stock_movements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.stock_movements (
    id integer NOT NULL,
    lot_id integer,
    reason text NOT NULL,
    quantity_delta numeric(15,4) NOT NULL,
    occurred_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    warehouse_id integer NOT NULL,
    source_table character varying(50),
    source_id integer,
    batch_id character varying(100),
    product_id integer NOT NULL
);


--
-- Name: TABLE stock_movements; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.stock_movements IS '在庫移動履歴（入出庫/移動/調整/廃棄）';


--
-- Name: COLUMN stock_movements.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.id IS '主キー（自動採番）';


--
-- Name: COLUMN stock_movements.lot_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.lot_id IS 'ロットID（FK: lots.id）';


--
-- Name: COLUMN stock_movements.reason; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.reason IS '移動理由（inbound/outbound/transfer/adjustment/scrap）';


--
-- Name: COLUMN stock_movements.quantity_delta; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.quantity_delta IS '数量増減（正=入庫、負=出庫）';


--
-- Name: COLUMN stock_movements.occurred_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.occurred_at IS '発生日時';


--
-- Name: COLUMN stock_movements.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.created_at IS 'レコード作成日時';


--
-- Name: COLUMN stock_movements.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN stock_movements.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.created_by IS '作成者';


--
-- Name: COLUMN stock_movements.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.updated_by IS '更新者';


--
-- Name: COLUMN stock_movements.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.deleted_at IS '論理削除日時';


--
-- Name: COLUMN stock_movements.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN stock_movements.warehouse_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.warehouse_id IS '倉庫ID（FK: warehouses.id）';


--
-- Name: COLUMN stock_movements.source_table; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.source_table IS '参照元テーブル名（追跡用）';


--
-- Name: COLUMN stock_movements.source_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.source_id IS '参照元レコードID（追跡用）';


--
-- Name: COLUMN stock_movements.batch_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.batch_id IS 'バッチ処理単位の識別子';


--
-- Name: COLUMN stock_movements.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.stock_movements.product_id IS '製品ID（FK候補：products.product_code/id）';


--
-- Name: stock_movements_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.stock_movements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: stock_movements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.stock_movements_id_seq OWNED BY public.stock_movements.id;


--
-- Name: suppliers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.suppliers (
    supplier_code text NOT NULL,
    supplier_name text NOT NULL,
    address text,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    id integer NOT NULL
);


--
-- Name: TABLE suppliers; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.suppliers IS '仕入先マスタ';


--
-- Name: COLUMN suppliers.supplier_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.supplier_code IS '仕入先コード（PK/UK）';


--
-- Name: COLUMN suppliers.supplier_name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.supplier_name IS '仕入先名称';


--
-- Name: COLUMN suppliers.address; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.address IS '住所';


--
-- Name: COLUMN suppliers.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.created_at IS 'レコード作成日時';


--
-- Name: COLUMN suppliers.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN suppliers.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.created_by IS '作成者';


--
-- Name: COLUMN suppliers.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.updated_by IS '更新者';


--
-- Name: COLUMN suppliers.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.deleted_at IS '論理削除日時';


--
-- Name: COLUMN suppliers.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN suppliers.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.suppliers.id IS '主キー（自動採番）';


--
-- Name: suppliers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.suppliers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: suppliers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.suppliers_id_seq OWNED BY public.suppliers.id;


--
-- Name: unit_conversions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.unit_conversions (
    id integer NOT NULL,
    from_unit character varying(10) NOT NULL,
    to_unit character varying(10) NOT NULL,
    factor numeric(10,4) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    product_id integer NOT NULL
);


--
-- Name: TABLE unit_conversions; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.unit_conversions IS '単位換算マスタ（入出力単位 ⇔ 内部単位）';


--
-- Name: COLUMN unit_conversions.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.id IS '主キー（自動採番）';


--
-- Name: COLUMN unit_conversions.from_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.from_unit IS '変換元単位';


--
-- Name: COLUMN unit_conversions.to_unit; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.to_unit IS '変換先単位';


--
-- Name: COLUMN unit_conversions.factor; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.factor IS '換算係数（1 from_unit = factor to_unit）';


--
-- Name: COLUMN unit_conversions.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.created_at IS 'レコード作成日時';


--
-- Name: COLUMN unit_conversions.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN unit_conversions.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.created_by IS '作成者';


--
-- Name: COLUMN unit_conversions.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.updated_by IS '更新者';


--
-- Name: COLUMN unit_conversions.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.deleted_at IS '論理削除日時';


--
-- Name: COLUMN unit_conversions.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN unit_conversions.product_id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.unit_conversions.product_id IS '製品ID（FK: products.id / NULL=グローバル定義）';


--
-- Name: unit_conversions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.unit_conversions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: unit_conversions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.unit_conversions_id_seq OWNED BY public.unit_conversions.id;


--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.warehouses (
    warehouse_code text NOT NULL,
    warehouse_name text NOT NULL,
    address text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    created_by character varying(50),
    updated_by character varying(50),
    deleted_at timestamp without time zone,
    revision integer DEFAULT 1 NOT NULL,
    id integer NOT NULL
);


--
-- Name: TABLE warehouses; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.warehouses IS '倉庫マスタ（保管拠点）';


--
-- Name: COLUMN warehouses.warehouse_code; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.warehouse_code IS '倉庫コード（UK）';


--
-- Name: COLUMN warehouses.warehouse_name; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.warehouse_name IS '倉庫名称';


--
-- Name: COLUMN warehouses.address; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.address IS '住所';


--
-- Name: COLUMN warehouses.is_active; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.is_active IS '有効フラグ（1=有効,0=無効）';


--
-- Name: COLUMN warehouses.created_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.created_at IS 'レコード作成日時';


--
-- Name: COLUMN warehouses.updated_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.updated_at IS 'レコード更新日時';


--
-- Name: COLUMN warehouses.created_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.created_by IS '作成者';


--
-- Name: COLUMN warehouses.updated_by; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.updated_by IS '更新者';


--
-- Name: COLUMN warehouses.deleted_at; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.deleted_at IS '論理削除日時';


--
-- Name: COLUMN warehouses.revision; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.revision IS '楽観的ロック用リビジョン番号';


--
-- Name: COLUMN warehouses.id; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.warehouses.id IS '主キー（自動採番）';


--
-- Name: warehouses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.warehouses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: warehouses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.warehouses_id_seq OWNED BY public.warehouses.id;


--
-- Name: allocations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations ALTER COLUMN id SET DEFAULT nextval('public.allocations_id_seq'::regclass);


--
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- Name: delivery_places id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_places ALTER COLUMN id SET DEFAULT nextval('public.delivery_places_id_seq'::regclass);


--
-- Name: expiry_rules id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expiry_rules ALTER COLUMN id SET DEFAULT nextval('public.expiry_rules_id_seq'::regclass);


--
-- Name: forecasts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forecasts ALTER COLUMN id SET DEFAULT nextval('public.forecast_id_seq'::regclass);


--
-- Name: inbound_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inbound_submissions ALTER COLUMN id SET DEFAULT nextval('public.ocr_submissions_id_seq'::regclass);


--
-- Name: lots id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots ALTER COLUMN id SET DEFAULT nextval('public.lots_id_seq'::regclass);


--
-- Name: order_line_warehouse_allocation id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_line_warehouse_allocation ALTER COLUMN id SET DEFAULT nextval('public.order_line_warehouse_allocation_id_seq'::regclass);


--
-- Name: order_lines id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_lines ALTER COLUMN id SET DEFAULT nextval('public.order_lines_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: purchase_requests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_requests ALTER COLUMN id SET DEFAULT nextval('public.purchase_requests_id_seq'::regclass);


--
-- Name: sap_sync_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sap_sync_logs ALTER COLUMN id SET DEFAULT nextval('public.sap_sync_logs_id_seq'::regclass);


--
-- Name: stock_movements id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_movements ALTER COLUMN id SET DEFAULT nextval('public.stock_movements_id_seq'::regclass);


--
-- Name: suppliers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN id SET DEFAULT nextval('public.suppliers_id_seq'::regclass);


--
-- Name: unit_conversions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_conversions ALTER COLUMN id SET DEFAULT nextval('public.unit_conversions_id_seq'::regclass);


--
-- Name: warehouses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.warehouses ALTER COLUMN id SET DEFAULT nextval('public.warehouses_id_seq'::regclass);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: allocations allocations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT allocations_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: delivery_places delivery_places_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_places
    ADD CONSTRAINT delivery_places_pkey PRIMARY KEY (id);


--
-- Name: expiry_rules expiry_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expiry_rules
    ADD CONSTRAINT expiry_rules_pkey PRIMARY KEY (id);


--
-- Name: forecasts forecast_forecast_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forecasts
    ADD CONSTRAINT forecast_forecast_id_key UNIQUE (forecast_id);


--
-- Name: forecasts forecast_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forecasts
    ADD CONSTRAINT forecast_pkey PRIMARY KEY (id);


--
-- Name: lot_current_stock lot_current_stock_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lot_current_stock
    ADD CONSTRAINT lot_current_stock_pkey PRIMARY KEY (lot_id);


--
-- Name: lots lots_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT lots_pkey PRIMARY KEY (id);


--
-- Name: inbound_submissions ocr_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inbound_submissions
    ADD CONSTRAINT ocr_submissions_pkey PRIMARY KEY (id);


--
-- Name: inbound_submissions ocr_submissions_submission_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.inbound_submissions
    ADD CONSTRAINT ocr_submissions_submission_id_key UNIQUE (submission_id);


--
-- Name: order_line_warehouse_allocation order_line_warehouse_allocation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_line_warehouse_allocation
    ADD CONSTRAINT order_line_warehouse_allocation_pkey PRIMARY KEY (id);


--
-- Name: order_lines order_lines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_lines
    ADD CONSTRAINT order_lines_pkey PRIMARY KEY (id);


--
-- Name: orders orders_order_no_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_order_no_key UNIQUE (order_no);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- Name: purchase_requests purchase_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_requests
    ADD CONSTRAINT purchase_requests_pkey PRIMARY KEY (id);


--
-- Name: sap_sync_logs sap_sync_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sap_sync_logs
    ADD CONSTRAINT sap_sync_logs_pkey PRIMARY KEY (id);


--
-- Name: stock_movements stock_movements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_pkey PRIMARY KEY (id);


--
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (id);


--
-- Name: unit_conversions unit_conversions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_conversions
    ADD CONSTRAINT unit_conversions_pkey PRIMARY KEY (id);


--
-- Name: customers uq_customers_customer_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT uq_customers_customer_code UNIQUE (customer_code);


--
-- Name: delivery_places uq_delivery_places_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.delivery_places
    ADD CONSTRAINT uq_delivery_places_code UNIQUE (delivery_place_code);


--
-- Name: order_lines uq_order_line; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_lines
    ADD CONSTRAINT uq_order_line UNIQUE (order_id, line_no);


--
-- Name: order_line_warehouse_allocation uq_order_line_warehouse; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_line_warehouse_allocation
    ADD CONSTRAINT uq_order_line_warehouse UNIQUE (order_line_id, warehouse_id);


--
-- Name: unit_conversions uq_product_units; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_conversions
    ADD CONSTRAINT uq_product_units UNIQUE (product_id, from_unit, to_unit);


--
-- Name: products uq_products_product_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT uq_products_product_code UNIQUE (product_code);


--
-- Name: suppliers uq_suppliers_supplier_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT uq_suppliers_supplier_code UNIQUE (supplier_code);


--
-- Name: warehouses uq_warehouses_warehouse_code; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT uq_warehouses_warehouse_code UNIQUE (warehouse_code);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (id);


--
-- Name: idx_stock_movements_occurred_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stock_movements_occurred_at ON public.stock_movements USING btree (occurred_at);


--
-- Name: idx_stock_movements_product_warehouse; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_stock_movements_product_warehouse ON public.stock_movements USING btree (product_id, warehouse_id);


--
-- Name: ix_alloc_lot; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_alloc_lot ON public.allocations USING btree (lot_id);


--
-- Name: ix_alloc_ol; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_alloc_ol ON public.allocations USING btree (order_line_id);


--
-- Name: ix_customers_customer_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_customers_customer_code ON public.customers USING btree (customer_code);


--
-- Name: ix_delivery_places_delivery_place_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_delivery_places_delivery_place_code ON public.delivery_places USING btree (delivery_place_code);


--
-- Name: ix_lots_warehouse_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_lots_warehouse_id ON public.lots USING btree (warehouse_id);


--
-- Name: ix_orders_customer_id_order_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_orders_customer_id_order_date ON public.orders USING btree (customer_id, order_date);


--
-- Name: ix_products_product_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_products_product_code ON public.products USING btree (product_code);


--
-- Name: ix_stock_movements_lot; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_stock_movements_lot ON public.stock_movements USING btree (lot_id);


--
-- Name: ix_suppliers_supplier_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX ix_suppliers_supplier_code ON public.suppliers USING btree (supplier_code);


--
-- Name: uq_orders_customer_order_no_per_customer; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_orders_customer_order_no_per_customer ON public.orders USING btree (customer_id, customer_order_no) WHERE (customer_order_no IS NOT NULL);


--
-- Name: uq_warehouses_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX uq_warehouses_id ON public.warehouses USING btree (id);


--
-- Name: allocations allocations_audit_del; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER allocations_audit_del AFTER DELETE ON public.allocations FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: allocations allocations_audit_ins; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER allocations_audit_ins AFTER INSERT ON public.allocations FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: allocations allocations_audit_upd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER allocations_audit_upd AFTER UPDATE ON public.allocations FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: lots lots_audit_del; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER lots_audit_del AFTER DELETE ON public.lots FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: lots lots_audit_ins; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER lots_audit_ins AFTER INSERT ON public.lots FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: lots lots_audit_upd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER lots_audit_upd AFTER UPDATE ON public.lots FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: order_lines order_lines_audit_del; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER order_lines_audit_del AFTER DELETE ON public.order_lines FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: order_lines order_lines_audit_ins; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER order_lines_audit_ins AFTER INSERT ON public.order_lines FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: order_lines order_lines_audit_upd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER order_lines_audit_upd AFTER UPDATE ON public.order_lines FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: orders orders_audit_del; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER orders_audit_del AFTER DELETE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: orders orders_audit_ins; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER orders_audit_ins AFTER INSERT ON public.orders FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: orders orders_audit_upd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER orders_audit_upd AFTER UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: products products_audit_del; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER products_audit_del AFTER DELETE ON public.products FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: products products_audit_ins; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER products_audit_ins AFTER INSERT ON public.products FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: products products_audit_upd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER products_audit_upd AFTER UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: warehouses warehouses_audit_del; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER warehouses_audit_del AFTER DELETE ON public.warehouses FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: warehouses warehouses_audit_ins; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER warehouses_audit_ins AFTER INSERT ON public.warehouses FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: warehouses warehouses_audit_upd; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER warehouses_audit_upd AFTER UPDATE ON public.warehouses FOR EACH ROW EXECUTE FUNCTION public.audit_write();


--
-- Name: allocations allocations_lot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT allocations_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES public.lots(id) ON DELETE CASCADE;


--
-- Name: allocations allocations_order_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT allocations_order_line_id_fkey FOREIGN KEY (order_line_id) REFERENCES public.order_lines(id) ON DELETE CASCADE;


--
-- Name: allocations fk_allocations_destination; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.allocations
    ADD CONSTRAINT fk_allocations_destination FOREIGN KEY (destination_id) REFERENCES public.delivery_places(id);


--
-- Name: expiry_rules fk_expiry_rules_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expiry_rules
    ADD CONSTRAINT fk_expiry_rules_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;


--
-- Name: expiry_rules fk_expiry_rules_supplier; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expiry_rules
    ADD CONSTRAINT fk_expiry_rules_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE SET NULL;


--
-- Name: forecasts fk_forecasts_customer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forecasts
    ADD CONSTRAINT fk_forecasts_customer FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE RESTRICT;


--
-- Name: forecasts fk_forecasts_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forecasts
    ADD CONSTRAINT fk_forecasts_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;


--
-- Name: lots fk_lots_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT fk_lots_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;


--
-- Name: lots fk_lots_supplier; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT fk_lots_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE RESTRICT;


--
-- Name: lots fk_lots_warehouse_id__warehouses_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lots
    ADD CONSTRAINT fk_lots_warehouse_id__warehouses_id FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id) ON DELETE RESTRICT;


--
-- Name: order_lines fk_order_lines_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_lines
    ADD CONSTRAINT fk_order_lines_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;


--
-- Name: orders fk_orders_customer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES public.customers(id) ON DELETE RESTRICT;


--
-- Name: products fk_products_delivery_place; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_delivery_place FOREIGN KEY (delivery_place_id) REFERENCES public.delivery_places(id);


--
-- Name: products fk_products_supplier; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_products_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE RESTRICT;


--
-- Name: purchase_requests fk_purchase_requests_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_requests
    ADD CONSTRAINT fk_purchase_requests_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;


--
-- Name: purchase_requests fk_purchase_requests_supplier; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_requests
    ADD CONSTRAINT fk_purchase_requests_supplier FOREIGN KEY (supplier_id) REFERENCES public.suppliers(id) ON DELETE RESTRICT;


--
-- Name: stock_movements fk_stock_movements_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT fk_stock_movements_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;


--
-- Name: unit_conversions fk_unit_conversions_product; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.unit_conversions
    ADD CONSTRAINT fk_unit_conversions_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: lot_current_stock lot_current_stock_lot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lot_current_stock
    ADD CONSTRAINT lot_current_stock_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES public.lots(id) ON DELETE CASCADE;


--
-- Name: order_line_warehouse_allocation order_line_warehouse_allocation_order_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_line_warehouse_allocation
    ADD CONSTRAINT order_line_warehouse_allocation_order_line_id_fkey FOREIGN KEY (order_line_id) REFERENCES public.order_lines(id);


--
-- Name: order_lines order_lines_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.order_lines
    ADD CONSTRAINT order_lines_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: purchase_requests purchase_requests_src_order_line_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.purchase_requests
    ADD CONSTRAINT purchase_requests_src_order_line_id_fkey FOREIGN KEY (src_order_line_id) REFERENCES public.order_lines(id);


--
-- Name: sap_sync_logs sap_sync_logs_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sap_sync_logs
    ADD CONSTRAINT sap_sync_logs_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: stock_movements stock_movements_lot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_lot_id_fkey FOREIGN KEY (lot_id) REFERENCES public.lots(id) ON DELETE CASCADE;


--
-- Name: stock_movements stock_movements_warehouse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.stock_movements
    ADD CONSTRAINT stock_movements_warehouse_id_fkey FOREIGN KEY (warehouse_id) REFERENCES public.warehouses(id) ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict zd2o84MOorMbH0WjZryYdfupogJ897HymmzHZh87hz7u7u5xZShXMQoxIY5wo5k

