[**lot-management-frontend v1.0.0**](../../../README.md)

***

[lot-management-frontend](../../../README.md) / [types/api](../README.md) / components

# Interface: components

Defined in: [src/types/api.d.ts:1075](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L1075)

## Properties

### headers

> **headers**: `never`

Defined in: [src/types/api.d.ts:2447](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2447)

***

### parameters

> **parameters**: `never`

Defined in: [src/types/api.d.ts:2445](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2445)

***

### pathItems

> **pathItems**: `never`

Defined in: [src/types/api.d.ts:2448](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2448)

***

### requestBodies

> **requestBodies**: `never`

Defined in: [src/types/api.d.ts:2446](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2446)

***

### responses

> **responses**: `never`

Defined in: [src/types/api.d.ts:2444](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2444)

***

### schemas

> **schemas**: `object`

Defined in: [src/types/api.d.ts:1076](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L1076)

#### AdminPresetListResponse

> **AdminPresetListResponse**: `object`

AdminPresetListResponse

##### Description

プリセット名の一覧レスポンス。

##### AdminPresetListResponse.presets

> **presets**: `string`[]

Presets

#### AdminPresetLoadResponse

> **AdminPresetLoadResponse**: `object`

AdminPresetLoadResponse

##### Description

プリセット投入結果。

##### AdminPresetLoadResponse.preset

> **preset**: `string`

Preset

##### AdminPresetLoadResponse.result

> **result**: `object`

##### AdminPresetLoadResponse.result.created?

> `optional` **created**: `object`

Created

###### Index Signature

\[`key`: `string`\]: `string`[]

##### AdminPresetLoadResponse.result.warnings?

> `optional` **warnings**: `string`[]

Warnings

#### app\_\_schemas\_\_masters\_\_ProductCreate

> **app\_\_schemas\_\_masters\_\_ProductCreate**: `object`

ProductCreate

##### app\_\_schemas\_\_masters\_\_ProductCreate.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### app\_\_schemas\_\_masters\_\_ProductCreate.base\_unit

> **base\_unit**: `string`

Base Unit

###### Default

```ts
EA
```

##### app\_\_schemas\_\_masters\_\_ProductCreate.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### app\_\_schemas\_\_masters\_\_ProductCreate.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### app\_\_schemas\_\_masters\_\_ProductCreate.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### app\_\_schemas\_\_masters\_\_ProductCreate.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### app\_\_schemas\_\_masters\_\_ProductCreate.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### app\_\_schemas\_\_masters\_\_ProductCreate.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### app\_\_schemas\_\_masters\_\_ProductCreate.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### app\_\_schemas\_\_masters\_\_ProductCreate.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### app\_\_schemas\_\_masters\_\_ProductCreate.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### app\_\_schemas\_\_masters\_\_ProductCreate.packaging\_qty

> **packaging\_qty**: `string` \| `number`

Packaging Qty

##### app\_\_schemas\_\_masters\_\_ProductCreate.packaging\_unit

> **packaging\_unit**: `string`

Packaging Unit

##### app\_\_schemas\_\_masters\_\_ProductCreate.product\_code

> **product\_code**: `string`

Product Code

##### app\_\_schemas\_\_masters\_\_ProductCreate.product\_name

> **product\_name**: `string`

Product Name

##### app\_\_schemas\_\_masters\_\_ProductCreate.requires\_lot\_number

> **requires\_lot\_number**: `boolean`

Requires Lot Number

###### Default

```ts
true
```

##### app\_\_schemas\_\_masters\_\_ProductCreate.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### app\_\_schemas\_\_masters\_\_ProductCreate.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### app\_\_schemas\_\_masters\_\_ProductCreate.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### app\_\_schemas\_\_masters\_\_ProductCreate.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

#### app\_\_schemas\_\_masters\_\_ProductUpdate

> **app\_\_schemas\_\_masters\_\_ProductUpdate**: `object`

ProductUpdate

##### app\_\_schemas\_\_masters\_\_ProductUpdate.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### app\_\_schemas\_\_masters\_\_ProductUpdate.base\_unit?

> `optional` **base\_unit**: `string` \| `null`

Base Unit

##### app\_\_schemas\_\_masters\_\_ProductUpdate.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### app\_\_schemas\_\_masters\_\_ProductUpdate.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### app\_\_schemas\_\_masters\_\_ProductUpdate.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### app\_\_schemas\_\_masters\_\_ProductUpdate.internal\_unit?

> `optional` **internal\_unit**: `string` \| `null`

Internal Unit

##### app\_\_schemas\_\_masters\_\_ProductUpdate.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### app\_\_schemas\_\_masters\_\_ProductUpdate.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### app\_\_schemas\_\_masters\_\_ProductUpdate.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### app\_\_schemas\_\_masters\_\_ProductUpdate.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### app\_\_schemas\_\_masters\_\_ProductUpdate.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### app\_\_schemas\_\_masters\_\_ProductUpdate.packaging\_qty?

> `optional` **packaging\_qty**: `string` \| `number` \| `null`

Packaging Qty

##### app\_\_schemas\_\_masters\_\_ProductUpdate.packaging\_unit?

> `optional` **packaging\_unit**: `string` \| `null`

Packaging Unit

##### app\_\_schemas\_\_masters\_\_ProductUpdate.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

##### app\_\_schemas\_\_masters\_\_ProductUpdate.requires\_lot\_number?

> `optional` **requires\_lot\_number**: `boolean` \| `null`

Requires Lot Number

##### app\_\_schemas\_\_masters\_\_ProductUpdate.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### app\_\_schemas\_\_masters\_\_ProductUpdate.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### app\_\_schemas\_\_masters\_\_ProductUpdate.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### app\_\_schemas\_\_masters\_\_ProductUpdate.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

