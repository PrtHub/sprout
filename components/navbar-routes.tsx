'use client'

import { UserButton } from "@clerk/nextjs"

const NavbarRoutes = () => {
  return (
    <div className="ml-auto flex ">
        <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default NavbarRoutes