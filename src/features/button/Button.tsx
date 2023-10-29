export interface ButtonProps {
  text: string
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <div>
      <button className="btn btn-block bg-yellow-500 text-black hover:bg-yellow-600">
        {text}
      </button>
    </div>
  )
}

export default Button