#### app\_\_schemas\_\_products\_\_ProductCreate

> **app\_\_schemas\_\_products\_\_ProductCreate**: `object`

ProductCreate

##### Description

Payload to create a product.

##### app\_\_schemas\_\_products\_\_ProductCreate.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### app\_\_schemas\_\_products\_\_ProductCreate.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### app\_\_schemas\_\_products\_\_ProductCreate.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### app\_\_schemas\_\_products\_\_ProductCreate.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### app\_\_schemas\_\_products\_\_ProductCreate.product\_code

> **product\_code**: `string`

Product Code

##### app\_\_schemas\_\_products\_\_ProductCreate.product\_name

> **product\_name**: `string`

Product Name

#### app\_\_schemas\_\_products\_\_ProductUpdate

> **app\_\_schemas\_\_products\_\_ProductUpdate**: `object`

ProductUpdate

##### Description

Payload to partially update a product.

##### app\_\_schemas\_\_products\_\_ProductUpdate.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### app\_\_schemas\_\_products\_\_ProductUpdate.internal\_unit?

> `optional` **internal\_unit**: `string` \| `null`

Internal Unit

##### app\_\_schemas\_\_products\_\_ProductUpdate.is\_active?

> `optional` **is\_active**: `boolean` \| `null`

Is Active

##### app\_\_schemas\_\_products\_\_ProductUpdate.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### app\_\_schemas\_\_products\_\_ProductUpdate.product\_code?

> `optional` **product\_code**: `string` \| `null`

Product Code

##### app\_\_schemas\_\_products\_\_ProductUpdate.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

#### CustomerCreate

> **CustomerCreate**: `object`

CustomerCreate

##### CustomerCreate.address?

> `optional` **address**: `string` \| `null`

Address

##### CustomerCreate.customer\_code

> **customer\_code**: `string`

Customer Code

##### CustomerCreate.customer\_name

> **customer\_name**: `string`

Customer Name

#### CustomerResponse

> **CustomerResponse**: `object`

CustomerResponse

##### CustomerResponse.address?

> `optional` **address**: `string` \| `null`

Address

##### CustomerResponse.customer\_code

> **customer\_code**: `string`

Customer Code

##### CustomerResponse.customer\_name

> **customer\_name**: `string`

Customer Name

#### CustomerUpdate

> **CustomerUpdate**: `object`

CustomerUpdate

##### CustomerUpdate.address?

> `optional` **address**: `string` \| `null`

Address

##### CustomerUpdate.customer\_name?

> `optional` **customer\_name**: `string` \| `null`

Customer Name

#### DashboardStatsResponse

> **DashboardStatsResponse**: `object`

DashboardStatsResponse

##### Description

ダッシュボード統計レスポンス

##### DashboardStatsResponse.total\_orders

> **total\_orders**: `number`

Total Orders

##### DashboardStatsResponse.total\_stock

> **total\_stock**: `number`

Total Stock

##### DashboardStatsResponse.unallocated\_orders

> **unallocated\_orders**: `number`

Unallocated Orders

#### DragAssignRequest

> **DragAssignRequest**: `object`

DragAssignRequest

##### DragAssignRequest.allocate\_qty

> **allocate\_qty**: `number`

Allocate Qty

##### DragAssignRequest.lot\_id

> **lot\_id**: `number`

Lot Id

##### DragAssignRequest.order\_line\_id

> **order\_line\_id**: `number`

Order Line Id

#### FefoCommitResponse

> **FefoCommitResponse**: `object`

FefoCommitResponse

##### FefoCommitResponse.created\_allocation\_ids?

> `optional` **created\_allocation\_ids**: `number`[]

Created Allocation Ids

##### FefoCommitResponse.order\_id

> **order\_id**: `number`

Order Id

##### FefoCommitResponse.preview

> **preview**: `object`

##### FefoCommitResponse.preview.lines?

> `optional` **lines**: `object`[]

Lines

##### FefoCommitResponse.preview.order\_id

> **order\_id**: `number`

Order Id

##### FefoCommitResponse.preview.warnings?

> `optional` **warnings**: `string`[]

Warnings

#### FefoLineAllocation

> **FefoLineAllocation**: `object`

FefoLineAllocation

##### FefoLineAllocation.allocations?

> `optional` **allocations**: `object`[]

Allocations

##### FefoLineAllocation.already\_allocated\_qty

> **already\_allocated\_qty**: `number`

Already Allocated Qty

##### FefoLineAllocation.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### FefoLineAllocation.order\_line\_id

> **order\_line\_id**: `number`

Order Line Id

##### FefoLineAllocation.product\_code

> **product\_code**: `string`

Product Code

##### FefoLineAllocation.required\_qty

> **required\_qty**: `number`

Required Qty

##### FefoLineAllocation.warnings?

> `optional` **warnings**: `string`[]

Warnings

#### FefoLotAllocation

> **FefoLotAllocation**: `object`

FefoLotAllocation

##### FefoLotAllocation.allocate\_qty

> **allocate\_qty**: `number`

Allocate Qty

##### FefoLotAllocation.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### FefoLotAllocation.lot\_id

> **lot\_id**: `number`

Lot Id

##### FefoLotAllocation.lot\_number

> **lot\_number**: `string`

Lot Number

##### FefoLotAllocation.receipt\_date?

> `optional` **receipt\_date**: `string` \| `null`

Receipt Date

#### FefoPreviewRequest

> **FefoPreviewRequest**: `object`

FefoPreviewRequest

##### FefoPreviewRequest.order\_id

> **order\_id**: `number`

Order Id

#### FefoPreviewResponse

> **FefoPreviewResponse**: `object`

FefoPreviewResponse

##### FefoPreviewResponse.lines?

> `optional` **lines**: `object`[]

Lines

##### FefoPreviewResponse.order\_id

