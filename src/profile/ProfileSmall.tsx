import { ArrowRightEndOnRectangleIcon, UserIcon } from "@heroicons/react/16/solid";
import { AppButtonTransparent } from "../common/components/AppButton";
import { useNavigate } from "react-router-dom";

export function ProfileSmall() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('payloadToken')
    localStorage.removeItem('signatureToken')
    navigate('/login')
  }

  return (
    <div className="flex gap-6 items-center">
      <section className="flex gap-2 w-full flex-1 items-center">
        <UserIcon className="h-8"/>
        <span className="flex-1 text-sm whitespace-nowrap">Sergio Rello</span>
      </section>
      <AppButtonTransparent onClick={handleLogout}>
        <ArrowRightEndOnRectangleIcon className="h-8" />
      </AppButtonTransparent>
    </div>
  )
}