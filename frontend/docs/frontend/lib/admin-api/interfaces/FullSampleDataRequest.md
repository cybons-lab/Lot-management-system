[**lot-management-frontend v1.0.0**](../../../README.md)

***

[lot-management-frontend](../../../README.md) / [lib/admin-api](../README.md) / FullSampleDataRequest

# Interface: FullSampleDataRequest

Defined in: [src/lib/admin-api.ts:24](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/lib/admin-api.ts#L24)

## Properties

### lots?

> `optional` **lots**: `object`[]

Defined in: [src/lib/admin-api.ts:30](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/lib/admin-api.ts#L30)

#### expiry\_date?

> `optional` **expiry\_date**: `string` \| `null`

#### lot\_number

> **lot\_number**: `string`

#### product\_code

> **product\_code**: `string`

#### receipt\_date

> **receipt\_date**: `string`

#### supplier\_code

> **supplier\_code**: `string`

#### warehouse\_code

> **warehouse\_code**: `string`

***

### orders?

> `optional` **orders**: `object`[]

Defined in: [src/lib/admin-api.ts:52](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/lib/admin-api.ts#L52)

#### customer\_code

> **customer\_code**: `string`

#### lines

> **lines**: `object`[]

#### order\_date?

> `optional` **order\_date**: `string` \| `null`

#### order\_no

> **order\_no**: `string`

***

### products?

> `optional` **products**: `object`[]

Defined in: [src/lib/admin-api.ts:25](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/lib/admin-api.ts#L25)

#### product\_code

> **product\_code**: `string`

#### product\_name

> **product\_name**: `string`

#### requires\_lot\_number

> **requires\_lot\_number**: `boolean`

***

### receipts?

> `optional` **receipts**: `object`[]

Defined in: [src/lib/admin-api.ts:38](https://github.com/cybons-lab/Lot-management-system/blob/27136a70bad131ce7a63fc3b65b7329cb546f591/frontend/src/lib/admin-api.ts#L38)

#### lines

> **lines**: `object`[]

#### receipt\_date

> **receipt\_date**: `string`

#### receipt\_no

> **receipt\_no**: `string`

#### supplier\_code

> **supplier\_code**: `string`

#### warehouse\_code

> **warehouse\_code**: `string`
