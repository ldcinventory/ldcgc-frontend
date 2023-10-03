interface ButtonProps {
  buttonName: string
}

const Button: React.FC<ButtonProps> = ({ buttonName }) => {
  console.log(buttonName)
  return (
    <div>
      <button className="btn btn-block bg-yellow-500 text-black">
        {buttonName}
      </button>
    </div>
  )
}

export default Button
