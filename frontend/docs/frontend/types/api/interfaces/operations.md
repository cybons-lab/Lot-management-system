[**lot-management-frontend v1.0.0**](../../../README.md)

***

[lot-management-frontend](../../../README.md) / [types/api](../README.md) / operations

# Interface: operations

Defined in: [src/types/api.d.ts:2451](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2451)

## Properties

### activate\_version\_api\_forecast\_activate\_post

> **activate\_version\_api\_forecast\_activate\_post**: `object`

Defined in: [src/types/api.d.ts:4153](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4153)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.deactivate\_others

> **deactivate\_others**: `boolean`

Deactivate Others

###### Default

```ts
true
```

##### requestBody.content.application/json.version\_no

> **version\_no**: `number`

Version No

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.activated\_version

> **activated\_version**: `number`

Activated Version

##### responses.200.content.application/json.deactivated\_versions

> **deactivated\_versions**: `number`[]

Deactivated Versions

###### Default

```ts
[]
```

##### responses.200.content.application/json.message

> **message**: `string`

Message

##### responses.200.content.application/json.success

> **success**: `boolean`

Success

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### allocate\_order\_api\_allocations\_orders\_\_order\_id\_\_allocate\_post

> **allocate\_order\_api\_allocations\_orders\_\_order\_id\_\_allocate\_post**: `object`

Defined in: [src/types/api.d.ts:3615](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3615)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.order\_id

> **order\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_allocation\_ids?

> `optional` **created\_allocation\_ids**: `number`[]

Created Allocation Ids

##### responses.200.content.application/json.order\_id

> **order\_id**: `number`

Order Id

##### responses.200.content.application/json.preview

> **preview**: `object`

##### responses.200.content.application/json.preview.lines?

> `optional` **lines**: `object`[]

Lines

##### responses.200.content.application/json.preview.order\_id

> **order\_id**: `number`

Order Id

##### responses.200.content.application/json.preview.warnings?

> `optional` **warnings**: `string`[]

Warnings

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### bulk\_import\_forecasts\_api\_forecast\_bulk\_post

> **bulk\_import\_forecasts\_api\_forecast\_bulk\_post**: `object`

Defined in: [src/types/api.d.ts:4100](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4100)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.deactivate\_old\_version

> **deactivate\_old\_version**: `boolean`

Deactivate Old Version

###### Default

```ts
true
```

##### requestBody.content.application/json.forecasts

> **forecasts**: `object`[]

Forecasts

##### requestBody.content.application/json.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### requestBody.content.application/json.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### requestBody.content.application/json.version\_no

> **version\_no**: `number`

Version No

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.error\_count

> **error\_count**: `number`

Error Count

##### responses.201.content.application/json.error\_details?

> `optional` **error\_details**: `string` \| `null`

Error Details

##### responses.201.content.application/json.imported\_count

> **imported\_count**: `number`

Imported Count

##### responses.201.content.application/json.message

> **message**: `string`

Message

##### responses.201.content.application/json.skipped\_count

> **skipped\_count**: `number`

Skipped Count

##### responses.201.content.application/json.success

> **success**: `boolean`

Success

##### responses.201.content.application/json.version\_no

> **version\_no**: `number`

Version No

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### bulk\_load\_masters\_api\_masters\_bulk\_load\_post

> **bulk\_load\_masters\_api\_masters\_bulk\_load\_post**: `object`

Defined in: [src/types/api.d.ts:3093](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3093)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.customers?

> `optional` **customers**: `object`[]

Customers

##### requestBody.content.application/json.products?

> `optional` **products**: `object`[]

Products

##### requestBody.content.application/json.suppliers?

> `optional` **suppliers**: `object`[]

Suppliers

##### requestBody.content.application/json.warehouses?

> `optional` **warehouses**: `object`[]

Warehouses

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created?

> `optional` **created**: `object`

Created

###### Index Signature

\[`key`: `string`\]: `string`[]

##### responses.200.content.application/json.warnings?

> `optional` **warnings**: `string`[]

Warnings

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### cancel\_order\_api\_orders\_\_order\_id\_\_cancel\_delete

> **cancel\_order\_api\_orders\_\_order\_id\_\_cancel\_delete**: `object`

Defined in: [src/types/api.d.ts:3491](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3491)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.order\_id

> **order\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_customer\_api\_masters\_customers\_post

> **create\_customer\_api\_masters\_customers\_post**: `object`

Defined in: [src/types/api.d.ts:2645](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2645)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### requestBody.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### requestBody.content.application/json.customer\_name

> **customer\_name**: `string`

Customer Name

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.201.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### responses.201.content.application/json.customer\_name

> **customer\_name**: `string`

Customer Name

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_forecast\_api\_forecast\_post

> **create\_forecast\_api\_forecast\_post**: `object`

Defined in: [src/types/api.d.ts:3972](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3972)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.customer\_id

> **customer\_id**: `string`

Customer Id

##### requestBody.content.application/json.date\_day?

> `optional` **date\_day**: `string` \| `null`

Date Day

##### requestBody.content.application/json.date\_dekad\_start?

> `optional` **date\_dekad\_start**: `string` \| `null`

Date Dekad Start

##### requestBody.content.application/json.granularity

> **granularity**: `"daily"` \| `"dekad"` \| `"monthly"`

Granularity

##### requestBody.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### requestBody.content.application/json.product\_id

> **product\_id**: `string`

Product Id

##### requestBody.content.application/json.qty\_forecast

> **qty\_forecast**: `number`

Qty Forecast

##### requestBody.content.application/json.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### requestBody.content.application/json.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### requestBody.content.application/json.version\_no

> **version\_no**: `number`

Version No

###### Default

```ts
1
```

##### requestBody.content.application/json.year\_month?

> `optional` **year\_month**: `string` \| `null`

Year Month

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.201.content.application/json.customer\_id

> **customer\_id**: `string`

Customer Id

##### responses.201.content.application/json.date\_day?

> `optional` **date\_day**: `string` \| `null`

Date Day

##### responses.201.content.application/json.date\_dekad\_start?

> `optional` **date\_dekad\_start**: `string` \| `null`

Date Dekad Start

##### responses.201.content.application/json.forecast\_id?

> `optional` **forecast\_id**: `number` \| `null`

Forecast Id

##### responses.201.content.application/json.granularity

> **granularity**: `"daily"` \| `"dekad"` \| `"monthly"`

Granularity

##### responses.201.content.application/json.id

> **id**: `number`

Id

##### responses.201.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### responses.201.content.application/json.product\_id

> **product\_id**: `string`

Product Id

##### responses.201.content.application/json.qty\_forecast

> **qty\_forecast**: `number`

Qty Forecast

##### responses.201.content.application/json.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### responses.201.content.application/json.supplier\_id?

> `optional` **supplier\_id**: `string` \| `null`

Supplier Id

