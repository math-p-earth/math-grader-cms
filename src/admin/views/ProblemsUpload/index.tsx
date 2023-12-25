import React, { useEffect } from 'react'

import { Gutter } from 'payload/components/elements'
import { Form } from 'payload/components/forms'
import { useStepNav } from 'payload/components/hooks'
import { DefaultTemplate } from 'payload/components/templates'
import { useConfig } from 'payload/components/utilities'
import { Meta } from 'payload/components/utilities'
import { AdminViewComponent } from 'payload/config'
import RenderFields from 'payload/dist/admin/components/forms/RenderFields'
import FormSubmit from 'payload/dist/admin/components/forms/Submit'
import { fieldTypes } from 'payload/dist/admin/components/forms/field-types'

import { Redirect, useHistory } from 'react-router-dom'

import { Problem, ProblemList, Source } from '../../../payload-types'
import RenderInput from './components/RenderInput'
import { fields } from './fields'
import './index.scss'

const baseClass = 'problems-upload'

type UploadProblemResponse = {
  problems: Problem[]
  source?: Source
  problemList?: ProblemList
}

const ProblemsUploadView: AdminViewComponent = ({ user, canAccessAdmin }) => {
  const {
    routes: { admin: adminRoute },
  } = useConfig()
  const { setStepNav } = useStepNav()
  const history = useHistory()

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

  // Redirect to the newly created problem list or source, if exists
  const onSuccess = (json: UploadProblemResponse) => {
    if (json.problemList?.id) {
      history.push(`${adminRoute}/collections/problem-lists/${json.problemList.id}`)
    } else if (json.source?.id) {
      history.push(`${adminRoute}/collections/sources/${json.source.id}`)
    }
  }

  return (
    <DefaultTemplate>
      <Meta title="Upload Problems" />
      <Form
        className={`${baseClass}__form`}
        method="post"
        action="/api/problems/upload"
        onSuccess={(json) => onSuccess(json as UploadProblemResponse)}
      >
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

export default ProblemsUploadView
