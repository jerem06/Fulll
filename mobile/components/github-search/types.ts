export interface GitHubUser {
    id: number | string;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
    score: number;
}

export interface SearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GitHubUser[];
}

export interface SearchError {
    message: string;
    documentation_url: string;
} 