import cn from "classnames"

import { ImageProps } from "./loginSlice"

type OnboardingProps = {
  images: ImageProps[]
  active: string
}

const Onboarding: React.FC<OnboardingProps> = ({ images, active }) => {
  return (
    <>
      <div className="w-[380px] carousel rounded-box mt-10">
        {images.map((image, index) => (
          <div
            key={index}
            id={`item${index}`}
            className="flex flex-col carousel-item w-full"
          >
            <img
              src={image.src}
              className="h-auto w-auto rounded-lg mb-7"
              alt={image.alt}
            />
            <h2 className="text-amber-500 text-2xl font-bold leading">
              {image.title}
            </h2>
            <p className="text-gray-900 text-sm mt-10">{image.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full py-2 gap-2">
        <a
          href="#item0"
          className={cn("btn btn-xs", { "btn-warning": active === "#item0" })}
        ></a>
        <a
          href="#item1"
          className={cn("btn btn-xs", { "btn-warning": active === "#item1" })}
        ></a>
        <a
          href="#item2"
          className={cn("btn btn-xs", { "btn-warning": active === "#item2" })}
        ></a>
      </div>
    </>
  )
}
export default Onboarding