> **order\_id**: `number`

Order Id

##### FefoPreviewResponse.warnings?

> `optional` **warnings**: `string`[]

Warnings

#### ForecastActivateRequest

> **ForecastActivateRequest**: `object`

ForecastActivateRequest

##### Description

バージョンアクティブ化リクエスト

##### ForecastActivateRequest.deactivate\_others

> **deactivate\_others**: `boolean`

Deactivate Others

###### Default

```ts
true
```

##### ForecastActivateRequest.version\_no

> **version\_no**: `number`

Version No

#### ForecastActivateResponse

> **ForecastActivateResponse**: `object`

ForecastActivateResponse

##### Description

バージョンアクティブ化レスポンス

##### ForecastActivateResponse.activated\_version

> **activated\_version**: `number`

Activated Version

##### ForecastActivateResponse.deactivated\_versions

> **deactivated\_versions**: `number`[]

Deactivated Versions

###### Default

```ts
[]
```

##### ForecastActivateResponse.message

> **message**: `string`

Message

##### ForecastActivateResponse.success

> **success**: `boolean`

Success

#### ForecastBulkImportRequest

> **ForecastBulkImportRequest**: `object`

ForecastBulkImportRequest

##### Description

一括インポートリクエスト

##### ForecastBulkImportRequest.deactivate\_old\_version

> **deactivate\_old\_version**: `boolean`

Deactivate Old Version

###### Default

```ts
true
```

##### ForecastBulkImportRequest.forecasts

> **forecasts**: `object`[]

Forecasts

##### ForecastBulkImportRequest.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### ForecastBulkImportRequest.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### ForecastBulkImportRequest.version\_no

> **version\_no**: `number`

Version No

#### ForecastBulkImportResponse

> **ForecastBulkImportResponse**: `object`

ForecastBulkImportResponse

##### Description

一括インポートレスポンス

##### ForecastBulkImportResponse.error\_count

> **error\_count**: `number`

Error Count

##### ForecastBulkImportResponse.error\_details?

> `optional` **error\_details**: `string` \| `null`

Error Details

##### ForecastBulkImportResponse.imported\_count

> **imported\_count**: `number`

Imported Count

##### ForecastBulkImportResponse.message

> **message**: `string`

Message

##### ForecastBulkImportResponse.skipped\_count

> **skipped\_count**: `number`

Skipped Count

##### ForecastBulkImportResponse.success

> **success**: `boolean`

Success

##### ForecastBulkImportResponse.version\_no

> **version\_no**: `number`

Version No

#### ForecastCreate

> **ForecastCreate**: `object`

ForecastCreate

##### Description

フォーキャスト作成リクエスト

##### ForecastCreate.customer\_id

> **customer\_id**: `string`

Customer Id

##### ForecastCreate.date\_day?

> `optional` **date\_day**: `string` \| `null`

Date Day

##### ForecastCreate.date\_dekad\_start?

> `optional` **date\_dekad\_start**: `string` \| `null`

Date Dekad Start

##### ForecastCreate.granularity

> **granularity**: `"daily"` \| `"dekad"` \| `"monthly"`

Granularity

##### ForecastCreate.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### ForecastCreate.product\_id

> **product\_id**: `string`

Product Id

##### ForecastCreate.qty\_forecast

> **qty\_forecast**: `number`

Qty Forecast

##### ForecastCreate.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### ForecastCreate.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### ForecastCreate.version\_no

> **version\_no**: `number`

Version No

###### Default

```ts
1
```

##### ForecastCreate.year\_month?

> `optional` **year\_month**: `string` \| `null`

Year Month

#### ForecastItemOut

> **ForecastItemOut**: `object`

ForecastItemOut

##### Description

Forecast一覧（フロント表示用）

##### ForecastItemOut.customer\_code

> **customer\_code**: `string`

Customer Code

##### ForecastItemOut.customer\_name

> **customer\_name**: `string` \| `null`

Customer Name

###### Default

```ts
得意先A (ダミー)
```

##### ForecastItemOut.daily\_data?

> `optional` **daily\_data**: \{\[`key`: `string`\]: `number`; \} \| `null`

Daily Data

##### ForecastItemOut.dekad\_data?

> `optional` **dekad\_data**: \{\[`key`: `string`\]: `number`; \} \| `null`

Dekad Data

##### ForecastItemOut.dekad\_summary?

> `optional` **dekad\_summary**: \{\[`key`: `string`\]: `number`; \} \| `null`

Dekad Summary

##### ForecastItemOut.granularity

> **granularity**: `string`

Granularity

##### ForecastItemOut.id

> **id**: `number`

Id

##### ForecastItemOut.monthly\_data?

> `optional` **monthly\_data**: \{\[`key`: `string`\]: `number`; \} \| `null`

Monthly Data

##### ForecastItemOut.product\_code

> **product\_code**: `string`

Product Code

##### ForecastItemOut.product\_name

> **product\_name**: `string`

Product Name

##### ForecastItemOut.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### ForecastItemOut.supplier\_name

> **supplier\_name**: `string` \| `null`

Supplier Name

###### Default

```ts
サプライヤーB (ダミー)
```

##### ForecastItemOut.unit

> **unit**: `string`

Unit

###### Default

```ts
EA
```

##### ForecastItemOut.updated\_at

> **updated\_at**: `string`

Updated At
Format: date-time

##### ForecastItemOut.version\_history

> **version\_history**: `Record`\<`string`, `never`\>[]

Version History

###### Default

```ts
[]
```

##### ForecastItemOut.version\_no

> **version\_no**: `number`

Version No

#### ForecastListResponse

> **ForecastListResponse**: `object`

ForecastListResponse

##### ForecastListResponse.items

> **items**: `object`[]

Items

#### ForecastMatchRequest

> **ForecastMatchRequest**: `object`