##### responses.201.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.201.content.application/json.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### responses.201.content.application/json.version\_no

> **version\_no**: `number`

Version No

###### Default

```ts
1
```

##### responses.201.content.application/json.year\_month?

> `optional` **year\_month**: `string` \| `null`

Year Month

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_lot\_api\_lots\_post

> **create\_lot\_api\_lots\_post**: `object`

Defined in: [src/types/api.d.ts:3164](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3164)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### requestBody.content.application/json.inventory\_unit?

> `optional` **inventory\_unit**: `string` \| `null`

Inventory Unit

##### requestBody.content.application/json.kanban\_class?

> `optional` **kanban\_class**: `string` \| `null`

Kanban Class

##### requestBody.content.application/json.lot\_number

> **lot\_number**: `string`

Lot Number

##### requestBody.content.application/json.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### requestBody.content.application/json.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### requestBody.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### requestBody.content.application/json.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### requestBody.content.application/json.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### requestBody.content.application/json.receipt\_date

> **receipt\_date**: `string`

Receipt Date
Format: date

##### requestBody.content.application/json.received\_by?

> `optional` **received\_by**: `string` \| `null`

Received By

##### requestBody.content.application/json.sales\_unit?

> `optional` **sales\_unit**: `string` \| `null`

Sales Unit

##### requestBody.content.application/json.source\_doc?

> `optional` **source\_doc**: `string` \| `null`

Source Doc

##### requestBody.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### requestBody.content.application/json.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### requestBody.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.201.content.application/json.current\_quantity

> **current\_quantity**: `number`

Current Quantity

###### Default

```ts
0
```

##### responses.201.content.application/json.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### responses.201.content.application/json.id

> **id**: `number`

Id

##### responses.201.content.application/json.inventory\_unit?

> `optional` **inventory\_unit**: `string` \| `null`

Inventory Unit

##### responses.201.content.application/json.kanban\_class?

> `optional` **kanban\_class**: `string` \| `null`

Kanban Class

##### responses.201.content.application/json.last\_updated?

> `optional` **last\_updated**: `string` \| `null`

Last Updated

##### responses.201.content.application/json.lot\_number

> **lot\_number**: `string`

Lot Number

##### responses.201.content.application/json.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### responses.201.content.application/json.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### responses.201.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.201.content.application/json.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

##### responses.201.content.application/json.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### responses.201.content.application/json.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### responses.201.content.application/json.receipt\_date

> **receipt\_date**: `string`

Receipt Date
Format: date

##### responses.201.content.application/json.received\_by?

> `optional` **received\_by**: `string` \| `null`

Received By

##### responses.201.content.application/json.sales\_unit?

> `optional` **sales\_unit**: `string` \| `null`

Sales Unit

##### responses.201.content.application/json.source\_doc?

> `optional` **source\_doc**: `string` \| `null`

Source Doc

##### responses.201.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### responses.201.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.201.content.application/json.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### responses.201.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_order\_api\_orders\_post

> **create\_order\_api\_orders\_post**: `object`

Defined in: [src/types/api.d.ts:3392](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3392)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### requestBody.content.application/json.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### requestBody.content.application/json.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### requestBody.content.application/json.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### requestBody.content.application/json.lines?

> `optional` **lines**: `object`[]

Lines

##### requestBody.content.application/json.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### requestBody.content.application/json.order\_no

> **order\_no**: `string`

Order No

##### requestBody.content.application/json.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### requestBody.content.application/json.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### requestBody.content.application/json.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### requestBody.content.application/json.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### requestBody.content.application/json.status

> **status**: `string`

Status

###### Default

```ts
open
```

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.201.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### responses.201.content.application/json.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### responses.201.content.application/json.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### responses.201.content.application/json.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### responses.201.content.application/json.id

> **id**: `number`

Id

##### responses.201.content.application/json.lines?

> `optional` **lines**: `object`[]

Lines

##### responses.201.content.application/json.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### responses.201.content.application/json.order\_no

> **order\_no**: `string`

Order No

##### responses.201.content.application/json.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### responses.201.content.application/json.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### responses.201.content.application/json.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### responses.201.content.application/json.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### responses.201.content.application/json.status

> **status**: `string`

Status

###### Default

```ts
open
```

##### responses.201.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_product\_api\_masters\_products\_post

> **create\_product\_api\_masters\_products\_post**: `object`

Defined in: [src/types/api.d.ts:2485](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2485)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### requestBody.content.application/json.base\_unit

> **base\_unit**: `string`

Base Unit

###### Default

```ts
EA
```

##### requestBody.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### requestBody.content.application/json.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### requestBody.content.application/json.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### requestBody.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### requestBody.content.application/json.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### requestBody.content.application/json.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### requestBody.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### requestBody.content.application/json.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### requestBody.content.application/json.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### requestBody.content.application/json.packaging\_qty

> **packaging\_qty**: `string` \| `number`

Packaging Qty

##### requestBody.content.application/json.packaging\_unit

> **packaging\_unit**: `string`

Packaging Unit

##### requestBody.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### requestBody.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### requestBody.content.application/json.requires\_lot\_number

> **requires\_lot\_number**: `boolean`

Requires Lot Number

###### Default

```ts
true
```

##### requestBody.content.application/json.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### requestBody.content.application/json.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### requestBody.content.application/json.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### requestBody.content.application/json.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### responses.201.content.application/json.base\_unit

> **base\_unit**: `string`

Base Unit

###### Default

```ts
EA
```

##### responses.201.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### responses.201.content.application/json.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### responses.201.content.application/json.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### responses.201.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### responses.201.content.application/json.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### responses.201.content.application/json.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### responses.201.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### responses.201.content.application/json.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### responses.201.content.application/json.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### responses.201.content.application/json.packaging\_qty

> **packaging\_qty**: `string`

Packaging Qty

##### responses.201.content.application/json.packaging\_unit

> **packaging\_unit**: `string`

Packaging Unit

##### responses.201.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.201.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### responses.201.content.application/json.requires\_lot\_number

> **requires\_lot\_number**: `boolean`

Requires Lot Number

###### Default

```ts
true
```

##### responses.201.content.application/json.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### responses.201.content.application/json.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### responses.201.content.application/json.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### responses.201.content.application/json.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_product\_api\_products\_post

> **create\_product\_api\_products\_post**: `object`

Defined in: [src/types/api.d.ts:4252](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4252)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### requestBody.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### requestBody.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### requestBody.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### requestBody.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### requestBody.content.application/json.product\_name

> **product\_name**: `string`

Product Name

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.201.content.application/json.customer\_part\_no

> **customer\_part\_no**: `string` \| `null`

Customer Part No

##### responses.201.content.application/json.id

> **id**: `number`

Id

##### responses.201.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### responses.201.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

##### responses.201.content.application/json.maker\_item\_code

> **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### responses.201.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.201.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### responses.201.content.application/json.updated\_at

> **updated\_at**: `string`

