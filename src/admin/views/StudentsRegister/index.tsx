import React from 'react'

import { Form } from 'payload/components/forms'
import { MinimalTemplate } from 'payload/components/templates'
import { AdminView } from 'payload/config'
import RenderFields from 'payload/dist/admin/components/forms/RenderFields'
import FormSubmit from 'payload/dist/admin/components/forms/Submit'
import fieldTypes from 'payload/dist/admin/components/forms/field-types'

import { useQueryParams } from '../../hooks/useQueryParams'
import { fields } from './fields'
import './index.scss'

const baseClass = 'student-register'

const StudentsRegister: AdminView = () => {
  const idToken = useQueryParams('idToken')
  return (
    <MinimalTemplate className={baseClass} width="normal">
      <h1>Register</h1>
      <p>For first time users, please fill in additional data below.</p>
      {/* switch to /api/students/register */}
      <Form
        className={`${baseClass}__form`}
        method="post"
        action="/api/students"
        initialData={{
          idToken: idToken,
        }}
      >
        <RenderFields
          filter={(field) => !field?.admin?.position || field?.admin?.position !== 'sidebar'}
          fieldTypes={fieldTypes}
          fieldSchema={fields}
        />
        <FormSubmit>Submit</FormSubmit>
      </Form>
    </MinimalTemplate>
  )
}

export default StudentsRegister