ForecastMatchRequest

##### Description

マッチングリクエスト

##### ForecastMatchRequest.date\_from?

> `optional` **date\_from**: `string` \| `null`

Date From

##### ForecastMatchRequest.date\_to?

> `optional` **date\_to**: `string` \| `null`

Date To

##### ForecastMatchRequest.force\_rematch

> **force\_rematch**: `boolean`

Force Rematch

###### Default

```ts
false
```

##### ForecastMatchRequest.order\_id?

> `optional` **order\_id**: `number` \| `null`

Order Id

##### ForecastMatchRequest.order\_ids?

> `optional` **order\_ids**: `number`[] \| `null`

Order Ids

#### ForecastMatchResponse

> **ForecastMatchResponse**: `object`

ForecastMatchResponse

##### Description

マッチングレスポンス

##### ForecastMatchResponse.matched\_lines

> **matched\_lines**: `number`

Matched Lines

##### ForecastMatchResponse.message

> **message**: `string`

Message

##### ForecastMatchResponse.results

> **results**: `object`[]

Results

###### Default

```ts
[]
```

##### ForecastMatchResponse.success

> **success**: `boolean`

Success

##### ForecastMatchResponse.total\_lines

> **total\_lines**: `number`

Total Lines

##### ForecastMatchResponse.unmatched\_lines

> **unmatched\_lines**: `number`

Unmatched Lines

#### ForecastMatchResult

> **ForecastMatchResult**: `object`

ForecastMatchResult

##### Description

個別マッチング結果

##### ForecastMatchResult.forecast\_granularity?

> `optional` **forecast\_granularity**: `string` \| `null`

Forecast Granularity

##### ForecastMatchResult.forecast\_id?

> `optional` **forecast\_id**: `number` \| `null`

Forecast Id

##### ForecastMatchResult.forecast\_match\_status?

> `optional` **forecast\_match\_status**: `string` \| `null`

Forecast Match Status

##### ForecastMatchResult.forecast\_qty?

> `optional` **forecast\_qty**: `number` \| `null`

Forecast Qty

##### ForecastMatchResult.line\_no

> **line\_no**: `number`

Line No

##### ForecastMatchResult.matched

> **matched**: `boolean`

Matched

##### ForecastMatchResult.order\_line\_id

> **order\_line\_id**: `number`

Order Line Id

##### ForecastMatchResult.order\_no

> **order\_no**: `string`

Order No

##### ForecastMatchResult.product\_code

> **product\_code**: `string`

Product Code

#### ForecastResponse

> **ForecastResponse**: `object`

ForecastResponse

##### Description

フォーキャストレスポンス

##### ForecastResponse.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### ForecastResponse.customer\_id

> **customer\_id**: `string`

Customer Id

##### ForecastResponse.date\_day?

> `optional` **date\_day**: `string` \| `null`

Date Day

##### ForecastResponse.date\_dekad\_start?

> `optional` **date\_dekad\_start**: `string` \| `null`

Date Dekad Start

##### ForecastResponse.forecast\_id?

> `optional` **forecast\_id**: `number` \| `null`

Forecast Id

##### ForecastResponse.granularity

> **granularity**: `"daily"` \| `"dekad"` \| `"monthly"`

Granularity

##### ForecastResponse.id

> **id**: `number`

Id

##### ForecastResponse.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### ForecastResponse.product\_id

> **product\_id**: `string`

Product Id

##### ForecastResponse.qty\_forecast

> **qty\_forecast**: `number`

Qty Forecast

##### ForecastResponse.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### ForecastResponse.supplier\_id?

> `optional` **supplier\_id**: `string` \| `null`

Supplier Id

##### ForecastResponse.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### ForecastResponse.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### ForecastResponse.version\_no

> **version\_no**: `number`

Version No

###### Default

```ts
1
```

##### ForecastResponse.year\_month?

> `optional` **year\_month**: `string` \| `null`

Year Month

#### ForecastUpdate

> **ForecastUpdate**: `object`

ForecastUpdate

##### Description

フォーキャスト更新リクエスト

##### ForecastUpdate.is\_active?

> `optional` **is\_active**: `boolean` \| `null`

Is Active

##### ForecastUpdate.qty\_forecast?

> `optional` **qty\_forecast**: `number` \| `null`

Qty Forecast

#### ForecastVersionInfo

> **ForecastVersionInfo**: `object`

ForecastVersionInfo

##### Description

バージョン情報

##### ForecastVersionInfo.forecast\_count

> **forecast\_count**: `number`

Forecast Count

##### ForecastVersionInfo.is\_active

> **is\_active**: `boolean`

Is Active

##### ForecastVersionInfo.source\_system

> **source\_system**: `string`

Source System

##### ForecastVersionInfo.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### ForecastVersionInfo.version\_no

> **version\_no**: `number`

Version No

#### ForecastVersionListResponse

> **ForecastVersionListResponse**: `object`

ForecastVersionListResponse

##### Description

バージョン一覧レスポンス

##### ForecastVersionListResponse.versions

> **versions**: `object`[]

Versions

#### FullSampleDataRequest

> **FullSampleDataRequest**: `object`

FullSampleDataRequest

##### Description

一括サンプルデータ投入リクエスト

    注意: 投入順序が重要 (マスタ -> ロット -> 受注)

##### FullSampleDataRequest.lots?

> `optional` **lots**: `object`[] \| `null`

Lots

##### FullSampleDataRequest.orders?

> `optional` **orders**: `object`[] \| `null`

Orders

##### FullSampleDataRequest.products?

> `optional` **products**: `object`[] \| `null`

Products

#### HTTPValidationError

> **HTTPValidationError**: `object`

HTTPValidationError

##### HTTPValidationError.detail?

> `optional` **detail**: `object`[]

Detail

#### LotCreate

