export interface LocalConfig {
    projectTypes: string[];
    paths: {
        dist: string;
        release: string;
    };
}
export interface WorkspaceConfig {
    rootFileName: string;
    local?: LocalConfig;
}
