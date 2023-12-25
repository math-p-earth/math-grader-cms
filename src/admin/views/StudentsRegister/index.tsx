import React from 'react'

import { Form } from 'payload/components/forms'
import { MinimalTemplate } from 'payload/components/templates'
import { AdminViewComponent } from 'payload/config'
import RenderFields from 'payload/dist/admin/components/forms/RenderFields'
import FormSubmit from 'payload/dist/admin/components/forms/Submit'
import { fieldTypes } from 'payload/dist/admin/components/forms/field-types'

import jwtDecode from 'jwt-decode'

import { useQueryParams } from '../../hooks/useQueryParams'
import { fields } from './fields'
import './index.scss'

const baseClass = 'student-register'

// only include fields that we care about
interface IDTokenPayload {
  email: string
  given_name: string
  family_name: string
}

const StudentsRegister: AdminViewComponent = () => {
  const idToken = useQueryParams('idToken')
  const redirectUrl = useQueryParams('redirectUrl')
  if (!idToken || !redirectUrl) {
    return (
      <MinimalTemplate className={baseClass} width="normal">
        <h1>Register</h1>
        <p>
          Google ID token is required to complete new user registration. Please initate registration
          flow through https://math-p-earth.com.
        </p>
      </MinimalTemplate>
    )
  }

  const initialData: {
    idToken: string
    email?: string
    firstName?: string
    lastName?: string
  } = {
    idToken: idToken,
  }
  try {
    const decodedToken = jwtDecode<IDTokenPayload>(idToken)
    if ('email' in decodedToken) {
      initialData['email'] = decodedToken['email']
    }
    if ('given_name' in decodedToken) {
      initialData['firstName'] = decodedToken['given_name']
    }
    if ('family_name' in decodedToken) {
      initialData['lastName'] = decodedToken['family_name']
    }
  } catch (err) {
    return (
      <MinimalTemplate className={baseClass} width="normal">
        <h1>Register</h1>
        <p>
          Invalid id token. Id token is required to complete new user registration. Please initate
          registration flow through Google OAuth.
        </p>
      </MinimalTemplate>
    )
  }
  return (
    <MinimalTemplate className={baseClass} width="normal">
      <h1>Register</h1>
      <p>For first time users, please fill in additional data below.</p>
      <Form
        className={`${baseClass}__form`}
        method="post"
        action="/api/students/register"
        initialData={initialData}
        onSuccess={() => {
          window.location.href = redirectUrl
        }}
        disableSuccessStatus
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
