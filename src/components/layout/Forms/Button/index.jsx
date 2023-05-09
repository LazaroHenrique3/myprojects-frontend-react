import * as c from './style'

const Button = ({btnColor, text = '', icon, handleFunction}) => {
  return (
    <c.ButtonAction onClick={handleFunction} btnColor={btnColor}>
        {icon} {text}
    </c.ButtonAction>
  )
}

export default Button