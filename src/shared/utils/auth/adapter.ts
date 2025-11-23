import { createAdapterFactory, type DBAdapterDebugLogOption } from 'better-auth/adapters'
import payloadConfig from '@/payload/payload.config'
import { getPayload, type Payload, type Where, type CollectionSlug } from 'payload'

// Types for Better Auth adapter
interface WhereCondition {
  field: string
  operator: string
  value: string | number | boolean | string[] | number[] | Date | null
}

// Payload operator types
type PayloadOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'greater_than_equal'
  | 'less_than'
  | 'less_than_equal'
  | 'in'
  | 'not_in'
  | 'like'

// Type for Payload query field conditions
type PayloadFieldCondition = {
  [K in PayloadOperator]?: string | number | boolean | string[] | number[] | Date | null
}

// Type-safe Where query builder
type PayloadWhereQuery = {
  [field: string]:
    | PayloadFieldCondition
    | string
    | number
    | boolean
    | string[]
    | number[]
    | Date
    | null
}

interface PayloadAdapterConfig {
  debugLogs?: DBAdapterDebugLogOption
  usePlural?: boolean
}

export const payloadAdapter = (_config: PayloadAdapterConfig = {}) =>
  createAdapterFactory({
    adapter: ({}) => {
      let payloadInstance: Payload | null = null

      const getPayloadInstance = async (): Promise<Payload> => {
        if (!payloadInstance) {
          payloadInstance = await getPayload({ config: payloadConfig })
        }
        return payloadInstance
      }

      const mapOperatorToPayload = (operator: string): PayloadOperator => {
        switch (operator) {
          case 'eq':
          case '=':
            return 'equals'
          case 'neq':
          case '!=':
            return 'not_equals'
          case 'gt':
          case '>':
            return 'greater_than'
          case 'gte':
          case '>=':
            return 'greater_than_equal'
          case 'lt':
          case '<':
            return 'less_than'
          case 'lte':
          case '<=':
            return 'less_than_equal'
          case 'in':
            return 'in'
          case 'nin':
          case 'not_in':
            return 'not_in'
          case 'contains':
            return 'like'
          default:
            return 'equals'
        }
      }

      const buildWhereQuery = (where: WhereCondition[]): Where => {
        const query: PayloadWhereQuery = {}
        if (where && Array.isArray(where)) {
          where.forEach((condition: WhereCondition) => {
            if (
              condition &&
              typeof condition === 'object' &&
              condition.field &&
              condition.operator
            ) {
              const field = condition.field
              const payloadOperator = mapOperatorToPayload(condition.operator)
              const value = condition.value

              query[field] = { [payloadOperator]: value } as PayloadFieldCondition
            }
          })
        }
        return query as Where
      }

      const hasRelationshipFields = (model: string): boolean => {
        return model === 'accounts' || model === 'sessions'
      }

      const normalizePayloadData = (
        data: Record<string, unknown>,
        model: string,
      ): Record<string, unknown> => {
        const normalized: Record<string, unknown> = { ...data }

        if (hasRelationshipFields(model)) {
          const keyUserId = 'userId'
          const userIdValue = normalized[keyUserId]
          const isUserIdPresent = keyUserId in normalized && userIdValue
          const isUserIdNotString = typeof userIdValue !== 'string'

          if (isUserIdPresent && isUserIdNotString) {
            normalized[keyUserId] = String(userIdValue)
          }
        }

        return normalized
      }

      const isRelationshipObject = (value: unknown): value is { id: string } => {
        return (
          typeof value === 'object' &&
          value !== null &&
          'id' in value &&
          typeof (value as { id: unknown }).id === 'string'
        )
      }

      const flattenRelationshipFields = (doc: Record<string, unknown>): Record<string, unknown> => {
        const flattened: Record<string, unknown> = {}
        const keyUserId = 'userId'

        for (const [key, value] of Object.entries(doc)) {
          const isUserIdKey = key === keyUserId
          if (isUserIdKey && isRelationshipObject(value)) {
            flattened[key] = value.id
          } else {
            flattened[key] = value
          }
        }

        return flattened
      }

      const buildSortString = (sortBy?: {
        field: string
        direction: 'asc' | 'desc'
      }): string | undefined => {
        if (!sortBy) {
          return undefined
        }

        const isAsc = sortBy.direction === 'asc'
        return isAsc ? sortBy.field : `-${sortBy.field}`
      }

      const calculatePage = (offset: number | undefined, limit: number): number => {
        if (!offset) {
          return 1
        }
        return Math.floor(offset / limit) + 1
      }

      return {
        create: async <T>({
          data,
          model,
        }: {
          data: T
          model: string
          select?: string[]
        }): Promise<T> => {
          const payload = await getPayloadInstance()

          if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error('Data must be an object')
          }

          const dataRecord = data as Record<string, unknown>
          const normalizedData = normalizePayloadData(dataRecord, model)

          const result = await payload.create({
            collection: model as CollectionSlug,
            data: normalizedData,
          })

          const flattened = flattenRelationshipFields(result as unknown as Record<string, unknown>)
          return flattened as T
        },
        update: async <T>({
          model,
          update,
          where,
        }: {
          model: string
          where: WhereCondition[]
          update: T
        }): Promise<T | null> => {
          const payload = await getPayloadInstance()
          const query = buildWhereQuery(where)

          if (typeof update !== 'object' || update === null || Array.isArray(update)) {
            return null
          }

          const updateRecord = update as Record<string, unknown>
          const normalizedData = normalizePayloadData(updateRecord, model)

          const result = await payload.update({
            collection: model as CollectionSlug,
            where: query,
            data: normalizedData,
          })

          if (!result.docs || result.docs.length === 0) {
            return null
          }

          const flattened = flattenRelationshipFields(
            result.docs[0] as unknown as Record<string, unknown>,
          )
          return flattened as T
        },
        updateMany: async ({
          model,
          update,
          where,
        }: {
          model: string
          update: Record<string, unknown>
          where: WhereCondition[]
        }): Promise<number> => {
          const payload = await getPayloadInstance()
          const query = buildWhereQuery(where)
          const normalizedData = normalizePayloadData(update, model)

          const result = await payload.update({
            collection: model as CollectionSlug,
            where: query,
            data: normalizedData,
          })

          return result.docs?.length || 0
        },
        delete: async ({
          model,
          where,
        }: {
          model: string
          where: WhereCondition[]
        }): Promise<void> => {
          const payload = await getPayloadInstance()
          const query = buildWhereQuery(where)

          await payload.delete({
            collection: model as CollectionSlug,
            where: query,
          })
        },
        findOne: async <T>({
          model,
          where,
        }: {
          model: string
          where: WhereCondition[]
          select?: string[]
        }): Promise<T | null> => {
          const payload = await getPayloadInstance()
          const query = buildWhereQuery(where)

          const result = await payload.find({
            collection: model as CollectionSlug,
            where: query,
            limit: 1,
          })

          if (!result.docs || result.docs.length === 0) {
            return null
          }

          const flattened = flattenRelationshipFields(
            result.docs[0] as unknown as Record<string, unknown>,
          )
          return flattened as T
        },
        findMany: async <T>({
          model,
          where,
          limit,
          sortBy,
          offset,
        }: {
          model: string
          where?: WhereCondition[]
          limit: number
          sortBy?: { field: string; direction: 'asc' | 'desc' }
          offset?: number
        }): Promise<T[]> => {
          const payload = await getPayloadInstance()
          const query = where ? buildWhereQuery(where) : {}
          const sort = buildSortString(sortBy)
          const defaultLimit = 100
          const effectiveLimit = limit || defaultLimit
          const page = calculatePage(offset, effectiveLimit)

          const result = await payload.find({
            collection: model as CollectionSlug,
            where: query,
            limit: effectiveLimit,
            sort,
            page,
          })

          if (!result.docs || result.docs.length === 0) {
            return []
          }

          return result.docs.map(
            (doc) => flattenRelationshipFields(doc as unknown as Record<string, unknown>) as T,
          )
        },
        deleteMany: async ({
          model,
          where,
        }: {
          model: string
          where: WhereCondition[]
        }): Promise<number> => {
          const payload = await getPayloadInstance()
          const query = buildWhereQuery(where)

          const result = await payload.delete({
            collection: model as CollectionSlug,
            where: query,
          })

          return result.docs?.length || 0
        },
        count: async ({
          model,
          where,
        }: {
          model: string
          where?: WhereCondition[]
        }): Promise<number> => {
          const payload = await getPayloadInstance()
          const query = where ? buildWhereQuery(where) : {}

          const result = await payload.find({
            collection: model as CollectionSlug,
            where: query,
            limit: 0,
          })

          return result.totalDocs || 0
        },
      }
    },
    config: {
      adapterId: 'payload-adapter',
      adapterName: 'PayloadCMS Adapter',
      usePlural: true,
      debugLogs: false,
      supportsJSON: true,
      supportsDates: true,
      supportsBooleans: true,
      supportsNumericIds: false,
    },
  })