Updated At
Format: date-time

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_stock\_movement\_api\_lots\_movements\_post

> **create\_stock\_movement\_api\_lots\_movements\_post**: `object`

Defined in: [src/types/api.d.ts:3323](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3323)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.batch\_id?

> `optional` **batch\_id**: `string` \| `null`

Batch Id

##### requestBody.content.application/json.created\_by

> **created\_by**: `string`

Created By

###### Default

```ts
system
```

##### requestBody.content.application/json.lot\_id?

> `optional` **lot\_id**: `number` \| `null`

Lot Id

##### requestBody.content.application/json.product\_id

> **product\_id**: `string`

Product Id

##### requestBody.content.application/json.quantity\_delta

> **quantity\_delta**: `number`

Quantity Delta

##### requestBody.content.application/json.reason

> **reason**: `string`

Reason

##### requestBody.content.application/json.source\_id?

> `optional` **source\_id**: `number` \| `null`

Source Id

##### requestBody.content.application/json.source\_table?

> `optional` **source\_table**: `string` \| `null`

Source Table

##### requestBody.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.batch\_id?

> `optional` **batch\_id**: `string` \| `null`

Batch Id

##### responses.201.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.201.content.application/json.created\_by

> **created\_by**: `string`

Created By

###### Default

```ts
system
```

##### responses.201.content.application/json.id

> **id**: `number`

Id

##### responses.201.content.application/json.lot\_id?

> `optional` **lot\_id**: `number` \| `null`

Lot Id

##### responses.201.content.application/json.occurred\_at

> **occurred\_at**: `string`

Occurred At
Format: date-time

##### responses.201.content.application/json.product\_id

> **product\_id**: `string`

Product Id

##### responses.201.content.application/json.quantity\_delta

> **quantity\_delta**: `number`

Quantity Delta

##### responses.201.content.application/json.reason

> **reason**: `string`

Reason

##### responses.201.content.application/json.source\_id?

> `optional` **source\_id**: `number` \| `null`

Source Id

##### responses.201.content.application/json.source\_table?

> `optional` **source\_table**: `string` \| `null`

Source Table

##### responses.201.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.201.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_supplier\_api\_masters\_suppliers\_post

> **create\_supplier\_api\_masters\_suppliers\_post**: `object`

Defined in: [src/types/api.d.ts:2805](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2805)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### requestBody.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### requestBody.content.application/json.supplier\_name

> **supplier\_name**: `string`

Supplier Name

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.201.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### responses.201.content.application/json.supplier\_name

> **supplier\_name**: `string`

Supplier Name

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### create\_warehouse\_api\_masters\_warehouses\_post

> **create\_warehouse\_api\_masters\_warehouses\_post**: `object`

Defined in: [src/types/api.d.ts:2965](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2965)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### requestBody.content.application/json.is\_active

> **is\_active**: `number`

Is Active

###### Default

```ts
1
```

##### requestBody.content.application/json.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### requestBody.content.application/json.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

#### responses

> **responses**: `object`

##### responses.201

> **201**: `object`

###### Description

Successful Response

##### responses.201.content

> **content**: `object`

##### responses.201.content.application/json

> **application/json**: `object`

##### responses.201.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.201.content.application/json.is\_active

> **is\_active**: `number`

Is Active

###### Default

```ts
1
```

##### responses.201.content.application/json.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### responses.201.content.application/json.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

##### responses.201.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_allocation\_api\_allocations\_\_allocation\_id\_\_delete

> **delete\_allocation\_api\_allocations\_\_allocation\_id\_\_delete**: `object`

Defined in: [src/types/api.d.ts:3553](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3553)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.allocation\_id

> **allocation\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_customer\_api\_masters\_customers\_\_customer\_code\_\_delete

> **delete\_customer\_api\_masters\_customers\_\_customer\_code\_\_delete**: `object`

Defined in: [src/types/api.d.ts:2744](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2744)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.customer\_code

> **customer\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_forecast\_api\_forecast\_\_forecast\_id\_\_delete

> **delete\_forecast\_api\_forecast\_\_forecast\_id\_\_delete**: `object`

Defined in: [src/types/api.d.ts:4071](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4071)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.forecast\_id

> **forecast\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_lot\_api\_lots\_\_lot\_id\_\_delete

> **delete\_lot\_api\_lots\_\_lot\_id\_\_delete**: `object`

Defined in: [src/types/api.d.ts:3263](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3263)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.lot\_id

> **lot\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_product\_api\_masters\_products\_\_product\_code\_\_delete

> **delete\_product\_api\_masters\_products\_\_product\_code\_\_delete**: `object`

Defined in: [src/types/api.d.ts:2584](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2584)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.product\_code

> **product\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_product\_api\_products\_\_product\_id\_\_delete

> **delete\_product\_api\_products\_\_product\_id\_\_delete**: `object`

Defined in: [src/types/api.d.ts:4316](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4316)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.product\_id

> **product\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_supplier\_api\_masters\_suppliers\_\_supplier\_code\_\_delete

> **delete\_supplier\_api\_masters\_suppliers\_\_supplier\_code\_\_delete**: `object`

Defined in: [src/types/api.d.ts:2904](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2904)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.supplier\_code

> **supplier\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### delete\_warehouse\_api\_masters\_warehouses\_\_warehouse\_code\_\_delete

> **delete\_warehouse\_api\_masters\_warehouses\_\_warehouse\_code\_\_delete**: `object`

Defined in: [src/types/api.d.ts:3064](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3064)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.warehouse\_code

> **warehouse\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.204

> **204**: `object`

###### Description

Successful Response

##### responses.204.content?

> `optional` **content**: `undefined`

##### responses.204.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### drag\_assign\_allocation\_api\_allocations\_drag\_assign\_post

> **drag\_assign\_allocation\_api\_allocations\_drag\_assign\_post**: `object`

Defined in: [src/types/api.d.ts:3520](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3520)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.allocate\_qty

> **allocate\_qty**: `number`

Allocate Qty

##### requestBody.content.application/json.lot\_id

> **lot\_id**: `number`

Lot Id

##### requestBody.content.application/json.order\_line\_id

> **order\_line\_id**: `number`

Order Line Id

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `unknown`

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_customer\_api\_masters\_customers\_\_customer\_code\_\_get

> **get\_customer\_api\_masters\_customers\_\_customer\_code\_\_get**: `object`

Defined in: [src/types/api.d.ts:2678](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2678)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.customer\_code

> **customer\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.200.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### responses.200.content.application/json.customer\_name

> **customer\_name**: `string`

Customer Name

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_dashboard\_stats\_api\_admin\_stats\_get

> **get\_dashboard\_stats\_api\_admin\_stats\_get**: `object`

Defined in: [src/types/api.d.ts:3776](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3776)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.total\_orders

> **total\_orders**: `number`

Total Orders

##### responses.200.content.application/json.total\_stock

