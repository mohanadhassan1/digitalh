
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ReactFCWithChildren<T = Record<string, unknown>> = React.FC<React.PropsWithChildren<T>>;

export type QueryState<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  isError: boolean;
};

export type PaginatedData<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};