import { Observable } from 'rxjs';
export declare class ProjectMock {
    id: string;
    path: string;
    group: string;
    dependencies: string[];
    constructor(config: any);
    test(): Observable<any>;
    build(): Observable<any>;
    lint(): Observable<any>;
    release(): Observable<any>;
}
