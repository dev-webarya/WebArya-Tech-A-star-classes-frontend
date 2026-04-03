const ACTIVE_API_BASE_URL_STORAGE_KEY = 'icfy_active_api_base_url';
const DEFAULT_API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || 'http://localhost:8080';

function normalizeBaseUrl(value?: string | null) {
    return String(value || '').trim().replace(/\/$/, '');
}

export function getStoredActiveApiBaseUrl() {
    try {
        const stored = localStorage.getItem(ACTIVE_API_BASE_URL_STORAGE_KEY);
        // If stored value is old (8009, 8024), clear it
        if (stored && (stored.includes(':8009') || stored.includes(':8024'))) {
            localStorage.removeItem(ACTIVE_API_BASE_URL_STORAGE_KEY);
            return '';
        }
        return normalizeBaseUrl(stored);
    } catch {
        return '';
    }
}

export function setActiveApiBaseUrl(baseUrl: string) {
    const normalized = normalizeBaseUrl(baseUrl);
    if (!normalized) return;
    localStorage.setItem(ACTIVE_API_BASE_URL_STORAGE_KEY, normalized);
}

export function clearActiveApiBaseUrl() {
    localStorage.removeItem(ACTIVE_API_BASE_URL_STORAGE_KEY);
}

export function getApiBaseCandidates() {
    const candidates = [
        DEFAULT_API_BASE_URL, // Prioritize the .env value (port 9014)
        getStoredActiveApiBaseUrl(),
    ].map(normalizeBaseUrl).filter(Boolean);

    return Array.from(new Set(candidates));
}

export function getPreferredApiBaseUrl() {
    return getApiBaseCandidates()[0] || DEFAULT_API_BASE_URL;
}
