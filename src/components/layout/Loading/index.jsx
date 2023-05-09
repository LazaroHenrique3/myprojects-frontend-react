import * as c from './style'

import LoadingIcon from '../../../img/loading.gif'

const Loading = () => {
  return (
    <c.LoadingContainer>
      <c.LoadingIconImg src={LoadingIcon} alt="loading-icon" />
    </c.LoadingContainer>
  )
}

export default Loading