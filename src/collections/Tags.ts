import { CollectionAfterReadHook, CollectionConfig, Where } from 'payload/types'

import { Problem, Tag } from '../payload-types'

// TODO: Reconsider this. A separate API call for problems with query params might be better.
const addRelatedProblemsHook: CollectionAfterReadHook<Tag> = async ({ doc, req }) => {
  if (req.payloadAPI === 'REST') {
    const where: Where = {
      tags: {
        equals: doc.id,
      },
    }
    const problems = await req.payload.find<Problem>({
      collection: 'problems',
      where: where,
      depth: 0,
    })
    return {
      ...doc,
      problems: problems.docs,
    }
  }
}

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
  hooks: {
    afterRead: [addRelatedProblemsHook],
  },
}
