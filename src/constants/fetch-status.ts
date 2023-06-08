export enum FetchStatuses {
    idle = 'idle',
    success = 'success',
    loading = 'loading',
    failed = 'failed',
}

export type FetchStatusesType = `${FetchStatuses}`;
