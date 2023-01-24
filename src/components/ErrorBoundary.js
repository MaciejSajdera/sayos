import * as React from "react"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(e, info) {
    console.error(`Error boundary in ${this?.props?.scope}`, {
      additionalInfo: this.props.additionalInfo,
      e,
      info,
    })
    this.props.onError && this.props.onError()
  }

  render() {
    if (this.state.hasError) {
      if (!this.props.noFallbackRender) {
        const message = this.props.customMessage
          ? this.props.customMessage
          : "Something went wrong"

        return (
          <div className="error-boundary">
            <h1>{message}</h1>
          </div>
        )
      }
      return null
    } else {
      return this.props.children ? this.props.children : null
    }
  }
}
