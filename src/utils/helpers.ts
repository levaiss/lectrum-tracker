import { AxiosError } from 'axios';

// Type guard with "type predicate"
export function isAxiosError(candidate: unknown): candidate is AxiosError {
    if (candidate && typeof candidate === 'object' && 'isAxiosError' in candidate) {
        return true;
    }

    return false;
}