> **total\_stock**: `number`

Total Stock

##### responses.200.content.application/json.unallocated\_orders

> **unallocated\_orders**: `number`

Unallocated Orders

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_forecast\_api\_forecast\_\_forecast\_id\_\_get

> **get\_forecast\_api\_forecast\_\_forecast\_id\_\_get**: `object`

Defined in: [src/types/api.d.ts:4005](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4005)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.forecast\_id

> **forecast\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.customer\_id

> **customer\_id**: `string`

Customer Id

##### responses.200.content.application/json.date\_day?

> `optional` **date\_day**: `string` \| `null`

Date Day

##### responses.200.content.application/json.date\_dekad\_start?

> `optional` **date\_dekad\_start**: `string` \| `null`

Date Dekad Start

##### responses.200.content.application/json.forecast\_id?

> `optional` **forecast\_id**: `number` \| `null`

Forecast Id

##### responses.200.content.application/json.granularity

> **granularity**: `"daily"` \| `"dekad"` \| `"monthly"`

Granularity

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### responses.200.content.application/json.product\_id

> **product\_id**: `string`

Product Id

##### responses.200.content.application/json.qty\_forecast

> **qty\_forecast**: `number`

Qty Forecast

##### responses.200.content.application/json.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### responses.200.content.application/json.supplier\_id?

> `optional` **supplier\_id**: `string` \| `null`

Supplier Id

##### responses.200.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.200.content.application/json.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### responses.200.content.application/json.version\_no

> **version\_no**: `number`

Version No

###### Default

```ts
1
```

##### responses.200.content.application/json.year\_month?

> `optional` **year\_month**: `string` \| `null`

Year Month

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_lot\_api\_lots\_\_lot\_id\_\_get

> **get\_lot\_api\_lots\_\_lot\_id\_\_get**: `object`

Defined in: [src/types/api.d.ts:3197](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3197)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.lot\_id

> **lot\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.current\_quantity

> **current\_quantity**: `number`

Current Quantity

###### Default

```ts
0
```

##### responses.200.content.application/json.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.inventory\_unit?

> `optional` **inventory\_unit**: `string` \| `null`

Inventory Unit

##### responses.200.content.application/json.kanban\_class?

> `optional` **kanban\_class**: `string` \| `null`

Kanban Class

##### responses.200.content.application/json.last\_updated?

> `optional` **last\_updated**: `string` \| `null`

Last Updated

##### responses.200.content.application/json.lot\_number

> **lot\_number**: `string`

Lot Number

##### responses.200.content.application/json.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### responses.200.content.application/json.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### responses.200.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.200.content.application/json.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

##### responses.200.content.application/json.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### responses.200.content.application/json.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### responses.200.content.application/json.receipt\_date

> **receipt\_date**: `string`

Receipt Date
Format: date

##### responses.200.content.application/json.received\_by?

> `optional` **received\_by**: `string` \| `null`

Received By

##### responses.200.content.application/json.sales\_unit?

> `optional` **sales\_unit**: `string` \| `null`

Sales Unit

##### responses.200.content.application/json.source\_doc?

> `optional` **source\_doc**: `string` \| `null`

Source Doc

##### responses.200.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### responses.200.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.200.content.application/json.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### responses.200.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_order\_api\_orders\_\_order\_id\_\_get

> **get\_order\_api\_orders\_\_order\_id\_\_get**: `object`

Defined in: [src/types/api.d.ts:3425](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3425)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.order\_id

> **order\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### responses.200.content.application/json.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### responses.200.content.application/json.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### responses.200.content.application/json.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.lines?

> `optional` **lines**: `object`[]

Lines

##### responses.200.content.application/json.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### responses.200.content.application/json.order\_no

> **order\_no**: `string`

Order No

##### responses.200.content.application/json.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### responses.200.content.application/json.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### responses.200.content.application/json.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### responses.200.content.application/json.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### responses.200.content.application/json.status

> **status**: `string`

Status

###### Default

```ts
open
```

##### responses.200.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_product\_api\_masters\_products\_\_product\_code\_\_get

> **get\_product\_api\_masters\_products\_\_product\_code\_\_get**: `object`

Defined in: [src/types/api.d.ts:2518](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2518)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.product\_code

> **product\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### responses.200.content.application/json.base\_unit

> **base\_unit**: `string`

Base Unit

###### Default

```ts
EA
```

##### responses.200.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### responses.200.content.application/json.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### responses.200.content.application/json.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### responses.200.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### responses.200.content.application/json.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### responses.200.content.application/json.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### responses.200.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### responses.200.content.application/json.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### responses.200.content.application/json.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### responses.200.content.application/json.packaging\_qty

> **packaging\_qty**: `string`

Packaging Qty

##### responses.200.content.application/json.packaging\_unit

> **packaging\_unit**: `string`

Packaging Unit

##### responses.200.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.200.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### responses.200.content.application/json.requires\_lot\_number

> **requires\_lot\_number**: `boolean`

Requires Lot Number

###### Default

```ts
true
```

##### responses.200.content.application/json.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### responses.200.content.application/json.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### responses.200.content.application/json.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### responses.200.content.application/json.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_product\_api\_products\_\_product\_id\_\_get

> **get\_product\_api\_products\_\_product\_id\_\_get**: `object`

Defined in: [src/types/api.d.ts:4285](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4285)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.product\_id

> **product\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.customer\_part\_no

> **customer\_part\_no**: `string` \| `null`

Customer Part No

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### responses.200.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

##### responses.200.content.application/json.maker\_item\_code

> **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### responses.200.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.200.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### responses.200.content.application/json.updated\_at

> **updated\_at**: `string`

Updated At
Format: date-time

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_supplier\_api\_masters\_suppliers\_\_supplier\_code\_\_get

> **get\_supplier\_api\_masters\_suppliers\_\_supplier\_code\_\_get**: `object`

Defined in: [src/types/api.d.ts:2838](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2838)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.supplier\_code

> **supplier\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.200.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### responses.200.content.application/json.supplier\_name

> **supplier\_name**: `string`

Supplier Name

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### get\_warehouse\_api\_masters\_warehouses\_\_warehouse\_code\_\_get

> **get\_warehouse\_api\_masters\_warehouses\_\_warehouse\_code\_\_get**: `object`

Defined in: [src/types/api.d.ts:2998](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2998)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.warehouse\_code

> **warehouse\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.200.content.application/json.is\_active

> **is\_active**: `number`

Is Active

###### Default

```ts
1
```

##### responses.200.content.application/json.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### responses.200.content.application/json.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### health\_api\_health\_get

> **health\_api\_health\_get**: `object`

Defined in: [src/types/api.d.ts:4440](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4440)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `unknown`

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### healthz\_api\_healthz\_get

> **healthz\_api\_healthz\_get**: `object`

Defined in: [src/types/api.d.ts:4400](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4400)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `unknown`

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_customers\_api\_masters\_customers\_get

