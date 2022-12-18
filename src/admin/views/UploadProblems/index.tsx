import React, { useEffect } from 'react'

import { Eyebrow, Gutter } from 'payload/components/elements'
import { Form } from 'payload/components/forms'
import { useStepNav } from 'payload/components/hooks'
import { DefaultTemplate } from 'payload/components/templates'
import { useConfig } from 'payload/components/utilities'
import { Meta } from 'payload/components/utilities'
import { AdminView } from 'payload/config'
import RenderFields from 'payload/dist/admin/components/forms/RenderFields'
import FormSubmit from 'payload/dist/admin/components/forms/Submit'
import fieldTypes from 'payload/dist/admin/components/forms/field-types'

import { Redirect } from 'react-router-dom'

import RenderInput from './components/RenderInput'
import { fields } from './fields'
import './index.scss'

const baseClass = 'upload-problems'

const UploadProblemsView: AdminView = ({ user, canAccessAdmin }) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig()
  const { setStepNav } = useStepNav()

  // If an unauthorized user tries to navigate straight to this page,
  // Boot 'em out
  if (!user || (user && !canAccessAdmin)) {
    return <Redirect to={`${adminRoute}/unauthorized`} />
  }

  // This effect will only run one time and will allow us
  // to set the step nav to display our custom route name

  useEffect(() => {
    setStepNav([
      {
        label: 'Upload Problems',
      },
    ])
  }, [setStepNav])

  return (
    <DefaultTemplate>
      <Meta title="Upload Problems" />
      {/* TODO: add target action and method */}
      <Form className={`${baseClass}__form`} method="post" action="/api/upload-problems">
        <Eyebrow />
        <Gutter>
          <h1>Upload Problems in Bulk</h1>
          <div className={`${baseClass}__main`}>
            <RenderFields
              filter={(field) => !field?.admin?.position || field?.admin?.position !== 'sidebar'}
              fieldTypes={fieldTypes}
              fieldSchema={fields}
            />
            <RenderInput inputPath="input" />
            <FormSubmit>Submit</FormSubmit>
          </div>
        </Gutter>
      </Form>
    </DefaultTemplate>
  )
}

export default UploadProblemsView
