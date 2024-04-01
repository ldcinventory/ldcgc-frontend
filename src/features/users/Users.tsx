import React from "react"
import { useSelector } from "react-redux"

import { selectAllUsers } from "./usersSlice"
import { RootState } from "../../app"

export const UsersList = () => {
  const users = useSelector(selectAllUsers)
  const usersStatus = useSelector((state: RootState) => state.users.status)
  const error = useSelector((state: RootState) => state.users.error)

  return (
    <section className="users-list" data-testid="users-list">
      {(() => {
        switch (usersStatus) {
          case "idle":
            return <div className="idle">Users not requested!</div>
          case "loading":
            return <span className="loading loading-spinner loading-lg"></span>
          case "failed":
            return <div className="text-red-600">{error}</div>
          case "succeeded":
            return (
              <>
                <h1 className="font-semibold text-xl mb-1">Users</h1>
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.length}
                    </tbody>
                  </table>
                </div>
              </>
            )
          default:
            return <div>No data</div>
        }
      })()}
    </section>
  )
}