> **LotCreate**: `object`

LotCreate

##### LotCreate.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### LotCreate.inventory\_unit?

> `optional` **inventory\_unit**: `string` \| `null`

Inventory Unit

##### LotCreate.kanban\_class?

> `optional` **kanban\_class**: `string` \| `null`

Kanban Class

##### LotCreate.lot\_number

> **lot\_number**: `string`

Lot Number

##### LotCreate.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### LotCreate.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### LotCreate.product\_code

> **product\_code**: `string`

Product Code

##### LotCreate.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### LotCreate.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### LotCreate.receipt\_date

> **receipt\_date**: `string`

Receipt Date
Format: date

##### LotCreate.received\_by?

> `optional` **received\_by**: `string` \| `null`

Received By

##### LotCreate.sales\_unit?

> `optional` **sales\_unit**: `string` \| `null`

Sales Unit

##### LotCreate.source\_doc?

> `optional` **source\_doc**: `string` \| `null`

Source Doc

##### LotCreate.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### LotCreate.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### LotCreate.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### LotResponse

> **LotResponse**: `object`

LotResponse

##### LotResponse.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### LotResponse.current\_quantity

> **current\_quantity**: `number`

Current Quantity

###### Default

```ts
0
```

##### LotResponse.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### LotResponse.id

> **id**: `number`

Id

##### LotResponse.inventory\_unit?

> `optional` **inventory\_unit**: `string` \| `null`

Inventory Unit

##### LotResponse.kanban\_class?

> `optional` **kanban\_class**: `string` \| `null`

Kanban Class

##### LotResponse.last\_updated?

> `optional` **last\_updated**: `string` \| `null`

Last Updated

##### LotResponse.lot\_number

> **lot\_number**: `string`

Lot Number

##### LotResponse.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### LotResponse.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### LotResponse.product\_code

> **product\_code**: `string`

Product Code

##### LotResponse.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

##### LotResponse.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### LotResponse.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### LotResponse.receipt\_date

> **receipt\_date**: `string`

Receipt Date
Format: date

##### LotResponse.received\_by?

> `optional` **received\_by**: `string` \| `null`

Received By

##### LotResponse.sales\_unit?

> `optional` **sales\_unit**: `string` \| `null`

Sales Unit

##### LotResponse.source\_doc?

> `optional` **source\_doc**: `string` \| `null`

Source Doc

##### LotResponse.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### LotResponse.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### LotResponse.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### LotResponse.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### LotUpdate

> **LotUpdate**: `object`

LotUpdate

##### LotUpdate.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### LotUpdate.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### LotUpdate.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### LotUpdate.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### LotUpdate.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### LotUpdate.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### LotUpdate.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### MasterBulkLoadRequest

> **MasterBulkLoadRequest**: `object`

MasterBulkLoadRequest

##### Description

Bulk load payload for master data.

##### MasterBulkLoadRequest.customers?

> `optional` **customers**: `object`[]

Customers

##### MasterBulkLoadRequest.products?

> `optional` **products**: `object`[]

Products

##### MasterBulkLoadRequest.suppliers?

> `optional` **suppliers**: `object`[]

Suppliers

##### MasterBulkLoadRequest.warehouses?

> `optional` **warehouses**: `object`[]

Warehouses

#### MasterBulkLoadResponse

> **MasterBulkLoadResponse**: `object`

MasterBulkLoadResponse

##### Description

Bulk load result summary.

##### MasterBulkLoadResponse.created?

> `optional` **created**: `object`

Created

###### Index Signature

\[`key`: `string`\]: `string`[]

##### MasterBulkLoadResponse.warnings?

> `optional` **warnings**: `string`[]

Warnings

#### OcrOrderRecord

> **OcrOrderRecord**: `object`

OcrOrderRecord

##### Description

OCR受注レコード

##### OcrOrderRecord.customer\_code

> **customer\_code**: `string`

Customer Code

##### OcrOrderRecord.lines

> **lines**: `object`[]

Lines

##### OcrOrderRecord.order\_date?

> `optional` **order\_date**: `string` \| `null`

Order Date

##### OcrOrderRecord.order\_no

> **order\_no**: `string`

Order No

#### OcrSubmissionRequest

> **OcrSubmissionRequest**: `object`

OcrSubmissionRequest

##### Description

OCR取込リクエスト

##### OcrSubmissionRequest.file\_name?

> `optional` **file\_name**: `string` \| `null`

File Name

##### OcrSubmissionRequest.operator?

> `optional` **operator**: `string` \| `null`

Operator

##### OcrSubmissionRequest.records

> **records**: `object`[]

Records

##### OcrSubmissionRequest.schema\_version

> **schema\_version**: `string`

Schema Version

###### Default

```ts
1.0.0
```

##### OcrSubmissionRequest.source

> **source**: `string`

Source

###### Default

```ts
PAD
```

#### OcrSubmissionResponse

> **OcrSubmissionResponse**: `object`

OcrSubmissionResponse

##### Description

OCR取込レスポンス

##### OcrSubmissionResponse.created\_lines

> **created\_lines**: `number`

Created Lines

##### OcrSubmissionResponse.created\_orders

> **created\_orders**: `number`

Created Orders

##### OcrSubmissionResponse.error\_details?

> `optional` **error\_details**: `string` \| `null`

Error Details

##### OcrSubmissionResponse.failed\_records

> **failed\_records**: `number`

Failed Records

##### OcrSubmissionResponse.processed\_records

> **processed\_records**: `number`

Processed Records

##### OcrSubmissionResponse.skipped\_records

> **skipped\_records**: `number`

Skipped Records

##### OcrSubmissionResponse.status

> **status**: `string`

Status

##### OcrSubmissionResponse.submission\_id

> **submission\_id**: `string`

Submission Id

