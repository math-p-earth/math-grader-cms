import React from 'react'

import { Chevron } from 'payload/components'

import { NavLink } from 'react-router-dom'

const customRoutes = [
  {
    id: 'problems/upload',
    label: 'Upload Problems',
    href: '/admin/problems/upload',
  },
]

const baseClass = 'after-nav-links'

export const customRouteLinks: React.FC = () => {
  return (
    <div className={baseClass}>
      <span className="nav__label">Custom Routes</span>
      <nav>
        {customRoutes.map((route, index) => (
          <NavLink key={index} className="nav__link" activeClassName="active" to={route.href}>
            <Chevron />
            {route.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
