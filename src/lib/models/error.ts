export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface ApiError extends Error {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
    statusText?: string;
  };
  request?: unknown;
  code?: string;
}

export function getErrorMessage(error: unknown): string {
  if (!error) return "An unknown error occurred";
  
  // Handle ApiError
  if (typeof error === 'object' && 'response' in error) {
    const apiError = error as ApiError;
    return apiError.response?.data?.message || 
           apiError.response?.statusText || 
           "API request failed";
  }
  
  // Handle regular Error
  if (error instanceof Error) {
    return error.message;
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  
  return "An unknown error occurred";
}