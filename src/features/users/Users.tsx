import React from "react"
import { useSelector } from "react-redux"

import { selectAllUsers } from "./usersSlice"
import { RootState } from "../../app/store"

export const UsersList = () => {
  const users = useSelector(selectAllUsers)
  const usersStatus = useSelector((state: RootState) => state.users.status)
  const error = useSelector((state: RootState) => state.users.error)

  return (
    <section className="users-list" data-testid="users-list">
      <h1 className="font-semibold text-xl">Users</h1>
      {(() => {
        switch (usersStatus) {
          case "idle":
            return <div className="idle">Users not requested!</div>
          case "loading":
            return <div className="loader">Loading...</div>
          case "failed":
            return <div className="text-red-600">{error}</div>
          case "succeeded":
            return (
              <div className="list">
                {users.map((user) => (
                  <div key={user.id} className="flex gap-2">
                    <div className="text-sm">{user.role}</div>
                    <div className="text-sm">{user.email}</div>
                  </div>
                ))}
              </div>
            )
          default:
            return <div>No data</div>
        }
      })()}
    </section>
  )
}
