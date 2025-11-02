import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Search, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default function OrdersListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState<string>('all');
  const [customerCode, setCustomerCode] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const { data: orders, isLoading, error } = useQuery({
    queryKey: ['orders', { searchQuery, status, customerCode, page, pageSize }],
    queryFn: () =>
      api.getOrders({
        skip: (page - 1) * pageSize,
        limit: pageSize,
        status: status !== 'all' ? status : undefined,
        customer_code: customerCode || undefined,
      }),
  });

  const handleSearch = () => {
    setPage(1); // 検索時は1ページ目に戻る
  };

  const handleExportCSV = () => {
    if (!orders || orders.length === 0) {
      alert('エクスポートするデータがありません');
      return;
    }

    const csvData = orders.map((order) => ({
      受注番号: order.order_no,
      得意先コード: order.customer_code,
      受注日: order.order_date,
      納期: order.due_date || '',
      ステータス: order.status,
      備考: order.remarks || '',
    }));

    api.exportToCSV(csvData, `orders_${format(new Date(), 'yyyyMMdd_HHmmss')}.csv`);
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">受注一覧</h2>
          <p className="text-muted-foreground">受注情報を検索・管理できます</p>
        </div>
        <Button onClick={handleExportCSV} variant="outline" disabled={!orders || orders.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          CSV出力
        </Button>
      </div>

      {/* 検索フィルター */}
      <div className="rounded-lg border bg-card p-4">
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="search">受注番号 / 得意先</Label>
            <Input
              id="search"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">ステータス</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="すべて" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">すべて</SelectItem>
                <SelectItem value="open">未処理</SelectItem>
                <SelectItem value="allocated">引当済</SelectItem>
                <SelectItem value="shipped">出荷済</SelectItem>
                <SelectItem value="completed">完了</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer">得意先コード</Label>
            <Input
              id="customer"
              placeholder="CUS001"
              value={customerCode}
              onChange={(e) => setCustomerCode(e.target.value)}
            />
          </div>

          <div className="flex items-end space-x-2">
            <Button onClick={handleSearch} className="flex-1">
              <Search className="mr-2 h-4 w-4" />
              検索
            </Button>
          </div>
        </div>
      </div>

      {/* テーブル */}
      {isLoading ? (
        <TableSkeleton />
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-4">
          <p className="text-destructive">受注情報の取得に失敗しました</p>
        </div>
      ) : orders && orders.length > 0 ? (
        <>
          <div className="rounded-lg border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium">受注番号</th>
                    <th className="p-3 text-left text-sm font-medium">得意先</th>
                    <th className="p-3 text-left text-sm font-medium">受注日</th>
                    <th className="p-3 text-left text-sm font-medium">納期</th>
                    <th className="p-3 text-left text-sm font-medium">ステータス</th>
                    <th className="p-3 text-right text-sm font-medium">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-muted/50">
                      <td className="p-3 text-sm font-medium">{order.order_no}</td>
                      <td className="p-3 text-sm">{order.customer_code}</td>
                      <td className="p-3 text-sm">
                        {order.order_date ? format(new Date(order.order_date), 'yyyy-MM-dd') : '-'}
                      </td>
                      <td className="p-3 text-sm">
                        {order.due_date ? format(new Date(order.due_date), 'yyyy-MM-dd') : '-'}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="p-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => (window.location.href = `/orders/${order.id}`)}
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          詳細
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ページネーション */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Label>表示件数:</Label>
              <Select value={pageSize.toString()} onValueChange={(v) => setPageSize(Number(v))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                前へ
              </Button>
              <span className="text-sm">
                ページ {page}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={!orders || orders.length < pageSize}
              >
                次へ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-lg border bg-card p-8 text-center">
          <p className="text-muted-foreground">受注データがありません</p>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; class: string }> = {
    open: { label: '未処理', class: 'bg-yellow-100 text-yellow-800' },
    allocated: { label: '引当済', class: 'bg-blue-100 text-blue-800' },
    shipped: { label: '出荷済', class: 'bg-green-100 text-green-800' },
    completed: { label: '完了', class: 'bg-gray-100 text-gray-800' },
  };

  const variant = variants[status] || { label: status, class: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${variant.class}`}>
      {variant.label}
    </span>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 animate-pulse rounded bg-muted" />
      ))}
    </div>
  );
}
