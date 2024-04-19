import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";
import { AppButtonTransparent } from "../common/components/AppButton";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect } from "react";
import { getMyUser } from "../users/usersSlice";
import { ApiLogout } from "../login/LoginService";

export function ProfileSmall() {
  const state = useAppSelector(state => state.users)
  const dispatch = useAppDispatch()

  useEffect(
    () => {
      dispatch(getMyUser())
    }
    , [])
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('payloadToken')
    localStorage.removeItem('signatureToken')
    ApiLogout()
    navigate('/login')
  }

  return (
    <div className="flex gap-6 items-center">
      <section className="flex gap-2 items-center">
        <UserIcon className="h-8"/>
        <span className="flex-1 text-sm whitespace-nowrap">{state.me?.email}</span>
      </section>
      <AppButtonTransparent onClick={handleLogout}>
        <ArrowRightEndOnRectangleIcon className="h-8" />
      </AppButtonTransparent>
    </div>
  )
}