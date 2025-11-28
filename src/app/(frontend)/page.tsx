import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload/payload.config'
import { headers } from 'next/headers'
import { Button } from '@payloadcms/ui'

export default async function page() {
  const payload = await getPayload({ config })
  const headersList = await headers()
  const { user } = await payload.auth({ headers: headersList })

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href="/admin">
        <Button buttonStyle="primary">Go to admin panel</Button>
      </Link>
    </div>
  )
}
