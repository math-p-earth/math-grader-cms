import { Field } from "payload/types";

export const fields: Field[] = [
  {
    type: 'textarea',
    name: 'input',
    label: 'Input JSON',
    required: true,
    admin: {
      placeholder: 'Enter input JSON here!',
    },
  }
]