##### OcrSubmissionResponse.total\_records

> **total\_records**: `number`

Total Records

#### OrderCreate

> **OrderCreate**: `object`

OrderCreate

##### OrderCreate.customer\_code

> **customer\_code**: `string`

Customer Code

##### OrderCreate.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### OrderCreate.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### OrderCreate.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### OrderCreate.lines?

> `optional` **lines**: `object`[]

Lines

##### OrderCreate.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### OrderCreate.order\_no

> **order\_no**: `string`

Order No

##### OrderCreate.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### OrderCreate.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### OrderCreate.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### OrderCreate.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### OrderCreate.status

> **status**: `string`

Status

###### Default

```ts
open
```

#### OrderLineCreate

> **OrderLineCreate**: `object`

OrderLineCreate

##### OrderLineCreate.destination\_id?

> `optional` **destination\_id**: `number` \| `null`

Destination Id

##### OrderLineCreate.due\_date?

> `optional` **due\_date**: `string` \| `null`

Due Date

##### OrderLineCreate.external\_unit?

> `optional` **external\_unit**: `string` \| `null`

External Unit

##### OrderLineCreate.line\_no

> **line\_no**: `number`

Line No

##### OrderLineCreate.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### OrderLineCreate.product\_code

> **product\_code**: `string`

Product Code

##### OrderLineCreate.quantity

> **quantity**: `number`

Quantity

##### OrderLineCreate.unit

> **unit**: `string`

Unit

#### OrderLineDemandSchema

> **OrderLineDemandSchema**: `object`

OrderLineDemandSchema

##### OrderLineDemandSchema.product\_code

> **product\_code**: `string`

Product Code

##### OrderLineDemandSchema.quantity

> **quantity**: `number`

Quantity

##### OrderLineDemandSchema.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

#### OrderLineOut

> **OrderLineOut**: `object`

OrderLineOut

##### OrderLineOut.allocated\_lots?

> `optional` **allocated\_lots**: `Record`\<`string`, `never`\>[]

Allocated Lots

##### OrderLineOut.allocated\_qty?

> `optional` **allocated\_qty**: `number` \| `null`

Allocated Qty

##### OrderLineOut.customer\_code?

> `optional` **customer\_code**: `string` \| `null`

Customer Code

##### OrderLineOut.due\_date?

> `optional` **due\_date**: `string` \| `null`

Due Date

##### OrderLineOut.id

> **id**: `number`

Id

##### OrderLineOut.line\_no?

> `optional` **line\_no**: `number` \| `null`

Line No

##### OrderLineOut.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### OrderLineOut.product\_code

> **product\_code**: `string`

Product Code

##### OrderLineOut.product\_name

> **product\_name**: `string`

Product Name

##### OrderLineOut.quantity

> **quantity**: `number`

Quantity

##### OrderLineOut.related\_lots?

> `optional` **related\_lots**: `Record`\<`string`, `never`\>[]

Related Lots

##### OrderLineOut.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### OrderLineOut.unit

> **unit**: `string`

Unit

##### OrderLineOut.warehouse\_allocations?

> `optional` **warehouse\_allocations**: `object`[]

Warehouse Allocations

#### OrderResponse

> **OrderResponse**: `object`

OrderResponse

##### OrderResponse.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### OrderResponse.customer\_code

> **customer\_code**: `string`

Customer Code

##### OrderResponse.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### OrderResponse.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### OrderResponse.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### OrderResponse.id

> **id**: `number`

Id

##### OrderResponse.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### OrderResponse.order\_no

> **order\_no**: `string`

Order No

##### OrderResponse.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### OrderResponse.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### OrderResponse.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### OrderResponse.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### OrderResponse.status

> **status**: `string`

Status

###### Default

```ts
open
```

##### OrderResponse.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

#### OrderStatusUpdate

> **OrderStatusUpdate**: `object`

OrderStatusUpdate

##### Description

受注ステータス更新用スキーマ

    Note:
        constrを使用してstatusが空文字でないことを保証

##### OrderStatusUpdate.status

> **status**: `string`

Status

###### Description

新しいステータス（open, allocated, shipped, closed, cancelled）

###### Examples

```ts
allocated
```

```ts
shipped
```

#### OrderValidationDetails

> **OrderValidationDetails**: `object`

OrderValidationDetails

##### OrderValidationDetails.per\_lot?

> `optional` **per\_lot**: `object`[]

Per Lot

##### OrderValidationDetails.ship\_date?

> `optional` **ship\_date**: `string` \| `null`

Ship Date

##### OrderValidationDetails.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

#### OrderValidationErrorData

> **OrderValidationErrorData**: `object`

OrderValidationErrorData

##### OrderValidationErrorData.available

> **available**: `number`

Available

##### OrderValidationErrorData.details

> **details**: `object`

##### OrderValidationErrorData.details.per\_lot?

> `optional` **per\_lot**: `object`[]

Per Lot

##### OrderValidationErrorData.details.ship\_date?

> `optional` **ship\_date**: `string` \| `null`

Ship Date

##### OrderValidationErrorData.details.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### OrderValidationErrorData.product\_code

> **product\_code**: `string`

Product Code

##### OrderValidationErrorData.required

> **required**: `number`

Required

#### OrderValidationLotAvailability

> **OrderValidationLotAvailability**: `object`

OrderValidationLotAvailability

##### OrderValidationLotAvailability.available

> **available**: `number`

Available

##### OrderValidationLotAvailability.lot\_id

> **lot\_id**: `number`

Lot Id

#### OrderValidationRequest

> **OrderValidationRequest**: `object`

OrderValidationRequest

##### OrderValidationRequest.lines

> **lines**: `object`[]

Lines

##### OrderValidationRequest.ship\_date?

> `optional` **ship\_date**: `string` \| `null`

Ship Date

