import { Descendant, Element, Text } from 'slate'

export const flattenText = (obj: Descendant | Descendant[]): string => {
  if (Element.isElementList(obj) || Text.isTextList(obj)) {
    return obj.map(flattenText).join(' ')
  } else if (Element.isElement(obj)) {
    return flattenText(obj.children)
  } else if (Text.isText(obj)) {
    return obj.text
  } else {
    throw new Error('Invalid slate element:' + JSON.stringify(obj))
  }
}
