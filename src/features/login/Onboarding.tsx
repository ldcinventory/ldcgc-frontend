import { ImageProps } from "./loginSlice"

type OnboardingProps = {
  images: ImageProps[]
}

const Onboarding: React.FC<OnboardingProps> = ({ images }) => {
  return (
    <div className="w-64 carousel rounded-box">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col carousel-item w-full">
          <img
            src={image.src}
            className="h-52 max-w-lg rounded-lg mb-7"
            alt={image.alt}
          />
          <h2 className="text-yellow-500 font-semibold leading-9">
            {image.title}
          </h2>
          <p className="text-gray-900 text-sm mt-10">{image.description}</p>
        </div>
      ))}
    </div>
  )
}
export default Onboarding