#### OrderValidationResponse

> **OrderValidationResponse**: `object`

OrderValidationResponse

##### OrderValidationResponse.data?

> `optional` **data**: \{ `available`: `number`; `details`: \{ `per_lot?`: `object`[]; `ship_date?`: `string` \| `null`; `warehouse_code`: `string`; \}; `product_code`: `string`; `required`: `number`; \} \| `null`

###### Type Declaration

\{ `available`: `number`; `details`: \{ `per_lot?`: `object`[]; `ship_date?`: `string` \| `null`; `warehouse_code`: `string`; \}; `product_code`: `string`; `required`: `number`; \}

`null`

##### OrderValidationResponse.message

> **message**: `string`

Message

##### OrderValidationResponse.ok

> **ok**: `boolean`

Ok

#### OrderWithLinesResponse

> **OrderWithLinesResponse**: `object`

OrderWithLinesResponse

##### OrderWithLinesResponse.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### OrderWithLinesResponse.customer\_code

> **customer\_code**: `string`

Customer Code

##### OrderWithLinesResponse.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### OrderWithLinesResponse.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### OrderWithLinesResponse.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### OrderWithLinesResponse.id

> **id**: `number`

Id

##### OrderWithLinesResponse.lines?

> `optional` **lines**: `object`[]

Lines

##### OrderWithLinesResponse.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### OrderWithLinesResponse.order\_no

> **order\_no**: `string`

Order No

##### OrderWithLinesResponse.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### OrderWithLinesResponse.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### OrderWithLinesResponse.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### OrderWithLinesResponse.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### OrderWithLinesResponse.status

> **status**: `string`

Status

###### Default

```ts
open
```

##### OrderWithLinesResponse.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

#### Page\_ProductOut\_

> **Page\_ProductOut\_**: `object`

Page[ProductOut]

##### Page\_ProductOut\_.items

> **items**: `object`[]

Items

##### Page\_ProductOut\_.page

> **page**: `number`

Page

##### Page\_ProductOut\_.per\_page

> **per\_page**: `number`

Per Page

##### Page\_ProductOut\_.total

> **total**: `number`

Total

#### ProductOut

> **ProductOut**: `object`

ProductOut

##### Description

Product response model.

##### ProductOut.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### ProductOut.customer\_part\_no

> **customer\_part\_no**: `string` \| `null`

Customer Part No

##### ProductOut.id

> **id**: `number`

Id

##### ProductOut.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### ProductOut.is\_active

> **is\_active**: `boolean`

Is Active

##### ProductOut.maker\_item\_code

> **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### ProductOut.product\_code

> **product\_code**: `string`

Product Code

##### ProductOut.product\_name

> **product\_name**: `string`

Product Name

##### ProductOut.updated\_at

> **updated\_at**: `string`

Updated At
Format: date-time

#### ProductResponse

> **ProductResponse**: `object`

ProductResponse

##### ProductResponse.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### ProductResponse.base\_unit

> **base\_unit**: `string`

Base Unit

###### Default

```ts
EA
```

##### ProductResponse.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### ProductResponse.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### ProductResponse.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### ProductResponse.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### ProductResponse.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### ProductResponse.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### ProductResponse.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### ProductResponse.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### ProductResponse.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### ProductResponse.packaging\_qty

> **packaging\_qty**: `string`

Packaging Qty

##### ProductResponse.packaging\_unit

> **packaging\_unit**: `string`

Packaging Unit

##### ProductResponse.product\_code

> **product\_code**: `string`

Product Code

##### ProductResponse.product\_name

> **product\_name**: `string`

Product Name

##### ProductResponse.requires\_lot\_number

> **requires\_lot\_number**: `boolean`

Requires Lot Number

###### Default

```ts
true
```

##### ProductResponse.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### ProductResponse.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### ProductResponse.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### ProductResponse.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

#### ResponseBase

> **ResponseBase**: `object`

ResponseBase

##### Description

API共通レスポンス

##### ResponseBase.data?

> `optional` **data**: `Record`\<`string`, `never`\> \| `null`

Data

##### ResponseBase.message?

> `optional` **message**: `string` \| `null`

Message

##### ResponseBase.success

> **success**: `boolean`

Success

#### SapRegisterOptions

> **SapRegisterOptions**: `object`

SapRegisterOptions

##### Description

SAP送信オプション

##### SapRegisterOptions.retry

> **retry**: `number`

Retry

###### Default

```ts
1
```

##### SapRegisterOptions.timeout\_sec

> **timeout\_sec**: `number`

Timeout Sec

###### Default

```ts
30
```

#### SapRegisterRequest

> **SapRegisterRequest**: `object`

SapRegisterRequest

##### Description

SAP送信リクエスト

##### SapRegisterRequest.options

> **options**: \{ `retry`: `number`; `timeout_sec`: `number`; \} \| `null`

###### Type Declaration

\{ `retry`: `number`; `timeout_sec`: `number`; \}

`null`

###### Default

```ts
{
             *       "retry": 1,
             *       "timeout_sec": 30
             *     }
```

##### SapRegisterRequest.target

> **target**: `object`

##### SapRegisterRequest.target.type

> **type**: `string`

Type

##### SapRegisterRequest.target.value

> **value**: `unknown`

Value

#### SapRegisterResponse

> **SapRegisterResponse**: `object`

SapRegisterResponse

##### Description

SAP送信レスポンス

##### SapRegisterResponse.error\_message?

> `optional` **error\_message**: `string` \| `null`

Error Message

##### SapRegisterResponse.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### SapRegisterResponse.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### SapRegisterResponse.sent

> **sent**: `number`

Sent

##### SapRegisterResponse.status

> **status**: `string`

Status

#### SapRegisterTarget

> **SapRegisterTarget**: `object`

SapRegisterTarget

##### Description

