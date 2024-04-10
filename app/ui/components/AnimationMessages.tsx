export function AnimationSuccess(){
  return (
    <div className="success-checkmark grid place-items-center">
      <div className="check-icon">
        <span className="icon-line line-tip"></span>
        <span className="icon-line line-long"></span>
        <div className="icon-circle"></div>
        <div className="icon-fix"></div>
      </div>
    </div>
  )
}

export function AnimationError() {
  return (
    <div className="errorContainer">
      <div className="circle-border"></div>
      <div className="circle">
        <div className="error"></div>
      </div>
    </div>
  )
}