import React, {
  Component,
  ErrorInfo,
  ReactNode,
} from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props,State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(err: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: err };
  }

  public componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo
  ) {
    // //no-console("Uncaught error:", error.message)
    // console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    //no-console("error boundary =", this.state.error?.message)
    if (this.state.hasError) {
      return (
        <div className="flex-center h-screen  w-full ">
          <div className="flex-center w-[50%] bg-red-100 p-2 text-red-600">
            {this.state.error?.message}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
