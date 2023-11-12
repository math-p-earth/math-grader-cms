import { RelationshipField } from 'payload/dist/fields/config/types'
import { Config } from 'payload/generated-types'
import { Field, FieldHook } from 'payload/types'

type BackpopulateFieldHookOptions<TSlug extends keyof Config['collections']> = Pick<
  BackpopulateFieldOptions<TSlug>,
  'relationFrom' | 'relationField'
>

function backpopulateFieldHook<TSlug extends keyof Config['collections']>({
  relationFrom,
  relationField,
}: BackpopulateFieldHookOptions<TSlug>): FieldHook {
  return async ({ req, data }) => {
    const { payload, collection } = req
    if (!collection || !data) {
      return []
    }

    const fromCollection = payload.config.collections.find(
      (collection) => collection.slug === relationFrom
    )
    if (!fromCollection) {
      throw new Error(`Could not find collection "${relationFrom}"`)
    }
    const field = fromCollection.fields.find(
      (field) => field.type == 'relationship' && field.name === relationField
    ) as RelationshipField // safe to cast because we checked for type
    if (!field) {
      throw new Error(
        `Could not find relationship field "${relationField}" in collection "${fromCollection.slug}" or `
      )
    }

    if (Array.isArray(field.relationTo)) {
      // TODO: handle backpopulation for polymorphic relationships
      throw new Error('polymorphic relationship backpopulation not implemented')
    }

    const relatedDocs = await payload.find({
      collection: relationFrom,
      pagination: false,
      where: {
        [relationField]: {
          contains: data.id,
        },
      },
      depth: 0,
    })
    const relatedIds = relatedDocs.docs.map((doc) => doc.id)

    return relatedIds
  }
}

const clearFieldData: FieldHook = () => {
  return null
}

export interface BackpopulateFieldOptions<TSlug extends keyof Config['collections']> {
  /**
   * The name of the field. Must be unique within the collection.
   */
  name: string

  /**
   * The collection to backpopulate relation from
   */
  relationFrom: TSlug

  /**
   * The field to compare id with
   */
  relationField: keyof Config['collections'][TSlug] & string

  /**
   * The label to display in the admin UI
   */
  label: string
}

export function BackpopulateField<TSlug extends keyof Config['collections']>({
  name,
  relationFrom,
  relationField,
  label,
}: BackpopulateFieldOptions<TSlug>): Field {
  return {
    name: name,
    type: 'relationship',
    label: label,
    admin: {
      readOnly: true,
    },
    relationTo: relationFrom,
    hasMany: true,
    hooks: {
      afterRead: [
        backpopulateFieldHook({
          relationFrom,
          relationField,
        }),
      ],
      beforeChange: [clearFieldData],
    },
  }
}