> **list\_customers\_api\_masters\_customers\_get**: `object`

Defined in: [src/types/api.d.ts:2613](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2613)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.skip?

> `optional` **skip**: `number`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_forecast\_summary\_api\_forecast\_list\_get

> **list\_forecast\_summary\_api\_forecast\_list\_get**: `object`

Defined in: [src/types/api.d.ts:3901](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3901)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.product\_code?

> `optional` **product\_code**: `string` \| `null`

##### parameters.query.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.items

> **items**: `object`[]

Items

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_forecasts\_api\_forecast\_get

> **list\_forecasts\_api\_forecast\_get**: `object`

Defined in: [src/types/api.d.ts:3933](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3933)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.customer\_code?

> `optional` **customer\_code**: `string` \| `null`

##### parameters.query.customer\_id?

> `optional` **customer\_id**: `string` \| `null`

##### parameters.query.granularity?

> `optional` **granularity**: `string` \| `null`

##### parameters.query.is\_active?

> `optional` **is\_active**: `boolean` \| `null`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.product\_code?

> `optional` **product\_code**: `string` \| `null`

##### parameters.query.product\_id?

> `optional` **product\_id**: `string` \| `null`

##### parameters.query.skip?

> `optional` **skip**: `number`

##### parameters.query.version\_no?

> `optional` **version\_no**: `number` \| `null`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_lot\_movements\_api\_lots\_\_lot\_id\_\_movements\_get

> **list\_lot\_movements\_api\_lots\_\_lot\_id\_\_movements\_get**: `object`

Defined in: [src/types/api.d.ts:3292](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3292)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.lot\_id

> **lot\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_lots\_api\_lots\_get

> **list\_lots\_api\_lots\_get**: `object`

Defined in: [src/types/api.d.ts:3126](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3126)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.expiry\_from?

> `optional` **expiry\_from**: `string` \| `null`

##### parameters.query.expiry\_to?

> `optional` **expiry\_to**: `string` \| `null`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.product\_code?

> `optional` **product\_code**: `string` \| `null`

##### parameters.query.skip?

> `optional` **skip**: `number`

##### parameters.query.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

##### parameters.query.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

##### parameters.query.with\_stock?

> `optional` **with\_stock**: `boolean`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_ocr\_submissions\_api\_integration\_ai\_ocr\_submissions\_get

> **list\_ocr\_submissions\_api\_integration\_ai\_ocr\_submissions\_get**: `object`

Defined in: [src/types/api.d.ts:3679](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3679)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.skip?

> `optional` **skip**: `number`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_orders\_api\_orders\_get

> **list\_orders\_api\_orders\_get**: `object`

Defined in: [src/types/api.d.ts:3356](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3356)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.customer\_code?

> `optional` **customer\_code**: `string` \| `null`

##### parameters.query.date\_from?

> `optional` **date\_from**: `string` \| `null`

##### parameters.query.date\_to?

> `optional` **date\_to**: `string` \| `null`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.skip?

> `optional` **skip**: `number`

##### parameters.query.status?

> `optional` **status**: `string` \| `null`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_presets\_api\_admin\_presets\_get

> **list\_presets\_api\_admin\_presets\_get**: `object`

Defined in: [src/types/api.d.ts:3849](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3849)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.presets

> **presets**: `string`[]

Presets

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_products\_api\_masters\_products\_get

> **list\_products\_api\_masters\_products\_get**: `object`

Defined in: [src/types/api.d.ts:2452](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2452)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.search?

> `optional` **search**: `string` \| `null`

##### parameters.query.skip?

> `optional` **skip**: `number`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_products\_api\_products\_get

> **list\_products\_api\_products\_get**: `object`

Defined in: [src/types/api.d.ts:4219](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4219)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.page?

> `optional` **page**: `number`

##### parameters.query.per\_page?

> `optional` **per\_page**: `number`

##### parameters.query.q?

> `optional` **q**: `string` \| `null`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.items

> **items**: `object`[]

Items

##### responses.200.content.application/json.page

> **page**: `number`

Page

##### responses.200.content.application/json.per\_page

> **per\_page**: `number`

Per Page

##### responses.200.content.application/json.total

> **total**: `number`

Total

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_sap\_logs\_api\_integration\_sap\_logs\_get

> **list\_sap\_logs\_api\_integration\_sap\_logs\_get**: `object`

Defined in: [src/types/api.d.ts:3744](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3744)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.skip?

> `optional` **skip**: `number`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_suppliers\_api\_masters\_suppliers\_get

> **list\_suppliers\_api\_masters\_suppliers\_get**: `object`

Defined in: [src/types/api.d.ts:2773](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2773)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.skip?

> `optional` **skip**: `number`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_versions\_api\_forecast\_versions\_get

> **list\_versions\_api\_forecast\_versions\_get**: `object`

Defined in: [src/types/api.d.ts:4133](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4133)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.versions

> **versions**: `object`[]

Versions

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_warehouses\_api\_masters\_warehouses\_get

> **list\_warehouses\_api\_masters\_warehouses\_get**: `object`

Defined in: [src/types/api.d.ts:2933](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2933)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `object`

##### parameters.query.limit?

> `optional` **limit**: `number`

##### parameters.query.skip?