SAP送信対象指定

##### SapRegisterTarget.type

> **type**: `string`

Type

##### SapRegisterTarget.value

> **value**: `unknown`

Value

#### SapSyncLogResponse

> **SapSyncLogResponse**: `object`

SapSyncLogResponse

##### Description

SAP連携ログレスポンス

##### SapSyncLogResponse.executed\_at

> **executed\_at**: `string`

Executed At
Format: date-time

##### SapSyncLogResponse.id

> **id**: `number`

Id

##### SapSyncLogResponse.order\_id?

> `optional` **order\_id**: `number` \| `null`

Order Id

##### SapSyncLogResponse.payload?

> `optional` **payload**: `string` \| `null`

Payload

##### SapSyncLogResponse.result?

> `optional` **result**: `string` \| `null`

Result

##### SapSyncLogResponse.status

> **status**: `string`

Status

#### StockMovementCreate

> **StockMovementCreate**: `object`

StockMovementCreate

##### StockMovementCreate.batch\_id?

> `optional` **batch\_id**: `string` \| `null`

Batch Id

##### StockMovementCreate.created\_by

> **created\_by**: `string`

Created By

###### Default

```ts
system
```

##### StockMovementCreate.lot\_id?

> `optional` **lot\_id**: `number` \| `null`

Lot Id

##### StockMovementCreate.product\_id

> **product\_id**: `string`

Product Id

##### StockMovementCreate.quantity\_delta

> **quantity\_delta**: `number`

Quantity Delta

##### StockMovementCreate.reason

> **reason**: `string`

Reason

##### StockMovementCreate.source\_id?

> `optional` **source\_id**: `number` \| `null`

Source Id

##### StockMovementCreate.source\_table?

> `optional` **source\_table**: `string` \| `null`

Source Table

##### StockMovementCreate.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### StockMovementResponse

> **StockMovementResponse**: `object`

StockMovementResponse

##### StockMovementResponse.batch\_id?

> `optional` **batch\_id**: `string` \| `null`

Batch Id

##### StockMovementResponse.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### StockMovementResponse.created\_by

> **created\_by**: `string`

Created By

###### Default

```ts
system
```

##### StockMovementResponse.id

> **id**: `number`

Id

##### StockMovementResponse.lot\_id?

> `optional` **lot\_id**: `number` \| `null`

Lot Id

##### StockMovementResponse.occurred\_at

> **occurred\_at**: `string`

Occurred At
Format: date-time

##### StockMovementResponse.product\_id

> **product\_id**: `string`

Product Id

##### StockMovementResponse.quantity\_delta

> **quantity\_delta**: `number`

Quantity Delta

##### StockMovementResponse.reason

> **reason**: `string`

Reason

##### StockMovementResponse.source\_id?

> `optional` **source\_id**: `number` \| `null`

Source Id

##### StockMovementResponse.source\_table?

> `optional` **source\_table**: `string` \| `null`

Source Table

##### StockMovementResponse.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### StockMovementResponse.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### SupplierCreate

> **SupplierCreate**: `object`

SupplierCreate

##### SupplierCreate.address?

> `optional` **address**: `string` \| `null`

Address

##### SupplierCreate.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### SupplierCreate.supplier\_name

> **supplier\_name**: `string`

Supplier Name

#### SupplierResponse

> **SupplierResponse**: `object`

SupplierResponse

##### SupplierResponse.address?

> `optional` **address**: `string` \| `null`

Address

##### SupplierResponse.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### SupplierResponse.supplier\_name

> **supplier\_name**: `string`

Supplier Name

#### SupplierUpdate

> **SupplierUpdate**: `object`

SupplierUpdate

##### SupplierUpdate.address?

> `optional` **address**: `string` \| `null`

Address

##### SupplierUpdate.supplier\_name?

> `optional` **supplier\_name**: `string` \| `null`

Supplier Name

#### ValidationError

> **ValidationError**: `object`

ValidationError

##### ValidationError.loc

> **loc**: (`string` \| `number`)[]

Location

##### ValidationError.msg

> **msg**: `string`

Message

##### ValidationError.type

> **type**: `string`

Error Type

#### WarehouseAllocOut

> **WarehouseAllocOut**: `object`

WarehouseAllocOut

##### WarehouseAllocOut.quantity

> **quantity**: `number`

Quantity

##### WarehouseAllocOut.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

#### WarehouseCreate

> **WarehouseCreate**: `object`

WarehouseCreate

##### WarehouseCreate.address?

> `optional` **address**: `string` \| `null`

Address

##### WarehouseCreate.is\_active

> **is\_active**: `number`

Is Active

###### Default

```ts
1
```

##### WarehouseCreate.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### WarehouseCreate.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

#### WarehouseListResponse

> **WarehouseListResponse**: `object`

WarehouseListResponse

##### WarehouseListResponse.items

> **items**: `object`[]

Items

#### WarehouseOut

> **WarehouseOut**: `object`

WarehouseOut

##### WarehouseOut.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### WarehouseOut.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

#### WarehouseResponse

> **WarehouseResponse**: `object`

WarehouseResponse

##### WarehouseResponse.address?

> `optional` **address**: `string` \| `null`

Address

##### WarehouseResponse.is\_active

> **is\_active**: `number`

Is Active

###### Default

```ts
1
```

##### WarehouseResponse.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### WarehouseResponse.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

#### WarehouseUpdate

> **WarehouseUpdate**: `object`

WarehouseUpdate

##### WarehouseUpdate.address?

> `optional` **address**: `string` \| `null`

Address

##### WarehouseUpdate.is\_active

> **is\_active**: `number` \| `null`

Is Active

###### Default

```ts
1
```

##### WarehouseUpdate.warehouse\_name?

> `optional` **warehouse\_name**: `string` \| `null`

Warehouse Name
