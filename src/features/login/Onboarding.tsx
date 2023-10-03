import ImageProps from "../../types/ImageProps"

interface OnboardingProps {
  images: ImageProps[]
}

const Onboarding: React.FC<OnboardingProps> = ({ images }) => {
  return (
    <div className="w-64 carousel rounded-box">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col carousel-item w-full">
          <img
            src={image.src}
            className="h-52 max-w-lg rounded-lg"
            alt={image.alt}
          />
          <h2 className="text-yellow-500">{image.title}</h2>
          <p className="text-gray-900">{image.description}</p>
        </div>
      ))}
    </div>
  )
}
export default Onboarding