> `optional` **skip**: `number`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`[]

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### list\_warehouses\_api\_warehouse\_alloc\_warehouses\_get

> **list\_warehouses\_api\_warehouse\_alloc\_warehouses\_get**: `object`

Defined in: [src/types/api.d.ts:4380](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4380)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.items

> **items**: `object`[]

Items

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### load\_full\_sample\_data\_api\_admin\_load\_full\_sample\_data\_post

> **load\_full\_sample\_data\_api\_admin\_load\_full\_sample\_data\_post**: `object`

Defined in: [src/types/api.d.ts:3816](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3816)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.lots?

> `optional` **lots**: `object`[] \| `null`

Lots

##### requestBody.content.application/json.orders?

> `optional` **orders**: `object`[] \| `null`

Orders

##### requestBody.content.application/json.products?

> `optional` **products**: `object`[] \| `null`

Products

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.data?

> `optional` **data**: `Record`\<`string`, `never`\> \| `null`

Data

##### responses.200.content.application/json.message?

> `optional` **message**: `string` \| `null`

Message

##### responses.200.content.application/json.success

> **success**: `boolean`

Success

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### load\_preset\_api\_admin\_load\_preset\_post

> **load\_preset\_api\_admin\_load\_preset\_post**: `object`

Defined in: [src/types/api.d.ts:3869](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3869)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query

> **query**: `object`

##### parameters.query.name

> **name**: `string`

###### Description

プリセット名

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.preset

> **preset**: `string`

Preset

##### responses.200.content.application/json.result

> **result**: `object`

##### responses.200.content.application/json.result.created?

> `optional` **created**: `object`

Created

###### Index Signature

\[`key`: `string`\]: `string`[]

##### responses.200.content.application/json.result.warnings?

> `optional` **warnings**: `string`[]

Warnings

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### match\_forecasts\_api\_forecast\_match\_post

> **match\_forecasts\_api\_forecast\_match\_post**: `object`

Defined in: [src/types/api.d.ts:4186](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4186)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.date\_from?

> `optional` **date\_from**: `string` \| `null`

Date From

##### requestBody.content.application/json.date\_to?

> `optional` **date\_to**: `string` \| `null`

Date To

##### requestBody.content.application/json.force\_rematch

> **force\_rematch**: `boolean`

Force Rematch

###### Default

```ts
false
```

##### requestBody.content.application/json.order\_id?

> `optional` **order\_id**: `number` \| `null`

Order Id

##### requestBody.content.application/json.order\_ids?

> `optional` **order\_ids**: `number`[] \| `null`

Order Ids

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.matched\_lines

> **matched\_lines**: `number`

Matched Lines

##### responses.200.content.application/json.message

> **message**: `string`

Message

##### responses.200.content.application/json.results

> **results**: `object`[]

Results

###### Default

```ts
[]
```

##### responses.200.content.application/json.success

> **success**: `boolean`

Success

##### responses.200.content.application/json.total\_lines

> **total\_lines**: `number`

Total Lines

##### responses.200.content.application/json.unmatched\_lines

> **unmatched\_lines**: `number`

Unmatched Lines

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### preview\_allocations\_api\_allocations\_preview\_post

> **preview\_allocations\_api\_allocations\_preview\_post**: `object`

Defined in: [src/types/api.d.ts:3582](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3582)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.order\_id

> **order\_id**: `number`

Order Id

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.lines?

> `optional` **lines**: `object`[]

Lines

##### responses.200.content.application/json.order\_id

> **order\_id**: `number`

Order Id

##### responses.200.content.application/json.warnings?

> `optional` **warnings**: `string`[]

Warnings

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### readyz\_api\_readyz\_get

> **readyz\_api\_readyz\_get**: `object`

Defined in: [src/types/api.d.ts:4420](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4420)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `unknown`

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### register\_to\_sap\_api\_integration\_sap\_register\_post

> **register\_to\_sap\_api\_integration\_sap\_register\_post**: `object`

Defined in: [src/types/api.d.ts:3711](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3711)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.options

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

##### requestBody.content.application/json.target

> **target**: `object`

##### requestBody.content.application/json.target.type

> **type**: `string`

Type

##### requestBody.content.application/json.target.value

> **value**: `unknown`

Value

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.error\_message?

> `optional` **error\_message**: `string` \| `null`

Error Message

##### responses.200.content.application/json.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### responses.200.content.application/json.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### responses.200.content.application/json.sent

> **sent**: `number`

Sent

##### responses.200.content.application/json.status

> **status**: `string`

Status

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### reset\_database\_api\_admin\_reset\_database\_post

> **reset\_database\_api\_admin\_reset\_database\_post**: `object`

Defined in: [src/types/api.d.ts:3796](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3796)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.data?

> `optional` **data**: `Record`\<`string`, `never`\> \| `null`

Data

##### responses.200.content.application/json.message?

> `optional` **message**: `string` \| `null`

Message

##### responses.200.content.application/json.success

> **success**: `boolean`

Success

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### root\_\_get

> **root\_\_get**: `object`

Defined in: [src/types/api.d.ts:4493](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4493)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody?

> `optional` **requestBody**: `undefined`

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `unknown`

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### submit\_ocr\_data\_api\_integration\_ai\_ocr\_submit\_post

> **submit\_ocr\_data\_api\_integration\_ai\_ocr\_submit\_post**: `object`

Defined in: [src/types/api.d.ts:3646](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3646)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.file\_name?

> `optional` **file\_name**: `string` \| `null`

File Name

##### requestBody.content.application/json.operator?

> `optional` **operator**: `string` \| `null`

Operator

##### requestBody.content.application/json.records

> **records**: `object`[]

Records

##### requestBody.content.application/json.schema\_version

> **schema\_version**: `string`

Schema Version

###### Default

```ts
1.0.0
```

##### requestBody.content.application/json.source

> **source**: `string`

Source

###### Default

```ts
PAD
```

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_lines

> **created\_lines**: `number`

Created Lines

##### responses.200.content.application/json.created\_orders

> **created\_orders**: `number`

Created Orders

##### responses.200.content.application/json.error\_details?

> `optional` **error\_details**: `string` \| `null`

Error Details

##### responses.200.content.application/json.failed\_records

> **failed\_records**: `number`

Failed Records

##### responses.200.content.application/json.processed\_records

> **processed\_records**: `number`

Processed Records

##### responses.200.content.application/json.skipped\_records

> **skipped\_records**: `number`

Skipped Records

##### responses.200.content.application/json.status

> **status**: `string`

Status

##### responses.200.content.application/json.submission\_id

> **submission\_id**: `string`

Submission Id

##### responses.200.content.application/json.total\_records

> **total\_records**: `number`

Total Records

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_customer\_api\_masters\_customers\_\_customer\_code\_\_put

> **update\_customer\_api\_masters\_customers\_\_customer\_code\_\_put**: `object`

Defined in: [src/types/api.d.ts:2709](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2709)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.customer\_code

> **customer\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### requestBody.content.application/json.customer\_name?

> `optional` **customer\_name**: `string` \| `null`

Customer Name

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.200.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### responses.200.content.application/json.customer\_name

> **customer\_name**: `string`

Customer Name

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_forecast\_api\_forecast\_\_forecast\_id\_\_put

> **update\_forecast\_api\_forecast\_\_forecast\_id\_\_put**: `object`

Defined in: [src/types/api.d.ts:4036](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4036)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.forecast\_id

> **forecast\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.is\_active?

> `optional` **is\_active**: `boolean` \| `null`

Is Active

##### requestBody.content.application/json.qty\_forecast?

> `optional` **qty\_forecast**: `number` \| `null`

Qty Forecast

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.customer\_id

> **customer\_id**: `string`

Customer Id

##### responses.200.content.application/json.date\_day?

> `optional` **date\_day**: `string` \| `null`

Date Day

##### responses.200.content.application/json.date\_dekad\_start?

> `optional` **date\_dekad\_start**: `string` \| `null`

Date Dekad Start

##### responses.200.content.application/json.forecast\_id?

> `optional` **forecast\_id**: `number` \| `null`

Forecast Id

##### responses.200.content.application/json.granularity

> **granularity**: `"daily"` \| `"dekad"` \| `"monthly"`

Granularity

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

###### Default

```ts
true
```

##### responses.200.content.application/json.product\_id

> **product\_id**: `string`

Product Id

##### responses.200.content.application/json.qty\_forecast

> **qty\_forecast**: `number`

Qty Forecast

##### responses.200.content.application/json.source\_system

> **source\_system**: `string`

Source System

###### Default

```ts
external
```

##### responses.200.content.application/json.supplier\_id?

> `optional` **supplier\_id**: `string` \| `null`

Supplier Id

##### responses.200.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.200.content.application/json.version\_issued\_at

> **version\_issued\_at**: `string`

Version Issued At
Format: date-time

##### responses.200.content.application/json.version\_no

> **version\_no**: `number`

Version No

###### Default

```ts
1
```

##### responses.200.content.application/json.year\_month?

> `optional` **year\_month**: `string` \| `null`

Year Month

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_lot\_api\_lots\_\_lot\_id\_\_put

> **update\_lot\_api\_lots\_\_lot\_id\_\_put**: `object`

Defined in: [src/types/api.d.ts:3228](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3228)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.lot\_id

> **lot\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### requestBody.content.application/json.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### requestBody.content.application/json.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### requestBody.content.application/json.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### requestBody.content.application/json.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### requestBody.content.application/json.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### requestBody.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.current\_quantity

> **current\_quantity**: `number`

Current Quantity

###### Default

```ts
0
```

##### responses.200.content.application/json.expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

Expiry Date

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.inventory\_unit?

> `optional` **inventory\_unit**: `string` \| `null`

Inventory Unit

##### responses.200.content.application/json.kanban\_class?

> `optional` **kanban\_class**: `string` \| `null`

Kanban Class

##### responses.200.content.application/json.last\_updated?

> `optional` **last\_updated**: `string` \| `null`

Last Updated

##### responses.200.content.application/json.lot\_number

> **lot\_number**: `string`

Lot Number

##### responses.200.content.application/json.lot\_unit?

> `optional` **lot\_unit**: `string` \| `null`

Lot Unit

##### responses.200.content.application/json.mfg\_date?

> `optional` **mfg\_date**: `string` \| `null`

Mfg Date

##### responses.200.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.200.content.application/json.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

##### responses.200.content.application/json.qc\_certificate\_file?

> `optional` **qc\_certificate\_file**: `string` \| `null`

Qc Certificate File

##### responses.200.content.application/json.qc\_certificate\_status?

> `optional` **qc\_certificate\_status**: `string` \| `null`

Qc Certificate Status

##### responses.200.content.application/json.receipt\_date

> **receipt\_date**: `string`

Receipt Date
Format: date

##### responses.200.content.application/json.received\_by?

> `optional` **received\_by**: `string` \| `null`

Received By

##### responses.200.content.application/json.sales\_unit?

> `optional` **sales\_unit**: `string` \| `null`

Sales Unit

##### responses.200.content.application/json.source\_doc?

> `optional` **source\_doc**: `string` \| `null`

Source Doc

##### responses.200.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### responses.200.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.200.content.application/json.warehouse\_code?

> `optional` **warehouse\_code**: `string` \| `null`

Warehouse Code

##### responses.200.content.application/json.warehouse\_id?

> `optional` **warehouse\_id**: `number` \| `null`

Warehouse Id

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_order\_status\_api\_orders\_\_order\_id\_\_status\_patch

> **update\_order\_status\_api\_orders\_\_order\_id\_\_status\_patch**: `object`

Defined in: [src/types/api.d.ts:3456](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3456)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.order\_id

> **order\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.status

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

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.customer\_code

> **customer\_code**: `string`

Customer Code

##### responses.200.content.application/json.customer\_order\_no?

> `optional` **customer\_order\_no**: `string` \| `null`

Customer Order No

##### responses.200.content.application/json.customer\_order\_no\_last6?

> `optional` **customer\_order\_no\_last6**: `string` \| `null`

Customer Order No Last6

##### responses.200.content.application/json.delivery\_mode?

> `optional` **delivery\_mode**: `string` \| `null`

Delivery Mode

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.order\_date

> **order\_date**: `string`

Order Date
Format: date

##### responses.200.content.application/json.order\_no

> **order\_no**: `string`

Order No

##### responses.200.content.application/json.sap\_error\_msg?

> `optional` **sap\_error\_msg**: `string` \| `null`

Sap Error Msg

##### responses.200.content.application/json.sap\_order\_id?

> `optional` **sap\_order\_id**: `string` \| `null`

Sap Order Id

##### responses.200.content.application/json.sap\_sent\_at?

> `optional` **sap\_sent\_at**: `string` \| `null`

Sap Sent At

##### responses.200.content.application/json.sap\_status?

> `optional` **sap\_status**: `string` \| `null`

Sap Status

##### responses.200.content.application/json.status

> **status**: `string`

Status

###### Default

```ts
open
```

##### responses.200.content.application/json.updated\_at?

> `optional` **updated\_at**: `string` \| `null`

Updated At

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_product\_api\_masters\_products\_\_product\_code\_\_put

> **update\_product\_api\_masters\_products\_\_product\_code\_\_put**: `object`

Defined in: [src/types/api.d.ts:2549](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2549)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.product\_code

> **product\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### requestBody.content.application/json.base\_unit?

> `optional` **base\_unit**: `string` \| `null`

Base Unit

##### requestBody.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### requestBody.content.application/json.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### requestBody.content.application/json.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### requestBody.content.application/json.internal\_unit?

> `optional` **internal\_unit**: `string` \| `null`

Internal Unit

##### requestBody.content.application/json.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### requestBody.content.application/json.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### requestBody.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### requestBody.content.application/json.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### requestBody.content.application/json.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### requestBody.content.application/json.packaging\_qty?

> `optional` **packaging\_qty**: `string` \| `number` \| `null`

Packaging Qty

##### requestBody.content.application/json.packaging\_unit?

> `optional` **packaging\_unit**: `string` \| `null`

Packaging Unit

##### requestBody.content.application/json.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

##### requestBody.content.application/json.requires\_lot\_number?

> `optional` **requires\_lot\_number**: `boolean` \| `null`

Requires Lot Number

##### requestBody.content.application/json.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### requestBody.content.application/json.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### requestBody.content.application/json.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### requestBody.content.application/json.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.assemble\_div?

> `optional` **assemble\_div**: `string` \| `null`

Assemble Div

##### responses.200.content.application/json.base\_unit

> **base\_unit**: `string`

Base Unit

###### Default

```ts
EA
```

##### responses.200.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### responses.200.content.application/json.delivery\_place\_id?

> `optional` **delivery\_place\_id**: `number` \| `null`

Delivery Place Id

##### responses.200.content.application/json.delivery\_place\_name?

> `optional` **delivery\_place\_name**: `string` \| `null`

Delivery Place Name

##### responses.200.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### responses.200.content.application/json.ji\_ku\_text?

> `optional` **ji\_ku\_text**: `string` \| `null`

Ji Ku Text

##### responses.200.content.application/json.kumitsuke\_ku\_text?

> `optional` **kumitsuke\_ku\_text**: `string` \| `null`

Kumitsuke Ku Text

##### responses.200.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### responses.200.content.application/json.next\_div?

> `optional` **next\_div**: `string` \| `null`

Next Div

##### responses.200.content.application/json.packaging?

> `optional` **packaging**: `string` \| `null`

Packaging

##### responses.200.content.application/json.packaging\_qty

> **packaging\_qty**: `string`

Packaging Qty

##### responses.200.content.application/json.packaging\_unit

> **packaging\_unit**: `string`

Packaging Unit

##### responses.200.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.200.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### responses.200.content.application/json.requires\_lot\_number

> **requires\_lot\_number**: `boolean`

Requires Lot Number

###### Default

```ts
true
```

##### responses.200.content.application/json.shelf\_life\_days?

> `optional` **shelf\_life\_days**: `number` \| `null`

Shelf Life Days

##### responses.200.content.application/json.shipping\_warehouse\_name?

> `optional` **shipping\_warehouse\_name**: `string` \| `null`

Shipping Warehouse Name

##### responses.200.content.application/json.supplier\_code?

> `optional` **supplier\_code**: `string` \| `null`

Supplier Code

##### responses.200.content.application/json.supplier\_item\_code?

> `optional` **supplier\_item\_code**: `string` \| `null`

Supplier Item Code

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_product\_api\_products\_\_product\_id\_\_patch

> **update\_product\_api\_products\_\_product\_id\_\_patch**: `object`

Defined in: [src/types/api.d.ts:4345](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4345)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.product\_id

> **product\_id**: `number`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.customer\_part\_no?

> `optional` **customer\_part\_no**: `string` \| `null`

Customer Part No

##### requestBody.content.application/json.internal\_unit?

> `optional` **internal\_unit**: `string` \| `null`

Internal Unit

##### requestBody.content.application/json.is\_active?

> `optional` **is\_active**: `boolean` \| `null`

Is Active

##### requestBody.content.application/json.maker\_item\_code?

> `optional` **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### requestBody.content.application/json.product\_code?

> `optional` **product\_code**: `string` \| `null`

Product Code

##### requestBody.content.application/json.product\_name?

> `optional` **product\_name**: `string` \| `null`

Product Name

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.created\_at

> **created\_at**: `string`

Created At
Format: date-time

##### responses.200.content.application/json.customer\_part\_no

> **customer\_part\_no**: `string` \| `null`

Customer Part No

##### responses.200.content.application/json.id

> **id**: `number`

Id

##### responses.200.content.application/json.internal\_unit

> **internal\_unit**: `string`

Internal Unit

##### responses.200.content.application/json.is\_active

> **is\_active**: `boolean`

Is Active

##### responses.200.content.application/json.maker\_item\_code

> **maker\_item\_code**: `string` \| `null`

Maker Item Code

##### responses.200.content.application/json.product\_code

> **product\_code**: `string`

Product Code

##### responses.200.content.application/json.product\_name

> **product\_name**: `string`

Product Name

##### responses.200.content.application/json.updated\_at

> **updated\_at**: `string`

Updated At
Format: date-time

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_supplier\_api\_masters\_suppliers\_\_supplier\_code\_\_put

> **update\_supplier\_api\_masters\_suppliers\_\_supplier\_code\_\_put**: `object`

Defined in: [src/types/api.d.ts:2869](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L2869)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.supplier\_code

> **supplier\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### requestBody.content.application/json.supplier\_name?

> `optional` **supplier\_name**: `string` \| `null`

Supplier Name

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.200.content.application/json.supplier\_code

> **supplier\_code**: `string`

Supplier Code

##### responses.200.content.application/json.supplier\_name

> **supplier\_name**: `string`

Supplier Name

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### update\_warehouse\_api\_masters\_warehouses\_\_warehouse\_code\_\_put

> **update\_warehouse\_api\_masters\_warehouses\_\_warehouse\_code\_\_put**: `object`

Defined in: [src/types/api.d.ts:3029](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L3029)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path

> **path**: `object`

##### parameters.path.warehouse\_code

> **warehouse\_code**: `string`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### requestBody.content.application/json.is\_active

> **is\_active**: `number` \| `null`

Is Active

###### Default

```ts
1
```

##### requestBody.content.application/json.warehouse\_name?

> `optional` **warehouse\_name**: `string` \| `null`

Warehouse Name

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.address?

> `optional` **address**: `string` \| `null`

Address

##### responses.200.content.application/json.is\_active

> **is\_active**: `number`

Is Active

###### Default

```ts
1
```

##### responses.200.content.application/json.warehouse\_code

> **warehouse\_code**: `string`

Warehouse Code

##### responses.200.content.application/json.warehouse\_name

> **warehouse\_name**: `string`

Warehouse Name

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

***

### validate\_order\_stock\_api\_orders\_validate\_post

> **validate\_order\_stock\_api\_orders\_validate\_post**: `object`

Defined in: [src/types/api.d.ts:4460](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/types/api.d.ts#L4460)

#### parameters

> **parameters**: `object`

##### parameters.cookie?

> `optional` **cookie**: `undefined`

##### parameters.header?

> `optional` **header**: `undefined`

##### parameters.path?

> `optional` **path**: `undefined`

##### parameters.query?

> `optional` **query**: `undefined`

#### requestBody

> **requestBody**: `object`

##### requestBody.content

> **content**: `object`

##### requestBody.content.application/json

> **application/json**: `object`

##### requestBody.content.application/json.lines

> **lines**: `object`[]

Lines

##### requestBody.content.application/json.ship\_date?

> `optional` **ship\_date**: `string` \| `null`

Ship Date

#### responses

> **responses**: `object`

##### responses.200

> **200**: `object`

###### Description

Successful Response

##### responses.200.content

> **content**: `object`

##### responses.200.content.application/json

> **application/json**: `object`

##### responses.200.content.application/json.data?

> `optional` **data**: \{ `available`: `number`; `details`: \{ `per_lot?`: `object`[]; `ship_date?`: `string` \| `null`; `warehouse_code`: `string`; \}; `product_code`: `string`; `required`: `number`; \} \| `null`

###### Type Declaration

\{ `available`: `number`; `details`: \{ `per_lot?`: `object`[]; `ship_date?`: `string` \| `null`; `warehouse_code`: `string`; \}; `product_code`: `string`; `required`: `number`; \}

`null`

##### responses.200.content.application/json.message

> **message**: `string`

Message

##### responses.200.content.application/json.ok

> **ok**: `boolean`

Ok

##### responses.200.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`

##### responses.422

> **422**: `object`

###### Description

Validation Error

##### responses.422.content

> **content**: `object`

##### responses.422.content.application/json

> **application/json**: `object`

##### responses.422.content.application/json.detail?

> `optional` **detail**: `object`[]

Detail

##### responses.422.headers

> **headers**: `object`

###### Index Signature

\[`name`: `string`\]: `unknown`
