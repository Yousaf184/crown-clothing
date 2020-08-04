import React, { Component } from "react";

import ErrorFallbackUI from "./error-fallback/errorFallbackUI";

class MyErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by Error Boundary");
    console.log(error.message);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackUI
          fallbackImg="https://i.imgur.com/yW2W9SC.png"
          infoText="Something went wrong, please try again after few seconds"
        />
      );
    }

    return this.props.children;
  }
}

export default MyErrorBoundary;
